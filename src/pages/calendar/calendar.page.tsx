import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './calendar.pages.css'
export default function DateCalendarValue() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2024-04-17'));

  return (
    <div className='container__calendar'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer  components={['DateCalendar']} >
        <DemoItem>
          <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
    </div>
    
  );
}
