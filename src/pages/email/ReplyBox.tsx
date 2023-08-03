import React from 'react'
// mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';

// icons
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

export default function ReplyBox({ thread }: { thread?: boolean }) {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#F2F3F4', position: 'relative' }}>
        <TextField 
            name='message'
            multiline
            rows={7}
            fullWidth
        />
        <Stack 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center' 
            sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 1 }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Tooltip title='Upload File'>
                    <IconButton>
                        <FileUploadIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Insert Link'>
                    <IconButton>
                        <InsertLinkIcon />
                    </IconButton>
                </Tooltip>
                <Chip
                    label="Attachments"
                    sx={{ mx: 1 }}
                />
            </Box>

            {thread && (
                <Button variant='contained' size='large'>Send</Button>
            )}
        </Stack>
    </Box>
  )
}