import { Router } from 'express';

import categoriesRoutes from '@routes/categories';
import productsRoutes from '@routes/products';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({
    name: 'Api ts',
    version: '1.0.0',
    mode: process.env.NODE_ENV,
  });
});

routes.use(categoriesRoutes);
routes.use(productsRoutes);

export default routes;
