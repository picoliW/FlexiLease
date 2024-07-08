import { Joi, celebrate } from "celebrate";

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateCar:
 *       type: object
 *       properties:
 *         model:
 *           type: string
 *           default: Updated Model
 *         color:
 *           type: string
 *           default: Black
 *         year:
 *           type: string
 *           default: "1999"
 *         value_per_day:
 *           type: number
 *           default: 100
 *         number_of_passengers:
 *           type: number
 *           default: 7
 *     UpdateAccessories:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           default: Updated Accessory
 */

export const UpdateCarSchema = celebrate({
  body: {
    model: Joi.string(),
    color: Joi.string(),
    year: Joi.string(),
    value_per_day: Joi.number(),
    accessories: Joi.array()
      .items(
        Joi.object().keys({
          description: Joi.string().required(),
        }),
      )
      .min(1)
      .unique((a, b) => a.description === b.description),
    number_of_passengers: Joi.number(),
  },
});
