import { Sequelize, Model, DataTypes } from 'sequelize';

class Cars extends Model {
  public id!: number;

  public name!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

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
