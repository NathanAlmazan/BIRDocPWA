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
// project imports
import { LoadOverlay } from '../../components/Loaders';
import { DocumentStatus } from '../../api/threads/types';
import { GET_ALL_THREAD_STATUS } from '../../api/settings';
import AddStatusDialog from './AddStatusDialog';
import DeleteStatusDialog from './DeleteStatusDialog';


export default function DocumentStatusList() {
    const theme = useTheme();
    const { data: statusList, refetch } = useQuery<{ getAllThreadStatus: DocumentStatus[] }>(GET_ALL_THREAD_STATUS); 
    const [add, setAdd] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<DocumentStatus | null>(null);

    const handleToggleDialog = () => setAdd(!add);

    const handleRefresh = () => refetch();
    
    const handleConfirmDelete = (status: DocumentStatus) => setSelected(status); 

    if (!statusList) return <LoadOverlay open={true} /> 

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
                <Typography variant='h6'>Document Status</Typography>
                <Button variant='contained' onClick={handleToggleDialog}>Add Status</Button>
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

                {statusList.getAllThreadStatus.length === 0 && (
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

                {statusList.getAllThreadStatus.map(status => (
                    <React.Fragment key={status.statusId}>
                         <ListItem secondaryAction={
                            <IconButton onClick={() => handleConfirmDelete(status)}>
                                <DeleteOutlineOutlinedIcon color='error' fontSize='small' />
                            </IconButton>
                        }>
                            <ListItemText
                                primary={
                                    <Typography variant='body1'>
                                        {status.statusLabel}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>

            <AddStatusDialog open={add} onClose={handleToggleDialog} onSubmit={handleRefresh} />

            {selected && (
                <DeleteStatusDialog open={selected !== null} status={selected} onClose={() => setSelected(null)} onDelete={handleRefresh} />
            )}
        </Paper>
    )
}