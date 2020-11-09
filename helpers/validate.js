const Joi = require("joi");

const validateRegister = (data) => {
  const schema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
    cohort: Joi.number().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().required().min(6),
    password: Joi.string().required().min(6),
  });

  return schema.validate(data);
};

const validateProject = (data) => {
  const schema = Joi.object().keys({
    user_id: Joi.string().required(),
    title: Joi.string().required(),
    start_date: Joi.date().required(),
  });

  return schema.validate(data)
};

module.exports = { validateProject, validateRegister, validateLogin };