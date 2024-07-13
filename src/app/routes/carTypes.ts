import { Router } from 'express';

/**
 * Controllers
 */
import CarTypesController from '@app/app/controllers/carsTypesController';

const routes = Router();

routes.get(
  '/car-type',

  CarTypesController.index,
);

routes.get(
  '/car-type/:id',

  CarTypesController.get,
);

routes.post(
  '/car-type',

  CarTypesController.store,
);

routes.put(
  '/car-type/:id',

  CarTypesController.update,
);

routes.delete(
  '/car-type/:id',

  CarTypesController.delete,
);

export default routes;
