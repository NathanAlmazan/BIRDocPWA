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
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
// icons
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
// project imports
import { LoadOverlay } from '../../components/Loaders';
import MessageCard from './MessageCard';
import RequestDetails from './RequestDetails';
import ReplyBox from './ReplyBox';
import ThreadDirectory from './Directory';
import ThreadHistory from './History';
import { DocumentStatus, Thread } from '../../api/threads/types';
// api
import { useQuery, useMutation } from '@apollo/client';
import { 
    ARCHIVE_THREAD,
    GET_ALL_THREAD_STATUS, 
    GET_THREAD_BY_ID, 
    RESTORE_THREAD, 
    SET_MESSAGE_AS_READ, 
    UPDATE_THREAD_STATUS
} from '../../api/threads';

interface TabPaneProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function TabPanel(props: TabPaneProps) {
    return (
        <div>
            {props.value === props.index && props.children}
        </div>
    )
}

const formatInboxDate = (date: string | Date) => {
    const target = new Date(date);
    return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
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
  const [setMessageAsRead] = useMutation(SET_MESSAGE_AS_READ);
  const [archiveThread] = useMutation(ARCHIVE_THREAD);
  const [restoreThread] = useMutation(RESTORE_THREAD);

  const [tabValue, setTableValue] = React.useState<number>(0);
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

  React.useEffect(() => {
    if (threadData) {
        threadData.getThreadById.messages.filter(msg => msg.sender.accountId !== userId).forEach(user => {
            setMessageAsRead({
                variables: {
                    threadId: threadData.getThreadById.refId,
                    userId: user.sender.accountId
                }
            })
        })
    }
  }, [threadData, userId, setMessageAsRead])

  React.useEffect(() => {
    refetch({ uid: threadId });
    setTableValue(0);
  }, [threadId, refetch])

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
    refetch({ uid: threadId });
  }

  const handleAttachmentChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await updateThreadStatus({ variables: {
        uid: threadId,
        attachments: event.target.value === 'true' ? true : false,
        statusId
    }})

    setAttach(event.target.value);
  }

  const handleArchiveThread = async () => {
    await archiveThread({
        variables: {
            threadId: threadId
        }
    })

    refetch({ uid: threadId });
  }

  const handleRestoreThread = async () => {
    await restoreThread({
        variables: {
            threadId: threadId
        }
    })

    refetch({ uid: threadId });
  }

  const reloadThread = () => refetch({ uid: threadId });

  if (loading || !threadData || !threadStatus) return <LoadOverlay open={true} />

  const { subject, author, refSlipNum, dateDue, messages, recipient, dateUpdated, dateCreated, status, attachments, active, recipientUser } = threadData.getThreadById;

  return (
    <Paper sx={{ width: '100%' }}>
        <Box 
            sx={{ 
                width: '100%', 
                maxHeight: 'calc(100vh - 105px)', 
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
                    <Typography variant='body2' sx={{ fontWeight: 800 }}>
                        {`Ref # ${refSlipNum}`}
                    </Typography>
        
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography variant='body2'>{`From ${formatInboxDate(dateCreated)} to ${formatInboxDate(dateDue)}`}</Typography>
                        {((userId === threadData.getThreadById.author.accountId && !threadData.getThreadById.purpose.purposeName.includes("Approval")) || 
                           (userId !== threadData.getThreadById.author.accountId && threadData.getThreadById.purpose.purposeName.includes("Approval"))) && (
                            <IconButton onClick={handleExpand}>
                                {expanded ? <CloseIcon /> : <TuneIcon />}
                            </IconButton>
                        )}
                         <IconButton onClick={reloadThread}>
                            <RefreshIcon />
                        </IconButton>
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
                <Divider sx={{ mb: 1 }} />
                
                {active ? (
                    <Alert 
                        severity={completed ? "success" : "info"}
                        action={userId === threadData.getThreadById.author.accountId && (
                            <Button color='error' onClick={handleArchiveThread}>
                                Cancel
                            </Button>
                        )}
                    >
                        {completed ? `This thread is complied and closed at ${formatInboxDate(dateUpdated)}.` : status.statusLabel}
                    </Alert>
                ) : (
                    <Alert 
                        severity='error'
                        action={userId === threadData.getThreadById.author.accountId && (
                            <Button onClick={handleRestoreThread}>
                                Restore
                            </Button>
                        )}
                    >
                        Archived Request
                    </Alert>
                )}

            </Box>

            <Box sx={{ px: 2 }}>
                <Typography variant='body1' color='secondary'>
                    {author.firstName + ' ' + author.lastName} 
                    <span style={{ color: 'black' }}>{' to '}</span> 
                    {recipientUser ? `${recipientUser.firstName} ${recipientUser.lastName} (${recipient.sectionOffice.refNum})` :
                    `${recipient.sectionOffice.officeName} ${recipient.sectionName === "default" ? "" : ` — ${recipient.sectionName}`}`}
                </Typography>
                <Typography variant='h4'>
                    {subject}
                </Typography>
            </Box>

            <Tabs value={tabValue} onChange={(e, value) => setTableValue(value)} sx={{ mt: 2 }}>
                <Tab label="Conversation" />
                {threadData.getThreadById.author.accountId === userId && (
                    <Tab label="Details" />
                )}
                <Tab label="Files" />
                <Tab label="History" />
            </Tabs>
           
            <TabPanel index={0} value={tabValue}>
                <Box sx={{ p: 2 }}>
                    {messages.map(msg => (
                        <Box 
                            key={msg.msgId} 
                            sx={{ 
                                my: 2, 
                                pl: msg.sender.accountId === userId ? 8 : 0,
                                pr: msg.sender.accountId !== userId ? 8 : 0
                            }}
                        >
                            <MessageCard content={msg} sender={msg.sender.accountId === userId} />
                        </Box>
                    ))}
                </Box>

                <Box sx={{ p: 2 }}>
                    {!completed && (
                        <ReplyBox userId={userId} threadId={threadId} attached={attachments} onSubmit={reloadThread} />
                    )}
                </Box>
            </TabPanel>

            {threadData.getThreadById.author.accountId === userId && (
                <TabPanel index={1} value={tabValue}>
                    <RequestDetails userId={userId} thread={threadData.getThreadById} onGenerate={reloadThread} />
                </TabPanel>
           )}

            <TabPanel index={2} value={tabValue}>
                <ThreadDirectory messages={threadData.getThreadById.messages} reqForm={threadData.getThreadById.reqForm} />
            </TabPanel>

            <TabPanel index={3} value={tabValue}>
                <ThreadHistory history={threadData.getThreadById.history} />
            </TabPanel>
        </Box>
    </Paper>
  )
}