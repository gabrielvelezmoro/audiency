import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Cars from '@app/app/models/cars';

class CategoryController {
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

    // console.log('categories', categories);

    // return res.json(categories);
    const lastPage = Math.ceil(categories.count / perPage);

    return res.json({
      total: categories.count,
      perPage,
      lastPage,
      page,
      data: categories.rows,
    });
  }

  async store(req: Request, res: Response) {
    try {
      const store_id = req.storeId;
      const { name, status } = req.body;

      const category = await Cars.create({
        name,
        store_id,
        status,
      });

      return res.status(201).json(category);
    } catch (error) {
      return res.sendError(error, 500);
    }
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

export default new CategoryController();
