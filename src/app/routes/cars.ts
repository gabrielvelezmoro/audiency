import { Router } from 'express';

/**
 * Controllers
 */
import CarsController from '@app/app/controllers/carController';

const routes = Router();

routes.get(
  '/cars',

  CarsController.index,
);

routes.get(
  '/cars/:id',

  CarsController.get,
);

routes.post(
  '/cars',

  CarsController.store,
);

routes.put(
  '/cars/:id',

  CarsController.update,
);

routes.delete(
  '/cars/:id',

  CarsController.delete,
);

export default routes;
