import React, { useState ,useEffect} from 'react';
import { TextField,Modal } from '@mui/material';
import { ButtonContainer ,Title} from '../styles/styles';
import  {ModalContent,SubmitButton,FormContainer,Card} from '../styles/departmentStyles';
import { useDispatch, useSelector } from 'react-redux';
import SuccessModal from '../SuccessModal';
import { addDepartments } from '../../../features/courses/courseSlice';

const DepartmentsPage = () => {
    const dispatch = useDispatch();
    const fetchDepartmentsData = useSelector(
        (state) =>   state.courses.courses
    )
    const fetchCRNS = useSelector(
        (state) =>   state.courses.crns
    )
    useEffect(() => {
     console.log(" crn values ",fetchCRNS)
    }, [])
    
    const [dupCRN,setDupCRN] = useState("");
  const [departmentData, setDepartmentData] = useState({
    departmentName: '',
    crn:''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const handleInputChange = (e) => {
    setFormErrors({})
    setDupCRN("")
    let { name, value } = e.target;
    if(name=="crn"){
        value=value.toUpperCase();
        let arr = value.split(";")
        value = arr.filter((item,
            index) => arr.indexOf(item) === index).join(";");
            
    }
    setDepartmentData({ ...departmentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation
    const errors = {};
    if (!departmentData.departmentName.trim()) {
      errors.departmentName = true;
    }
    if (!departmentData.crn.trim()) {
        errors.crn = true;
      }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Submit the form or perform any desired actions on successful form submission
      // check weather the department exits already in db
      if(Object.keys(fetchDepartmentsData).includes(departmentData.departmentName)){
        setIsErrorModalOpen(true);
      }else{
        let arr = departmentData.crn.split(";");
        let checker=false;
        
        arr.forEach(element => {
            if(fetchCRNS.includes(element)){
                checker=true;
                setDupCRN(element)
            }
        });

        if(checker){
        setIsErrorModalOpen(true)
        }else{
            dispatch(addDepartments({
                department:departmentData.departmentName,
                crn:departmentData.crn,
                }))
            setIsModalOpen(true);
        }
      }
    }
  };

  return (
    <div>
         <Title>
            Add Deparments
        </Title>
        <Card>      
            <form onSubmit={handleSubmit}>
        <FormContainer>
          <TextField
            label="Department Name"
            variant="outlined"
            fullWidth
            name="departmentName"
            value={departmentData.departmentName}
            onChange={handleInputChange}
            error={formErrors.departmentName}
            helperText={formErrors.departmentName && 'Department Name is required'}
          />
          <span>Please enter the crn numbers seperated with <b>" ; "</b> </span>
          <TextField
            label="CRN"
            variant="outlined"
            fullWidth
            name="crn"
            value={departmentData.crn}
            onChange={handleInputChange}
            error={formErrors.subjectName}
            helperText={formErrors.subjectName && 'crn is required '}
          />
          
          <ButtonContainer>
          <SubmitButton type="submit" variant="contained" color="primary">
            Submit
          </SubmitButton>
          </ButtonContainer>
        </FormContainer>
      </form>
      </Card>

      <SuccessModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      redirect={"/adminDashboard"}
      />
      
      <Modal open={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)}>
       
        {
          dupCRN!==""?  <ModalContent>
            <span >CRN : <b style={{color:'red'}}>{dupCRN} </b> already exits </span>
        </ModalContent>:
        <ModalContent>
        <span >Department : <b style={{color:'red'}}>{departmentData.departmentName} </b> already exits </span>
        </ModalContent>
        }
      </Modal>
    </div>
  );
};

export default DepartmentsPage;
