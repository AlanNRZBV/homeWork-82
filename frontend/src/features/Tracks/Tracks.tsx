import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { isTracksLoading, tracksState } from './tracksSlice.ts';
import { CircularProgress } from '@mui/material';
import { fetchTracksByAlbum } from './tracksThunks.ts';
import TracksItem from './components/TracksItem.tsx';

interface Props {
  albumId: string;
}
const Tracks: FC<Props> = ({ albumId }) => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(tracksState);
  const isLoading = useAppSelector(isTracksLoading);

  useEffect(() => {
    dispatch(fetchTracksByAlbum(albumId));
  }, [albumId, dispatch]);

  return (
    <ul style={{ padding: '0', marginTop: '0' }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        tracks.map((item) => (
          <TracksItem
            _id={item._id}
            title={item.title}
            duration={item.duration}
            isPublished={item.isPublished}
            key={item._id}
          />
        ))
      )}
    </ul>
  );
};

export default Tracks;
