"use client";

import { Avatar, Button, Datepicker, Drawer, Label, Textarea, TextInput, theme } from "flowbite-react";
import { useState, Component } from "react";
import { HiCalendar, HiUserAdd } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import {Calendar2, Calendar} from '../fullCalendar/fullcalendar';

// reciv
type Agenda = {
  title: string;
  start: string;
  end: string;
};


// send
type formEvent = {
  title: string;
  start: string;
  end: string;
}; 


const EventContainers: formEvent = {
  title: "",
start: "1",
end: "2",
};

interface events {
  Agendas:Agenda
}

//const [user, setUser] = useState<string>('');

const ModalEvent: React.FC<events> = ({ Agendas }) => {

 
  const [title, setTitle] = useState('');
 console.log(Agendas)
 //EventContainers.title = title
           
           const [isOpen, setIsOpen] = useState(true);
           

            const handleClose = () => {
              setIsOpen(false);
             // console.log("desde aca "+ EventContainers)
               EventContainers.title = title
               
                //envia(title);
               
            }
            const handleClose2 = () => {
            //  setIsOpen(false);
              console.log("desde aca "+ EventContainers)
               EventContainers.title = title
               
                //envia(title);
               
            }
          /* 
       <!-- <div className="flex min-h-[50vh] items-center justify-center">
          <Button onClick={() => setIsOpen(click)}>Agenda</Button>
        </div> --> 
        function envia(title:any){
           return <Calendar titles={'title'}/>
           
        }*/

  return (
    <>
   <Calendar2 Agendas2={EventContainers}/>
        <div className="bg-slate-200">
        <Drawer  open={isOpen} onClose={handleClose}>
        
          <Drawer.Header title="NUEVA CLASE" titleIcon={HiCalendar} />
          <Drawer.Items>

            <form action="#" >
              <div className="mb-6 mt-3">
                <Label htmlFor="title" className="mb-2 block">
                  Titulo o clase
                </Label>
                <TextInput id="title" name="title" placeholder="Ej: Matemáticas" value={title}  onChange={(e) => {setTitle(e.target.value)}} />
              </div>
              <div className="mb-6">
                <Label htmlFor="description" className="mb-2 block">
                  Description
                </Label>
                <Textarea id="description" name="description" placeholder="Write event description..." rows={4} />
              </div>
              <div className="mb-6">
                <Datepicker  title="Agenda" defaultDate={new Date(2024, 6, 15)}/>
              </div>
              <div className="mb-6">
                <TextInput
                  id="guests"
                  name="guests"
                  placeholder="Add guest email"
                  type="search"
                  rightIcon={() => (
                    <Button size="sm" className="[&>span]:items-center [&>span]:px-2 [&>span]:py-0">
                      <HiUserAdd className="mr-2" />
                      Add
                    </Button>
                  )}
                  theme={{
                    field: {
                      rightIcon: {
                        base: twMerge(theme.textInput.field.rightIcon.base, "pointer-events-auto"),
                      },
                    },
                  }}
                />
              </div>
              <Avatar.Group className="mb-6">
                <Avatar alt="" img="https://flowbite-react.com/images/people/profile-picture-5.jpg" rounded size="sm" stacked />
                <Avatar alt="" img="https://flowbite-react.com/images/people/profile-picture-2.jpg" rounded size="sm" stacked />
                <Avatar alt="" img="https://flowbite-react.com/images/people/profile-picture-3.jpg" rounded size="sm" stacked />
                <Avatar alt="" img="https://flowbite-react.com/images/people/profile-picture-4.jpg" rounded size="sm" stacked />
              </Avatar.Group>
              <Button className="w-full" onClick={handleClose}>
                <HiCalendar className="mr-2" />
                Crear Clase
              </Button>
            </form>

          </Drawer.Items>
          
        </Drawer>
        </div>
    </>
  );


}
export default ModalEvent;
