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
  isPublished:{
    type:Boolean,
    required:true,
    default:false
  }
});

const Artist = model('Artist', ArtistSchema);

export default Artist;
