import { Router } from 'express';
import { imagesUpload } from '../multer';
import { IAlbum } from '../types';
import Album from '../models/Album';
import mongoose from 'mongoose';

const albumsRouter = Router()

export default albumsRouter

albumsRouter.post('/', imagesUpload.single('image'), async(req, res,next)=>{
  try{
    const albumData: IAlbum = {
      title: req.body.title,
      artistId: req.body.artistId,
      releaseDate: req.body.releaseDate,
      cover: req.file ? req.file.filename : null
    }

    const album = new Album(albumData);
    await album.save()

    res.send('Album has been successfully created')
  }catch (e){
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e)
  }
})