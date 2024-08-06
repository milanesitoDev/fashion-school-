import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import {Calendar} from '../fullCalendar/fullcalendar';
import Confirmmodal from '../flowbite/modalConfirm';

// send
type formEvent = {
  title: string;
  start: string;
  end: string;
}; 


const EventContainers: formEvent = {
  title: "prueba",
start: "1",
end: "2",
};


class card extends React.Component{
  constructor (props: any){
  super(props)
  
  }
  
  
  handleModal = (e: any) => {
  console.log(e);
  }
  
  }

let Modals = function Component() {
  const [openModal, setOpenModal] = useState(true);
  const [modalSize, setModalSize] = useState<string>('7xl');
  const [modalPlacement, setModalPlacement] = useState('center')
  

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        Agendar clase       
        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
      <Modal show={openModal} size={modalSize} position={modalPlacement} onClose={() => setOpenModal(false)}>
        <Modal.Header>Agenda </Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-6 bg-white">
            <Calendar/>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Confirmmodal/>
          
          <Button color="light" onClick={() => setOpenModal(false)}>

            Cancelar
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path   d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default Modals;