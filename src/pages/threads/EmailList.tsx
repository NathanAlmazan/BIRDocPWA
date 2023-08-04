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
  }
}

const formatInboxDate = (date: string | Date) => {
  const current = new Date();
  const target = new Date(date);

  if (current.getMonth() === target.getMonth() && current.getDate() === target.getDate()) {
    return target.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }

  return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

export default function EmailList(props: EmailListProps) {
  const theme = useTheme();
  const { data: threadInbox, loading: inboxLoad } = useQuery<{ getThreadInbox: Thread[] }>(GET_THREAD_INBOX, {
    variables: {
      userId: props.userId
    }
  });
  const { data: sentThread, loading: sentLoad } = useQuery<{ getSentThread: Thread[] }>(GET_SENT_THREAD, {
    variables: {
      userId: props.userId
    }
  });
  const [mails, setMails] = React.useState<Thread[]>([]);

  React.useEffect(() => {
    if (threadInbox && sentThread) {
      if (props.mode === "inbox") setMails(threadInbox.getThreadInbox);
      else if (props.mode === "sent") setMails(sentThread.getSentThread);
    }
  }, [threadInbox, sentThread, props.mode])

  return (
    <React.Fragment>
      <LoadOverlay open={inboxLoad || sentLoad} />
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
            <IconButton>
              <RefreshIcon />
            </IconButton>
          </div>
      </Stack>
      <Paper sx={{ width: '100%' }}>
        <List 
          sx={{ 
            width: '100%', 
            maxHeight: '70vh', 
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
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant='body1'>
                            {msg.docType.docType}
                        </Typography>
                        <Typography variant='caption'>
                          {formatInboxDate(msg.dateUpdated)}
                        </Typography>
                    </Stack>
                  } 
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="subtitle2"
                        color="text.primary"
                      >
                        {msg.author.firstName + ' ' + msg.author.lastName}
                      </Typography>
                      {" — " + msg.subject}
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
