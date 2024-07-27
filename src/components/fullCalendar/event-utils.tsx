import { EventInput } from '@fullcalendar/core'
import {arrays2} from '../../api/components/schedules/returnScheduleteacher'


let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today


let array2:any =[] 

array2 = arrays2
 export const  INITIAL_EVENTS: EventInput[] = array2




//export default  INITIAL_EVENTS




export function createEventId() {
  return String(eventGuid++)
}
