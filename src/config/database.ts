import { Options } from 'sequelize';

export const databaseConfig: Options = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
  },
  storage: './__tests__/database.sqlite',
  logging: false,
};
