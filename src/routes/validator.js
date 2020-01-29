const joi = require('@hapi/joi');

const signupSchema = joi.object().keys({
  name: joi
    .string()
    .trim()
    .max(25)
    .required(),
  email: joi
    .string()
    .trim()
    .email()
    .required(),
  password: joi
    .string()
    .trim()
    .regex(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/)
    .required()
    .error(Error('Password should contain at least one uppercase, lowercase and integer')),
});

const loginSchema = joi.object().keys({
  email: joi
    .string()
    .trim()
    .email()
    .required(),
  password: joi
    .string()
    .trim()
    .required(),
});

const articleSchema = joi.object().keys({
  title: joi
    .string()
    .trim()
    .max(150)
    .required(),

  content: joi
    .string()
    .trim()
    .max(700)
    .required(),
  tags: joi
    .array()
    .items(
      joi.string().trim().max(20),
    )
    .max(10),
  category: joi
    .string()
    .trim()
    .valid('something', 'else', 'js', 'node.js', 'category', 'anything'),
});

module.exports = {
  signupSchema,
  loginSchema,
  articleSchema,
};
