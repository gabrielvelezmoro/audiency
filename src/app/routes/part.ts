import { Router } from 'express';

/**
 * Controllers
 */
import PartsController from '@app/app/controllers/partsController';

const routes = Router();

routes.get(
  '/part',

  PartsController.index,
);

routes.post(
  '/part',

  PartsController.store,
);

routes.put(
  '/part/:id',

  PartsController.update,
);

routes.delete(
  '/part/:id',

  PartsController.delete,
);

export default routes;
