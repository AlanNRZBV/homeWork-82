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

    if ('album' in req.query) {
      const value = req.query.album;
      const tracksByAlbum = await Track.find({ albumId: value });
      return res.send(tracksByAlbum);
    } else if ('artist' in req.query) {
      const value = req.query.artist;

      const albumsByArtist = await Album.find({ artistId: value });

      const tracksByArtist = [];

      for (const album of albumsByArtist) {
        const tracks = await Track.find({ albumId: album._id });
        tracksByArtist.push(...tracks);
      }

      return res.send(tracksByArtist);
    }

    res.send('Something went wrong without an error');
  } catch (e) {
    next(e);
  }
});

export default tracksRouter;
