const {  dbStudentLogin, dbStudentRegistration, dbGetStudentDetailsById } = require("../DAO/databaseConnection");


async function signInStudent(studentData) {
  const data = await dbStudentLogin(studentData)
  .then( (data) => data  == null ? {"error":"error"}: data)
  .catch(data => "error");
  console.log("signInStudent data : ",data)
  return data;
}


async function getStudentDetailsById(id) {

  const data = await dbGetStudentDetailsById(id)
  .then( (data) => data  == null ? {"error":"error"}: data)
  .catch(data => "error");
  console.log("getStudentDetailsById data : ",data)
  return data;
}
async function registerStudent(studentData) {
    const data = await dbStudentRegistration(studentData)
    .then( (data) => data  == null ? "error" : data)
    .catch(data => "error");
    console.log("registerStudent data : ",data)
    return data;
  }
  



module.exports = {
    signInStudent,
    registerStudent,
    getStudentDetailsById
}