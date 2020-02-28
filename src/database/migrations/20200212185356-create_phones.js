
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('phones', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT,
    },
    doctor_id: {
      allowNull: false,
      type: Sequelize.BIGINT,
      onDelete: 'CASCADE',
      references: {
        model: 'Doctors',
        key: 'id',
        as: 'doctor_id',
      },
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      default: 'TEL',
    },
    deleted_at: Sequelize.DATE,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  }),
  down(queryInterface) {
    return queryInterface.dropTable('phones');
  },
};
