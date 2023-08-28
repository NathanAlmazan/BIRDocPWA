import React from 'react';
// mui
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
// icons
import BusinessIcon from '@mui/icons-material/Business';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// project imports
import AddOfficeDialog from './AddOfficeDialog';
import { LoadOverlay } from '../../components/Loaders';
// api
import { useQuery } from '@apollo/client';
import { GET_ALL_BIR_OFFICES } from '../../api/offices';
import { BirOffices } from '../../api/threads/types';
// redux
import { useAppSelector } from '../../redux/hooks';


interface OfficeListProps {
    selected: number;
    onSelect: (id: number) => void;
}

export default function OfficeList(props: OfficeListProps) {
    const theme = useTheme();
    const { role } = useAppSelector((state) => state.auth);
    const { data: offices, refetch } = useQuery<{ getAllBirOffices: BirOffices[] }>(GET_ALL_BIR_OFFICES);
    const [officeDialog, setOfficeDialog] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<BirOffices | null>(null);

    const handleToggleDialog = () => setOfficeDialog(!officeDialog);

    const handleRefresh = () => refetch();
    
    const handleEditOffice = (office: BirOffices) => {
        setSelected(office); 
        setOfficeDialog(true);
    }

    if (!offices) return <LoadOverlay open={true} />

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
                <Typography variant='h6'>BIR Offices</Typography>
                {role && role.superuser && (
                    <Button variant='contained' onClick={handleToggleDialog}>Add Office</Button>
                )}
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

                {offices.getAllBirOffices.length === 0 && (
                     <Box sx={{ display: 'flex', height: 300, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <BusinessIcon color='secondary' sx={{ fontSize: 64, mb: 1 }} />
                        <Typography variant="subtitle1">
                            No Office Yet
                        </Typography>
                        <Typography variant="body1">
                            Create an office
                        </Typography>
                    </Box>
                )}

                {offices.getAllBirOffices.map(office => (
                    <ListItem key={office.officeId} secondaryAction={role && role.superuser && (
                        <IconButton onClick={() => handleEditOffice(office)}>
                            <EditOutlinedIcon />
                        </IconButton>
                    )}>
                        <ListItemButton 
                            alignItems="flex-start" 
                            selected={office.officeId === props.selected}
                            onClick={() => props.onSelect(office.officeId)}
                        >
                            <ListItemText
                                primary={
                                    <Box>
                                        <Typography variant='body1'>
                                            {office.officeName}
                                        </Typography>
                                        <Typography variant='caption' gutterBottom>
                                            RR-6
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                    </ListItem>
                ))}
            </List>

            <AddOfficeDialog 
                open={officeDialog} 
                office={selected}
                onClose={handleToggleDialog} 
                onSubmit={handleRefresh} 
            />
        </Paper>
    )   
}