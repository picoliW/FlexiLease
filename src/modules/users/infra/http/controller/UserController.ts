import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import CreateUserService from "@modules/users/services/CreateUserService";
import { container } from "tsyringe";

export default class UsersController {
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
}
