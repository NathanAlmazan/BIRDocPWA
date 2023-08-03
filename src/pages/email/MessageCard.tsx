import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


export default function MessageCard() {
  return (
    <Card elevation={2}>
      <CardHeader
        avatar={
          <Avatar>
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
        <Divider>Attachments</Divider>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Chip label="Clickable Link" variant="outlined" component="a" href="#basic-chip" clickable />
            <Chip label="Clickable Link" variant="outlined" component="a" href="#basic-chip" clickable />
        </Stack>
      </CardContent>
    </Card>
  );
}
