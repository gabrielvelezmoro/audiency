import { Model, Sequelize, DataTypes, BelongsTo } from 'sequelize';
import Cars from '@app/app/models/cars';

class CarTypes extends Model {
  public static associations: {
    car: BelongsTo<Cars>;
  };

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
        car_id: {
          type: DataTypes.INTEGER,
          references: { model: 'cars', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
      },
      {
        tableName: 'car_types',
        sequelize,
      },
    );

    return this;
  }

  static associate(models: any) {
    this.belongsTo(models.Cars, {
      foreignKey: 'car_id',
      targetKey: 'id',
      as: 'card_id',
    });

    //   this.belongsTo(models.File, {
    //     foreignKey: 'image_id',
    //     targetKey: 'id',
    //     as: 'image',
    //   });
    // }
  }
}
export default CarTypes;
