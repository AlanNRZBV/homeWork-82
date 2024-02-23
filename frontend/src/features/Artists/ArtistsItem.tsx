import { FC } from 'react';
import { Artist } from '../../types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { apiURL } from '../../constants.ts';
import imageNotAvailable from '../../assets/images/image_not_available.png';
import { NavLink } from 'react-router-dom';

const ArtistsItem: FC<Artist> = ({ _id, name, information, image }) => {
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={`${name}'s image`}
          height="140"
          image={cardImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {information}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            to={`/artist/${_id}`}
            component={NavLink}
            color="primary"
            variant="contained"
            sx={{ mr: 2 }}
          >
            More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistsItem;
