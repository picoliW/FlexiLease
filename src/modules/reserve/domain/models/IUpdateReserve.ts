import { ObjectId } from "mongodb";

export interface IUpdateReserve {
  _id: ObjectId;
  id_user?: string;
  start_date?: string;
  end_date?: string;
  id_car?: string;
  final_value?: string;
}
