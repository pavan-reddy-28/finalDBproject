const {  dbGetDepartmentsAndCourses,dbGetCourseIdArray,dbGetAllDepartments,dbGetCrnByDepart,dbAddDepartments, dbGetCRN, dbAddCourse,dbGetCrnById } = require("../DAO/databaseConnection");


async function getDepartments() {
  const data = await dbGetDepartmentsAndCourses()
  .then( (data) => data  == null ? {"error":"error"} : data)
  .catch(data => "error");
   
  return data;
}



async function addDepartments(courseData) {

    const data = await dbAddDepartments(courseData)
    .then( (data) => data  == null ? {"error":"error"} : data)
    .catch(data => "error");
     
    return data;
  }


async function  addCourse(courseData) {
    const data = await   dbAddCourse(courseData)
    .then( (data) => data  == null ? {"error":"error"} : data)
    .catch(data => "error");
    return data;
}

async function getCRN() {
    const data = await dbGetCRN()
    .then( (data) => data  == null ? {"error":"error"} : data)
    .catch(data => "error");
    return data;
}


async function getCrnByDepart(department) {
    const data = await dbGetCrnByDepart(department)
    .then( (data) => data  == null ? {"crnArray":[]} : data)
    .catch(data => "error");
    return data;
}

async function getCrnById(id) {
    const data = await dbGetCrnById(id)
    .then( (data) => data  == null ? {"error":"error"} : data)
    .catch(data => "error");
    return data;
}



async function getAllDepartments() {
    const data = await dbGetAllDepartments()
    .then( (data) => data  == null ? {"error":"error"} : data)
    .catch(data => "error");
    return data;
}



async function getCourseIdArray() {
    const data = await dbGetCourseIdArray()
    .then( (data) => data  == null ? {"error":"error"} : data)
    .catch(data => "error");
    return data;
}


module.exports={getCourseIdArray,getAllDepartments,getDepartments,addCourse,addDepartments,getCRN,getCrnByDepart,getCrnById}