import { Router } from 'express';

/**
 * Controllers
 */
import CategoryController from '@controllers/CategoryController';

const routes = Router();

routes.get(
  '/categories',

  CategoryController.index,
);

routes.post(
  '/categories',

  CategoryController.store,
);

routes.put(
  '/categories/:id',

  CategoryController.update,
);

routes.delete(
  '/categories/:id',

  CategoryController.delete,
);

export default routes;
