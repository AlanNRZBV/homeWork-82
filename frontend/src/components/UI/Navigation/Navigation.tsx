import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          to="/"
          component={NavLink}
          variant="h6"
          color="white"
          sx={{ mr: 'auto', textDecoration: 'none' }}
        >
          Spotify
        </Typography>
        <Box>
          <Button
            to="/"
            component={NavLink}
            color="success"
            variant="contained"
            sx={{ mr: 2 }}
          >
            Home
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
