import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import CreateUserService from "@modules/users/services/CreateUserService";
import { container } from "tsyringe";
import ListUserService from "@modules/users/services/ListUserService";
import DeleteUserService from "@modules/users/services/DeleteUserService";
import { ObjectId } from "mongodb";
import ShowOneUserService from "@modules/users/services/ShowOneUserService";

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute();

    return res.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, birth, email, password, cep, qualified } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      cpf,
      birth,
      email,
      password,
      cep,
      qualified,
    });

    return response.json(instanceToInstance(user));
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
    const car = await showUser.execute(objectId);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    return res.json(instanceToInstance(car));
  }
}
