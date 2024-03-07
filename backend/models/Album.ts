import { model, Schema, Types } from 'mongoose';
import Artist from './Artist';

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artistId: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist does not exist!',
    },
  },
  releaseDate: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
  },isPublished:{
    type:Boolean,
    required:true,
    default:false
  }
});

const Album = model('Album', AlbumSchema);

export default Album;
