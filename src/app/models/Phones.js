import Sequelize, { Model } from 'sequelize';

class Phones extends Model {
  static init(sequelize) {
    super.init({
      doctor_id: Sequelize.BIGINT,
      phone: Sequelize.STRING,
      type: Sequelize.STRING,
      deleted_at: Sequelize.DATE,
    }, {
      sequelize,
    });
    return this;
  }
}


export default Phones;
