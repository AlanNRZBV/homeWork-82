import { Router } from 'express';
import { ITrack } from '../types';
import Track from '../models/Track';
import mongoose from 'mongoose';
import track from '../models/Track';
import Album from '../models/Album';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import albumsRouter from './albums';

const tracksRouter = Router();

tracksRouter.post('/new',auth, async (req, res, next) => {
  try {
    const trackData: ITrack = {
      title: req.body.title,
      albumId: req.body.albumId,
      duration: req.body.duration,
      position: req.body.position
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
      const tracksByAlbum = await Track.find({ albumId: value }).sort({ position: 1 });
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

tracksRouter.delete('/:id', auth,permit('admin'),async(req:RequestWithUser,res,next)=>{
  if(req.user && req.user.role !== 'admin'){
    return res.status(403).send({error:'not authorized'})
  }

  try {
    const trackId = req.params.id
    const trackCheck = await Track.findById(trackId)
    if(!trackCheck){
      return res.send({error:'No track found'})
    }
    await Track.deleteOne({_id:trackId})
    return res.send({message:'Track successfully deleted'})
  }catch (e) {
    next(e)
  }
})
tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  if (req.user && req.user.role !== 'admin') {
    return res.status(403).send({ error: 'not authorized' });
  }
  try {
    const trackId = req.params.id;
    const trackCheck = await Track.findById(trackId);
    if (!trackCheck) {
      return res.send({ error: 'No artist found' });
    }

    const artistToBePublished = await Track.findOneAndUpdate({ _id: trackId }, { isPublished: !trackCheck.isPublished }, { new: true });
    return res.send(artistToBePublished)
  } catch (e) {
    next(e);
  }
});

export default tracksRouter;
