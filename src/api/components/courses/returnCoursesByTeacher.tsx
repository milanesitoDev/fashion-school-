import {  FC, useEffect,useState } from 'react';
import { AxiosError } from 'axios';
import axios from '../../../api/axios';
import {  Dropdown  } from "flowbite-react";

// reciv
type IdTeacher = {
    id: number;
   
  };

interface listCourse {
    TeacherId:IdTeacher
}

interface Courses {
  id: number;
  description: string;
}

const URL = '/courses/teacher/3';

 const DropdownList: FC<listCourse> = ({TeacherId}) => {
  
  const [listCourse, setCourses] = useState<Courses[]>([]);  
  useEffect(() => {
    (async () => {
      try {    

        const prueba2 = await axios.get(URL, {
            params: {
                id: TeacherId.id
              }
        })
          if(prueba2.status === 200){
           setCourses(prueba2.data.data)  
          }          
      
      } catch (e) {
      const error = e as AxiosError;
      console.log(error)
      }
    })();
  }, []);

    return (
      <Dropdown color="gray" className='text-slate-950' label="Todas las materias" >   
    {listCourse.map((course) => (
      <Dropdown.Item>{course.description}</Dropdown.Item>
    ))}
    <Dropdown.Divider />
  </Dropdown>
      
    )
}


export default DropdownList