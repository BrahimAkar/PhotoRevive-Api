import Joi from 'joi';

const get = Joi.object({
  // accept any query string
});

const create = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

const update = Joi.object({
  title: Joi.string(),
  body: Joi.string(),
});

export default {
  create,
  update,
  get,
};
