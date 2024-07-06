import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateReserveService from "@modules/reserve/services/CreateReserveService";
import { ConflictError } from "@shared/errors/ConflictError";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { BadRequestError } from "@shared/errors/BadRequestError";
import ListReserveService from "@modules/reserve/services/ListReserveService";
import ShowOneReserveService from "@modules/reserve/services/ShowOneReserveService";
import { ObjectId } from "mongodb";
import UpdateReserveService from "@modules/reserve/services/UpdateReserveService";
import DeleteReserveService from "@modules/reserve/services/DeleteReserveService";

export default class ReserveController {
  public async index(req: Request, res: Response): Promise<Response> {
    let { page = 1, limit = 100, ...filters } = req.query;
    page = Number(page);
    limit = Number(limit);

    const offset = (page - 1) * limit;

    const listReserve = container.resolve(ListReserveService);
    const { reserves, total } = await listReserve.execute({
      limit,
      offset,
      filters,
    });

    const totalPages = Math.ceil(total / limit);

    return res.json({
      reserves: JSON.parse(JSON.stringify(reserves)),
      total,
      limit,
      offset: page,
      offsets: totalPages,
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { id_user, start_date, end_date, id_car } = request.body;

      const createReserve = container.resolve(CreateReserveService);

      const reserve = await createReserve.execute({
        id_user,
        start_date,
        end_date,
        id_car,
      });

      return response.status(201).json(reserve);
    } catch (error) {
      if (error instanceof ConflictError) {
        return response.status(409).json({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return response.status(400).json({ message: error.message });
      } else if (error instanceof NotFoundError) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const showReserve = container.resolve(ShowOneReserveService);
      const objectId = new ObjectId(id);
      const reserve = await showReserve.execute(objectId);

      return res.json(reserve);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { id_user, start_date, end_date, id_car } = req.body;
      const updateReserve = container.resolve(UpdateReserveService);
      const objectId = new ObjectId(id);
      const reserve = await updateReserve.execute({
        _id: objectId,
        id_user,
        start_date,
        end_date,
        id_car,
      });

      return res.status(200).json(reserve);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteReserve = container.resolve(DeleteReserveService);

    try {
      const objectId = new ObjectId(id);
      await deleteReserve.execute({ _id: objectId });
      return res.status(204).json();
    } catch (error) {
      return res.status(404).json({ message: "Reserve not found" });
    }
  }
}
