
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('specializations', {
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
    deleted_at: Sequelize.DATE,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  }),
  down(queryInterface) {
    return queryInterface.dropTable('specializations');
  },
};
