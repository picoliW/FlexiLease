import { Joi, celebrate } from "celebrate";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateCar:
 *       type: object
 *       required:
 *         - model
 *         - color
 *         - year
 *         - value_per_day
 *         - accessories
 *         - number_of_passengers
 *       properties:
 *         model:
 *           type: string
 *           default: GM S10 2.8
 *         color:
 *           type: string
 *           default: White
 *         year:
 *           type: string
 *           default: "2021"
 *         value_per_day:
 *           type: number
 *           default: 50
 *         accessories:
 *           type: array
 *           default:
 *             - { description: "Air conditioner" }
 *             - { description: "4x4 traction" }
 *             - { description: "4 ports" }
 *           items:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *             required:
 *               - description
 *           minItems: 1
 *           uniqueItems: true
 *         number_of_passengers:
 *           type: number
 *           default: 5
 *     CreateCarResponse:
 *       type: object
 *       properties:
 *         model:
 *           type: string
 *         color:
 *           type: string
 *         year:
 *           type: string
 *         value_per_day:
 *           type: number
 *         accessories:
 *           type: array
 *           items:
 *             type: object
 *         number_of_passengers:
 *           type: number
 *         _id:
 *           type: string
 *
 */

export const CreateCarSchema = celebrate({
  body: {
    model: Joi.string().required(),
    color: Joi.string().required(),
    year: Joi.string().required(),
    value_per_day: Joi.number().required(),
    accessories: Joi.array()
      .items(
        Joi.object().keys({
          description: Joi.string().required(),
        }),
      )
      .min(1)
      .unique((a, b) => a.description === b.description)
      .required(),
    number_of_passengers: Joi.number().required(),
  },
});
