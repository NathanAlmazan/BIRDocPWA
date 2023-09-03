import React from 'react';
// mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { ThreadHistory } from '../../api/threads/types';

const formatInboxDate = (date: string | Date) => {
    const target = new Date(date);
    return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

export default function History(props: { history: ThreadHistory[] }) {

    const handleSeverity = (status: string | null) => {
        if (status && status.includes("Closed")) return "success";
        else if (status && status.includes("Progress")) return "info";
        else if (status && status.includes("Approval")) return "warning";
        else return "info"
    }

    return (
        <Box sx={{ width: '100%', p: 2 }}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Request History
            </Typography>
            <Stack spacing={2}>
                {props.history.map(event => (
                    <Alert severity={handleSeverity(event.status ? event.status.statusLabel : null)}>
                        {`${event.historyLabel} ${event.status ? `to ${event.status.statusLabel}`: ''} at ${formatInboxDate(event.dateCreated)}`}
                    </Alert>
                ))}
            </Stack>
        </Box>
    )
}