import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, Modal, MenuItem, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Card, FormContainer, ModalContent, SubmitButton } from '../styles/departmentStyles';
import { ButtonContainer, Title } from '../styles/styles';
import SuccessModal from '../SuccessModal';
import { fetchCoursesNew,  fetchNewDepartments, insertNewCourse,  } from '../../../features/newCourse/newCourseSlice';


const AddSubjectsPage = () => {
    const dispatch = useDispatch();

    const [validateCourse, setValidateCourse] = useState({
        courseName: [],
        courseId: [],
        crnArray: [],

    })

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [duplicateValues, setDuplicateValues] = useState({
        courseName: false,
        courseId: false,
        crnArray: false
    })
    const fetchDepartmentsData = useSelector(
        (state) => state.newCourses["departments"]
    )

    const fetchCoursesData = useSelector(
        (state) => state.newCourses["allCourses"]
    )

    const [subjectData, setSubjectData] = useState({
        department: '',
        crnArray: '',
        cid: '',
        courseName: '',
        courseDescription: '',

    });
    const [dupCRN, setDupCRN] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {

        dispatch(fetchNewDepartments())
        dispatch(fetchCoursesNew())


    }, [])
    useEffect(() => {
        let crnArrayD = []
        let nameArray = []
        let cidArray = []
        fetchCoursesData.flatMap(item => {
            const departments = Object.values(item);
            const courses = departments.flat();
            crnArrayD = [...crnArrayD, ...courses.flatMap(course => course.crnArray.map(crnObj => crnObj.crn))];
            cidArray = [...cidArray, ...courses.map(course => course.cid)];
            nameArray = [...nameArray, ...courses.map(course => course.name)];

        });


        setValidateCourse(
            {
                courseId: cidArray,
                crnArray: crnArrayD,
                courseName: nameArray,

            }
        )

    }, [fetchCoursesData])


    const handleInputChange = (e) => {
        setDupCRN("")
        setFormErrors({})
        let { name, value } = e.target;

        if (name == "crnArray") {
            value = value.toUpperCase();
            let arr = value.split(";")
            value = arr.filter((item,
                index) => arr.indexOf(item) === index).join(";");
        } else if (name == "cid") {
            value = value.toUpperCase();
        }
        setSubjectData({ ...subjectData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form validation
        const errors = {};
        if (!subjectData.department) {
            errors.department = true;
        }
        if (!subjectData.cid.trim()) {
            errors.courseId = true;
        }
        if (!subjectData.crnArray.trim()) {
            errors.crnArray = true;
        }
        if (!subjectData.courseName.trim()) {
            errors.courseName = true;
        }
        if (!subjectData.courseDescription.trim()) {
            errors.courseDescription = true;
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {


            let validateCId = validateCourse.courseId.includes(subjectData.cid)
            let validateCName = validateCourse.courseName.includes(subjectData.courseName)
            let validateCArray = false;
            let crnValuesArray = subjectData.crnArray.split(";")
            validateCourse.crnArray.map(crnObject => {
                validateCArray = crnValuesArray.includes(crnObject) ? true : validateCArray
            })

            setDuplicateValues({ courseId: validateCId, courseName: validateCName, crnArray: validateCArray })

            if (validateCId || validateCName || validateCArray) { setIsErrorModalOpen(true) }
            else {
                dispatch(insertNewCourse({
                    name: subjectData.courseName,
                    cid: subjectData.cid,
                    description: subjectData.courseDescription,
                    department: subjectData.department,
                    crnArray: subjectData.crnArray
                }))
                setIsModalOpen(true)

            }


        }
    };

    return (
        <div style={{marginBottom:'30px'}}>
            <Title>
                Add Course
            </Title>
            <Card>
                {fetchDepartmentsData && <form onSubmit={handleSubmit}>
                    <FormContainer>
                        <FormControl variant="outlined" fullWidth error={formErrors.department}>
                            <InputLabel>Department</InputLabel>
                            <Select
                                name="department"
                                value={subjectData.department}
                                onChange={handleInputChange}
                                label="Department"
                            >

                                {
                                    fetchDepartmentsData && fetchDepartmentsData.map((obj, index) => (
                                        <MenuItem key={index} value={obj}>{obj}</MenuItem>
                                    ))
                                }

                            </Select>
                        </FormControl>
                        <TextField
                            label="Subject Name"
                            variant="outlined"
                            fullWidth
                            name="courseName"
                            value={subjectData.courseName}
                            onChange={handleInputChange}
                            error={formErrors.courseName}
                        />
                        <TextField
                            label="Course ID"
                            variant="outlined"
                            fullWidth
                            name="cid"
                            value={subjectData.courseId}
                            onChange={handleInputChange}
                            error={formErrors.courseId}
                        />
                        <span>Please enter the CRN seperated with <b>" ; "</b> </span>
                        <TextField
                            label="CRN"
                            variant="outlined"
                            fullWidth
                            name="crnArray"
                            value={subjectData.crnArray}
                            onChange={handleInputChange}
                            error={formErrors.crnArray}
                            helperText={formErrors.crnArray && 'crn is required '}
                        />
                        <TextField
                            label="Subject Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            name="courseDescription"
                            value={subjectData.courseDescription}
                            onChange={handleInputChange}
                            error={formErrors.courseDescription}
                            helperText={`${subjectData.courseDescription.length}/400 words`}
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


            <Title>
         Course and Department List
        </Title>
        <Card style={{width:'600px',padding:'10px'}}>     

<div>
    {
       fetchCoursesData && fetchCoursesData.map( (item) => {
            const departments = Object.values(item);
            const courses = departments.flat();
        
            return( 
               <div  style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
            }}  > 
               <div style={{fontSize:'24px',fontWeight:'600'}}>   {Object.keys(item)[0]}</div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px',
                }}>
                {
                 courses.flatMap((course,index) => {
               return(
                <div>
                <span>
                    {`${index + 1}  ) ${course.name}  [ ${course.cid}]`}
                    </span>
                    </div>
               )
               
            })   
                }
                </div>
                
                </div>
                )
         
        

        })
    }
</div>

      </Card>




            <SuccessModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                redirect={"/adminDashboard"}
            />

            <Modal open={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)}>
                <ModalContent style={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        duplicateValues.courseName ?


                            <span >Course : <b style={{ color: 'red' }}>{subjectData.courseName} </b> already exits </span>

                            : <></>
                    }
                    {
                        duplicateValues.courseId ?

                            <span >Course ID  : <b style={{ color: 'red' }}>{subjectData.cid} </b> already exits </span>
                            : <></>
                    }
                    {
                        duplicateValues.crnArray ?

                            <span >CRN : <b style={{ color: 'red' }}>{subjectData.crnArray} </b> already exits </span>
                            : <></>
                    }
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AddSubjectsPage;
