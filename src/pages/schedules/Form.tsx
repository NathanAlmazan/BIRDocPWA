import React from 'react';
// mui
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import FormControl from '@mui/material/FormControl';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// project components
import { GET_ALL_ROLES } from '../../api/offices';
import { Roles } from '../../api/threads/types';
import { useMutation, useQuery } from '@apollo/client';
import { Schedules } from '../../api/schedules/types';
import { CREATE_SCHEDULE, DELETE_SCHEDULE, UPDATE_SCHEDULE } from '../../api/schedules';

interface ScheduleFormProps {
    date: Dayjs | null;
    selected: Schedules | null;
    onClose: () => void;
}

interface ScheduleFormData {
    subject: string,
    description: string,
    recipientIds: string[],
    type: string,
    repeat: string,
    dateStart: string,
    dateDue: string
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ScheduleForm(props: ScheduleFormProps) {
    const { data: roles } = useQuery<{ getAllRoles: Roles[] }>(GET_ALL_ROLES);
    const [addSchedule] = useMutation<{ addSchedule: Schedules }>(CREATE_SCHEDULE);
    const [updateSchedule] = useMutation<{ addSchedule: Schedules }>(UPDATE_SCHEDULE);
    const [deleteSchedule] = useMutation<{ addSchedule: Schedules }>(DELETE_SCHEDULE);

    const [formData, setFormData] = React.useState<ScheduleFormData>({
        subject: '',
        description: '',
        recipientIds: [],
        type: 'Report',
        repeat: 'Monthly',
        dateStart: props.date ? props.date.toISOString() : '',
        dateDue: props.date ? props.date.toISOString() : ''
    });
    const { subject, description, type, repeat, dateDue, recipientIds } = formData;

    React.useEffect(() => {
        if (props.selected) {
            setFormData({
                subject: props.selected.subject,
                description: props.selected.description,
                recipientIds: [],
                type: props.selected.type,
                repeat: props.selected.repeat,
                dateStart: new Date(props.selected.dateStart).toISOString(),
                dateDue: new Date(props.selected.dateDue).toISOString()
            })
        }
    }, [props.selected])

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleDateChange = (value: Dayjs | null) => {
        if (value) setFormData({ ...formData, dateStart: value.toISOString(), dateDue: value.toISOString() })
    }

    const handleRecipientChange = (event: SelectChangeEvent<typeof recipientIds>) => {
        const {
          target: { value },
        } = event;
        setFormData({
            ...formData, recipientIds: typeof value === 'string' ? value.split(',') : value
        });
    };

    const handleSaveSchedule = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (props.selected) {
            updateSchedule({ variables: { scheduleId: props.selected.schedId, data: formData }})
            .then(() => props.onClose())
            .catch(err => console.log(err));
        } else {
            addSchedule({ variables: { data: formData }})
            .then(() => props.onClose())
            .catch(err => console.log(err));
        }
    }

    const handleDeleteSchedule = async () => {
        if (props.selected) {
            deleteSchedule({ variables: { scheduleId: props.selected.schedId }})
            .then(() => props.onClose())
            .catch(err => console.log(err));
        }
    }

    return (
        <Card sx={{ minWidth: 500 }}>
            <CardHeader 
                title={props.selected ? 'Update Event' : 'Create Event' }
                action={
                    <Button variant='contained' color='error' onClick={props.onClose}>
                        Cancel
                    </Button>
                }
            />
            <CardContent>
                <Stack spacing={2} component='form' onSubmit={handleSaveSchedule}>
                    <TextField 
                        variant='outlined'
                        name='subject'
                        label='Subject'
                        value={subject}
                        onChange={handleTextChange}
                        required
                    />

                    <TextField 
                        variant='outlined'
                        name='description'
                        label='Description'
                        multiline
                        value={description}
                        onChange={handleTextChange}
                        rows={3}
                        required
                    />

                    <FormControl>
                        <InputLabel id="checkbox-label">Concerned Officers</InputLabel>
                            <Select
                                labelId="checkbox-label"
                                id="multiple-checkbox"
                                multiple
                                value={recipientIds}
                                onChange={handleRecipientChange}
                                input={<OutlinedInput label="Concerned Officers" />}
                                MenuProps={MenuProps}   
                                required
                            >
                                {roles && roles.getAllRoles.filter(role => ![1, 2, 10].includes(role.roleId)).map(role => (
                                    <MenuItem key={role.roleId} value={role.roleId}>{role.roleName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    <TextField 
                        variant='outlined'
                        name='type'
                        label='Type'
                        value={type}
                        onChange={handleTextChange}
                        select
                        required
                    >
                        {['Report', 'Reminder'].map(type => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </TextField>

                    <TextField 
                        variant='outlined'
                        name='repeat'
                        label='Repeat'
                        value={repeat}
                        onChange={handleTextChange}
                        select
                        required
                    >
                        {['Monthly', 'Yearly'].map(type => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </TextField>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            label="Date Due"
                            views={["year", "month", "day"]} 
                            format="MMMM DD, YYYY"
                            value={dayjs(dateDue)}
                            onChange={(value) => handleDateChange(value)}
                        />
                    </LocalizationProvider>

                    <Button type='submit' variant='contained'>Save</Button>

                    {props.selected && (
                        <Button variant='outlined' onClick={handleDeleteSchedule}>Delete</Button>
                    )}
                </Stack>
            </CardContent>
        </Card>
    )
}