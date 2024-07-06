import { Joi, Segments, celebrate } from "celebrate";

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateUser:
 *       type: object
 *       properties:
 *         cpf:
 *           type: string
 *           default: 749.980.580-88
 *         name:
 *           type: string
 *           default: Joaozão Ciclano
 *         birth:
 *           type: string
 *           default: 01/01/2001
 *         email:
 *           type: string
 *           default: joaozao@gmail.com
 *         password:
 *           type: string
 *           default: 123456
 *         cep:
 *           type: string
 *           default: 01153 000
 *         qualified:
 *           type: string
 *           default: não
 *     UpdateUserResponse:
 *       type: object
 *       properties:
 *         cpf:
 *           type: string
 *         name:
 *           type: string
 *         birth:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         cep:
 *           type: string
 *         qualified:
 *           type: string
 *
 */
export const UpdateUserSchema = celebrate({
  [Segments.BODY]: {
    cpf: Joi.string(),
    name: Joi.string(),
    birth: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    cep: Joi.string(),
    qualified: Joi.string().valid("sim", "não"),
  },
});
