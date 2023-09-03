import React from 'react';
// mui
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import { BirOffices, OfficeSections, Roles, UserAccounts } from '../../api/threads/types';
// icons
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// api
import { useQuery } from '@apollo/client';
import { GET_BIR_OFFICE_BY_ID } from '../../api/offices';
import { LoadOverlay } from '../../components/Loaders';
// project imports
import AddOfficerDrawer from './OfficerDialog';
import AddSectionDialog from './AddSectionDialog';
import { useAppSelector } from '../../redux/hooks';


interface OfficeSectionListProps {
    officeId: number;
}

const isAuthorized = (role: Roles | null, office: OfficeSections | null, sectionId: number, officeId: number): boolean => {
    if (!role || !office) return false;
    else if (role.superuser) return true;
    else if (role.roleName === "Section Chief" && office.sectionId === sectionId) return true;
    else if ((role.roleName === "Revenue District Officer" || role.roleName === "Asst. Revenue District Officer") && office.sectionOffice.officeId === officeId) return true;
    else if ((role.roleName === "Division Chief" || role.roleName === "Asst. Division Chief") && office.sectionOffice.officeId === officeId) return true;

    return false;
}

export default function OfficeSectionList(props: OfficeSectionListProps) {
    const theme = useTheme();
    const { role, office: userOffice } = useAppSelector((state) => state.auth);
    const { data: office, loading, refetch } = useQuery<{ getBirOfficeById: BirOffices }>(GET_BIR_OFFICE_BY_ID, { variables: {
        officeId: props.officeId
    }});
    const [userDialog, setUserDialog] = React.useState<boolean>(false);
    const [sectionDialog, setSectionDialog] = React.useState<boolean>(false);
    const [selectedSection, setSelectedSection] = React.useState<OfficeSections | null>(null);
    const [selectedUser, setSelectedUser] = React.useState<UserAccounts | null>(null);

    if (!office) return <LoadOverlay open={loading} />

    const reloadList = () => {
        setSelectedSection(null);
        refetch({ officeId: props.officeId });
    }

    const handleRegisterOfficer = (section: OfficeSections) => {
        setSelectedSection(section);
        setUserDialog(true);
    }

    const handleSelectUser = (user: UserAccounts, section: OfficeSections) => {
        setSelectedSection(section);
        setSelectedUser(user);
        setUserDialog(true);
    } 

    const handleCloseOfficerDialog = () => {
        setSelectedSection(null);
        setSelectedUser(null);
        setUserDialog(false);
    }

    const handleToggleDialog = () => {
        setSectionDialog(!sectionDialog);
        setSelectedSection(null);
    }

    const handleUpdateSection = (section: OfficeSections) => {
        setSelectedSection(section);
        setSectionDialog(true);
    } 

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
                <Typography variant='h6'>{`${office.getBirOfficeById.officeName} Sections`}</Typography>

                {role && role.superuser && (
                    <Button variant='contained' onClick={handleToggleDialog}>Add Section</Button>
                )}
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
                
                {office.getBirOfficeById.officeSections.map(section => (
                    <Grid item md={6} key={section.sectionId}>
                        <Card sx={{ width: '100%', height: '100%' }}>
                            {isAuthorized(role, userOffice, section.sectionId, section.sectionOffice.officeId) ? (
                                <CardHeader 
                                    title={section.sectionName === 'default' ? 'Admin' : section.sectionName}
                                    action={
                                       <>
                                        {section.sectionName !== 'default' && (
                                            <IconButton onClick={() => handleUpdateSection(section)}>
                                                <EditOutlinedIcon />
                                            </IconButton>
                                        )}
                                        <Button variant='contained' sx={{ ml: 2 }} onClick={() => handleRegisterOfficer(section)}>
                                            Register
                                        </Button>
                                       </>
                                    }
                                />
                            ) : (
                                <CardHeader title={section.sectionName === 'default' ? 'Main' : section.sectionName} />
                            )}
                            <CardContent>
                                <Divider />
                                {section.officers.length === 0 && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <SupervisorAccountOutlinedIcon color='secondary' sx={{ fontSize: 48, my: 1 }} />
                                        <Typography variant="subtitle1">
                                            No Officer Registered
                                        </Typography>
                                        {isAuthorized(role, userOffice, section.sectionId, section.sectionOffice.officeId) && (
                                            <Typography variant="body1">
                                                Click Register to Add Officers
                                            </Typography>
                                        )}
                                    </Box>
                                )}
                                <List>
                                    {section.officers.map(officer => (
                                        <React.Fragment key={officer.accountId}>
                                            <ListItemButton alignItems="flex-start" onClick={
                                                isAuthorized(role, userOffice, section.sectionId, section.sectionOffice.officeId) ? 
                                                    () => handleSelectUser(officer, section) : undefined}
                                            >
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
                                                                {officer.role.roleName}
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
                        open={userDialog}  
                        section={selectedSection}
                        officer={selectedUser}
                        office={office.getBirOfficeById}
                        onClose={handleCloseOfficerDialog}
                        onSubmit={reloadList}
                    />
                )}
            </Grid> 

            <AddSectionDialog 
                officeId={props.officeId}
                section={selectedSection}
                open={sectionDialog}
                onSubmit={reloadList}
                onClose={handleToggleDialog}
            />
        </Paper>
    )
}