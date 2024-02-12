import { model, Schema, Types } from 'mongoose';
import Artist from './Artist';

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  artistId:{
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value)
        return Boolean(artist);
      },
      message: 'Category does not exist!',
    }
  },
  releaseDate: {
    type:String,
    required: true
  },
  cover:{
    type: String,
    required: false
  }
})

const Album= model('Album', AlbumSchema)

export default Album