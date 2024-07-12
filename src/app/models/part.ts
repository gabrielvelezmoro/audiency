import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('psql');

const Part = sequelize.define('part', {
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

export default Part;
