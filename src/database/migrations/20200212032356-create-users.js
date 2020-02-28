module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      phone: Sequelize.STRING,
      picture: Sequelize.STRING,
      description: Sequelize.TEXT,
      birthdate: Sequelize.DATE,
      reset_token_password: Sequelize.STRING,
      expired_token_password: Sequelize.DATE,
      email_verified: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('users');
  },
};
