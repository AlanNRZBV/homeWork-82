import { Router } from 'express';
import { imagesUpload } from '../multer';
import { AlbumWithTrackCount, IAlbum } from '../types';
import Album from '../models/Album';
import mongoose, { Types } from 'mongoose';
import Artist from '../models/Artist';
import Track from '../models/Track';

const albumsRouter = Router();

albumsRouter.post('/', imagesUpload.single('cover'), async (req, res, next) => {
  try {
    const albumData: IAlbum = {
      title: req.body.title,
      artistId: req.body.artistId,
      releaseDate: req.body.releaseDate,
      cover: req.file ? req.file.filename : null,
    };

    const album = new Album(albumData);
    await album.save();

    return res.send({message: 'Album has been successfully created', album});
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const album = await Album.findById(_id).populate('artistId','_id, name information image');

    if (!album) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(album);
  } catch (e) {
    next(e);
  }
});

albumsRouter.get('/', async (req, res, next) => {
  try {

    if (Object.keys(req.query).length === 0) {
      const albums = await Album.find();
      return res.send(albums);
    }

    const artistId = req.query.artist;
    const albumsByArtist = await Album.find({ artistId: artistId }).populate('artistId', '_id, name').sort({ releaseDate: -1 });
    console.log(albumsByArtist)

    res.send(albumsByArtist);
  } catch (e) {
    next(e);
  }
});

export default albumsRouter;
