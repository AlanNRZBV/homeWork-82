import { Router } from 'express';
import User from '../models/User';
import TrackHistory from '../models/TrackHistory';
import Track from '../models/Track';

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    if (!headerValue) {
      return res.status(401).send({ error: 'No authorization header present' });
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.status(401).send({ error: 'No token present!' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).send({ error: 'Wrong token!' });
    }

    const trackId = req.body.trackId;
    const trackCheck = await Track.findById(trackId);

    if (!trackCheck) {
      return res.status(401).send({ error: `No track with id: ${req.body.trackId}` });
    }

    const trackHistoryData = {
      userId: user._id,
      trackId: trackId,
    };

    const trackHistory = new TrackHistory(trackHistoryData);
    await trackHistory.save();

    return res.send({ message: 'OK!' });
  } catch (e) {
    next(e);
  }
});
export default trackHistoryRouter;
