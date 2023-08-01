import React from "react";
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import Login from "./Components/Login/Login";
import AdminDashboard from "./Components/Admin/Dasboard/AdminDashboard";
import StudentDashboard from "./Components/Student/Dashboard/StudentDashboard";
import Header from "./Components/Login/Header";
import AddProfessors from "./Components/Admin/Professors/AddProfessors";
import DepartmentsPage from "./Components/Admin/Departments/AddDepartments";
import EmptyPage from "./Components/Admin/EmptyPage";
import AddSubjectsPage from "./Components/Admin/Subjects/AddSubjects";
import ViewProfessors from "./Components/Admin/Professors/ViewProfessors";
import ViewCourses from "./Components/Student/Courses/ViewCourses";
import EnrollCourses from "./Components/Student/Courses/EnrollCourses";
import UpdateEnrollment from "./Components/Student/Courses/UpdateEnrollment";
import UpdateSpecificCourse from "./Components/Student/Courses/UpdateSpecificCourse";
import StudentRegistration from "./Components/Student/Registration/StudentRegistration";
import AdminViewCourses from "./Components/Admin/Subjects/AdminViewCourses";

function App() {
  return (
    <div className="App">
   
      <BrowserRouter>
      <Header />
        <Routes>
       
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route path="/addProfessors" element={<AddProfessors />} />
          <Route path="/addDepartments" element={<DepartmentsPage />} />
          <Route path="/viewProfessors" element={<ViewProfessors />} />
          <Route path="/viewEnrolledStudents" element={<EmptyPage />} />
          <Route path="/registerClasses" element={<EmptyPage />} />
          <Route path="/updateRegisteredClasses" element={<EmptyPage />} />
          <Route path="/addSubjects" element={<AddSubjectsPage />} />


          <Route path="/studentViewCourses" element={<ViewCourses />} />
          <Route path="/studentRegisterClasses" element={<EnrollCourses />} />
          <Route path="/studentUpdateClasses" element={<UpdateEnrollment />} />
          <Route path="/editEnrolledCourse" element={<UpdateSpecificCourse />} />
            <Route path="/studentRegistration" element={<StudentRegistration/>}/>
            <Route path="/viewAdminCourses" element={<AdminViewCourses/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
