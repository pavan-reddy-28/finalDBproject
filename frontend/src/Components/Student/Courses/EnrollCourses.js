import React, { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, InputLabel, Modal, Select, MenuItem, TextField, Radio } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Card, FormContainer, SubmitButton, RadioButtonContainer, RowContainer, ModalContent } from '../styles/componentStyles';
import { ButtonContainer, Title, } from '../styles/styles';
import SuccessModal from '../../Admin/SuccessModal'
import { addCourses, fetchCourses } from '../../../features/courses/courseSlice';
import { fetchProfessorCourseDetails } from '../../../features/professor/professorSlice';
import { Cookies } from 'react-cookie';
import { studentClassDetails, studentClassRegister } from '../../../features/student/studentSlice';

const EnrollCourses = () => {
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [studentDuplicates, setStudentDuplicates] = useState([])
    
    const [dayArray, setDayArray] = useState([]);
    const [timeArray, setTimeArray] = useState({ "MON": [], "TUE": [], "WED": [], "THU": [], "FRI": [] });
    const [courseData, setcourseData] = useState({
        department: '',
        courseName: '',
        courseDescription: '',
        day: "",
        time: "",
        crnValue: {},
    });

    const [formErrors, setFormErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchDepartmentsData = useSelector(
        (state) => state.courses.courses
    )
    const professorCourseDetails = useSelector(
        (state) => state.professor.professorCourse
    )

    const studentCourseRegistrationDetails = useSelector(
        (state) => state.student.courseDetails
    )

    useEffect(() => {
        dispatch(fetchCourses())
        console.log(" crn values ", fetchDepartmentsData)
    }, [])

    useEffect(() => {
        const studentId = cookies.get("id")
        dispatch(studentClassDetails({ studentId: studentId }))
        console.log(" studentCourseRegistrationDetails ", studentCourseRegistrationDetails)
    }, [])





    useEffect(() => {
        dispatch(fetchProfessorCourseDetails({ courseId: courseData.courseName }))
        console.log(" professorCourseDetails ", professorCourseDetails)


    }, [courseData.courseName])
    useEffect(() => {

        if (professorCourseDetails["enrolls"] && professorCourseDetails["enrolls"].length > 0) {
            let arrayObj = [];
            let timeArrayObj = { "MON": [], "TUE": [], "WED": [], "THU": [], "FRI": [] };
            professorCourseDetails["enrolls"].forEach((obj) => {
                switch (obj["day"]) {
                    case "MON":
                        arrayObj.push({ value: 'MON', label: 'Monday' })
                        break;
                    case "TUE":
                        arrayObj.push({ value: 'TUE', label: 'tuesday' })
                        break;
                    case "WED":
                        arrayObj.push({ value: 'WED', label: 'Wednesday' })
                        break;
                    case "THU":
                        arrayObj.push({ value: 'THU', label: 'Thursday' })
                        break;
                    case "FRI":
                        arrayObj.push({ value: 'FRI', label: 'Friday' })
                        break;
                }
                let label = convertTime(obj["time"])
                timeArrayObj[obj["day"]].push({ value: obj["time"], label: label, available: obj["available"] });
            })


            arrayObj = arrayObj.filter((obj, index) => {
                // Return true for the first occurrence of each object
                return index === arrayObj.findIndex(item => item.value === obj.value && item.label === obj.label);
            });
            console.log("timeArrayObj ", timeArrayObj)
            setDayArray(arrayObj);
            setTimeArray(timeArrayObj);

        } else {
            setDayArray([]);
        }





    }, [professorCourseDetails])

    const convertTime = (value) => {
        switch (value) {
            case "1000":
                return "10:00 AM - 12:50 PM";
            case "0110":
                return "01:10 PM - 03:00 PM";
            case "0320":
                return "03:20 PM - 06:10 PM";
        }
    }



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "courseName") {
            let dataObject = fetchDepartmentsData[courseData.department]["courses"]

            let courseDescriptionValue = ""
            for (let i = 0; i < dataObject.length; i++)
                if (dataObject[i]._id == value)
                    courseDescriptionValue = dataObject[i].description

            setcourseData({ ...courseData, "courseDescription": courseDescriptionValue, [name]: value });
        } else if (name === "department") {

            setcourseData({
                courseName: '',
                courseDescription: '',
                day: "",
                crnValue: {}, [name]: value
            });

        } else if (name === "time") {
            setcourseData({ ...courseData, ['time']: value });
        } else if (name === "day") {
            setcourseData({ ...courseData, ['day']: value });
        } else {
            setcourseData({ ...courseData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form validation
        const errors = {};
        if (!courseData.department) {
            errors.department = true;
        }

        if (!courseData.courseName.trim()) {
            errors.courseName = true;
        }
        if (!courseData.courseDescription.trim()) {
            errors.courseDescription = true;
        }
        if (!courseData.day.trim()) {
            errors.day = true;
        }
        if (!courseData.time.trim()) {
            errors.time = true;
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {



            let duplicateArray = []
           
            if(studentCourseRegistrationDetails  && studentCourseRegistrationDetails.enrolls){
                for(let i =0;i<studentCourseRegistrationDetails.enrolls.length;i++){
                    if (studentCourseRegistrationDetails.enrolls[i]["courseId"] === courseData.courseName) {
                        duplicateArray.push(`DC`)
                    }
                    if (studentCourseRegistrationDetails.enrolls[i]["day"] === courseData.day && studentCourseRegistrationDetails.enrolls[i]["time"] === courseData.time) {
                        duplicateArray.push(`TC`)
                    }
                }
            }



            if (duplicateArray.length > 0) {
                
                setStudentDuplicates(duplicateArray)
                setIsErrorModalOpen(true)
            }
            else {
                const studentId = cookies.get("id")
                const enrollData = {
                    courseId: courseData.courseName,
                    professorId: professorCourseDetails.professorId,
                    day: courseData.day,
                    time: courseData.time,
                    crn: professorCourseDetails.crn
                }
                console.log("enroll data ", {
                    studentId,
                    enrollData
                })

                // Submit the form or perform any desired actions on successful form submission
                dispatch(studentClassRegister({
                    studentId,
                    enrollData
                }))
                setIsModalOpen(true);
            }
            // 
        }
    };

    return (
        <div>
            <Title>
                Add Course
            </Title>
            <Card>
                <form onSubmit={handleSubmit}>
                    <FormContainer>
                        <FormControl variant="outlined" fullWidth error={formErrors.department}>
                            <InputLabel>Department</InputLabel>
                            <Select
                                name="department"
                                value={courseData.department}
                                onChange={handleInputChange}
                                label="Department"
                            >
                                {
                                    Object.keys(fetchDepartmentsData).map((dept, index) => (<MenuItem key={index} value={dept}>{dept}</MenuItem>))
                                }
                                {/* Add more courses as needed */}
                            </Select>
                        </FormControl>
                        {
                            courseData.department &&
                            <FormControl variant="outlined" fullWidth error={formErrors.department}>
                                <InputLabel>Course Name</InputLabel>
                                <Select
                                    name="courseName"
                                    value={courseData.courseName}
                                    onChange={handleInputChange}
                                    label="courseName"
                                >
                                    {
                                        fetchDepartmentsData[courseData.department]["courses"].map((obj, index) => (<MenuItem key={index} value={obj._id}>{obj.title}</MenuItem>))
                                    }

                                </Select>
                            </FormControl>
                        }

                        {courseData.courseName && <>
                            <div>
                                <span><u>Description : </u></span>
                                <br />
                                <span style={{ marginTop: '5px' }}>{courseData.courseDescription}</span>
                            </div>

                            <div>
                                <div>
                                    <span>Professor Name</span> : <span>{professorCourseDetails.professorName}</span>
                                </div>
                                <div>
                                    <span>Professor Email</span> : <span>{professorCourseDetails.professorMail}</span>
                                </div>
                                <div>
                                    <span>CRN </span> : <span>{professorCourseDetails.crn}</span>
                                </div>
                            </div>
                            <>
                                <span>Select Class Timings</span>
                                {/* {crnSelectionError && <span style={{ fontSize: '12px', color: 'red', borderBottom: '1px solid red' }}>olny 4 classes can be slectecd</span>} */}
                                <RadioButtonContainer style={{
                                    paddingLeft: '10px',
                                    border: formErrors.time ? '1px solid red' : ''
                                }}>
                                    {

                                        dayArray.length > 0 ? dayArray.map((obj, index) => (
                                            <>
                                                <FormControlLabel
                                                    value={obj.value}
                                                    control={<Radio />}
                                                    label={obj.label}
                                                    name="day"
                                                    checked={courseData.day === obj.value}
                                                    onClick={handleInputChange}
                                                    key={index}

                                                />
                                                {
                                                    courseData.day === obj.value &&
                                                    (
                                                        <RowContainer style={{ marginLeft: '20px' }} key={"r2-" + index} >
                                                            <RadioButtonContainer key={"r2-" + index} >
                                                                {
                                                                    timeArray[obj.value].map((classTime, index1) => {

                                                                        return (<FormControlLabel
                                                                            value={`${classTime.value}`}
                                                                            control={<Radio />}
                                                                            label={`${classTime.label} [ available slots : ${classTime.available}]`}
                                                                            name="time"
                                                                            checked={classTime.value === courseData.time}
                                                                            onClick={handleInputChange}
                                                                            key={index1}
                                                                        />)
                                                                    })
                                                                }

                                                            </RadioButtonContainer >

                                                        </RowContainer>
                                                    )
                                                }
                                            </>
                                        )
                                        ) : <span style={{ color: 'red' }}>NO Classes available</span>

                                    }
                                </RadioButtonContainer>
                            </>
                        </>
                        }
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
                redirect={"/studentDashboard"}
            />

            <Modal open={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)}>
                <ModalContent style={{display:'flex',flexDirection:'column'}}>
                {
                    studentDuplicates.map((obj)=>(
                      obj == "TC"  ?
                        <span>  <b style={{ color: 'red' }}>{"Time Conflict :"} </b> Change the course Timing  </span>
                       :
                       obj == "DC"?
                     
                       
                                    <span>  <b style={{ color: 'red' }}>{"Duplicate Course :"} </b> You have already registered for this course</span>
                                
                       :
                       <></>
                    )

                    )
                }
                
                </ModalContent>
                
            </Modal>
        </div>
    );
};

export default EnrollCourses;
