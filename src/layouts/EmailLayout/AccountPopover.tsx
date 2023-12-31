import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { useAppSelector } from '../../redux/hooks';
// redux
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/slice/auth';
// project imports
import EditProfileDialog from './EditProfile';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const { username, office, role } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [open, setOpen] = useState<Element | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    setOpen(null);
    navigate("/auth/login");
  }

  const handleToggleEditDialog = () => {
    setOpen(null);
    setEditProfile(!editProfile);
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {username && (
            <Avatar>
                {username.split(' ').map(name => name.charAt(0)).join('')}
            </Avatar>
        )}
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 300,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {username && username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {role && role.roleName}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ my: 1.5, px: 2.5 }}>
          {office && office.sectionName === "default" ? (
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {office && office.sectionOffice.officeName}
            </Typography>
          ) : (
            <>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {office && office.sectionOffice.officeName}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap>
                {office && office.sectionName}
              </Typography>
            </>
          )} 
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ my: 1 }}>
          <MenuItem onClick={handleToggleEditDialog} sx={{ mx: 1 }}>
            Edit Profile
          </MenuItem>

          <MenuItem onClick={handleLogout} sx={{ mx: 1, color: 'red' }}>
            Logout
          </MenuItem>
        </Box>
      </Popover>

      <EditProfileDialog open={editProfile} onClose={handleToggleEditDialog} />
    </>
  );
}