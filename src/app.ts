import path from 'path';
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
/**
 *  Middlewares
 */
import helmet from 'helmet';
import cors from '@middlewares/cors';
import morgan from '@middlewares/morgan';

/**
 * Init Database
 */
import '@app/database';

/**
 *  Routes
 */
import ROUTES from '@app/routes';
import swaggerOutput from './swagger.json';

class App {
  public server: Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.server.use(helmet());
    this.server.use(express.json());
    this.server.use(cors);
    this.server.use(morgan);
  }

  private routes() {
    this.server.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerOutput),
    );
    this.server.use(ROUTES);
  }
}

export default new App();
