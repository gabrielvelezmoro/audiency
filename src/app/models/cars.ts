import { Sequelize, Model, DataTypes } from 'sequelize';

class Cars extends Model {
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        carTypeId: {
          type: DataTypes.INTEGER,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'cars',
        sequelize,
      },
    );

    return this;
  }
}

export default Cars;
