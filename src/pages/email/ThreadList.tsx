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

// icons
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

// project imports
import MessageCard from './MessageCard';
import ReplyBox from './ReplyBox';

export default function ThreadList() {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleExpand = () => setExpanded(!expanded);

  return (
    <Stack spacing={3} sx={{ p: 2 }}>
        <Box sx={{ width: '100%' }}>
            <Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
            <Typography variant='subtitle2'>Sample Document Type</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography variant='subtitle2'>Created at Jan. 5, 2023 10:05 PM</Typography>
                    <IconButton onClick={handleExpand}>
                        {expanded ? <CloseIcon /> : <SettingsIcon />}
                    </IconButton>
                </Box>
            </Stack>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Stack direction='row' spacing={2} justifyContent='flex-end' sx={{ mb: 2 }}>
                    <TextField
                        name='status'
                        label='Status'
                        select
                        sx={{ width: 200 }}
                    >
                        <MenuItem value='sample1'>Sample Value 1</MenuItem>
                        <MenuItem value='sample2'>Sample Value 2</MenuItem> 
                    </TextField>
                    <TextField
                        name='attachments'
                        label='Attachments'
                        select
                        sx={{ width: 200 }}
                    >
                        <MenuItem value='required'>Required</MenuItem>
                        <MenuItem value='notRequired'>Not Required</MenuItem> 
                    </TextField>
                </Stack>
            </Collapse>
            
            <Divider />

            <Typography variant='subtitle1' color='secondary' sx={{ mt: 2 }}>
                John Doe <span style={{ color: 'black' }}>to</span> Collection Division — Tax Collection Office
            </Typography>
            <Typography variant='h4' sx={{ fontWeight: 700 }}>
                Test Subject of Thread
            </Typography>
        </Box>

        <MessageCard />

        <ReplyBox thread />
    </Stack>
  )
}