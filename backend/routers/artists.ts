import { Router } from 'express';
import Artist from '../models/Artist';
import { IArtist } from '../types';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';

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
