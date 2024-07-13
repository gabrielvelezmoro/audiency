import { Request, Response } from 'express';
import Part from '@app/app/models/part';
import { AppError } from '@app/errors/app-error';

class PartController {
  async index(req: Request, res: Response) {
    const parts = await Part.findAndCountAll({
      order: ['description'],
    });

    return res.json({
      data: parts.rows,
    });
  }

  async store(req: Request, res: Response) {
    try {
      const { description } = req.body;

      const parts = await Part.create({
        description,
      });

      return res.status(201).json(parts);
    } catch (error) {
      console.log(error);
      throw new AppError(error);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { description } = req.body;

    const part = await Part.update(
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

    console.log(part);

    return res.status(200).json(part);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await Part.destroy({
      where: { id },
    });

    return res.send(204);
  }
}

export default new PartController();
