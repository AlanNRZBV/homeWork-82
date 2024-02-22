import { model, Schema } from 'mongoose';

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  information: {
    type: String,
  },
});

const Artist = model('Artist', ArtistSchema);

export default Artist;
