import React from 'react';
// mui
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FolderIcon from '@mui/icons-material/Folder';
import Link from '@mui/material/Link';
// types
import { MessageFiles, Messages } from '../../api/threads/types';


export default function ThreadDirectory(props: { messages: Messages[], reqForm?: string }) {
    const [files, setFiles] = React.useState<MessageFiles[]>([]);

    React.useEffect(() => {
        let msgFiles: MessageFiles[] = [];
        props.messages.forEach(msg => {
            msgFiles = msgFiles.concat(msg.files)
        });
        setFiles(msgFiles);

    }, [props.messages])

    console.log(files);

    return (
        <Box sx={{ width: '100%', p: 2 }}>
             <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Shared Files
            </Typography>
            <List>
              {props.reqForm && (
                <>
                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography component={Link} variant='body1' href={props.reqForm} target='_blank'>
                                    Form 2309
                                </Typography>
                            }
                            secondary='application/PDF'
                        />
                    </ListItem>
                    <Divider />
                </>
              )}

              {files.map(file => (
                <React.Fragment key={file.fileId}>
                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography component={Link} variant='body1' href={file.fileUrl} target='_blank'>
                                    {file.fileName}
                                </Typography>
                            }
                            secondary={file.fileType}
                        />
                    </ListItem>
                    <Divider />
                </React.Fragment>
              ))}
            </List>
        </Box>
    )
}