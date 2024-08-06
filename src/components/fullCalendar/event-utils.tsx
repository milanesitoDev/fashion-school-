import { EventInput } from '@fullcalendar/core'
import {arrays2} from '../../api/components/schedules/returnScheduleteacher'




let eventGuid = 0


//let array2:any =[] 

//array2 = arrays2

   export const  INITIAL_EVENTS: EventInput[] = arrays2

export function createEventId() {
  return String(eventGuid++)
}
