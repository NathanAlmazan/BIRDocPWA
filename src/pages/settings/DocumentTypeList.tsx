import React from 'react';
// mui
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
// icons
import BusinessIcon from '@mui/icons-material/Business';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// api
import { useQuery } from '@apollo/client';
import { GET_ALL_THREAD_TYPES } from '../../api/settings';
import { DocumentTypes } from '../../api/threads/types';
// project imports
import { LoadOverlay } from '../../components/Loaders';
import AddTypeDialog from './AddTypeDialog';
import DeleteTypeDialog from './DeleteTypeDialog';


export default function ThreadTypeList() {
    const theme = useTheme();
    const { data: docTypes, refetch } = useQuery<{ getAllThreadTypes: DocumentTypes[] }>(GET_ALL_THREAD_TYPES); 
    const [add, setAdd] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<DocumentTypes | null>(null);

    const handleToggleDialog = () => setAdd(!add);

    const handleRefresh = () => refetch();
    
    const handleConfirmDelete = (type: DocumentTypes) => setSelected(type); 

    if (!docTypes) return <LoadOverlay open={true} /> 

    return (
        <Paper sx={{ width: "100%", height: '100%' }}>
            <Box 
                sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                }}
            >
                <Typography variant='h6'>Document Types</Typography>
                <Button variant='contained' onClick={handleToggleDialog}>Add Type</Button>
            </Box>

            <Divider />

            <List 
                sx={{ 
                    width: '100%', 
                    maxHeight: 'calc(100vh - 170px)', 
                    overflowY: 'auto',
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
                        background: theme.palette.secondary.dark
                    },
                    
                    /* Handle on hover */
                    "::-webkit-scrollbar-thumb:hover": {
                        background: theme.palette.primary.dark
                    }
                }}>

                {docTypes.getAllThreadTypes.length === 0 && (
                     <Box sx={{ display: 'flex', height: 300, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <BusinessIcon color='secondary' sx={{ fontSize: 64, mb: 1 }} />
                        <Typography variant="subtitle1">
                            No Document Type Yet
                        </Typography>
                        <Typography variant="body1">
                            Create a Document Type
                        </Typography>
                    </Box>
                )}

                {docTypes.getAllThreadTypes.map(docType => (
                    <React.Fragment key={docType.docId}>
                        <ListItem secondaryAction={
                            <IconButton onClick={() => handleConfirmDelete(docType)}>
                                <DeleteOutlineOutlinedIcon color='error' fontSize='small' />
                            </IconButton>
                        }>
                            <ListItemText
                                primary={
                                    <Typography variant='body1'>
                                        {docType.docType}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>

            <AddTypeDialog open={add} onClose={handleToggleDialog} onSubmit={handleRefresh} />

            {selected && (
                <DeleteTypeDialog open={selected !== null} docType={selected} onClose={() => setSelected(null)} onDelete={handleRefresh} />
            )}
        </Paper>
    )
}