import React,{useEffect} from 'react'
import { CourseCardTitle, Item, MainNav, SubCardContainer, Title } from '../styles/styles'
import { redirect, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { studentClassDetails, studentDropClass } from '../../../features/student/studentSlice';
import { Cookies } from 'react-cookie';

function StudentDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();

   const studentCourseRegistrationDetails = useSelector(
        (state) => state.student.courseDetails
    )

     useEffect(() => {
        const studentId = cookies.get("id")
        dispatch(studentClassDetails({ studentId: studentId }))
        }, [])
 console.log(" crn values studentCourseRegistrationDetails ", studentCourseRegistrationDetails)
   
  const handleAddProfessor = (title,redirect) =>{
    switch (title) {
      case "View Courses":

        break;
      case "Enroll Classes":
       if(studentCourseRegistrationDetails["enrollNumber"] == 3){
        alert("Student can only be enrolled to 3 subjects ,  ")
        redirect="/studentDashboard"
       }
        break;
        case "Update / View  Enrollment":

        break;
        case "View Professors":

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
            
            {title:"Enroll Classes",redirect:"/studentRegisterClasses"},
             {title:" View  Enrollment",redirect:"/studentUpdateClasses"}
            // {title:"View Professors",redirect:"/viewProfessors"},
            
          ].map((obj,index) => (
            <CourseCardTitle key={`card-${index}`}>
              <SubCardContainer  key={`SubCardContainer-${index}`} onClick={()=>handleAddProfessor(obj.title,obj.redirect)}>
                <Title  key={`title-${index}`} >
                  {obj.title}
                </Title>
              </SubCardContainer>
            </CourseCardTitle>
          ))
        }


      </MainNav>
    </div>
  )
}

export default StudentDashboard