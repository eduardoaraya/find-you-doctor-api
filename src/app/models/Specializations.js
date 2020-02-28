import Sequelize, { Model } from 'sequelize';

class Specializations extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.BIGINT,
      deleted_at: Sequelize.DATE,
    }, {
      sequelize,
    });
    return this;
  }
}

export default Specializations;
