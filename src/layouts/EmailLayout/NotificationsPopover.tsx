import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Badge from '@mui/material/Badge';
// icons
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// api
import { Messages } from '../../api/threads/types';
import { GET_USER_NOTIFICATIONS } from '../../api/offices';
import { useQuery } from '@apollo/client';

// ----------------------------------------------------------------------

export default function NotificationsPopover({ uid }: { uid: string }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: notifications, refetch } = useQuery<{ getUserNotifications: Messages[] }>(GET_USER_NOTIFICATIONS, {
    variables: {
        userId: uid
    }
  });
  const [open, setOpen] = useState<Element | null>(null);

  React.useEffect(() => {
    refetch({
        userId: uid
    })
  }, [pathname, uid, refetch])

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          mx: 2,
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
        <Badge badgeContent={notifications?.getUserNotifications.length} color="error">
            <NotificationsIcon />
        </Badge>
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
            width: 360,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
       <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {notifications?.getUserNotifications.length} unread messages
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
            <List
                disablePadding
                subheader={
                    <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                        {notifications && notifications.getUserNotifications.length > 0 ? "New" : "No Notifications"}
                    </ListSubheader>
                }
            >
                {notifications?.getUserNotifications.map((notification) => (
                    <NotificationItem 
                        key={notification.msgId} 
                        notification={notification}
                        userId={uid}
                        onClose={handleClose}
                    />
                ))}
            </List>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple onClick={() => {
            navigate('/app/inbox');
            handleClose();
          }}>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}


const formatInboxDate = (date: string | Date) => {
    const target = new Date(date);
    return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

  
function NotificationItem({ userId, notification, onClose }: { userId: string, notification: Messages, onClose: () => void }) {
    const navigate = useNavigate();

    const handleRedirect = (threadId: string) => {
        if (notification.thread.author.accountId === userId) navigate(`/app/sent/${threadId}`);
        else navigate(`/app/inbox/${threadId}`);
        onClose();
    }

    return (
      <ListItemButton
        sx={{
          py: 1.5,
          px: 2.5,
          mt: '1px',
          bgcolor: 'action.selected'
        }}
        onClick={() =>handleRedirect(notification.thread.refId)}
      >
        <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'red' }}>
                {`${notification.sender.firstName.charAt(0)}${notification.sender.lastName.charAt(0)}`}
            </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="subtitle2">
                {notification.thread.subject}
                <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                    &nbsp; {`from ${notification.sender.firstName} ${notification.sender.lastName} — ${notification.message}`}
                </Typography>
            </Typography>
          }
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled',
              }}
            >
              <AccessTimeIcon sx={{ mr: 0.5, width: 16, height: 16 }} />
              {formatInboxDate(notification.dateSent)}
            </Typography>
          }
        />
      </ListItemButton>
    );
  }