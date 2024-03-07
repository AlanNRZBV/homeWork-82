import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchTrackHistory } from './tracksHistorythunks.ts';
import { historyState, trackHistoryLoading } from './tracksHistorySlice.ts';
import { Box, CircularProgress, Typography } from '@mui/material';
import CustomListItem from '../../components/CustomListItem/CustomListItem.tsx';

const TracksHistory = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(historyState);
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
          {history.length === 0 ? (<></>) : (
          <Box>
          <Typography variant="h6" mb={2} sx={{borderBottom:'1px solid grey'}}>{history[0].userId.username} track history</Typography>
          <ul style={{ padding: '0', marginTop: '0' }}>
              {history.map((item) => (
                <CustomListItem
                  title={item.trackId.title}
                  createdAt={item.datetime}
                  key={item._id}
                  _id={item._id}
                />
              ))
            }
          </ul>
          </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default TracksHistory;
