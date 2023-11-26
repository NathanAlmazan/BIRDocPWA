import React from 'react';
// mui
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
// icons
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// project imports
import { Schedules } from '../../api/schedules/types';
import { formatSummaryDate } from '.';
import { useAppSelector } from '../../redux/hooks';


interface EventListProps {
    selectedDate: string;
    events: Schedules[];
    selected: string | null;
    onOpen: () => void;
    onSelect: (schedId: string) => void;
}

export default function EventList(props: EventListProps) {
    const theme = useTheme();
    const { role } = useAppSelector((state) => state.auth);
    
    return (
        <Card>
            <CardHeader 
                title='Reports' 
                subheader={formatSummaryDate(props.selectedDate)} 
                action={
                    role && role.superuser ? 
                    <IconButton onClick={props.onOpen}>
                        <AddIcon />
                    </IconButton>
                    :
                    undefined
                }
            />
            <CardContent>
                <List 
                    sx={{ 
                        width: 350, 
                        maxHeight: 'calc(100vh - 620px)', 
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
                            background: theme.palette.secondary.main
                        },
                        
                        /* Handle on hover */
                        "::-webkit-scrollbar-thumb:hover": {
                            background: theme.palette.primary.dark
                        }
                    }}>
                        {props.events.map(event => (
                                <ListItemButton 
                                    key={event.schedId} 
                                    selected={props.selected === event.schedId}
                                    onClick={() => props.onSelect(event.schedId)}
                                >
                                    <ListItemText 
                                        primary={event.subject}
                                        secondary={event.description.slice(0, 100) + "..."}
                                    />
                                </ListItemButton>
                        ))}
                        
                        {props.events.length === 0 && (
                            <Stack spacing={1} justifyContent="center" alignItems="center" sx={{ minHeight: 100 }}>
                                <CalendarTodayIcon sx={{ width: 50, height: 50 }} />
                                <Typography variant='body2'>No Scheduled</Typography>
                            </Stack>
                        )}
                    </List>
            </CardContent>
        </Card>
    )
}