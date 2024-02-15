import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const usersRouter = Router();

usersRouter.post('/', async(req, res, next)=>{
  try{
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })
    user.generateToken();
    await user.save()

    res.send(user)
  }catch (e) {
    next(e)
    if (e instanceof mongoose.Error.ValidationError){
      return res.status(422).send(e)
    }
  }
})

export default usersRouter