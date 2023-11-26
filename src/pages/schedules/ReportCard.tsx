import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// types
import { Reports } from '../../api/schedules/types';


const formatInboxDate = (date: string | Date) => {
  const target = new Date(date);
  return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

export default function MessageCard({ content }: { content: Reports }) {
  return (
    <Card sx={{ my: 1 }}>
      <CardHeader
        avatar={
          <Avatar>
            {`${content.author.firstName.charAt(0)}${content.author.lastName.charAt(0)}`}
          </Avatar>
        }
        title={content.author.firstName + ' ' + content.author.lastName}
        subheader={content.author.officeSection.sectionOffice.officeName}
        action={
          <Typography variant='body2'>
            {formatInboxDate(content.reportDate)}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {content.message}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {content.files.map(file => (
              <Chip 
                key={file.fileId} 
                label={file.fileName} 
                variant="outlined" 
                component="a" 
                href={file.fileUrl} 
                target='_blank' 
                clickable 
              />
            ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
