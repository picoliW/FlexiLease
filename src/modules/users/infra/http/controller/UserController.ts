import { Request, Response } from "express";
import CreateUserService from "@modules/users/services/CreateUserService";
import { container } from "tsyringe";
import ListUserService from "@modules/users/services/ListUserService";
import DeleteUserService from "@modules/users/services/DeleteUserService";
import { ObjectId } from "mongodb";
import ShowOneUserService from "@modules/users/services/ShowOneUserService";
import UpdateUserService from "@modules/users/services/UpdateUserService";
import { ConflictError } from "@shared/errors/ConflictError";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { BadRequestError } from "@shared/errors/BadRequestError";

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute();

    return res.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, birth, email, password, cep, qualified } = request.body;

    const createUser = container.resolve(CreateUserService);

    try {
      const user = await createUser.execute({
        name,
        cpf,
        birth,
        email,
        password,
        cep,
        qualified,
      });

      return response.status(201).json(user);
    } catch (error) {
      if (error instanceof ConflictError) {
        return response.status(409).json({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return response.status(400).json({ message: error.message });
      }
      throw error;
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteUser = container.resolve(DeleteUserService);

    try {
      const objectId = new ObjectId(id);
      await deleteUser.execute({ _id: objectId });
      return res.status(204).json();
    } catch (error) {
      return res.status(404).json({ message: "User not found" });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showUser = container.resolve(ShowOneUserService);
    const objectId = new ObjectId(id);
    const user = await showUser.execute(objectId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, cpf, birth, email, password, cep, qualified } = req.body;
    const updateUserService = container.resolve(UpdateUserService);
    const objectId = new ObjectId(id);

    try {
      const updatedFields = await updateUserService.execute({
        _id: objectId,
        name,
        cpf,
        birth,
        email,
        password,
        cep,
        qualified,
      });

      return res.status(200).json(updatedFields);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof ConflictError) {
        return res.status(409).json({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return res.status(400).json({ message: error.message });
      }
      throw error;
    }
  }
}
