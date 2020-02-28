import * as Yup from 'yup';
import Admins from '../../models/Admins';
import authProvider from '../../providers/auth-provider';

class AuthController {
  static async validation(body) {
    try {
      const schema = await Yup.object().shape({
        email: Yup.string().email().required('E-mail é obrigatório'),
        password: Yup.string().min(6).required('Senha é obrigatório'),
      });
      return {
        valid: await schema.isValid(body),
        errors: await schema.validate(body, {}),
      };
    } catch (Error) {
      return {
        valid: false,
        errors: Error.message,
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
      const admin = await Admins.findOne({ where: { email } });

      if (!admin) {
        return res.status(401).json({
          message: 'E-mail não encontrado',
        });
      }

      if (await !admin.checkPassword(password)) {
        return res.status(401).json({
          message: 'Senha inválida',
        });
      }

      const { id, name } = admin;
      return res.status(200).json({
        user: {
          id,
          name,
          email,
        },
        token: authProvider.admin.gen_token(admin),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Erro interno',
      });
    }
  }
}

export default new AuthController();
