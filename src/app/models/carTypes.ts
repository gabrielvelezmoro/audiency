import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('psql');

const CarTypes = sequelize.define('carTypes', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default CarTypes;
