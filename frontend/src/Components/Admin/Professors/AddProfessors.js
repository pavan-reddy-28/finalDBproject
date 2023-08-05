import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, FormControlLabel, Select, MenuItem, Radio, Modal } from '@mui/material';

import { ButtonContainer, Title } from '../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RadioButtonContainer, SubmitButton, RowContainer, FormContainer, Card, ModalContent } from '../styles/departmentStyles';
import SuccessModal from '../SuccessModal';
import { fetchCourses, fetchCrnByDepart, fetchCrnArrayById, fetchCourseIdArray } from '../../../features/courses/courseSlice';
import { fetchAllProfessorsMails, professorCheckMail, professorRegister } from '../../../features/professor/professorSlice';
import { fetchNewDepartments, fetchCoursesNew, fetchClassRoomsByDepartment } from '../../../features/newCourse/newCourseSlice';
import { fetchProfessorMailsNew, insertProfessorNew } from '../../../features/newProfessor/newProfessorSlice';


const AddProfessors = () => {
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [timingsArray, setTimingsArray] = useState([])
    const [coursesArray, setCoursesArray] = useState([]);
    const [courseError, setCourseError] = useState("")
    const dispatch = useDispatch();
    const [professorData, setProfessorData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        roomNumber: '',
        subject: '',
        crn: '',
        day: { 'MON': '', 'TUE': '', 'WED': '', 'THU': '', 'FRI': '' },
        crnValue: {},
        available:'25'

    });

    
    useEffect(() => {
        dispatch(fetchCourses())
    }, [])


    const fetchDepartmentsDataNew = useSelector(
        (state) => state.newCourses["departments"]
    )
    const fetchEmails = useSelector(
        (state) => state.newProfessor["professorMails"]
    )
    const fetchCoursesDataNew = useSelector(
        (state) => state.newCourses["allCourses"]
    )
    const fetchClassRoomArray = useSelector(
        (state) => state.newCourses["roomsByDepart"]
    )

    //get departments and courses-complete
    useEffect(() => {
        dispatch(fetchNewDepartments())
        dispatch(fetchCoursesNew())
        dispatch(fetchProfessorMailsNew())
    }, [])

    //get classrooms by department
    useEffect(() => {
        professorData.department && dispatch(fetchClassRoomsByDepartment({ department: professorData.department }))
    }, [professorData.department])

    useEffect(() => {

        let spamArray = [];
        if (professorData.roomNumber) {

            spamArray = fetchClassRoomArray[professorData.roomNumber].split(";")

        }
        setTimingsArray(spamArray)
    }, [professorData.roomNumber])




    useEffect(() => {
        let courseArray = []
        if (fetchCoursesDataNew != []) {
            courseArray = fetchCoursesDataNew.flatMap(item => {
                const departments = Object.values(item);
                const courses = departments.flat();

                return courses.filter(course => course.department == professorData.department)

            });
        }
        setCoursesArray([...courseArray]);
    }, [professorData.department])



    const [crnSelectionError, setCrnSelectionError] = useState("");



    const [formErrors, setFormErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleInputChange = (e) => {
        setCourseError("")
        setFormErrors({});
        const { name, value } = e.target;
        if (name == "department") {
            setProfessorData({
                ...professorData,
                [name]: value,
                subject: '',
                crn: '',
                day: { 'MON': '', 'TUE': '', 'WED': '', 'THU': '', 'FRI': '' },
                crnValue: {}
            })
        }
        else if (name == "day") {
            let x = { ...professorData.day }

            if (x[value] === "") {
                x = { ...professorData.day, [value]: value }
                setProfessorData({ ...professorData, ['day']: { ...x } });
            } else {
                x = { ...professorData.day, [value]: '' }
                setProfessorData({ ...professorData, ['day']: { ...x } });
            }
        } else if (name == "time") {
            let x = { ...professorData.crnValue }
            console.log('x[value]', x[value]);
            if (!x[value]) {
                x = { ...professorData.crnValue, [value]: value }
                if (Object.keys(x).length > 4) { setCrnSelectionError(true) }
                else { 
                    setCrnSelectionError(false); 
                    setProfessorData({ ...professorData, ['crnValue']: { ...x } }); 
                
                }

            } else {
                setCrnSelectionError(false);
                delete x[value]
                setProfessorData({ ...professorData, ['crnValue']: { ...x } });
            }

        } else {
            setProfessorData({ ...professorData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform form validation



        const errors = {};
        if (Object.keys(professorData.crnValue).length === 0) {
            errors.time = true
        }
        if (!professorData.firstName.trim()) {
            errors.firstName = true;
        }
        
        if (!professorData.lastName.trim()) {
            errors.lastName = true;
        }
        if (!professorData.email.trim()) {
            errors.email = true;
        }
        if (!professorData.department) {
            errors.department = true;
        }
        if (!professorData.subject) {
            errors.subject = true;
        }
        if (!professorData.crn) {
            errors.crn = true;
        }
        if (!professorData.roomNumber) {
            errors.roomNumber = true;
        }
        if (!professorData.available) {
            errors.available = true;
        }
        if (!professorData.day) {
            errors.day = true;
        }
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            // Submit the form or perform any desired actions on successful form submission

               
            
                    
                    let crnStringValue = ""
                    Object.keys(professorData.crnValue).map((obj)=>{
                        crnStringValue=crnStringValue+obj+";"
                    })

                    if (crnStringValue.endsWith(";")) {
                        crnStringValue = crnStringValue.slice(0, -1);
                    }
                
                    const collectionData = {
                      
                        firstName:professorData.firstName,
                        lastName:professorData.lastName,
                        mail:professorData.email,
                        department:professorData.department,
                        enrolls:[
                            {
                                "timings":crnStringValue,
                                "roomNumber":professorData.roomNumber,
                                crn:professorData.crn,
                                courseId:professorData.subject,
                                available:professorData.available
                            }
                        ]

                    }
                    if(fetchEmails.includes(professorData.email)){
                        dispatch(insertProfessorNew({...collectionData,  isUpdate:true,}));
                    }else{
                        dispatch(insertProfessorNew({...collectionData,  isUpdate:false,}));
                    }
                    
                    setIsModalOpen(true)
                
            
        }
    };

    return (
        <div>
            <Title>
                Professor Registration
            </Title>
            <Card>
                <form onSubmit={handleSubmit}>
                    <FormContainer>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            name="firstName"
                            value={professorData.firstName}
                            onChange={handleInputChange}
                            error={formErrors.firstName}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            name="lastName"
                            value={professorData.lastName}
                            onChange={handleInputChange}
                            error={formErrors.lastName}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth

                            name="email"
                            value={professorData.email}
                            onChange={handleInputChange}
                            error={formErrors.email}
                        />
                        <RowContainer>
                            <FormControl variant="outlined" fullWidth error={formErrors.department}>
                                <InputLabel>Department</InputLabel>
                                <Select
                                    name="department"
                                    value={professorData.department}
                                    onChange={handleInputChange}
                                    label="Department"
                                >
                                    {/* {
                                        Object.keys(fetchDepartmentsData).map((dept, index) => (<MenuItem key={index} value={dept}>{dept}</MenuItem>))
                                    } */}
                                    {
                                        fetchDepartmentsDataNew.map((deptName, index) => (
                                            <MenuItem key={index} value={deptName}>{deptName}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" fullWidth error={formErrors.subject}>
                                <InputLabel>Subject</InputLabel>
                                <Select
                                    name="subject"
                                    value={professorData.subject}
                                    onChange={handleInputChange}
                                    label="Subject"
                                >
                                    {
                                        professorData.department ?
                                            coursesArray.map(
                                                (course, index) => (
                                                    <MenuItem key={index} value={course._id}>{course["name"]}</MenuItem>
                                                )
                                            )
                                            : <MenuItem value={""}>{"None"}</MenuItem>
                                    }

                                </Select>
                            </FormControl>
                        </RowContainer>
                        {
                            professorData.subject && <FormControl variant="outlined" fullWidth error={formErrors.crn}>
                                <InputLabel>CRN</InputLabel>
                                <Select name="crn" value={professorData.crn} onChange={handleInputChange} label="CRN">
                                    {
                                        coursesArray.map(
                                            (course, index) => (
                                                course["_id"] == professorData.subject ?
                                                    course["crnArray"].map((crnObj, crnIndex) => (
                                                        crnObj["pid"] == null ? <MenuItem key={crnIndex + "-crn"} value={crnObj["crn"]}>{crnObj["crn"]}</MenuItem> : <MenuItem value={""}>{"None"}</MenuItem>
                                                    )) : <></>

                                            )
                                        )
                                    }
                                </Select>
                            </FormControl>

                        }
                        {
                            professorData.crn && <FormControl variant="outlined" fullWidth error={formErrors.roomNumber}>
                                <InputLabel>Room Number</InputLabel>
                                <Select name="roomNumber" value={professorData.roomNumber} onChange={handleInputChange} label="roomNumber">
                                    {
                                        fetchClassRoomArray && Object.keys(fetchClassRoomArray).map((obj, index) => (
                                            <MenuItem key={index + "-classRoom"} value={obj}>{obj}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                        }

                        {professorData.roomNumber && (
                            <>
                                <span>Select Class Timings</span>
                                {crnSelectionError && <span style={{ fontSize: '12px', color: 'red', borderBottom: '1px solid red' }}>olny 4 classes can be slectecd</span>}
                                <RadioButtonContainer style={{
                                    paddingLeft: '10px',
                                    border: formErrors.time ? '1px solid red' : ''
                                }}>
                                    {

                                        [{ value: 'MON', label: 'Monday' }, { value: 'TUE', label: 'Tuesday' }, { value: 'WED', label: 'Wednesday' }, { value: 'THU', label: 'Thursday' }, { value: 'FRI', label: 'Friday' }].map((obj, index) => (

                                            <>
                                                <FormControlLabel
                                                    value={obj.value}
                                                    control={<Radio />}
                                                    label={obj.label}
                                                    name="day"
                                                    checked={professorData.day[obj.value] === obj.value}
                                                    onClick={handleInputChange}
                                                    key={index}

                                                />
                                                {
                                                    professorData.day[obj.value] === obj.value &&
                                                    (
                                                        <RowContainer style={{ marginLeft: '20px' }} key={"r2-" + index} >
                                                            <RadioButtonContainer style={{ flexDirection: 'row' }} key={"r2-" + index} >{
                                                                [{ value: '1000', label: '10:00 AM' }, { value: '0110', label: '01:10 PM' }, { value: '0320', label: '03:20 PM' }].map((classTime, index1) => {

                                                                    return (
                                                                        timingsArray.includes(`${obj.value}_${classTime.value}`) ? <FormControlLabel
                                                                            value={`${obj.value}_${classTime.value}`}
                                                                            control={<Radio />}
                                                                            label={classTime.label}
                                                                            name="time"
                                                                            checked={professorData.crnValue[`${obj.value}_${classTime.value}`] === `${obj.value}_${classTime.value}`}
                                                                            // onClick={handleInputChange}
                                                                            disabled
                                                                            key={index1}
                                                                        /> :
                                                                            <FormControlLabel
                                                                                value={`${obj.value}_${classTime.value}`}
                                                                                control={<Radio />}
                                                                                label={classTime.label}
                                                                                name="time"
                                                                                checked={professorData.crnValue[`${obj.value}_${classTime.value}`] === `${obj.value}_${classTime.value}`}
                                                                                onClick={handleInputChange}
                                                                                key={index1}
                                                                            />
                                                                    )
                                                                }
                                                                )
                                                            }
                                                            </RadioButtonContainer>
                                                        </RowContainer>
                                                    )
                                                }
                                            </>
                                        )
                                        )
                                    }
                                </RadioButtonContainer>
                            </>)}
                            <TextField
                            label="Number of Slots"
                            variant="outlined"
                            fullWidth
                            name="available"
                            value={professorData.available}
                            onChange={handleInputChange}
                            error={formErrors.available}
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
                <div>
                    <ModalContent>
                        <span >Professor  : <b style={{ color: 'red' }}>{professorData.email} </b> already exits </span>
                    </ModalContent>
                    {
                        courseError == "yes" ? <>
                            <ModalContent>
                                <span >Selected  : <b style={{ color: 'red' }}>{"Course"} </b> is registered to another Professor</span>
                            </ModalContent></> : <></>
                    }
                </div>
            </Modal>

        </div>
    );
};
const TimeRadioButton = () => {
    return (<></>);
}
export default AddProfessors;
