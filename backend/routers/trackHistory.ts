import { Router } from 'express';
import TrackHistory from '../models/TrackHistory';
import Track from '../models/Track';
import auth, { RequestWithUser } from '../middleware/auth';

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const trackId = req.body.trackId;
    const trackCheck = await Track.findById(trackId);

    if (!trackCheck) {
      return res.status(401).send({ error: `No track with id: ${req.body.trackId}` });
    }

    const trackHistoryData = {
      userId: req.user?._id,
      trackId: trackId,
    };

    const trackHistory = new TrackHistory(trackHistoryData);
    await trackHistory.save();

    return res.send(trackHistory);
  } catch (e) {
    next(e);
  }
});

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;
    const historyByUser = await TrackHistory.find({ userId: user?.id })
      .populate([
        { path: 'trackId', select: '_id, title' },
        { path: 'userId', select: '-_id, username' },
      ])
      .sort({ datetime: -1 });
    return res.send(historyByUser);
  } catch (e) {
    next(e);
  }
});

export default trackHistoryRouter;
