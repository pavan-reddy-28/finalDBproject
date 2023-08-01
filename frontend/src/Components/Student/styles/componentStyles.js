import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const Card = styled('div')({
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    width: '45%',
    padding:'10px',
    borderRadius: '40px',
    margin: 'auto',
    backgroundColor:'white',
})


const CourseCard = styled('div')({
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  width: '45%',

  margin: 'auto',
  backgroundColor:'white',
})



const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '24px',
});

const RowContainer = styled('div')({
  display: 'flex',
  gap: '16px',
});
const RadioButtonContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  });
const SubmitButton = styled(Button)({
  marginTop: '16px',
  backgroundColor:'black',
  borderRadius:'20px',
});

const ModalContent = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#fff',
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  outline: 'none',
});
const UpdateContainer = styled('div')({
  display:'flex',
  justifyContent:'space-around'
});

const ModalSuccessContent = styled('div')({
    padding:'5px',
    display:"flex",
    flexDirection:"column",
    alignItems:"center"
  });


export {UpdateContainer,RadioButtonContainer,ModalContent,CourseCard,SubmitButton,RowContainer,FormContainer,Card,ModalSuccessContent}