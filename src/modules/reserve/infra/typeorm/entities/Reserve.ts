import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("reserves")
class Reserve {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id_reserve: string;

  @Column()
  id_user: string;

  @Column()
  start_date: string;

  @Column()
  end_date: string;

  @Column()
  id_car: string;

  @Column()
  final_value: string;
}

export default Reserve;
