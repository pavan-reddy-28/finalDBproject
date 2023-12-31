import React, { useState, useEffect } from 'react';



import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../../features/courses/courseSlice';
import { CourseSubContainer, CourseContainer, Title  } from '../../Student/styles/styles';
// import { fetchCourses } from '../../../features/courses/courseSlice';


const AdminViewCourses = () => {
    const dispatch = useDispatch();
    const fetchCoursesData = useSelector(
        (state) => state.courses.courses
    )

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

export default AdminViewCourses;
