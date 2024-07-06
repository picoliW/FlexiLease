const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateReserve:
 *       type: object
 *       required:
 *         - id_user
 *         - start_date
 *         - end_date
 *         - id_car
 *       properties:
 *         id_user:
 *           type: string
 *         start_date:
 *           type: string
 *           default: 01/01/2023
 *         end_date:
 *           type: string
 *           default: 05/01/2023
 *         id_car:
 *           type: string
 *     CreateReserveResponse:
 *       type: object
 *       properties:
 *         id_user:
 *           type: string
 *         start_date:
 *           type: string
 *         end_date:
 *           type: string
 *         id_car:
 *           type: string
 *         final_value:
 *           type: number
 *         _id:
 *           type: string
 */

export const CreateReserveSchema = Joi.object({
  id_user: Joi.objectId().required(),
  start_date: Joi.string().required(),
  end_date: Joi.string().required(),
  id_car: Joi.objectId().required(),
});
