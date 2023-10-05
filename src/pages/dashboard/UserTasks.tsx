import React from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Thread } from '../../api/threads/types';
// icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
// api
import { useQuery } from '@apollo/client';
import { GET_THREAD_INBOX } from '../../api/threads';

// ----------------------------------------------------------------------

interface UserTasksProps {
    userId: string;
}

export default function UserTasks({ userId }: UserTasksProps) {
    const navigate = useNavigate();
    const { data: tasks } = useQuery<{ getThreadInbox: Thread[] }>(GET_THREAD_INBOX, {
        variables: {
          userId: userId,
          type: "pending"
        },
        fetchPolicy: 'network-only'
    });

  return (
    <Card>
      <CardHeader title='To-Do-List' />

        <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
            {tasks?.getThreadInbox.length === 0 && (
                 <Box sx={{ display: 'flex', height: 280, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <TaskAltIcon color='secondary' sx={{ fontSize: 64, mb: 1 }} />
                    <Typography variant="subtitle1">
                        Job Well Done!
                    </Typography>
                    <Typography variant="body1">
                        You have no recurring tasks
                    </Typography>
                </Box>
            )}
            <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                {tasks?.getThreadInbox.map((task) => (
                    <TaskItem key={task.refId} task={task} />
                ))}
            </Stack>
        </Box>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
            <Button size="small" color="inherit" endIcon={<ArrowForwardIosIcon />} onClick={() => navigate('/app/inbox')}>
                View all
            </Button>
        </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

interface NewsItemProps {
    task: Thread
}

const formatInboxDate = (date: string | Date) => {
    const target = new Date(date);
    return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

function TaskItem({ task }: NewsItemProps) {
  const { subject, author, docType, dateUpdated } = task;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar sx={{ width: 48, height: 48 }}>
            {`${author.firstName.charAt(0)}${author.lastName.charAt(0)}`}
        </Avatar>

        <Box sx={{ minWidth: 240, flexGrow: 1 }}>
            <Typography color="inherit" variant="subtitle2" noWrap>
                {subject}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {`${author.firstName} ${author.lastName} — ${docType.docType}`}
            </Typography>
        </Box>

            <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                {`Updated at ${formatInboxDate(dateUpdated)}`}
            </Typography>
    </Stack>
  );
}