import { Router } from 'express';

import cars from '@app/app/routes/cars';
import carTypesRoutes from '@app/app/routes/carTypes';
import partsRoutes from '@app/app/routes/part';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({
    name: 'Api ts',
    version: '1.0.0',
    mode: process.env.NODE_ENV,
  });
});

routes.use(cars);
routes.use(carTypesRoutes);
routes.use(partsRoutes);

export default routes;
