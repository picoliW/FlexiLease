import { Joi, Segments, celebrate } from "celebrate";

export const UpdateUserSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    birth: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    cep: Joi.string(),
    qualified: Joi.string().valid("sim", "não"),
  },
});
