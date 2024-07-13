import { Sequelize, Model, DataTypes } from 'sequelize';

class CarPart extends Model {
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        car_id: {
          type: DataTypes.INTEGER,
        },
        part_id: {
          type: DataTypes.INTEGER,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'carPart',
        sequelize,
      },
    );

    return this;
  }
}

export default CarPart;
