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
import { fetchCoursesNew, fetchNewDepartments } from '../../../features/newCourse/newCourseSlice';
import { studentClassRegisterNew } from '../../../features/newStudent/newStudentSlice';

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

        day: "",
        time: "",
        pSelect: "",
        crnValue: {},
    });

    const [formErrors, setFormErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coursesArray, setCoursesArray] = useState([]);

    const fetchDepartmentsDataNew = useSelector(
        (state) => state.newCourses["departments"]
    )
    const fetchCoursesDataNew = useSelector(
        (state) => state.newCourses["allCourses"]
    )


    useEffect(() => {
        dispatch(fetchNewDepartments())
        dispatch(fetchCoursesNew())
    }, [])

    useEffect(() => {
        let courseArray = []
        if (fetchCoursesDataNew != []) {
            courseArray = fetchCoursesDataNew.flatMap(item => {
                const departments = Object.values(item);
                const courses = departments.flat();

                return courses.filter(course => course.department == courseData.department)

            });
        }
        setCoursesArray([...courseArray]);
    }, [courseData.department])


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
            setDayArray([]);
            setTimeArray({ "MON": [], "TUE": [], "WED": [], "THU": [], "FRI": [] });

            setcourseData({ ...courseData, pSelect: "", [name]: value });
        } else if (name === "department") {
            setDayArray([]);
            setTimeArray({ "MON": [], "TUE": [], "WED": [], "THU": [], "FRI": [] });
            setcourseData({
                courseName: '',
                pSelect: "",
                day: "",
                crnValue: {}, [name]: value
            });

        } else if (name === "time") {
            setcourseData({ ...courseData, ['time']: value });
        } else if (name === "day") {
            setcourseData({ ...courseData, ['day']: value });
        } else if (name == "pSelect") {

            setcourseData({ ...courseData, [name]: value });
            let timeArrayObj = { "MON": [], "TUE": [], "WED": [], "THU": [], "FRI": [] };
            let arrayObj = [];
            coursesArray.map(
                (course, index) => {
            
                    if (course["_id"] == courseData.courseName) {

                        course["crnArray"].map((obj) => {

                            if (obj["pid"] !== null && obj["pid"] == courseData.pSelect) {
                                let timeDataArray = obj["timings"].split(";")

                                timeDataArray.map((timeObj) => {
                                    let realData = timeObj.split("_")

                                    timeArrayObj[realData[0]].push({ value: realData[1], label: convertTime(realData[1]) })
                                    switch (realData[0]) {
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
                                })
                            }
                        })
                    }
                }
            )

            const uniqueValues = new Set(); // To store unique values
            const uniqueArr = arrayObj.filter(item => {
                if (!uniqueValues.has(item.value)) {
                    uniqueValues.add(item.value);
                    return true;
                }
                return false;
            });
            setDayArray(uniqueArr);
            setTimeArray(timeArrayObj);
        }

        else {
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

        if (!courseData.day.trim()) {
            errors.day = true;
        }
        if (!courseData.time.trim()) {
            errors.time = true;
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {

            let setRequestData = {}
            
            coursesArray.map(
                (course, index) => {
                    if(course["_id"] == courseData.courseName){
                        course["crnArray"].map((crnData)=>{
                            if( crnData["pid"] == courseData.pSelect){
                                setRequestData = {
                                    professorName: crnData["pName"],
                                    roomNumber: crnData["roomNumber"],
                                    professorId: crnData["pid"],
                                    department:courseData.department,
                                    courseName: course["name"],
                                    cid: course["cid"],
                                    crn:course["crn"]
                                }
                            }
                        })
                    }
        })
    
        setRequestData= {
            ...setRequestData,
            day: courseData.day,
            time:courseData.time,
            
        }

        
    

        const studentId = cookies.get("id")

        dispatch(  studentClassRegisterNew({studentId,setRequestData}))



        setIsModalOpen(true)



            // let duplicateArray = []

            // if (studentCourseRegistrationDetails && studentCourseRegistrationDetails.enrolls) {
            //     for (let i = 0; i < studentCourseRegistrationDetails.enrolls.length; i++) {
            //         if (studentCourseRegistrationDetails.enrolls[i]["courseId"] === courseData.courseName) {
            //             duplicateArray.push(`DC`)
            //         }
            //         if (studentCourseRegistrationDetails.enrolls[i]["day"] === courseData.day && studentCourseRegistrationDetails.enrolls[i]["time"] === courseData.time) {
            //             duplicateArray.push(`TC`)
            //         }
            //     }
            // }

            // if (duplicateArray.length > 0) {

            //     setStudentDuplicates(duplicateArray)
            //     setIsErrorModalOpen(true)
            // }
            // else {
            //     const studentId = cookies.get("id")
            //     const enrollData = {
            //         courseId: courseData.courseName,
            //         professorId: professorCourseDetails.professorId,
            //         day: courseData.day,
            //         time: courseData.time,
            //         crn: professorCourseDetails.crn
            //     }
            //     console.log("enroll data ", {
            //         studentId,
            //         enrollData
            //     })

            //     // Submit the form or perform any desired actions on successful form submission
            //     dispatch(studentClassRegister({
            //         studentId,
            //         enrollData
            //     }))
            //     setIsModalOpen(true);
            // }
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
                                    fetchDepartmentsDataNew.map((deptName, index) => (
                                        <MenuItem key={index} value={deptName}>{deptName}</MenuItem>
                                    ))
                                }
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
                                        courseData.department ?
                                            coursesArray.map(
                                                (course, index) => (
                                                    <MenuItem key={index} value={course._id}>{course["name"]}</MenuItem>
                                                )
                                            )
                                            : <MenuItem value={""}>{"None"}</MenuItem>
                                    }

                                </Select>
                            </FormControl>
                        }
                        {courseData.courseName && <>
                            {
                                coursesArray.map(
                                    (course, index) => (
                                        course["_id"] == courseData.courseName ? <>
                                            <RadioButtonContainer style={{
                                                paddingLeft: '10px',
                                                border: formErrors.time ? '1px solid red' : ''
                                            }}>
                                                {
                                                    course["crnArray"].map((obj) => (obj["pid"] != null ? <div>
                                                        <FormControlLabel
                                                            value={obj["pid"]}
                                                            control={<Radio />}
                                                            label={<div>


                                                                <div>
                                                                    <div>
                                                                        <span>Professor Name</span> : <span><b>{obj["pName"]}</b></span>
                                                                    </div>
                                                                    <div>
                                                                        <span>Room Number    </span> : <span><b>{obj["roomNumber"]}</b></span>
                                                                    </div>
                                                                    <div>
                                                                        <span>CRN </span> : <span><b>{obj["crn"]}</b></span>
                                                                    </div>
                                                                </div></div>}
                                                            name="pSelect"
                                                            checked={obj["pid"] == null ? false : courseData.pSelect == obj["pid"]}
                                                            onClick={handleInputChange}
                                                            key={index}

                                                        />
                                                    </div> : <></>))

                                                }
                                            </RadioButtonContainer>
                                        </>

                                            : <></>
                                    )
                                )
                            }

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
                                                                            value={classTime.value}
                                                                            control={<Radio />}
                                                                            label={`${classTime.label} `}
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
                <ModalContent style={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        studentDuplicates.map((obj) => (
                            obj == "TC" ?
                                <span>  <b style={{ color: 'red' }}>{"Time Conflict :"} </b> Change the course Timing  </span>
                                :
                                obj == "DC" ?


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



