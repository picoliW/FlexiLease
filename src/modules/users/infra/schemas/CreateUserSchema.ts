import { Joi, Segments, celebrate } from "celebrate";

export const CreateUserSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    cpf: Joi.required(),
    birth: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    cep: Joi.string().required(),
    qualified: Joi.string().valid("sim", "não").required(),
  },
});
