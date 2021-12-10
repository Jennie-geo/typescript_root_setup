import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  confirmPassword: Joi.ref('password'),
});
