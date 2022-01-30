import { body } from 'express-validator';
import { UserType } from './types';

const userTypes = [UserType.assetLister, UserType.investor];

const waitLister = [
  body('userType')
    .custom((value) => userTypes.includes(value))
    .withMessage(`field must contain one of ${userTypes.toString()}`),
  body('firstname', 'field is required').notEmpty(),
  body('lastname', 'field is required').notEmpty(),
  body('email', 'field should contain an email').isEmail(),
  body('assetDescription', 'field is required').custom((value, { req }) => {
    if (req.body.userType === 'investor') return true;

    return !!value;
  }),
];

export default {
  waitLister,
};
