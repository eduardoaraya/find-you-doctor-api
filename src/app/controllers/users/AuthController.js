import * as Yup from 'yup';
import Users from '../../models/Users';
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
      const user = await Users.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({
          message: 'E-mail não encontrado',
        });
      }

      if (await !user.checkPassword(password)) {
        return res.status(401).json({
          message: 'Senha inválida',
        });
      }

      const { id, name } = user;
      return res.status(200).json({
        user: {
          id,
          name,
          email,
        },
        token: authProvider.user.gen_token(user),
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno',
      });
    }
  }
}

export default new AuthController();
