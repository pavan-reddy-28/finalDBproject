
const { DATABASE, ADMIN, STUDENT } = require('./constants');


const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const uri = "mongodb+srv://sxp17390:root123@cluster0.6bf1a1k.mongodb.net/mongodb?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const database = client.db(DATABASE);
const adminCollection = database.collection(ADMIN);
const studentCollection = database.collection(STUDENT);


async function dbAdminLogin(adminData) {

  try {
    const query = { ...adminData };
    const data = await adminCollection.findOne(query);
    return {...data, "error":"" };
  } catch (error) {
    return "error"
  }
}

async function dbGetAdminDetailsById(id) {

  try {
    const query =  { _id: new ObjectId(id) };
    const data = await adminCollection.findOne(query);
    return {...data, "error":"" };
  } catch (error) {
    return "error"
  }
}

async function dbGetStudentDetailsById(id) {

    try {
      const query =  { _id: new ObjectId(id) };
      const data = await studentCollection.findOne(query);
      return   {...data, "error":"" };
    } catch (error) {
      return "error"
    }
  }




  async function dbStudentLogin(studentData) {

    try {
      const query = { ...studentData };
      const data = await studentCollection.findOne(query);
      return   {...data, "error":"" };
    } catch (error) {
      return "error"
    }
  }
  



  async function dbStudentRegistration(studentData) {
    const { firstName, lastName, mail, password  } = studentData
  
    try {
      const query = { firstName, lastName, mail, password  } ;
      const data = await studentCollection.insertOne(query);
      return {...data,"msg":"success"};
    } catch (error) {
      return "error"
    }
  }

module.exports = {
    dbAdminLogin,
    dbStudentLogin,
    dbStudentRegistration,
    dbGetStudentDetailsById,
    dbGetAdminDetailsById
}

