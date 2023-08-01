import React, { useState, useEffect } from 'react';

import { CourseContainer, CourseSubContainer, Title, ButtonContainer } from '../styles/styles';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../../features/courses/courseSlice';

import { studentClassDetails, studentDropClass } from '../../../features/student/studentSlice';
import { SubmitButton } from '../styles/componentStyles';
import { useNavigate } from 'react-router-dom';

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

    useEffect(() => {
        dispatch(fetchCourses())
        console.log(" crn values  fetchCoursesData", fetchCoursesData)
    }, [])

    useEffect(() => {
        const studentId = cookies.get("id")
        dispatch(studentClassDetails({ studentId: studentId }))
        // console.log(" crn values studentCourseRegistrationDetails ", studentCourseRegistrationDetails)
    }, [])

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
    const handleDropCourse = (courseId) => {
        const studentId = cookies.get("id")
        dispatch(studentDropClass({ courseId: courseId, studentId: studentId }))
        navigate("/studentDashboard")
    }
    const handleUpdateCourse = (courseListData) =>{
        navigate(
            '/editEnrolledCourse',
            {
              state: {
                enrollNumber:studentCourseRegistrationDetails["enrollNumber"],
                enrollmentId:studentCourseRegistrationDetails["_id"],
                ...courseListData,
            }} );
    }
    return (
        <div>
            <Title>
                Courses List
            </Title>
            <div>
                {
                    studentCourseRegistrationDetails && studentCourseRegistrationDetails.enrollNumber > 0 ?
                        Object.keys(fetchCoursesData).map((dept, index) => (

                            <>
                                <CourseContainer style={{ textAlign: 'left', marginLeft: '20px', width: '30%' }}>
                                    <span style={{ fontWeight: '600', fontSize: '26px' }}>
                                        {dept}
                                    </span>
                                </CourseContainer>
                                {
                                    fetchCoursesData[dept]["courses"].map((coursesData) => (
                                        studentCourseRegistrationDetails && studentCourseRegistrationDetails["enrolls"].map(
                                            (studentObj) => {
                                                if (studentObj["courseId"] == coursesData._id) {
                                                    return (<CourseSubContainer>
                                                        <div><span style={{ color: '#0080ff', fontWeight: '600', fontSize: '20px' }}>{coursesData.title}</span></div>
                                                        <div><span style={{ color: '#0080ff', fontWeight: '600', fontSize: '20px' }}>{"Day : "}</span><span style={{ color: 'black', fontWeight: '600', }}>{studentObj["day"]}</span></div>
                                                        <div><span style={{ color: '#0080ff', fontWeight: '600', fontSize: '20px' }}>{"CRN : "}</span><span style={{ color: 'black', fontWeight: '600', }}>{studentObj["crn"]}</span></div>
                                                        <div><span style={{ color: '#0080ff', fontWeight: '600', fontSize: '20px' }}>{"Timing  : "}</span><span style={{ color: 'black', fontWeight: '600', }}>{convertTime(studentObj["time"])}</span></div>
                                                        <div>
                                                            <ButtonContainer>
                                                                <SubmitButton onClick={() => handleUpdateCourse({...studentObj,dept:dept})} type="submit" variant="contained" color="primary">
                                                                    Update Course
                                                                </SubmitButton>

                                                                <SubmitButton onClick={() => handleDropCourse(studentObj["courseId"])} style={{ marginLeft: '20px' }} type="submit" variant="contained" color="primary">
                                                                    Drop Course
                                                                </SubmitButton>
                                                            </ButtonContainer>

                                                        </div>

                                                    </CourseSubContainer>)
                                                } else {
                                                    return <></>
                                                }
                                            }
                                        )

                                    ))
                                }

                            </>


                        ))
                        : <div style={{ margin: 'auto', textAlign: "center" }}><h1> No Courses enrolled</h1></div>
                }

            </div>

        </div>
    );
};

export default UpdateEnrollment;
