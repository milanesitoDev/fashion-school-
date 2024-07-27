import { Card, Button} from "flowbite-react";
import React, { useState } from "react";
import Modal from  "../flowbite/modal";


const Card_course = function Component() {

  
             
                    const [img_url] = useState(
                      {
                        url: "https://img-c.udemycdn.com/course/240x135/3327890_e871_5.jpg",
                        title: 'Master en React: Aprender ReactJS, Hooks, MERN',
                        description: 'Aprende React JS con Hooks desde cero y desarrolla aplicaciones web con el MERN Stack (Portafolio, Blog y Red Social)',
                      }
                    );
                  
                  
   

  return (
    <Card
      className="max-w-sm mb-9 flex"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={img_url.url}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {img_url.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <br />
      </p>
 
      <Modal/>
    </Card>
  );
}


export default Card_course;