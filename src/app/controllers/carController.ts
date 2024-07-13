import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Cars from '@app/app/models/cars';
import CarTypes from '@app/app/models/carTypes';
import CarPart from '@app/app/models/carPart';
import { AppError } from '@app/errors/app-error';

interface ICar {
  id: number;
  description: string;
  car_types_id: number;
}

class CarsController {
  async store(req: Request, res: Response) {
    try {
      const { description, type, parts } = req.body;

      const carTypes = await CarTypes.findOne({
        where: { id: type },
      });

      if (!carTypes) {
        throw new AppError('Tipo de carro não encontrado', 404);
      }

      const car = await Cars.create({
        carTypeId: type,
        description: description,
      });

      console.log(car.dataValues.id);
      parts.forEach(async (part: number) => {
        console.log(part);
        await CarPart.create({
          carId: car.dataValues.id,
          partId: part,
        });
      });

      return res.status(201).json(car);
    } catch (error) {
      return res.sendError(error, 500);
    }
  }

  async index(req: Request, res: Response) {
    const store_id = req.storeId;
    const q: string = req.query.q || '';
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 7);

    const limit: number = perPage;
    const offset: number = Number(page - 1) * perPage;

    const categories = await Cars.findAndCountAll({
      order: ['name'],
      where: {
        store_id,
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
      limit,
      offset,
    });

    const lastPage = Math.ceil(categories.count / perPage);

    return res.json({
      total: categories.count,
      perPage,
      lastPage,
      page,
      data: categories.rows,
    });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, status } = req.body;

    const [, result] = await Cars.update(
      {
        name,
        status,
      },
      {
        where: {
          id,
        },
        returning: true,
        limit: 1,
      },
    );

    const [category] = result;

    return res.status(200).json(category);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await Cars.destroy({
      where: { id },
    });

    return res.send(204);
  }
}

export default new CarsController();
