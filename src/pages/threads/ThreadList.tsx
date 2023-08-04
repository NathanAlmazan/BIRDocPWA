import React from 'react';
// mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';

// icons
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';

// project imports
import { LoadOverlay } from '../../components/Loaders';
import MessageCard from './MessageCard';
import ReplyBox from './ReplyBox';
import { DocumentStatus, Thread } from '../../api/threads/types';

// api
import { useQuery, useMutation } from '@apollo/client';
import { 
    GET_ALL_THREAD_STATUS, 
    GET_THREAD_BY_ID, 
    UPDATE_THREAD_STATUS
} from '../../api/threads';


interface ThreadListProps {
    userId: string;
    threadId: string;
}

export default function ThreadList({ userId, threadId }: ThreadListProps) {
  const { data: threadData, loading, refetch } = useQuery<{ getThreadById: Thread }>(GET_THREAD_BY_ID, {
    variables: { uid: threadId }
  });
  const { data: threadStatus } = useQuery<{ getAllThreadStatus: DocumentStatus[] }>(GET_ALL_THREAD_STATUS);
  const [updateThreadStatus] = useMutation(UPDATE_THREAD_STATUS); 

  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [statusId, setStatusId] = React.useState<number>(2);
  const [attach, setAttach] = React.useState<string>('true');
  const [completed, setCompleted] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (threadData) {
        setStatusId(threadData.getThreadById.status.statusId);
        setAttach(threadData.getThreadById.attachments ? 'true' : 'false');
        setCompleted(threadData.getThreadById.completed);
    }
  }, [threadData])

  const handleExpand = () => setExpanded(!expanded);

  const handleStatusChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await updateThreadStatus({ variables: {
        uid: threadId,
        attachments: attach === 'true' ? true : false,
        statusId: parseInt(event.target.value)
    }})

    // check if completed
    const completedId = [1, 3];
    setCompleted(completedId.includes(parseInt(event.target.value)));

    setStatusId(parseInt(event.target.value));
  }

  const handleAttachmentChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await updateThreadStatus({ variables: {
        uid: threadId,
        attachments: event.target.value === 'true' ? true : false,
        statusId
    }})

    setAttach(event.target.value);
  }

  const reloadThread = () => refetch({ uid: threadId });

  if (loading || !threadData || !threadStatus) return <LoadOverlay open={true} />

  const { subject, author, docType, dateCreated, messages } = threadData.getThreadById;

  return (
    <Stack spacing={3} sx={{ p: 2 }}>
        <Box sx={{ width: '100%' }}>
            <Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
            <Typography variant='subtitle2'>{docType.docType}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography variant='subtitle2'>{`Created at ${new Date(dateCreated).toString().split('GMT')[0]}`}</Typography>
                    {userId === threadData.getThreadById.author.accountId && (
                        <IconButton onClick={handleExpand}  sx={{ ml: 2 }}>
                            {expanded ? <CloseIcon /> : <TuneIcon />}
                        </IconButton>
                    )}
                </Box>
            </Stack>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Stack direction='row' spacing={2} justifyContent='flex-end' sx={{ my: 2 }}>
                    <TextField
                        name='status'
                        label='Status'
                        select
                        sx={{ width: 200 }}
                        value={statusId}
                        onChange={handleStatusChange}
                    >
                        {threadStatus.getAllThreadStatus.map(status => (
                            <MenuItem key={status.statusId} value={status.statusId}>{status.statusLabel}</MenuItem>
                        ))}
                       
                    </TextField>
                    <TextField
                        name='attachments'
                        label='Attachments'
                        select
                        sx={{ width: 200 }}
                        value={attach}
                        onChange={handleAttachmentChange}
                    >
                        <MenuItem value='true'>Required</MenuItem>
                        <MenuItem value='false'>Not Required</MenuItem> 
                    </TextField>
                </Stack>
            </Collapse>
            
            <Divider />

            <Typography variant='subtitle1' color='secondary' sx={{ mt: 2 }}>
                {author.firstName + ' ' + author.lastName} <span style={{ color: 'black' }}>to</span> Collection Division — Tax Collection Office
            </Typography>
            <Typography variant='h4' sx={{ fontWeight: 700 }}>
                {subject}
            </Typography>
        </Box>

        {messages.map(msg => (
            <MessageCard key={msg.msgId} content={msg} sender={msg.sender.accountId === userId} />
        ))}

        {completed ? (
            <Alert severity="info">This thread is complied and closed.</Alert>
        ) : (
            <ReplyBox userId={userId} threadId={threadId} onSubmit={reloadThread} />
        )}
    </Stack>
  )
}