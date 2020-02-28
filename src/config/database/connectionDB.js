import Sequelize from 'sequelize';
import databaseConfig from './database';
import modelsProvider from '../../app/providers/models-provider';

class ConnectionDB {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    this.models = modelsProvider(this.connection);
  }
}

export default new ConnectionDB();
