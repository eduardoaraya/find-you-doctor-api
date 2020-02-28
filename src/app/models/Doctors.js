import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Doctors extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      cpf: Sequelize.STRING,
      birthdate: Sequelize.STRING,
      picture: Sequelize.STRING,
      phone: Sequelize.STRING,
      description: Sequelize.TEXT,
      reset_token_password: Sequelize.STRING,
      expired_token_password: Sequelize.DATE,
      email_verified: Sequelize.DATE,
      specializations_id: Sequelize.BIGINT,
      rqe: Sequelize.STRING,
      crm: Sequelize.STRING,
      deleted_at: Sequelize.DATE,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (doctor) => {
      if (doctor.password) {
        doctor.password = await bcrypt.hash(doctor.password, 8);
      }
    });
    return this;
  }

  async checkPassword(password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
  }
}


export default Doctors;
