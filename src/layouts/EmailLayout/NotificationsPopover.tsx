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
import { Thread } from '../../api/threads/types';
import { GET_USER_NOTIFICATIONS } from '../../api/offices';
import { useQuery } from '@apollo/client';

// ----------------------------------------------------------------------

export default function NotificationsPopover({ uid }: { uid: string }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: messages, refetch: refetchMessages } = useQuery<{ getUserNotifications: Thread[] }>(GET_USER_NOTIFICATIONS, {
    variables: {
        userId: uid,
        type: "unread"
    }
  });
  const { data: approvals, refetch: refetchApprovals } = useQuery<{ getUserNotifications: Thread[] }>(GET_USER_NOTIFICATIONS, {
    variables: {
        userId: uid,
        type: "approval"
    }
  });
  const { data: overdue, refetch: refetchOverdue } = useQuery<{ getUserNotifications: Thread[] }>(GET_USER_NOTIFICATIONS, {
    variables: {
        userId: uid,
        type: "overdue"
    }
  });
  const [open, setOpen] = useState<Element | null>(null);
  const [count, setCount] = useState<number>(0);

  React.useEffect(() => {
    refetchMessages({ userId: uid, type: "unread" });
    refetchApprovals({ userId: uid, type: "approval" });
    refetchOverdue({ userId: uid, type: "overdue" });
  }, [pathname, uid, refetchMessages, refetchApprovals, refetchOverdue])

  React.useEffect(() => {
    if (messages && approvals && overdue) {
      setCount(messages.getUserNotifications.length + approvals.getUserNotifications.length + overdue.getUserNotifications.length)
    }
  }, [messages, approvals, overdue])

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
        <Badge badgeContent={count} color="error">
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
              {count > 0 ? `You have ${count} notifications` : 'You have no notifications.'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {messages && messages.getUserNotifications.length > 0 && (
           <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
              <List
                  disablePadding
                  subheader={
                      <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                          Unread Messages
                      </ListSubheader>
                  }
              >
                  {messages.getUserNotifications.map((thread) => (
                      <NotificationItem 
                          key={thread.refId} 
                          notification={thread}
                          userId={uid}
                          onClose={handleClose}
                      />
                  ))}
              </List>
          </Box>
        )}

        {approvals && approvals.getUserNotifications.length > 0 && (
           <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
              <List
                  disablePadding
                  subheader={
                      <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                          Needs Your Approval
                      </ListSubheader>
                  }
              >
                  {approvals.getUserNotifications.map((thread) => (
                      <NotificationItem 
                          key={thread.refId} 
                          notification={thread}
                          userId={uid}
                          onClose={handleClose}
                      />
                  ))}
              </List>
          </Box>
        )}

        {overdue && overdue.getUserNotifications.length > 0 && (
           <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
              <List
                  disablePadding
                  subheader={
                      <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                          Overdue Tasks
                      </ListSubheader>
                  }
              >
                  {overdue.getUserNotifications.map((thread) => (
                      <NotificationItem 
                          key={thread.refId} 
                          notification={thread}
                          userId={uid}
                          onClose={handleClose}
                      />
                  ))}
              </List>
          </Box>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple onClick={() => {
            navigate('/app/inbox/tasks');
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



function NotificationItem({ userId, notification, onClose }: { userId: string, notification: Thread, onClose: () => void }) {
    const navigate = useNavigate();

    const handleRedirect = (threadId: string) => {
      if (notification.author.accountId === userId) {
        if (!notification.completed && notification.purpose.actionable) navigate(`/app/sent/pending/${threadId}`);
        else if (notification.completed && !notification.purpose.actionable) navigate(`/app/sent/memos/${threadId}`)
        else if (notification.completed && notification.purpose.actionable) navigate(`/app/sent/completed/${threadId}`)
      } else {
        if (!notification.completed && notification.purpose.actionable) navigate(`/app/inbox/tasks/${threadId}`);
        else if (notification.completed && !notification.purpose.actionable) navigate(`/app/inbox/memos/${threadId}`)
        else if (notification.completed && notification.purpose.actionable) navigate(`/app/inbox/finished/${threadId}`)
      }
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
        onClick={() =>handleRedirect(notification.refId)}
      >
        <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'red' }}>
                {`${notification.author.firstName.charAt(0)}${notification.author.lastName.charAt(0)}`}
            </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="subtitle2">
                {notification.subject}
                <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                    &nbsp; {`from ${notification.author.firstName} ${notification.author.lastName} — ${notification.docType.docType}`}
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
              {`Due at ${formatInboxDate(notification.dateDue)}`}
            </Typography>
          }
        />
      </ListItemButton>
    );
  }