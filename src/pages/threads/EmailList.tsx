import React from 'react';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
// api
import { useQuery } from '@apollo/client';
import { GET_SENT_THREAD, GET_THREAD_INBOX } from '../../api/threads';
// icons
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
// project imports
import { Thread } from '../../api/threads/types';
import { LoadOverlay } from '../../components/Loaders';


interface EmailListProps {
  userId: string;
  mode: string;
  compose: boolean;
  onComposeThread: () => void;
  onThreadClick: (threadId: string) => void;
}

const emptyMessages: { [key: string]: { title: string, sub: string }} = {
  "inbox": {
    title: "Job Well Done!",
    sub: "You have no active threads"
  },
  "sent": {
    title: "Compose a thread",
    sub: "You have no created threads"
  },
  "completed": {
    title: "It's time to work!",
    sub: "You have no finished threads"
  }
}

const formatInboxDate = (date: string | Date) => {
  const target = new Date(date);
  return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

export default function EmailList(props: EmailListProps) {
  const theme = useTheme();
  const { data: threadInbox, loading: inboxLoad, refetch: refetchInbox } = useQuery<{ getThreadInbox: Thread[] }>(GET_THREAD_INBOX, {
    variables: {
      userId: props.userId
    }
  });
  const { data: threadCompleted, loading: completedLoad, refetch: refetchCompleted } = useQuery<{ getThreadInbox: Thread[] }>(GET_THREAD_INBOX, {
    variables: {
      userId: props.userId,
      completed: true
    }
  });
  const { data: sentThread, loading: sentLoad, refetch: refetchSent } = useQuery<{ getSentThread: Thread[] }>(GET_SENT_THREAD, {
    variables: {
      userId: props.userId
    }
  });
  const [mails, setMails] = React.useState<Thread[]>([]);

  React.useEffect(() => {
    if (threadInbox && sentThread && threadCompleted) {
      if (props.mode === "inbox") setMails(threadInbox.getThreadInbox);
      else if (props.mode === "sent") setMails(sentThread.getSentThread);
      else if (props.mode === "completed") setMails(threadCompleted.getThreadInbox);
    }
  }, [threadInbox, sentThread, threadCompleted, props.mode])

  const handleRefreshList = () => {
    if (props.mode === "inbox") refetchInbox({ userId: props.userId });
    else if (props.mode === "sent") refetchSent({ userId: props.userId });
    else if (props.mode === "completed") refetchCompleted({ userId: props.userId, completed: true });
  }

  return (
    <React.Fragment>
      <LoadOverlay open={inboxLoad || sentLoad || completedLoad} />
      {props.mode !== "completed" && (
        <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
          <Button 
            variant='contained' 
            endIcon={<AddIcon />} 
            disabled={props.compose}
            onClick={props.onComposeThread}
          >
              Compose
          </Button>
          <div>
            <IconButton>
              <FilterListIcon />
            </IconButton>
            <IconButton onClick={handleRefreshList}>
              <RefreshIcon />
            </IconButton>
          </div>
        </Stack>
      )}
      <Paper sx={{ width: '100%' }}>
        <List 
          sx={{ 
            width: '100%', 
            maxHeight: 'calc(100vh - 170px)', 
            overflowY: 'auto',
            "::-webkit-scrollbar": {
              height: "8px",
              width: "8px"
            },

            /* Track */
            "::-webkit-scrollbar-track": {
                background: theme.palette.grey[300] 
            },
            
            /* Handle */
            "::-webkit-scrollbar-thumb": {
                background: theme.palette.secondary.main
            },
            
            /* Handle on hover */
            "::-webkit-scrollbar-thumb:hover": {
                background: theme.palette.primary.dark
            }
          }}>
          {mails.length === 0 && (
            <Box sx={{ display: 'flex', height: 300, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <FolderCopyIcon color='secondary' sx={{ fontSize: 64, mb: 1 }} />
              <Typography variant="subtitle1">
                  {emptyMessages[props.mode].title}
              </Typography>
              <Typography variant="body1">
                {emptyMessages[props.mode].sub}
              </Typography>
            </Box>
          )}
          {mails.map(msg => (
            <React.Fragment key={msg.refId}>
              <ListItemButton alignItems="flex-start" onClick={() => props.onThreadClick(msg.refId)}>
                <ListItemAvatar>
                  <Avatar>
                    {`${msg.author.firstName.charAt(0)}${msg.author.lastName.charAt(0)}`}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box>
                        <Typography variant='body1'>
                            {msg.subject}
                        </Typography>
                        <Typography variant='caption' gutterBottom>
                          {`Due at ${formatInboxDate(msg.dateDue)}  (${msg.status.statusLabel})`}
                        </Typography>
                    </Box>
                  } 
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="subtitle2"
                        color="text.primary"
                      >
                        {`${msg.author.firstName} ${msg.author.lastName}`}
                      </Typography>
                      {" — " + msg.docType.docType}
                    </React.Fragment>
                  }
                />
              </ListItemButton>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}
