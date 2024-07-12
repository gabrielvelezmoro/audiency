import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import { databaseConfig } from '@config/database';

/**
 * Models Sequelize
 */

import Cars from '@app/app/models/cars';
import Product from '@app/app/models/carTypes';

class Database {
  public connection: any;

  public models = [Cars, Product];

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
    mongoose.connect('mongodb://127.0.0.1:27017/cars', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
