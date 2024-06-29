import { Joi, celebrate } from "celebrate";

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
