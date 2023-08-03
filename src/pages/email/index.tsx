import React from 'react';
// mui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// project imports
import EmailList from './EmailList';
import ThreadList from './ThreadList';
import CreateThread from './CreateThread';

export default function EmailPage() {
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
              onDiscardThread={handleComposeThread}
            />
          ) : (
            <ThreadList />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}