const { dbAdminLogin,dbGetAdminDetailsById } = require("../DAO/databaseConnection");


async function signInAdmin(adminData) {
  const data = await dbAdminLogin(adminData)
  .then( (data) => data  == null ? {"error":"error"} : data)
  .catch(data => "error");
    console.log("data : ",data)
  return data;
}

async function getAdminDetailsById(id) {
  const data = await dbGetAdminDetailsById(id)
  .then( (data) => data  == null ? {"error":"error"}: data)
  .catch(data => "error");
  console.log("getAdminDetailsById data : ",data)
  return data;
}




module.exports = {
    signInAdmin,
    getAdminDetailsById
}