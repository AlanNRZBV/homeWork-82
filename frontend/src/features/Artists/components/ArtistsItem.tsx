import { FC } from 'react';
import { Artist } from '../../../types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { apiURL } from '../../../constants.ts';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { NavLink } from 'react-router-dom';

const ArtistsItem: FC<Artist> = ({
  _id,
  name,
  information,
  image,
  isPublished,
}) => {
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <>
      {isPublished ? (
        <Card>
          <CardActionArea to={`/albums/${_id}`} component={NavLink}>
            <CardMedia
              component="img"
              alt={`${name}'s image`}
              height="140"
              image={cardImage}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap={true}>
                {information}
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

export default ArtistsItem;
