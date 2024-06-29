import User from "@modules/users/infra/typeorm/entities/User";
import { ICreateUser } from "../models/ICreateUser";
import { ObjectId } from "mongodb";

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
  remove(user: User): Promise<void>;
  findById(id: ObjectId): Promise<User | null>;
}
