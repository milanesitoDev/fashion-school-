import {  FC, useEffect,useState } from 'react';
import { AxiosError } from 'axios';
import axios from '../../../api/axios';

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

interface Courses {
    id: number;
    activity: string;
    start_hour: string;
    arrays2:cou
  }
 type cou = {
    id: string;
    activity: string;
    start_hour: string
 }


const eventsCalendar: FC = () => {
    const URL = '/schedule/teacher/3';
  const [listCourse, setCourses] = useState<Courses[]>([]);  
  
  useEffect(() => {
   
    (async () => {
      
      try {    
  
        const prueba2 = await axios.get(URL, {
            params: {
                id: 3
              }
        })
          if(prueba2.status === 200){
           setCourses(prueba2.data.data)  
           console.log(prueba2.data.data)
          }          
      
      } catch (e) {
      const error = e as AxiosError;
      console.log(error)
      }
    })();
  }, [arrays2]);


 listCourse.map((course) => (
 arrays2.push (
      {      
            id: createEventId(),
            title: course.activity,
            start: todayStr        
      },
 
    )
    
))
console.log(arrays2)


  return (<><p></p></>) 
  }


  export const arrays2 = [
     
       {
      
       },
         
  ]

  export default eventsCalendar


  export function createEventId() {
    return String(eventGuid++)
  }
 /*  export function GetEvent(){
    return  arrays2 = [
        {
           id: createEventId(),
           title: 'Matematicas Meeting',
           start: todayStr
         },
           {
           id: createEventId(),
           title: 'Timed event',
           start: todayStr + 'T12:00:00'
         }
    ]
   }
    */