import { Sequelize, Model, DataTypes } from 'sequelize';

class CarTypes extends Model {
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        description: {
          type: DataTypes.STRING,
        },
      },
      {
        tableName: 'carTypes',
        sequelize,
      },
    );

    return this;
  }
}

export default CarTypes;
