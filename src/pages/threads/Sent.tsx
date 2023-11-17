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
import { InboxType } from './Inbox';
import { useAppSelector } from '../../redux/hooks';
// api
import { AUTHOR_INBOX_SUBSCRIBE, GET_SENT_THREAD } from '../../api/threads';
import { SubscriptionMessage, Thread } from '../../api/threads/types';
import { useQuery, useSubscription } from '@apollo/client';


export default function EmailPage(props: { type: InboxType }) {
  const { refId } = useParams();
  const { uid } = useAppSelector((state) => state.auth);
  const { data: threads, refetch } = useQuery<{ getSentThread: Thread[] }>(GET_SENT_THREAD, {
    variables: {
      userId: uid,
      type: props.type
    },
    fetchPolicy: 'network-only'
  });
  const { data: authorInbox } = useSubscription<{ authorInbox: SubscriptionMessage }>(AUTHOR_INBOX_SUBSCRIBE, {
    variables: {
      authorId: uid
    }
  })
  const [threadId, setThreadId] = React.useState<string | null>(refId ? refId : null);
  const [compose, setCompose] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (authorInbox) refetch({ userId: authorInbox.authorInbox.referenceNum, type: props.type });
  }, [authorInbox, refetch, props.type]);

  React.useEffect(() => {
    if (threads && threads.getSentThread.length > 0) {
      setThreadId(threads.getSentThread[0].refId)
    } 
  }, [threads]);

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
          mails={threads?.getSentThread}
          compose={compose}
          selectedId={threadId}
          mode="sent"
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