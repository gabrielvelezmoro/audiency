import { Request, Response } from 'express';
import CarTypes from '@app/app/models/carTypes';
import { AppError } from '@app/errors/app-error';
class CarTypesController {
  public async index(req: Request, res: Response) {
    const carTypes = await CarTypes.findAndCountAll({
      order: ['description'],
    });

    return res.json({
      data: carTypes.rows,
    });
  }

  public async get(req: Request, res: Response) {
    const { id } = req.params;

    const carTypes = await CarTypes.findOne({
      where: { id },
    });

    return res.json({
      data: carTypes,
    });
  }

  async store(req: Request, res: Response) {
    try {
      const { description } = req.body;

      const carType = await CarTypes.create({
        description,
      });

      console.log(carType);
      return res.status(201).json(carType);
    } catch (error) {
      console.log(error);
      throw new AppError(error);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { description } = req.body;

    const carType = await CarTypes.update(
      {
        description,
      },
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    return res.status(200).json(carType);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await CarTypes.destroy({
      where: { id },
    });

    return res.send(204);
  }
}

export default new CarTypesController();
