import {  FC, useEffect,useState } from 'react';
import { AxiosError } from 'axios';
import axios from '../../../api/axios';


interface Courses {
   id:number,
   name:string,
   age:number,
   joinDate:string,
   role:number
   
  }
  interface Coursebystudent {
    user:{id:number, name:string, email:string};
  }
 
  //let arr:students[] = []
 export const arrays2:Courses[] = []

const CalificationCourse: FC = () => {
    const URL = '/students/courses/2';
  const [listCourse, setCourses] = useState<Coursebystudent[]>([]);  
  
  useEffect(() => {
   
    (async () => {
      
      try {    
  
        const response = await axios.get(URL, {
            params: {
                id: 3
              }
        })
          if(response.status === 200){
           setCourses(response.data.data)  
          //response.data.data[0].user
          //console.log(response.data.data)
          }          
      
      } catch (e) {
      const error = e as AxiosError;
      console.log(error)
      }
    })();
  }, [arrays2]);

  arrays2.shift()
 listCourse.map((course) => (

 arrays2.push (
      {      
        id: course.user.id,
        name: course.user.name,
        age: 25,
        joinDate: course.user.email,
        role: 100,      
      },
 
    )
))
//arrays2.shift()

console.log(arrays2)


  return (<><p></p></>) 
  }


  

      
         
  

  export default CalificationCourse