const { DATABASE,ADMIN, NEW_DEPARTMENTS ,NEW_PROFESSORS,NEW_COURSES, NEW_STUDENTS} = require("../constants");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;


const localuri = "mongodb://localhost:27017/";
const client = new MongoClient(localuri);

const database = client.db(DATABASE);

const adminCollection = database.collection(ADMIN);

const departmentCollection = database.collection(NEW_DEPARTMENTS);
const courseCollection = database.collection(NEW_COURSES);
const professorCollection = database.collection(NEW_PROFESSORS)
const studentCollection = database.collection(NEW_STUDENTS)

module.exports ={
    adminCollection,
    departmentCollection,
    courseCollection,
    professorCollection,
    studentCollection
}