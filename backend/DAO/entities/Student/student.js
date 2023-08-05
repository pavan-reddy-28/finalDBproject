//student collection

const { ObjectId } = require("mongodb");
const { studentCollection } = require("../Collections");

/*

id:
name:
mail:
password:
address:{
    street:
    pincode:
    line1:
}
enrollNumber:
enrolls:[
    {
        courseId:
        professorId:
        professorName:
        courseName:
        timings: "MON_1000"
        roomNumber:
        crn:
        departmentName:""
    }
]
*/

const insertStudent = async (studentData) => {
    try {
        const { firstName,studentDataId, lastName, mail, password, address, phone } = studentData
        const query = { firstName,studentId:studentDataId, lastName, mail, password, address, phone, role: "student", enrolls: [] }
        const studentDataResult = studentCollection.insertOne(query);
        return {
            "msg": "good"
        }
    } catch (error) {
        console.log(" insertStudent error  ", error.message);
        return {
            "msg": "bad"
        }
    }
}

const fetchStudentMails = async () => {
    try {
        const resultData = await studentCollection.find({}).project({ "mail": 1, _id: 0 }).toArray();
        let arrayD = []
        arrayD = resultData.map(o => o["mail"])
        console.log("student mails array ", arrayD)
        return { "studentMails": arrayD };
    } catch (error) {
        console.log("fetchStudentMails ", error.message)
        return {
            "studentMails": []
        }
    }
}



const fetchStudentDetailsById = async (id) => {

    try {
        const query = { _id: new ObjectId(id) };
        const data = await studentCollection.findOne(query);
        return { "studentData": { ...data }, "error": "" };
    } catch (error) {
        console.log("dbGetStudentDetailsById ", error.message)
        return { "studentData": {}, "error": "" }
    }
}


const studentLogin = async (studentData) => {
    try {
        const { mail, password } = studentData
        const query = { mail, password };
        const data = await studentCollection.findOne(query);
        return { "studentData": { ...data }, "error": "" };
    } catch (error) {
        console.log("error : ", error.message)
        return { "studentData": {}, "error": "" };
    }
}


const registerStudentClass = async (studentData) => {
    try {


        const { studentId, setRequestData } = studentData
    
        const getStudentData = await studentCollection.findOne({ _id: new ObjectId(studentId) })
        let enrollData = getStudentData["enrolls"]
        enrollData = [
            ...enrollData,
            {
                professorId: new ObjectId(setRequestData.professorId),
                day: setRequestData.day,
                time:setRequestData.time,
                cid:setRequestData.cid,
                department:setRequestData.department,
                roomNumber:setRequestData.roomNumber,
                professorName: setRequestData.professorName,
                courseName:setRequestData.courseName ,
                crn:setRequestData.crn
            }
        ]


        const updatedStudentData = await studentCollection.updateOne(
            { _id: getStudentData._id },
            {
                "$set":
                {
                    "enrolls": [
                        ...enrollData
                    ]
                }
            })

        return { "msg":"good"  };
    } catch (error) {
        console.log("error : ", error.message)
        return { "msg":"bad"  };
    }
}


const getStudentClassData = async (studentData) => {
    try {
        const { studentId } = studentData
        console.log(" stud ",studentId)
        const query = { _id:new ObjectId(studentId) };
        const data = await studentCollection.findOne(query);
        console.log(" data ",data)
        return { "studentCourses": { ...data }, "error": "" };
    } catch (error) {
        console.log("error : ", error.message)
        return { "studentCourses": {}, "error": "" };
    }
}


const studentDropCourse = async (studentData) => {
    try {
       
        const { studentId,professorId  } = studentData
    
        const getStudentData = await studentCollection.findOne({ _id: new ObjectId(studentId) })
        let enrollData = getStudentData["enrolls"]

        let updatedEnrollData = []
        enrollData.map((obj)=>{
             if(obj["professorId"] == professorId){

             }else{
                updatedEnrollData.push(obj)
             }
        })
        console.log("  updated ",  updatedEnrollData)
        enrollData = [
           ...updatedEnrollData
        ]


        const updatedStudentData = await studentCollection.updateOne(
            { _id: getStudentData._id },
            {
                "$set":
                {
                    "enrolls": [
                        ...enrollData
                    ]
                }
            })
        return { "msg": "good", };
    } catch (error) {
        console.log("error : ", error.message)
        return { "msg": "bad",  };
    }
}
module.exports = {
    studentLogin,
    fetchStudentDetailsById,
    fetchStudentMails,
    insertStudent,
    registerStudentClass,
    getStudentClassData,
    studentDropCourse
}