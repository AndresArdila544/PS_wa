import 'date-fns';
import { format, compareAsc } from 'date-fns'
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

export default function TimePicker(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('1970-01-01T00:00:00'));

  const handleDateChange = (date) => {
    
    setSelectedDate(date);
    date = format(date,'HH:mm')
    props.parentCallback(date)
  };
  

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
     
        <KeyboardTimePicker
          margin="normal"
          id={props.name}
          label={props.name}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      
    </MuiPickersUtilsProvider>
  );
}