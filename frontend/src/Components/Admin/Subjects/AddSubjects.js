import React, { useState ,useEffect} from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Card, FormContainer, SubmitButton } from '../styles/departmentStyles';
import { ButtonContainer, Title } from '../styles/styles';
import SuccessModal from '../SuccessModal';
import { addCourses, fetchCourses,fetchAllDepartments } from '../../../features/courses/courseSlice';


const AddSubjectsPage = () => {
    const dispatch = useDispatch();
    const fetchDepartmentsData = useSelector(
        (state) => state.courses.courses
    )
        const fetchAllDepartmentsData = useSelector(
            (state) => state.courses.allDepartments
        )
    useEffect(() => {
        dispatch(fetchCourses())
        console.log(" crn values ", fetchDepartmentsData)
    }, [])
    
useEffect(()=>{
    dispatch(fetchAllDepartments())
},[])

    const [subjectData, setSubjectData] = useState({
        department: '',
        subjectName: '',
        subjectDescription: '',

    });

    const [formErrors, setFormErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubjectData({ ...subjectData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form validation
        const errors = {};
        if (!subjectData.department) {
            errors.department = true;
        }
       
        if (!subjectData.subjectName.trim()) {
            errors.subjectName = true;
        }
        if (!subjectData.subjectDescription.trim()) {
            errors.subjectDescription = true;
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            // Submit the form or perform any desired actions on successful form submission
            dispatch(addCourses({
                department:subjectData.department,
                title:subjectData.subjectName,
                description:subjectData.subjectDescription,
               
            }))
            setIsModalOpen(true);
        }
    };

    return (
        <div>
            <Title>
                Add Course
            </Title>
            <Card>
               {fetchAllDepartmentsData && fetchAllDepartmentsData["departments"] && <form onSubmit={handleSubmit}>
                    <FormContainer>
                        <FormControl variant="outlined" fullWidth error={formErrors.department}>
                            <InputLabel>Department</InputLabel>
                            <Select
                                name="department"
                                value={subjectData.department}
                                onChange={handleInputChange}
                                label="Department"
                            >
                                {/* {
                                    Object.keys(fetchAllDepartments).map((dept, index) => (<MenuItem key={index} value={dept}>{dept}</MenuItem>))
                                } */}
                                {
                                   fetchAllDepartmentsData && fetchAllDepartmentsData["departments"].map((obj,index)=>(
                                        <MenuItem key={index} value={obj}>{obj}</MenuItem>
                                    ))
                                }
                                {/* Add more courses as needed */}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Subject Name"
                            variant="outlined"
                            fullWidth
                            name="subjectName"
                            value={subjectData.subjectName}
                            onChange={handleInputChange}
                            error={formErrors.subjectName}
                        />
                        
                        <TextField
                            label="Subject Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            name="subjectDescription"
                            value={subjectData.subjectDescription}
                            onChange={handleInputChange}
                            error={formErrors.subjectDescription}
                            helperText={`${subjectData.subjectDescription.length}/400 words`}
                        />
                        <ButtonContainer>
                            <SubmitButton type="submit" variant="contained" color="primary">
                                Submit
                            </SubmitButton>
                        </ButtonContainer>
                    </FormContainer>
                </form>

                }
            </Card>
            <SuccessModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                redirect={"/adminDashboard"}
            />
        </div>
    );
};

export default AddSubjectsPage;
