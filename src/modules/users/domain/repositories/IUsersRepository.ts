import User from "@modules/users/infra/typeorm/entities/User";
import { ICreateUser } from "../models/ICreateUser";

export interface IUsersRepository {
  create({
    name,
    cpf,
    birth,
    email,
    password,
    cep,
    qualified,
  }: ICreateUser): Promise<User>;
  save(user: User): Promise<User>;
  find(): Promise<User[]>;
}
