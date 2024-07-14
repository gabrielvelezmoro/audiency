import { Request, Response } from 'express';
import Cars from '@app/app/models/cars';
import CarTypes from '@app/app/models/carTypes';
import CarPart from '@app/app/models/carPart';
import { AppError } from '@app/errors/app-error';
import { CarMaintenances } from '@app/app/models/carManteinence';

import mongoose from 'mongoose';
class CarsController {
  public async get(req: Request, res: Response) {
    const { id } = req.params;

    const car = await Cars.findOne({
      where: { id },
    });

    const carTypes = await CarTypes.findOne({
      where: { id: car.carTypeId },
    });

    return res.json({
      data: {
        id: car.id,
        description: car.description,
        carType: carTypes.description,
      },
    });
  }

  async store(req: Request, res: Response) {
    try {
      mongoose.connect('mongodb://gabriel:root@127.0.0.1:27017', {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });

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

      parts.forEach(async (part: number) => {
        await CarPart.create({
          carId: car.dataValues.id,
          partId: part,
        });
      });

      //Registro no mongo
      const date = new Date();
      console.log(date);
      const carMaintenances = new CarMaintenances({
        action: `Criou um o carro com id de ${car.dataValues.id} `,
        carId: car.dataValues.id,
        carTypeId: type,
        createdAt: date,
      });
      carMaintenances.save();

      return res.status(201).json(car);
    } catch (error) {
      return res.sendError(error, 500);
    }
  }

  async index(req: Request, res: Response) {
    let { rows } = await Cars.findAndCountAll();

    for (let index = 0; index < rows.length; index++) {
      await CarTypes.findOne({
        where: { id: rows[index].carTypeId },
      }).then(result => {
        rows[index].dataValues.typeDescription = result.description;
      });
    }

    return res.json({
      data: rows,
    });
  }

  async update(req: Request, res: Response) {
    mongoose.connect('mongodb://gabriel:root@127.0.0.1:27017', {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const { id } = req.params;
    const { description, type, parts } = req.body;

    const carTypes = await CarTypes.findOne({
      where: { id: type },
    });

    if (!carTypes) {
      throw new AppError('Tipo de carro não encontrado', 404);
    }

    const car = await Cars.update(
      {
        description,
        carType: type,
      },
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    CarPart.destroy({ where: { carId: id } });

    parts.forEach(async (part: number) => {
      await CarPart.create({
        carId: id,
        partId: part,
      });
    });

    //Registro no mongo
    const date = new Date();
    const carMaintenances = new CarMaintenances({
      action: `Atualizou o carro com id de ${id} `,
      carId: id,
      createdAt: date,
    });
    carMaintenances.save();

    return res.status(200).json(car);
  }

  async delete(req: Request, res: Response) {
    mongoose.connect('mongodb://gabriel:root@127.0.0.1:27017', {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const { id } = req.params;

    await Cars.destroy({
      where: { id },
    });

    //Registro no mongo
    const date = new Date();
    const carMaintenances = new CarMaintenances({
      action: `Deletou o carro com id de ${id} `,
      carId: id,
      createdAt: date,
    });
    carMaintenances.save();

    return res.send(204);
  }
}

export default new CarsController();
