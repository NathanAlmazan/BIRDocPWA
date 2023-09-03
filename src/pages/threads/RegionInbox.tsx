import React from 'react';
import { useParams } from 'react-router-dom';
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
// api
import { GET_REGION_INBOX } from '../../api/threads';
import { Thread } from '../../api/threads/types';
import { useQuery } from '@apollo/client';

export default function RegionInbox() {
  const { refId } = useParams();
  const { uid } = useAppSelector((state) => state.auth);
  const { data, refetch } = useQuery<{ getAllThread: Thread[] }>(GET_REGION_INBOX, {
    variables: {
      memos: false
    }
  });
  const [threadId, setThreadId] = React.useState<string | null>(refId ? refId : null);
  const [compose, setCompose] = React.useState<boolean>(false);

  const handleComposeThread = () => setCompose(!compose);

  const handleThreadClick = (id: string) => setThreadId(id);

  const handleCreateThread = (id: string) => {
    setThreadId(id);
    setCompose(false)
  }

  const handleRefreshList = () => {
    refetch({ userId: uid });
  }

  return (
    <Grid container spacing={3} alignItems="stretch" sx={{ height: "95%" }}>
      <Grid item md={4}>
        <EmailList 
          mails={data?.getAllThread}
          compose={compose}
          mode="regionInbox"
          onRefresh={handleRefreshList}
          onComposeThread={handleComposeThread}
          onThreadClick={handleThreadClick}
        />
      </Grid>
      <Grid item md={8} sx={{ position: 'relative' }}>
        {compose ? (
          <CreateThread 
            userId={uid as string}
            onDiscardThread={handleComposeThread}
            onCreateThread={handleCreateThread}
          />
        ) : threadId ? (
          <ThreadList 
            userId={uid as string}
            threadId={threadId}
          />
        ) : (
          <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <MarkAsUnreadIcon color='secondary' sx={{ fontSize: 64, mb: 1 }} />
            <Typography variant="subtitle1">
                Select an item to read
            </Typography>
            <Typography variant="body1">
                No item selected
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  )
}