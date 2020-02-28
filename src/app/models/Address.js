import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init({
      doctor_id: Sequelize.BIGINT,
      cep: Sequelize.STRING,
      street: Sequelize.STRING,
      neighborhood: Sequelize.STRING,
      state: Sequelize.STRING,
      city: Sequelize.STRING,
      number: Sequelize.STRING,
      complement: Sequelize.STRING,
      deleted_at: Sequelize.DATE,
    }, {
      sequelize,
    });
    return this;
  }
}


export default Address;
