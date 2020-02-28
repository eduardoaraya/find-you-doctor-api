import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Admins extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      picture: Sequelize.STRING,
      deleted_at: Sequelize.DATE,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (admin) => {
      if (admin.password) {
        admin.password = await bcrypt.hash(admin.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}


export default Admins;
