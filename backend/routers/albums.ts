import { Router } from 'express';
import { imagesUpload } from '../multer';
import { AlbumWithTrackCount, IAlbum } from '../types';
import Album from '../models/Album';
import mongoose, { Types } from 'mongoose';
import Artist from '../models/Artist';
import Track from '../models/Track';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import artistsRouter from './artists';

const albumsRouter = Router();

albumsRouter.post('/new', auth, imagesUpload.single('cover'), async (req, res, next) => {
  try {
    const albumData: IAlbum = {
      title: req.body.title,
      artistId: req.body.artistId,
      releaseDate: parseInt(req.body.releaseDate.slice(0, 4)),
      cover: req.file ? req.file.filename : null,
    };

    const album = new Album(albumData);
    await album.save();

    return res.send({ message: 'Album has been successfully created', album });
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

    const album = await Album.findById(_id).populate({ path: 'artistId', select: '-_id, name' });

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
    const albumsByArtist = await Album.find({ artistId: artistId })
      .populate('artistId', '_id, name')
      .sort({ releaseDate: -1 });

    res.send(albumsByArtist);
  } catch (e) {
    next(e);
  }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  if (req.user && req.user.role !== 'admin') {
    return res.status(403).send({ error: 'not authorized' });
  }

  try {
    const albumId = req.params.id;
    const albumCheck = await Album.findById(albumId);
    if (!albumCheck) {
      return res.send({ error: 'No album found' });
    }
    await Album.deleteOne({ _id: albumId });
    return res.send({ message: 'Album successfully deleted' });
  } catch (e) {
    next(e);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  if (req.user && req.user.role !== 'admin') {
    return res.status(403).send({ error: 'not authorized' });
  }
  try {
    const albumId = req.params.id;
    const albumCheck = await Album.findById(albumId);
    if (!albumCheck) {
      return res.send({ error: 'No artist found' });
    }

    const artistToBePublished = await Album.findOneAndUpdate(
      { _id: albumId },
      { isPublished: !albumCheck.isPublished },
      { new: true },
    );
    return res.send(artistToBePublished);
  } catch (e) {
    next(e);
  }
});
export default albumsRouter;
