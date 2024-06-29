import { Column, Entity, ObjectIdColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { ObjectId } from "mongodb";

@Entity("users")
class User {
  @ObjectIdColumn()
  @Exclude()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  birth: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cep: string;

  @Column()
  qualified: string;
}

export default User;
