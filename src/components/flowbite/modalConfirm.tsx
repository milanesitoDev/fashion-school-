


import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { HiOutlineCheck } from "react-icons/hi";


let ConfirmModal = function Component() {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <Button  onClick={() => setOpenModal(true)}>
        Enviar
        <HiOutlineCheck className="mr-2  h-7 w-7 "/>

      </Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Estas seguro de enviar la invitación a la clase?
            </h3>
            <div className="flex justify-center gap-4">
                     
              <button onClick={() => setOpenModal(false)}
               className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none ">
                 {"Si, Estoy seguro"}
                 </button>
            
              <button onClick={() => setOpenModal(false)}
               className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-rose-500 dark:hover:bg-rose-600 focus:outline-none ">
                No, cancelar</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
 export default ConfirmModal;