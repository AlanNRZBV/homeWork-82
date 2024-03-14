import React, { useState } from 'react';
import { User } from '../../../types';
import { Button, Menu, MenuItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks.ts';
import { logout } from '../../../features/Users/usersThunks.ts';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.displayName}!
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem to="/track-history" component={NavLink}>
          Track History
        </MenuItem>
        <MenuItem to="/albums/new" component={NavLink}>
          Add album
        </MenuItem>
        <MenuItem to="/artists/new" component={NavLink}>
          Add artist
        </MenuItem>
        <MenuItem to="/tracks/new" component={NavLink}>
          Add track
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
