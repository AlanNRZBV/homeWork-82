import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchTrackHistory } from './tracksHistorythunks.ts';
import { historyState, trackHistoryLoading } from './tracksHistorySlice.ts';
import { Box, CircularProgress, Typography } from '@mui/material';
import TracksHistoryItem from './components/TracksHistoryItem.tsx';
import { selectUser } from '../Users/usersSlice.ts';

const TracksHistory = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(historyState);
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(trackHistoryLoading);

  useEffect(() => {
    dispatch(fetchTrackHistory());
  }, [dispatch]);

  console.log('history ', history);
  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {history.length === 0 ? (
            <></>
          ) : (
            <Box>
              <Typography
                variant="h6"
                mb={2}
                sx={{ borderBottom: '1px solid grey' }}
              >
                {user?.username} track history
              </Typography>
              <ul style={{ padding: '0', marginTop: '0' }}>
                {history.map((item) => (
                  <TracksHistoryItem
                    trackId={item.trackId}
                    datetime={item.datetime}
                    key={item._id}
                  />
                ))}
              </ul>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default TracksHistory;
