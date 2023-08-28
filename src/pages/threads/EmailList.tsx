import React from 'react';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
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
// icons
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
// project imports
import FilterPopover from './FilterPopover';
import { Thread } from '../../api/threads/types';
import { LoadOverlay } from '../../components/Loaders';


interface EmailListProps {
  mode: string;
  compose: boolean;
  mails?: Thread[];
  onRefresh: () => void;
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
  },
  "regionInbox": {
    title: "Compose a thread",
    sub: "No threads are created yet"
  }
}

const formatInboxDate = (date: string | Date) => {
  const target = new Date(date);
  return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

export default function EmailList(props: EmailListProps) {
  const theme = useTheme();
  const [selectedType, setSelectedType] = React.useState<number>(-1);

  return (
    <React.Fragment>
      <LoadOverlay open={props.mails === undefined} />
      <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
        {props.mode !== "completed" && (
          <Button 
            variant='contained' 
            endIcon={<AddIcon />} 
            disabled={props.compose}
            onClick={props.onComposeThread}
          >
              Compose
          </Button>
        )}
        
        <IconButton onClick={props.onRefresh}>
          <RefreshIcon />
        </IconButton>
        <FilterPopover selected={selectedType} onClick={id => setSelectedType(id)} />
      </Stack>
      
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

          {props.mails && props.mails.length === 0 && (
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
          
          {props.mails && props.mails.filter(mail => mail.docType.docId === selectedType || selectedType === -1).map(msg => (
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
                        <Typography variant='body1' gutterBottom>
                            {msg.subject}
                        </Typography>
                        <Chip color={msg.completed ? 'success' : 'info'} label={msg.status.statusLabel} size='small' sx={{ fontSize: 10 }} />
                        <Typography variant='caption'>
                          {` Due at ${formatInboxDate(msg.dateDue)}`}
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
                        {props.mode === 'regionInbox' ? msg.recipient.sectionOffice.officeName : `${msg.author.firstName} ${msg.author.lastName}`}
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
