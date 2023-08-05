import React from 'react'

import { Modal } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ModalContent, ModalSuccessContent, SubmitButton } from './styles/departmentStyles';
import { ButtonContainer } from './styles/styles';
import { useNavigate } from 'react-router-dom';
function SuccessModal({isModalOpen,setIsModalOpen,redirect}) {
    const navigate = useNavigate();
    const handler = (redirect) =>{
        setIsModalOpen(false)
        
         navigate(redirect)
         
         

    }
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <ModalContent>
    <ModalSuccessContent>
            <CheckCircleIcon style={{color:"green",fontSize:"50px"}}/>
      <h2>Form submitted successfully!</h2>
      <ButtonContainer>
          <SubmitButton variant="contained" color="primary" onClick={()=>handler(redirect)}>
            OK
          </SubmitButton>
          </ButtonContainer>
      </ModalSuccessContent>
    </ModalContent>
  </Modal>
  )
}

export default SuccessModal