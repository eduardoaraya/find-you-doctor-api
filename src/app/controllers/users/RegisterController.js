import * as Yup from 'yup';
import Users from '../../models/Users';

class RegisterController {
  static async verifyEmail(email) {
    const user = await Users.findOne({ where: { email } });
    return !!user;
  }

  static async verifyCpf(cpf) {
    const user = await Users.findOne({ where: { cpf } });
    return !!user;
  }

  static async validation(body) {
    try {
      const schema = await Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().email().required('E-mail é obrigatório'),
        password: Yup.string().min(6).required('Senha é obrigatório'),
        confirm_password: Yup.string().required('As senhas não conferem').oneOf([Yup.ref('password'), null]),
        picture: Yup.mixed(),
        birthdate: Yup.date().required('Data de nascimento é obrigatória'),
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

  async store(req, res) {
    try {
      const validation = await RegisterController.validation(req.body);
      if (!validation.valid) {
        return res.status(422).json({
          message: 'Preencha os campos corretamente',
          validation,
        });
      }

      const {
        name,
        email,
        cpf,
        password,
        confirm_password,
        birthdate,
        picture,
      } = req.body;

      const verifyEmailExist = await RegisterController.verifyEmail(email);
      if (verifyEmailExist) {
        return res.status(422).json({
          message: 'Já existe um usuário com este e-mail cadastrado!',
        });
      }
      const verifyCpfExist = await RegisterController.verifyCpf(cpf);
      if (verifyCpfExist) {
        return res.status(422).json({
          message: 'Já existe um usuário com este CPF cadastrado!',
        });
      }

      const user = await Users.create({
        name,
        email,
        cpf,
        password,
        confirm_password,
        birthdate,
        picture,
      });

      user.password = undefined;

      return res.status(201).json({
        user,
        message: 'Cadastro realizado com sucesso',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno servidor',
      });
    }
  }
}

export default new RegisterController();
