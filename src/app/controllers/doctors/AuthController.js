import * as Yup from 'yup';
import Doctors from '../../models/Doctors';
import authProvider from '../../providers/auth-provider';

class AuthController {
  static async validation(body) {
    try {
      const schema = await Yup.object().shape({
        email: Yup.string().email().required('E-mail é obrigatório'),
        password: Yup.string().required('Senha é obrigatório'),
      });
      return {
        valid: await schema.isValid(body),
        errors: await schema.validate(body, {}),
      };
    } catch (error) {
      return {
        valid: false,
        errors: error.message,
      };
    }
  }

  async auth(req, res) {
    try {
      const validation = await AuthController.validation(req.body);
      if (!validation.valid) {
        return res.status(422).json({
          message: 'Preencha os campos corretamente',
          validation,
        });
      }

      const { email, password } = req.body;
      const doctor = await Doctors.findOne({ where: { email } });

      if (!doctor) {
        return res.status(401).json({
          message: 'E-mail não encontrado',
        });
      }

      const check = await doctor.checkPassword(password);
      if (!check) {
        return res.status(401).json({
          message: 'Senha inválida',
        });
      }

      const { id, name, picture } = doctor;
      return res.status(200).json({
        user: {
          id,
          name,
          email,
          picture,
        },
        token: authProvider.doctor.gen_token(doctor),
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno',
      });
    }
  }
}

export default new AuthController();
