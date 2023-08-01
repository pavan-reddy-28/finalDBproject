


const { dbAddProfessor,dbGetProfessors,dbCheckEmailExists,dbGetProfEnrollmentById } = require("../DAO/databaseConnection");


async function addProfessor({ professorEnrollmentData, professorCollectionData, sections }) {
  const data = await dbAddProfessor({ professorEnrollmentData, professorCollectionData, sections })
  .then( (data) => data  == null ? {"message":"error"} : data)
  .catch(data => "error");
    console.log("data : ",data)
  return data;
}

async function getProfessors() {
    const data = await dbGetProfessors()
    .then( (data) => data  == null ? {"message":"error"} : data)
    .catch(data => "error");
      console.log("data : ",data)
    return data;
  }

  
  async function checkEmailExists({mail}) {
    const data = await dbCheckEmailExists({mail})
    .then( (data) => data  == null ? {"message":"error"} : data)
    .catch(data => "error");
      console.log("data : ",data)
    return data;
  }

  
  async function getProfEnrollmentById({courseId}) {
    
    const data = await dbGetProfEnrollmentById({courseId})
    .then( (data) => data  == null ? {"message":"error"} : data)
    .catch(data => "error");
      console.log("data : ",data)
    return data;
  }


module.exports = {
    addProfessor,
    getProfessors,
    checkEmailExists,
    getProfEnrollmentById
}