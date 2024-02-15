import { model, Schema } from 'mongoose';
import { ArtistFields } from '../types';

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  information: {
    type: String,
    required: false,
  },
});

const Artist = model('Artist', ArtistSchema);

export default Artist;
