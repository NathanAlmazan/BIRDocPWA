import React from 'react';
// mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
// icons
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// project imports
import ReplyBox from './ReplyBox';

interface CreateThreadProps {
    onDiscardThread: () => void
}

export default function CreateThread(props: CreateThreadProps) {
  return (
    <Stack spacing={3}>
        <div>
            <Stack direction='row' spacing={1} alignItems='center' sx={{ py: 1 }}>
                <Button 
                    variant='contained' 
                    endIcon={<SendIcon />}

                >
                    Send
                </Button>
                <Tooltip title='Discard'>
                    <IconButton onClick={props.onDiscardThread}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Divider />
        </div>
        <Stack direction='row' spacing={2}>
            <Chip label='To' variant='outlined' sx={{ width: 80 }} />
            <TextField 
                name='recipient'
                variant='standard'
                fullWidth
            />
        </Stack>
        <Stack direction='row' spacing={2}>
            <Chip label='Subject' variant='outlined' sx={{ width: 80 }} />
            <TextField 
                name='recipient'
                variant='standard'
                fullWidth
            />
        </Stack>
        <Stack direction='row' spacing={2}>
            <Chip label='Type' variant='outlined' sx={{ width: 80 }} />
            <TextField 
                name='recipient'
                variant='standard'
                fullWidth
            />
        </Stack>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Attachments Required" />

        <ReplyBox />
    </Stack>
  )
}