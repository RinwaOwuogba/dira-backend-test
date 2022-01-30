import express from 'express';
import { validationResult } from 'express-validator';
import User from './entity/User';
import { UserType } from './types';
import validator from './validator';

const router = express.Router();

router.post('/waitlister', validator.waitLister, async (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userType, firstname, lastname, email, assetDescription } = req.body;

  try {
    const duplicateUser = await User.findOne({
      where: {
        email,
      },
    });

    if (duplicateUser)
      return res.json({
        status: 'error',
        message: 'Email in use',
      });

    const user = new User();

    // create new user
    user.userType = userType;
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;

    if (userType === UserType.assetLister) {
      user.assetDescription = assetDescription;
    }

    // save the new user
    const result = await user.save();

    return res.json({
      status: 'success',
      waitlister: result,
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
