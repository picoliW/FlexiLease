const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

export const UpdateReserveSchema = Joi.object({
  id_user: Joi.objectId(),
  start_date: Joi.string(),
  end_date: Joi.string(),
  id_car: Joi.objectId(),
});
