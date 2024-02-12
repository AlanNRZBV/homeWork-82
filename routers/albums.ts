import { Router } from 'express';
import { imagesUpload } from '../multer';
import { IAlbum } from '../types';
import Album from '../models/Album';
import mongoose, { Types } from 'mongoose';
import Artist from '../models/Artist';

const albumsRouter = Router();

export default albumsRouter

albumsRouter.post('/', imagesUpload.single('cover'), async(req, res,next)=>{
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

albumsRouter.get('/:id',async(req, res, next)=>{
  try{
    let _id: Types.ObjectId;
    let infoArray=[]
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({error: 'Wrong ObjectId!'});
    }

    const album = await Album.findById(_id);

    if (!album) {
      return res.status(404).send({error: 'Not found!'});
    }
    infoArray.push(album)

    const artistId = album.artistId.toString()

    const artistInfo = await Artist.findById(artistId)

    if(artistInfo !== undefined){
      infoArray.push(artistInfo)
    }
    res.send(infoArray);
  }catch (e){
    next(e)
  }
})

albumsRouter.get ('/', async(req, res, next)=>{
  try{
    if(Object.keys(req.query).length === 0){
    const albums = await Album.find()
    return res.send(albums)
    }

    const artistId = req.query.artist

    const albumsByArtist = await Album.find({artistId: artistId})

    res.send(albumsByArtist)
  }catch (e) {
    next(e)
  }
})
