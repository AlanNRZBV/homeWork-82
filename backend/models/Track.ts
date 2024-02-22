import { model, Schema, Types } from 'mongoose';
import Album from './Album';

const TrackSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  albumId: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: 'Album does not exist!',
    },
  },
  duration: {
    type: String,
  },
  position:{
    type: Number,
    required: true
  }
});

const Track = model('Track', TrackSchema);

export default Track;