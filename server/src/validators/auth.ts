import * as Joi from "joi";

export const loginValidator = {
  body: Joi.object().keys({
    email: Joi.string().required().max(50),
    password: Joi.string().required().min(8),
  }),
};
