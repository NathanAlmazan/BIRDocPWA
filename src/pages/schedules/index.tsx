import React from 'react';
// mui
import Stack from '@mui/material/Stack';
import dayjs, { Dayjs } from 'dayjs';
// project components
import Calendar from './Calendar';
import Form from './Form';
import { Schedules } from '../../api/schedules/types';
import { GET_ALL_SCHEDULES } from '../../api/schedules';
import { useQuery } from '@apollo/client';
import EventList from './EventList';
import EventDetails from './EventDetails';
import { useAppSelector } from '../../redux/hooks';


export const formatSummaryDate = (date: string | Date) => {
    const target = new Date(date);
    return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

export default function SchedulePage() {
    const { uid } = useAppSelector((state) => state.auth);
    const { data: schedules, refetch } = useQuery<{ getAllSchedules: Schedules[] }>(GET_ALL_SCHEDULES, {
        variables: {
            userId: uid
        }
    });

    const [events, setEvents] = React.useState<Schedules[]>([]);
    const [date, setDate] = React.useState<Dayjs | null>(dayjs(new Date()));
    const [open, setOpen] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<Schedules | null>(null);

    React.useEffect(() => {
        if (date && schedules) {
            setSelected(null);
            setEvents(schedules.getAllSchedules.filter(event => 
                (event.repeat === 'Monthly' && new Date(event.dateDue).getDate() === date.date()) ||
                (event.repeat === 'Yearly' && new Date(event.dateDue).getMonth() === date.month() && new Date(event.dateDue).getDate() === date.date())))
        }
    }, [schedules, date])

    const handleChangeActiveDate = (date: Dayjs | null) => {
        setDate(date);
    }

    const handleToggleDrawer = () => {
        setOpen(!open);
        setSelected(null);
        refetch();
    }

    const handleSelectSchedule = (schedId: string) => {
        const schedule = events.find(event => event.schedId === schedId);
        setSelected(schedule ? schedule : null);
    }

    return (
       <Stack direction='row' spacing={2}>
        <Stack spacing={2}>
                {schedules && (
                    <Calendar 
                        value={date}
                        events={schedules.getAllSchedules}
                        onChange={handleChangeActiveDate}
                    />
                )}

                {date && (
                    <EventList 
                        events={events} 
                        selected={selected ? selected.schedId : null}
                        selectedDate={date.toISOString()}  
                        onSelect={handleSelectSchedule}
                        onOpen={handleToggleDrawer}
                    />
                )}
        </Stack>
            {open ? (
                <Form onClose={handleToggleDrawer} date={date} selected={selected} />
            ) : date && (
                <EventDetails 
                    selectedDate={date.toISOString()} 
                    event={selected} 
                    onEdit={() => setOpen(true)} 
                    onSubmit={() => setSelected(null)}
                />
            )}
       </Stack>
    )
}