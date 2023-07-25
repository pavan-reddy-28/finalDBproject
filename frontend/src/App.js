import React from "react";
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import Login from "./Components/Login/Login";
import AdminDashboard from "./Components/Admin/Dasboard/AdminDashboard";
import StudentDashboard from "./Components/Student/StudentDashboard";
import Header from "./Components/Login/Header";

function App() {
  return (
    <div className="App">
      <Header/>
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<Login/>}/>
     <Route path="/login" element={<Login/>}/>
    <Route path="/adminDashboard" element={<AdminDashboard/>} />
    <Route path="/studentDashboard" element={<StudentDashboard/>} />
</Routes>
   
     </BrowserRouter>
    </div>
  );
}

export default App;
