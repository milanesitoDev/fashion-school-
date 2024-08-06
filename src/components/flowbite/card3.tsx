import { Card, Button} from "flowbite-react";
import React, { useState } from "react";
import Modal from  "../flowbite/modal";


const Card_course = function Component() {

  
             
                    const [img_url] = useState(
                      {
                        url: "https://img-b.udemycdn.com/course/240x135/5082228_5d52_4.jpg",
                        title: 'Building Blog using MERN Stack',
                        description: 'Building an in-depth full-stack Blog project application using Nodejs, Express, React, and MongoDB along with ES6+',
                      }
                    );
                  
                  
   

  return (
    <Card
      className="max-w-sm mb-9 flex "
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