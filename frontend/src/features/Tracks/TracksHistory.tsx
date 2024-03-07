import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchTrackHistory } from './tracksHistorythunks.ts';
import { historyState, trackHistoryLoading } from './tracksHistorySlice.ts';
import { selectUser } from '../Users/usersSlice.ts';
import CustomListItem from '../AlbumsOld/CustomListItem.tsx';
import { List } from '@mui/material';

const TracksHistory = () => {

  const dispatch = useAppDispatch()
  const history = useAppSelector(historyState)
  const isLoading = useAppSelector(trackHistoryLoading)

  const user = useAppSelector(selectUser)


  console.log(history)

  useEffect(() => {
    if(user){
    dispatch(fetchTrackHistory(user?.token))
    }
  }, [dispatch, user]);

  return (
    <>
      {/*<List>*/}
      {/*  {history.map((item) => (*/}
      {/*    <CustomListItem title={item.title} key={item._id}  />*/}
      {/*  ))}*/}
      {/*</List>*/}
    </>
  );
};

export default TracksHistory;