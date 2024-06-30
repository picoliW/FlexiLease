const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

export const CreateReserveSchema = Joi.object({
  id_user: Joi.objectId().required(),
  start_date: Joi.string().required(),
  end_date: Joi.string().required(),
  id_car: Joi.objectId().required(),
});
