import React, { useState, useEffect } from 'react';

import { CourseContainer, CourseSubContainer, Title, ButtonContainer } from '../styles/styles';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../../features/courses/courseSlice';

import { studentClassDetails, studentDropClass } from '../../../features/student/studentSlice';
import { SubmitButton } from '../styles/componentStyles';
import { useNavigate } from 'react-router-dom';
import { getStudentClassData, studentDropCourseNew } from '../../../features/newStudent/newStudentSlice';
// import { dropCourse } from '../../../../../backend/controllers/student';

const UpdateEnrollment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cookies = new Cookies();

    const studentCourseRegistrationDetails = useSelector(
        (state) => state.student.courseDetails
    )
    const fetchCoursesData = useSelector(
        (state) => state.courses.courses
    )
    const fetchStudentCourses = useSelector(
        (state) => state.newStudent["studentCourses"]
    )

    useEffect(() => {
        const studentId = cookies.get("id")
        dispatch(getStudentClassData({ studentId }))

    }, [])

    console.log(" new data   data :   ", fetchStudentCourses)


    useEffect(() => {
        dispatch(fetchCourses())
        console.log(" crn values  fetchCoursesData", fetchCoursesData)
    }, [])

    useEffect(() => {
        const studentId = cookies.get("id")
        dispatch(studentClassDetails({ studentId: studentId }))
        // console.log(" crn values studentCourseRegistrationDetails ", studentCourseRegistrationDetails)
    }, [])
    const [arrayCourse, setarrayCourse] = useState([])
    useEffect(() => {
        setarrayCourse(fetchStudentCourses["enrolls"])
    }, [fetchStudentCourses])

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
    const handleDropCourse = (professorId) => {
        const studentId = cookies.get("id")
        dispatch(studentDropCourseNew({ "professorId": professorId, studentId: studentId }))
        navigate("/studentDashboard")
    }
    const handleUpdateCourse = (courseListData) => {
        navigate(
            '/editEnrolledCourse',
            {
                state: {
                    enrollNumber: studentCourseRegistrationDetails["enrollNumber"],
                    enrollmentId: studentCourseRegistrationDetails["_id"],
                    ...courseListData,
                }
            });
    }
    return (
        <div>
            <Title>
                Courses List
            </Title>
            <ButtonContainer>
                <SubmitButton onClick={() => { navigate("/studentDashboard") }} type="submit" variant="contained" color="primary">
                    Back
                </SubmitButton>


            </ButtonContainer>

            <div>
                {
                    fetchStudentCourses && fetchStudentCourses.enrolls && fetchStudentCourses.enrolls.length > 0 ?


                        <>

                            {

                                arrayCourse && arrayCourse.map(
                                    (studentObj) => {

                                        return (<CourseSubContainer>
                                            <div><span style={{ color: '#0080ff', fontWeight: '600', fontSize: '20px' }}>{`${studentObj.courseName}  [${studentObj.cid}]`}</span></div>
                                            <div><span style={{ color: '#0080ff', fontWeight: '600', fontSize: '20px' }}>{"CRN  : "}</span><span style={{ color: 'black', fontWeight: '600', }}>{studentObj["crn"]}</span></div>
                                            <div><span style={{ color: '#0080ff', fontWeight: '600', fontSize: '20px' }}>{"Day : "}</span><span style={{ color: 'black', fontWeight: '600', }}>{studentObj["day"]}</span></div>
                                            <div><span style={{ color: '#0080ff', fontWeight: '600', fontSize: '20px' }}>{"Class Room : "}</span><span style={{ color: 'black', fontWeight: '600', }}>{studentObj["roomNumber"]}</span></div>
                                            <div><span style={{ color: '#0080ff', fontWeight: '600', fontSize: '20px' }}>{"Timing  : "}</span><span style={{ color: 'black', fontWeight: '600', }}>{convertTime(studentObj["time"])}</span></div>
                                            <div>

                                            </div>
                                            <ButtonContainer>
                                                <SubmitButton onClick={() => handleDropCourse(studentObj["professorId"])} type="submit" variant="contained" color="primary">
                                                    Drop Course
                                                </SubmitButton>


                                            </ButtonContainer>
                                        </CourseSubContainer>)

                                    }
                                )


                            }

                        </>



                        : <div style={{ margin: 'auto', textAlign: "center" }}><h1> No Courses enrolled</h1></div>
                }

            </div>

        </div>
    );
};

export default UpdateEnrollment;
