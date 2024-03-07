import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../Users/usersSlice.ts';

interface Props {
  _id: string;
  title: string;
  duration: string;
}

const CustomListItem: FC<Props> = ({ title, duration, _id }) => {
  const user = useAppSelector(selectUser);

  const clickHandler = () => {
    console.log(_id);
    console.log(user)
  };

  return (
    <li style={{ display: 'flex', alignItems:'center', justifyContent:'space-between' }}>
      <IconButton
        onClick={clickHandler}
        aria-label="delete"
        disabled={user === null}
      >
        <PlayArrowIcon />
      </IconButton>
      <Box display="flex" alignItems="center" sx={{flexGrow:'1'}}>
        <Typography  sx={{marginRight:"auto"}}>{title}</Typography>
        <Typography variant="body2" color="grey" ml={2} mr={2}>{duration}</Typography>
      </Box>
    </li>
  );
};

export default CustomListItem;
