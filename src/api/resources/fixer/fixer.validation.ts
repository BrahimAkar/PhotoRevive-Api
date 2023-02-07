import Joi from 'joi';

const fixOldImage = Joi.object({
  oldImageURL: Joi.string().required(),
});

export default {
  fixOldImage,
};
