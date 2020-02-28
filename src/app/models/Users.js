import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Users extends Model {
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
      deleted_at: Sequelize.DATE,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}


export default Users;
