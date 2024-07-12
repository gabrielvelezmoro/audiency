import { Router } from 'express';

/**
 * Controllers
 */
import ProductController from '@app/app/controllers/carsTypesController';

const routes = Router();

routes.get(
  '/products',

  ProductController.index,
);

routes.post(
  '/products',

  ProductController.store,
);

routes.get(
  '/products/:id',

  ProductController.show,
);

routes.put(
  '/products/:id',

  ProductController.update,
);

routes.delete(
  '/products/:id',

  ProductController.delete,
);

export default routes;
