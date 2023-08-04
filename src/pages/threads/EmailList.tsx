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

// icons
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';


interface EmailListProps {
  compose: boolean;
  onComposeThread: () => void
}

export default function EmailList(props: EmailListProps) {
  return (
    <React.Fragment>
      <Stack direction='row' spacing={1} alignItems='center' sx={{ py: 1 }}>
          <Button 
            variant='contained' 
            endIcon={<AddIcon />} 
            disabled={props.compose}
            onClick={props.onComposeThread}
          >
              Compose
          </Button>
          <IconButton>
            <FilterListIcon />
          </IconButton>
          <IconButton>
            <RefreshIcon />
          </IconButton>
      </Stack>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItemButton alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Stack direction='row' justifyContent='space-between'>
                  <Typography variant='body1'>
                      Summer BBQ
                  </Typography>
                  <Typography variant='subtitle2'>
                      5:10 AM
                  </Typography>
              </Stack>
            } 
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItemButton>
        <Divider variant="inset" component="li" />
        <ListItemButton alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItemButton>
        <Divider variant="inset" component="li" />
        <ListItemButton alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {' — Do you have Paris recommendations? Have you ever…'}
              </React.Fragment>
            }
          />
        </ListItemButton>
      </List>
    </React.Fragment>
  );
}
