import React, { FC } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Album } from '../../types';
import imageNotAvailable from '../../assets/images/image_not_available.png';
import { apiURL } from '../../constants.ts';
import { NavLink } from 'react-router-dom';

const AlbumItem: FC<Album> = ({cover,title,releaseDate}) => {

  let cardImage = imageNotAvailable;

  if (cover) {
    cardImage = apiURL + '/' + cover;
  }


  return (
    <Grid>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={`${title}'s image`}
          height="140"
          image={cardImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {releaseDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button  to={`/artist/${_id}`} component={NavLink} color="primary" variant="contained" sx={{mr:2}}>More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumItem;