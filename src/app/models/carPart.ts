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
        carId: {
          type: DataTypes.INTEGER,
        },
        partId: {
          type: DataTypes.INTEGER,
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
