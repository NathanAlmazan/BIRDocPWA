import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// types
import { Messages } from '../../api/threads/types';


export default function MessageCard({ content, sender }: { content: Messages, sender: boolean }) {

  if (sender) return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            {`${content.sender.firstName.charAt(0)}${content.sender.lastName.charAt(0)}`}
          </Avatar>
        }
        title={content.sender.firstName + ' ' + content.sender.lastName}
        subheader={content.sender.position}
        action={
          <Typography variant='body2'>
            {new Date(content.dateSent).toString().split('GMT')[0]}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {content.message}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {content.files.map(file => (
              <Chip key={file.fileId} label={file.fileName} variant="outlined" component="a" href={file.fileUrl} clickable />
            ))}
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ border: '1px solid #989898', borderRadius: 3 }}>
      <CardHeader
        avatar={
          <Avatar>
            {`${content.sender.firstName.charAt(0)}${content.sender.lastName.charAt(0)}`}
          </Avatar>
        }
        title={content.sender.firstName + ' ' + content.sender.lastName}
        subheader={content.sender.position}
        action={
          <Typography variant='body2'>
            {new Date(content.dateSent).toString().split('GMT')[0]}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {content.message}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {content.files.map(file => (
              <Chip key={file.fileId} label={file.fileName} variant="outlined" component="a" href={file.fileUrl} clickable />
            ))}
        </Stack>
      </CardContent>
    </Box>
  );
}
