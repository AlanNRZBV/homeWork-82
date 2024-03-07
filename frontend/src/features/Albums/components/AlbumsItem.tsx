import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Album } from '../../../types';
import { FC } from 'react';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { apiURL } from '../../../constants.ts';

const AlbumsItem: FC<Album> = ({
  _id,
  title,
  cover,
  releaseDate,
  isPublished,
}) => {
  let cardImage = imageNotAvailable;

  if (cover) {
    cardImage = apiURL + '/' + cover;
  }

  return (
    <>
      {isPublished ? (
        <Card>
          <CardActionArea to={`/album-extended/${_id}`} component={NavLink}>
            <CardMedia
              component="img"
              alt={`${title}'s image`}
              height="140"
              image={cardImage}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap={true}>
                {releaseDate}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

export default AlbumsItem;
