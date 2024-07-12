import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('psql');

const CarPart = sequelize.define('carPart', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  car_id: {
    type: DataTypes.INTEGER,
    references: { model: 'car', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: false,
  },
  part_id: {
    type: DataTypes.INTEGER,
    references: { model: 'part', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default CarPart;
