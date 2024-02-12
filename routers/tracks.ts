import { Router } from 'express';
import { ITrack } from '../types';
import Track from '../models/Track';
import mongoose from 'mongoose';
import track from '../models/Track';
import Album from '../models/Album';

const tracksRouter = Router();

tracksRouter.post('/', async (req, res, next) => {
  try {
    const trackData: ITrack = {
      title: req.body.title,
      albumId: req.body.albumId,
      duration: req.body.duration,
    };

    const track = new Track(trackData);
    await track.save();

    res.send('Track has been successfully created');
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

tracksRouter.get('/', async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const tracks = await Track.find();
      return res.send(tracks);
    }
    const albumId = req.query.album;
    const tracksByAlbum = await Track.find({ albumId: albumId });

    res.send(tracksByAlbum);
  } catch (e) {
    next(e);
  }
});

export default tracksRouter;
