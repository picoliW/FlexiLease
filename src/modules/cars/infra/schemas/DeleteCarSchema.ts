const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

export const DeleteCarSchema = Joi.object({
  id: Joi.objectId(),
});
