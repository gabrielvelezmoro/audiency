import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import { databaseConfig } from '@config/database';

/**
 * Models Sequelize
 */

import CarsTypes from '@models/carTypes';
import Cars from '@models/cars';
import Part from '@models/part';
import CarPart from '@models/carPart';

class Database {
  public connection: any;

  public models = [CarsTypes, Cars, Part, CarPart];

  constructor() {
    this.init();
    this.mongo();
  }

  init(): void {
    this.connection = new Sequelize(databaseConfig);
    this.models
      .map(model => model.initialize(this.connection))
      .map(
        (model: any) =>
          model.associate && model.associate(this.connection.models),
      );
  }

  private mongo(): void {
    console.log('MONGO_URL', process.env.MONGO_URL);
    mongoose.connect('mongodb://127.0.0.1:27017/cars', {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
}

export default new Database();
