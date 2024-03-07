import { Router } from 'express';
import Artist from '../models/Artist';
import { IArtist } from '../types';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import Track from '../models/Track';
import Album from '../models/Album';
import tracksRouter from './tracks';

const artistsRouter = Router();

export default artistsRouter;

artistsRouter.get('/', async (_req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    next(e);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req:RequestWithUser, res, next) => {
  try {
    const artistData: IArtist = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      information: req.body.information,
    };

    const artist = new Artist(artistData);
    await artist.save();

    res.send('Artist has been successfully created');
  } catch (e) {
    next(e);
  }
});
artistsRouter.delete('/:id', auth,permit('admin'),async(req:RequestWithUser,res,next)=>{
  if(req.user && req.user.role !== 'admin'){
    return res.status(403).send({error:'not authorized'})
  }
  try {
    const artistId = req.params.id
    const artistCheck = await Artist.findById(artistId)
    if(!artistCheck){
      return res.send({error:'No artist found'})
    }
    await Artist.deleteOne({_id:artistId})
    return res.send({message:'Artist successfully deleted'})
  }catch (e) {
    next(e)
  }
})
