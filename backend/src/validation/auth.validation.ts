import { Joi } from "express-validation";

export const RegisterValidation = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  password_confirm: Joi.string().required(),
});
