import  { FC } from 'react';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../Users/usersSlice.ts';


interface Props {
  title: string,
}

const CustomListItem: FC<Props> = ({title}) => {

  const user = useAppSelector(selectUser);

  const clickHandler = ()=>{
    console.log('test')
  }
  return (
// TODO avoid using secondaryAction => bad UX
    <ListItem secondaryAction={
      user ? (

      <IconButton onClick={clickHandler} edge="end" aria-label="delete">
        <PlayArrowIcon />
      </IconButton>
        ) : (<></>)
    }>

      <ListItemText primary={title}  />
    </ListItem>
  );
};

export default CustomListItem;