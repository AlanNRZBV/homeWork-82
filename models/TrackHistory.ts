import mongoose, { model, Types } from 'mongoose';
import User from './User';
import Track from './Track';

const Schema = mongoose.Schema;
const TrackHistorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  trackId: {
    type: Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const track = await Track.findById(value);
        return Boolean(track);
      },
      message: 'Track does not exit',
    },
  },
  datetime: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
});

const TrackHistory = model('TrackHistory', TrackHistorySchema);

export default TrackHistory;
