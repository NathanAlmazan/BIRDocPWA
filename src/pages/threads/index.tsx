import React from 'react';
// mui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//icons
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
// project imports
import EmailList from './EmailList';
import ThreadList from './ThreadList';
import CreateThread from './CreateThread';
import { useAppSelector } from '../../redux/hooks';

export default function EmailPage() {
  const { uid } = useAppSelector((state) => state.auth);
  const [threadId, setThreadId] = React.useState<string | null>("6654cbc3-a74a-4e39-b891-ea45fabde0f4");
  const [compose, setCompose] = React.useState<boolean>(false);

  const handleComposeThread = () => setCompose(!compose);

  return (
    <Grid container spacing={3}>
      <Grid item md={4}>
        <EmailList 
          compose={compose}
          onComposeThread={handleComposeThread}
        />
      </Grid>
      <Grid item md={8}>
        <Box sx={{ maxHeight: '85vh', overflowY: 'auto' }}>
          {compose ? (
            <CreateThread 
              userId={uid as string}
              onDiscardThread={handleComposeThread}
            />
          ) : threadId ? (
            <ThreadList 
              userId={uid as string}
              threadId={threadId}
            />
          ) : (
            <Box sx={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <MarkAsUnreadIcon color='secondary' sx={{ fontSize: 64, mb: 1 }} />
              <Typography variant="subtitle1">
                  Select an item to read
              </Typography>
              <Typography variant="body1">
                  No item selected
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}