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
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

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


const formatInboxDate = (date: string | Date) => {
    const target = new Date(date);
  
    return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
  }

interface ThreadListProps {
    userId: string;
    threadId: string;
}

export default function ThreadList({ userId, threadId }: ThreadListProps) {
  const theme = useTheme();
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

  const { subject, author, docType, dateCreated, messages, recipient } = threadData.getThreadById;

  return (
    <Paper sx={{ width: '100%' }}>
        <Box 
            sx={{ 
                width: '100%', 
                maxHeight: '85vh', 
                overflowY: 'auto',
                overflowX: 'hidden',
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
            }}
        >
            <Box sx={{ width: '100%', p: 2 }}>
                <Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
                    <Typography variant='subtitle2'>{docType.docType}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography variant='body2'>{`Due at ${formatInboxDate(dateCreated)}`}</Typography>
                        {userId === threadData.getThreadById.author.accountId && (
                            <IconButton onClick={handleExpand}>
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
            </Box>

            <Box sx={{ px: 2 }}>
                <Typography variant='body1' color='secondary'>
                    {author.firstName + ' ' + author.lastName} 
                    <span style={{ color: 'black' }}>{' to '}</span> 
                    {`${recipient.sectionOffice.officeName} — ${recipient.sectionName === "default" ? "" : recipient.sectionName}`}
                </Typography>
                <Typography variant='h4'>
                    {subject}
                </Typography>
            </Box>
           
            <Box sx={{ p: 2 }}>
                {messages.map(msg => (
                    <Box 
                        key={msg.msgId} 
                        sx={{ 
                            my: 2, 
                            pr: msg.sender.accountId === userId ? 8 : 0,
                            pl: msg.sender.accountId !== userId ? 8 : 0
                        }}
                    >
                        <MessageCard content={msg} sender={msg.sender.accountId === userId} />
                    </Box>
                ))}
            </Box>

            <Box sx={{ p: 2 }}>
            {completed ? (
                <Alert severity="info" sx={{  }}>This thread is complied and closed.</Alert>
            ) : (
                <ReplyBox userId={userId} threadId={threadId} onSubmit={reloadThread} />
            )}
            </Box>
        </Box>
    </Paper>
  )
}