import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {NavLink} from "react-router-dom";

const Navigation = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography to="/" component={NavLink} variant="h6" color="white" sx={{mr:'auto', textDecoration:'none'}}>Spotify</Typography>
        <Box>
          <Button to="/categories" component={NavLink} color="primary" variant="contained" sx={{mr:2}}>Categories</Button>
          <LoadingButton type="button" color="warning" variant="contained">
            Add
          </LoadingButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
