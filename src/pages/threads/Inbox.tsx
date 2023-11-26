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
import { 
  GET_THREAD_INBOX, 
  OFFICE_INBOX_SUBSCRIBE
} from '../../api/threads';
import { SubscriptionMessage, Thread } from '../../api/threads/types';
import { useQuery, useSubscription } from '@apollo/client';


export type InboxType = "pending" | "approval" | "memos" | "finished" | "archived";

export default function EmailPage(props: { type: InboxType }) {
  const { refId } = useParams();
  const { uid, office } = useAppSelector((state) => state.auth);
  const { data: threads, refetch } = useQuery<{ getThreadInbox: Thread[] }>(GET_THREAD_INBOX, {
    variables: {
      userId: uid,
      type: props.type
    },
    fetchPolicy: 'network-only'
  });
  const { data: officeInbox } = useSubscription<{ officeInbox: SubscriptionMessage }>(OFFICE_INBOX_SUBSCRIBE, {
    variables: {
      officeId: office?.sectionOffice.officeId
    }
  })
  const [threadId, setThreadId] = React.useState<string | null>(refId ? refId : null);
  const [compose, setCompose] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (officeInbox) refetch({ userId: uid, type: props.type });
  }, [officeInbox, refetch, uid, props.type]);

  const handleComposeThread = () => setCompose(!compose);

  const handleThreadClick = (id: string) => setThreadId(id);

  const handleCreateThread = (id: string) => {
    setThreadId(id);
    setCompose(false);
    handleRefreshList();
  }

  const handleRefreshList = () => {
    refetch({ userId: uid, type: props.type });
  }

  return (
    <Grid container spacing={3} alignItems="stretch" sx={{ height: "95%" }}>
      <Grid item md={4}>
        <EmailList 
          mails={threads?.getThreadInbox}
          compose={compose}
          selectedId={threadId}
          mode="inbox"
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
            onUpdate={handleRefreshList}
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