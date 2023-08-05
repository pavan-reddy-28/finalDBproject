import React, { useState, useEffect } from 'react';

import { CourseContainer, CourseSubContainer, Title } from '../styles/styles';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../../features/courses/courseSlice';
import { getStudentClassData } from '../../../features/newStudent/newStudentSlice';


const ViewCourses = () => {
    const dispatch = useDispatch();
        const cookies = new Cookies();
    const fetchCoursesData = useSelector(
        (state) => state.courses.courses
    )
    
const fetchStudentCourses = useSelector(
    (state) => state.newStudent["studentCourses"]
)

useEffect(() => {
  const studentId = cookies.get("id")
    dispatch(getStudentClassData({studentId}))
 
}, [])

console.log(" new data   data :   ",fetchStudentCourses)

    useEffect(() => {
        dispatch(fetchCourses())
        console.log(" crn values ", fetchCoursesData)
    }, [])
    return (
        <div>
            <Title>
                Courses List
            </Title>
            <div>
                {
                    Object.keys(fetchCoursesData).map((dept, index) => (

                        <>
                            <CourseContainer style={{ textAlign: 'left', marginLeft: '20px', width: '30%' }}>
                                <span style={{ fontWeight: '600', fontSize: '26px' }}>
                                    {dept}
                                </span>
                            </CourseContainer>
                            {
                                fetchCoursesData[dept]["courses"].map((coursesData) => (
                                    <CourseSubContainer>
                                        <div><span style={{ color: '#0080ff', fontWeight: '600', fontSize: '20px' }}>{coursesData.title}</span></div>
                                        <div>
                                            <span> <u>Description: </u>
                                                {coursesData.description}
                                            </span>
                                        </div>
                                    </CourseSubContainer>
                                ))
                            }

                        </>


                    ))

                }

            </div>

        </div>
    );
};

export default ViewCourses;
