import User from '../model/user';
import bcrypt from 'bcrypt';
import express from 'express';
import { userSchema } from '../middleware/validation';

export async function createUser(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  try {
    const validation = userSchema.validate(req.body);
    if (validation.error) {
      console.log(validation.error);
      //return res.send('Validation error', errors.array())
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.send({ success: true, message: 'User already exists' });
    } else {
      const userPasswd = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: userPasswd,
        confirmPasword: userPasswd,
      });
      await newUser.save();
      res.send({ success: true, data: newUser });
    }
  } catch (e) {
    res.send({ success: false, msg: (e as Error).message });
  }
}
