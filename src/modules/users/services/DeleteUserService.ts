import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ObjectId } from "mongodb";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IDeleteUser } from "../domain/models/IDeleteUser";

@injectable()
class DeleteUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ _id }: IDeleteUser): Promise<void> {
    try {
      const car = await this.userRepository.findById(new ObjectId(_id));

      if (!car) {
        throw new NotFoundError("User not found");
      }

      await this.userRepository.remove(car);
    } catch (error) {
      throw error;
    }
  }
}

export default DeleteUserService;
