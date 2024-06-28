import { Joi, celebrate } from "celebrate";

export const createCarSchema = celebrate({
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
