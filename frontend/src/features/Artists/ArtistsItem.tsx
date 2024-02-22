import  { FC } from 'react';
import { Artist } from '../../types';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import { apiURL } from '../../constants.ts';
import imageNotAvailable from '../../assets/images/image_not_available.png';

const ArtistsItem:FC<Artist> = ({_id, name,information,image}) => {

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
        <Button size="small">Learn More{_id}</Button>
      </CardActions>
    </Card>
    </Grid>
  );
};

export default ArtistsItem;