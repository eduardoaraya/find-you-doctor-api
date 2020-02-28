import * as Yup from 'yup';
import Doctors from '../../models/Doctors';

class RegisterController {
  static async verifyEmail(email) {
    const doctor = await Doctors.findOne({ where: { email } });
    return !!doctor;
  }

  static async verifyCpf(cpf) {
    const doctor = await Doctors.findOne({ where: { cpf } });
    return !!doctor;
  }

  static async verifyCrm(crm) {
    const doctor = await Doctors.findOne({ where: { crm } });
    return !!doctor;
  }

  static async validation(body) {
    try {
      const schema = await Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().email().required('E-mail é obrigatório'),
        password: Yup.string().min(6).required('Senha é obrigatório'),
        confirm_password: Yup.string().required('As senhas não conferem').oneOf([Yup.ref('password'), null]),
        birthdate: Yup.date().required('Data de nascimento é obrigatória'),
        crm: Yup.string().required('CRM é obrigatório'),
        phone: Yup.string().required('Telefone é obrigatório'),
        description: Yup.string(),
        rqe: Yup.string(),
        // specialization: Yup.number().required(),
        street: Yup.string().required(),
        state: Yup.string().required(),
        city: Yup.string().required(),
        number: Yup.number().required(),
        neighborhood: Yup.string().required(),
        terms: Yup.bool().oneOf([true]).required(),
        cep: Yup.string().required('Cep é obrigatório'),
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
        birthdate,
        picture,
        crm,
        phone,
        description,
        rqe,
        // specialization,
        street,
        state,
        city,
        number,
        neighborhood,
        complement,
        cep,
      } = req.body;

      const verifyEmailExist = await RegisterController.verifyEmail(email);
      if (verifyEmailExist) {
        return res.status(422).json({
          message: 'Já existe um médico com este e-mail cadastrado!',
        });
      }
      const verifyCpfExist = await RegisterController.verifyCpf(cpf);
      if (verifyCpfExist) {
        return res.status(422).json({
          message: 'Já existe um médico com este CPF cadastrado!',
        });
      }
      const verifyCrmExist = await RegisterController.verifyCrm(crm);
      if (verifyCrmExist) {
        return res.status(422).json({
          message: 'Já existe um médico com este CRM cadastrado!',
        });
      }

      const doctor = await Doctors.create({
        name,
        email,
        cpf,
        password,
        birthdate,
        picture: (req.file && req.file.path) ? req.file.path : null,
        crm,
        phone,
        description,
        rqe,
        specializations_id: 1,
        street,
        state,
        city,
        number,
        neighborhood,
        complement,
        cep,
      });

      doctor.password = undefined;

      return res.status(201).json({
        doctor,
        message: 'Cadastro realizado com sucesso',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Erro interno servidor',
      });
    }
  }

  async validationStep(req, res) {
    const { email, crm, cpf } = req.query;
    if (!email || !crm || !cpf) {
      return res.status(422).json({
        message: 'Insira os dados corretamente!',
      });
    }
    const verifyEmailExist = await RegisterController.verifyEmail(email);
    if (verifyEmailExist) {
      return res.status(422).json({
        message: 'Já existe um médico com este e-mail cadastrado!',
      });
    }
    const verifyCpfExist = await RegisterController.verifyCpf(cpf);
    if (verifyCpfExist) {
      return res.status(422).json({
        message: 'Já existe um médico com este CPF cadastrado!',
      });
    }
    const verifyCrmExist = await RegisterController.verifyCrm(crm);
    if (verifyCrmExist) {
      return res.status(422).json({
        message: 'Já existe um médico com este CRM cadastrado!',
      });
    }

    return res.status(200).json({
      validate: true,
    });
  }
}

export default new RegisterController();
