import { Router } from 'express';
import { ITrack } from '../types';
import Track from '../models/Track';
import mongoose from 'mongoose';
import track from '../models/Track';

const tracksRouter = Router();


tracksRouter.post('/', async (req, res,next)=>{
  try{

    const trackData: ITrack = {
      title: req.body.title,
      albumId: req.body.albumId,
      duration: req.body.duration
    }

    const track = new Track(trackData);
    await track.save()

    res.send('Track has been successfully created')

  }catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e)
  }
})

tracksRouter.get('/', async (req, res,next)=>{
  try {
    const tracks = await Track.find()

    res.send(tracks)
  }catch (e) {
    next(e)
  }
})


export default tracksRouter