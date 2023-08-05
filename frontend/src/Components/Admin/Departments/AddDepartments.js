import React, { useState ,useEffect} from 'react';
import { TextField,Modal } from '@mui/material';
import { ButtonContainer ,Title} from '../styles/styles';
import  {ModalContent,SubmitButton,FormContainer,Card} from '../styles/departmentStyles';
import { useDispatch, useSelector } from 'react-redux';
import SuccessModal from '../SuccessModal';
import { addDepartments } from '../../../features/courses/courseSlice';
import { fetchNewClassRooms, fetchNewDepartments, insertNewDepartments } from '../../../features/newCourse/newCourseSlice';

const DepartmentsPage = () => {
    const dispatch = useDispatch();

    const fetchDepartmentsData = useSelector(
        (state) =>   state.newCourses["departments"]
    )
    const fetchClassrooms = useSelector(
        (state) =>   state.newCourses["classRooms"]
    )
    useEffect(() => {
        dispatch(fetchNewClassRooms())
        dispatch(fetchNewDepartments())
   
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
      
      let xName = fetchDepartmentsData.map(obj=>obj.toLowerCase())

      let classRoomArray=[]
      fetchClassrooms &&  fetchClassrooms.map(obj=>{
            classRoomArray.push( Object.keys(obj)[0])
        })
      
      
      if(  xName.includes(departmentData.departmentName.toLowerCase())){
        setIsErrorModalOpen(true);
      }else{
        let arr = departmentData.crn.split(";");
        let checker=false;
        
        fetchClassrooms &&  arr.forEach(element => {
            if(classRoomArray.includes(element)){
                checker=true;
                setDupCRN(element)
            }
        });

        if(checker){
        setIsErrorModalOpen(true)
        }else{
            dispatch(insertNewDepartments({
                department:departmentData.departmentName,
                classRooms:departmentData.crn,
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
          <span>Please enter the Class room numbers seperated with <b>" ; "</b> </span>
          <TextField
            label="ClassRooms"
            variant="outlined"
            fullWidth
            name="crn"
            value={departmentData.crn}
            onChange={handleInputChange}
            error={formErrors.subjectName}
            helperText={formErrors.subjectName && 'classRooms are required '}
          />
          
          <ButtonContainer>
          <SubmitButton type="submit" variant="contained" color="primary">
            Submit
          </SubmitButton>
          </ButtonContainer>
        </FormContainer>
      </form>
      </Card>

      <Title>
          Departments List 
        </Title>
        <Card style={{width:'400px'}}>      
      <div style={{}}>
        <ol>
        {
            fetchDepartmentsData && fetchDepartmentsData.map((obj,index)=><li><div>{obj}</div></li>)
        }
    </ol>
    </div>
      </Card>
      <SuccessModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      redirect={"/adminDashboard"}
      />
      
      <Modal open={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)}>
       
        {
          dupCRN!==""?  <ModalContent>
            <span >Class Room  : <b style={{color:'red'}}>{dupCRN} </b> already exits </span>
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
