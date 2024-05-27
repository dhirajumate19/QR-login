import Joi from "joi";

const userValidation = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .messages({
      "string.pattern.base": "Invalid phone number",
    }),
});
export const validateUser = (req, res, next) => {
  const { error } = userValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors });
  }

  next();
};
