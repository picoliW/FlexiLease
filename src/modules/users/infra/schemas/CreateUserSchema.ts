import { Joi, Segments, celebrate } from "celebrate";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       required:
 *         - name
 *         - cpf
 *         - birth
 *         - email
 *         - password
 *         - cep
 *         - qualified
 *       properties:
 *         name:
 *           type: string
 *           default: Joãozinho Ciclano
 *         cpf:
 *           type: string
 *           default: 131-147-860-49
 *         birth:
 *           type: string
 *           default: 03/03/2000
 *         email:
 *           type: string
 *           default: joaozinho@email.com
 *         password:
 *           type: string
 *           default: 123456
 *         cep:
 *           type: string
 *           default: 97707598
 *         qualified:
 *           type: string
 *           default: sim
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         cpf:
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
 *         patio:
 *           type: string
 *         complement:
 *           type: string
 *         neighborhood:
 *           type: string
 *         locality:
 *           type: string
 *         uf:
 *           type: string
 *         _id:
 *           type: string
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           default: joaozinho@email.com
 *         password:
 *           type: string
 *           default: 123456
 *     LoginUserResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 */

export const CreateUserSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    cpf: Joi.required(),
    birth: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    cep: Joi.string()
      .regex(/^\d{5}-?\d{3}$/)
      .required(),
    qualified: Joi.string().valid("sim", "não").required(),
  },
});
