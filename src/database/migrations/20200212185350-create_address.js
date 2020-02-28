
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('address', {
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
    cep: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    neighborhood: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    complement: Sequelize.STRING,
    deleted_at: Sequelize.DATE,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  }),
  down(queryInterface) {
    return queryInterface.dropTable('address');
  },
};
