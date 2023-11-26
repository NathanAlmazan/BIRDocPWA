import * as React from 'react';
import Card from '@mui/material/Card';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Schedules } from '../../api/schedules/types';


function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      color="error"
      badgeContent={isSelected ? `${highlightedDays.filter(date => date === props.day.date()).length}` : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}


interface CalendarProps {
    value: Dayjs | null;
    events: Schedules[];
    onChange: (date: Dayjs | null) => void;
}

export default function DateCalendarServerRequest(props: CalendarProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeDate, setActiveDate] = React.useState<Dayjs | null>(dayjs(new Date().toISOString()));
  const [highlightedDays, setHighlightedDays] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (activeDate && props.events) {
      setIsLoading(true);
      
      const activeEvents = props.events.filter(event => 
        (event.repeat === 'Monthly') ||
        (event.repeat === 'Yearly' && new Date(event.dateDue).getMonth() === activeDate.month()))

      const dueDates = activeEvents.map(event => new Date(event.dateDue).getDate());
      setHighlightedDays(dueDates);

      setIsLoading(false);
    }
  }, [props.events, activeDate]);

  const handleDateChange = (date: Dayjs) => {
    setActiveDate(date);
  };

  return (
    <Card sx={{ p: 3 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={props.value}
          onChange={(value) => props.onChange(value)}
          defaultValue={props.value}
          loading={isLoading}
          onMonthChange={handleDateChange}
          onYearChange={handleDateChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            } as any,
          }}
        />
      </LocalizationProvider>
    </Card>
  );
}
