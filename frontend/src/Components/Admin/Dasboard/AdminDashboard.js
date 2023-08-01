import React from 'react'
import { Card, Item, MainNav, SubCardContainer, Title } from '../styles/styles'
import { redirect, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { fetchCRN, fetchCourses } from '../../../features/courses/courseSlice';

function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddProfessor = (title,redirect) =>{
    switch (title) {
      case "Add Professors":
          dispatch(fetchCourses())
        break;
      case "Add Deparments":
        dispatch(fetchCourses())
        dispatch(fetchCRN())
        break;
        case "Add Courses":
          dispatch(fetchCourses())
        break;
      case "View Professors":
          break;
      case "View Enrolled Students":
        break;
      case "Assign Classes":
        break;
      case "Update Assigned Classes":
        break;
      default:
        break;
    }
    navigate(redirect)
    
  }
  return (
    <div>
      <MainNav>
        {
          [ 
            {title:"Add Professors",redirect:"/addProfessors"},
            {title:"View Professors",redirect:"/viewProfessors"},
            {title:"Add Deparments",redirect:"/addDepartments"},
            {title:"Add Courses",redirect:"/addSubjects"},
            // {title:"View Enrolled Students",redirect:"/viewEnrolledStudents"},
            // {title:"Assign Classes",redirect:"/registerClasses"},
            {title:"View Courses",redirect:"/viewAdminCourses"},
            
          ].map((obj,index) => (
            <Card key={`card-${index}`}>
              <SubCardContainer  key={`SubCardContainer-${index}`} onClick={()=>handleAddProfessor(obj.title,obj.redirect)}>
                <Title  key={`title-${index}`} >
                  {obj.title}
                </Title>
              </SubCardContainer>
            </Card>
          ))
        }


      </MainNav>
    </div>
  )
}

export default AdminDashboard