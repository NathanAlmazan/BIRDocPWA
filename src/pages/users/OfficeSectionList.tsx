import React from 'react';
// mui
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import { BirOffices, OfficeSections, UserAccounts } from '../../api/threads/types';
// icons
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
// api
import { useQuery } from '@apollo/client';
import { GET_BIR_OFFICE_BY_ID } from '../../api/offices';
import { LoadOverlay } from '../../components/Loaders';
// project imports
import AddOfficerDrawer from './OfficerDialog';


interface OfficeSectionListProps {
    officeId: number;
}

export default function OfficeSectionList(props: OfficeSectionListProps) {
    const theme = useTheme();
    const { data: office, loading, refetch } = useQuery<{ getBirOfficeById: BirOffices }>(GET_BIR_OFFICE_BY_ID, { variables: {
        officeId: props.officeId
    }});
    const [selectedSection, setSelectedSection] = React.useState<OfficeSections | null>(null);
    const [selectedUser, setSelectedUser] = React.useState<UserAccounts | null>(null);

    if (!office) return <LoadOverlay open={loading} />

    const reloadList = () => refetch({ officeId: props.officeId });

    const handleSelectUser = (user: UserAccounts, section: OfficeSections) => {
        setSelectedSection(section);
        setSelectedUser(user);
    } 

    const handleCloseOfficerDialog = () => {
        setSelectedSection(null);
        setSelectedUser(null);
    }

    return (
        <Paper sx={{ width: "100%", height: '100%' }}>
            <Box 
                sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center'
                }}
            >
                <Typography variant='h6'>{`${office.getBirOfficeById.officeName} Sections`}</Typography>
            </Box>

            <Divider />

            <Grid 
                container   
                spacing={3} 
                alignItems="stretch" 
                sx={{ 
                    mt: 1,
                    px: 2,
                    pb: 2,
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
                
                {office.getBirOfficeById.officeSections.filter((o, index, arr) => o.sectionName !== "default" || arr.length === 1).map(section => (
                    <Grid item md={6} key={section.sectionId}>
                        <Card sx={{ width: '100%', height: '100%' }}>
                            <CardHeader 
                                title={section.sectionName === 'default' ? 'Main' : section.sectionName}
                                action={
                                    <Button variant='contained' sx={{ ml: 2 }} onClick={() => setSelectedSection(section)}>
                                        Register
                                    </Button>
                                }
                            />
                            <CardContent>
                                <Divider />
                                {section.officers.length === 0 && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <SupervisorAccountOutlinedIcon color='secondary' sx={{ fontSize: 48, my: 1 }} />
                                        <Typography variant="subtitle1">
                                            No Officer Registered
                                        </Typography>
                                        <Typography variant="body1">
                                            Click Register to Add Officers
                                        </Typography>
                                    </Box>
                                )}
                                <List>
                                    {section.officers.map(officer => (
                                        <React.Fragment key={officer.accountId}>
                                            <ListItemButton alignItems="flex-start" onClick={() => handleSelectUser(officer, section)}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        {`${officer.firstName.charAt(0)}${officer.lastName.charAt(0)}`}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Box>
                                                            <Typography variant='body1'>
                                                                {officer.firstName + ' ' + officer.lastName}
                                                            </Typography>
                                                            <Typography variant='caption' gutterBottom>
                                                                {officer.position}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                            </ListItemButton>
                                            <Divider variant="inset" component="li" />
                                        </React.Fragment>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {selectedSection && (
                    <AddOfficerDrawer 
                        open={selectedSection !== null}  
                        section={selectedSection}
                        officer={selectedUser}
                        office={office.getBirOfficeById}
                        onClose={handleCloseOfficerDialog}
                        onSubmit={reloadList}
                    />
                )}
            </Grid> 
        </Paper>
    )
}