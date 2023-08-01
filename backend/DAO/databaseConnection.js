
// const { alterDataArray } = require('../controllers/util');
const { DATABASE, ADMIN, STUDENT, COURSE, DEPARTMENT, SECTION, PROFESSOR, PROFESSOR_ENROLLMENT, STUDENT_ENROLLMENT } = require('./constants');


const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const uri = "mongodb+srv://sxp17390:root123@cluster0.6bf1a1k.mongodb.net/mongodb?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const database = client.db(DATABASE);
const adminCollection = database.collection(ADMIN);
const studentCollection = database.collection(STUDENT);
const courseCollection = database.collection(COURSE);
const departmentCollection = database.collection(DEPARTMENT);
const sectionCollection = database.collection(SECTION);
const professorCollection = database.collection(PROFESSOR)
const professorEnrollmentCollection = database.collection(PROFESSOR_ENROLLMENT)
const studentEnrollmentCollection = database.collection(STUDENT_ENROLLMENT)


async function dbAdminLogin(adminData) {

  try {
    const query = { ...adminData };
    const data = await adminCollection.findOne(query);
    return { ...data, "error": "" };
  } catch (error) {
    return "error"
  }
}

async function dbGetAdminDetailsById(id) {

  try {
    const query = { _id: new ObjectId(id) };
    const data = await adminCollection.findOne(query);
    return { ...data, "error": "" };
  } catch (error) {
    return "error"
  }
}

async function dbGetStudentDetailsById(id) {

  try {
    const query = { _id: new ObjectId(id) };
    const data = await studentCollection.findOne(query);
    return { ...data, "error": "" };
  } catch (error) {
    return "error"
  }
}



async function dbStudentLogin(studentData) {
  try {
    const query = { ...studentData };
    const data = await studentCollection.findOne(query);
    return { ...data, "error": "" };
  } catch (error) {
    return "error"
  }
}




async function dbStudentRegistration(studentData) {
  const { firstName, lastName, mail, password } = studentData

  try {
    const query = { firstName, lastName, mail, password,"role":"student" };
    const data = await studentCollection.insertOne(query);
    return { ...data, "msg": "success" };
  } catch (error) {
    return "error"
  }
}

async function dbGetStudentClassDetails(studentData) {
  const { studentId } = studentData

  try {
    const checkStudent = await studentEnrollmentCollection.findOne({ studentId: new ObjectId(studentId) });
    return { ...checkStudent};
  } catch (error) {
    return "error"
  }
}





async function dbDropCourse(studentData) {
  const { studentId,courseId } = studentData
  try {
    const getStudentResult = await studentEnrollmentCollection.find({ studentId: new ObjectId(studentId) }).project({ enrolls: 1,enrollNumber:1, _id: 1 }).toArray();

     let studentEnrolls = getStudentResult[0]["enrolls"].filter(obj => obj.courseId == courseId);

    const professorDataResult = await professorEnrollmentCollection.findOne({courseId:new ObjectId(courseId)});
    let enrollArrayProf = professorDataResult.enrolls
    let newResultArray = enrollArrayProf.map((obj)=>{
      if(obj["day"] === studentEnrolls[0]["day"] && obj["time"] === studentEnrolls[0]["time"]){
          return{
              "day":obj["day"], "time":obj["time"], "available": obj["available"] + 1,
          }
      }
      return {...obj}
  })
    const updateProfessorData = await professorEnrollmentCollection.updateOne(
      { "_id": professorDataResult._id },
      { "$set": 
      { 
        "enrolls": [
          ...newResultArray
        ]
      } 
      }
    );
    let newStudentArray =  getStudentResult[0]["enrolls"].filter((obj) => obj.courseId != courseId)
    const dataResult = await studentEnrollmentCollection.updateOne(
      { "_id": getStudentResult[0]["_id"] },
      { "$set": 
      { 
        enrollNumber: getStudentResult[0]["enrollNumber"] - 1,
        enrolls: [
         ...newStudentArray
        ]
      } 
      }
    );
    return {"message":"success"};
  } catch (error) {
    console.log("erro : ",error.message)
    return "error"
  }
}







async function dbRegisterStudentClass(studentData) {
  const { studentId, enrollData } = studentData

  try {
    // const studentQuery = { _id: new ObjectId(studentId) }

    // const studentResult = await studentCollection.findOne(studentQuery)


    const checkStudent = await studentEnrollmentCollection.findOne({ studentId: new ObjectId(studentId) });

    if (checkStudent === null) {
  


      const studentEnrollmentQuery = {

        enrollNumber:1,
        studentId:  new ObjectId(studentId),
        enrolls: [
          {
            ...enrollData,
            professorId: new ObjectId(enrollData["professorId"]),
            courseId: new ObjectId(enrollData["courseId"]),

          }
        ]

      }
      //insertion into the student enrollment is done succesfully
      const dataResult = await studentEnrollmentCollection.insertOne(studentEnrollmentQuery);





   
    }else{
     
      const dataResult = await studentEnrollmentCollection.updateOne(
        { "studentId": checkStudent.studentId },
        { "$set": 
        { 
          enrollNumber: checkStudent.enrollNumber + 1,
          enrolls: [
            ...checkStudent.enrolls,
            {
              ...enrollData,
              professorId: new ObjectId(enrollData["professorId"]),
              courseId: new ObjectId(enrollData["courseId"]),
  
            }
          ]
        } 
        }
      );

      }

      const professorDataResult = await professorEnrollmentCollection.findOne({courseId:new ObjectId(enrollData["courseId"])});



      let enrollArrayProf = professorDataResult["enrolls"]

      let newProfessorEnrollArray = enrollArrayProf.map((obj)=>{
          if(obj["day"] == enrollData["day"] && obj["time"] == enrollData["time"]){
            return{
              ...obj, "available": obj["available"] - 1,
            }
          }
          return {...obj}
      }
      )

     
      const updateProfessorData = await professorEnrollmentCollection.updateOne(
        { "_id": professorDataResult._id },
        { "$set": 
        { 
         
          "enrolls": [
            ...newProfessorEnrollArray
          ]
        } 
        }
      );
      
      return { ...updateProfessorData, "msg": "success" };
    

  } catch (error) {
    console.log(" error : ",error.message)
    return "error"
  }
}



async function dbGetDepartmentsAndCourses() {


  try {

    const pipeline = [
      {
        $group: {
          _id: '$department',
          courses: {
            $push: {
              _id: '$_id',
              title: '$title',
              description: '$description'
            },
          },
        },
      },

    ];

    const result = await courseCollection.aggregate(pipeline).toArray();

    const dataObject = {};
    result.forEach((item) => {
      dataObject[item._id] = {
        title: item.department,
        courses: item.courses,

      };
    });

    return dataObject;
  } catch (error) {
    console.log("error : ", error.message)
    return "error"
  }
}


async function dbAddDepartments(courseData) {
  const { department, crn } = courseData
  let crnValue = crn.split(";");


  let query2 = crnValue.reduce((result, element) => {
    result[element] = [];
    return result;
  }, {});



  try {

    const sectionsResult = await sectionCollection.insertOne({ 'crns': query2 })
    const query = { department, crn: sectionsResult.insertedId };
    const departmentResult = await departmentCollection.insertOne(query);
    return { sectionsResult: sectionsResult, "msg": "success", departmentResult: departmentResult };
  } catch (error) {
    return "error"
  }
}

async function dbAddCourse(courseData) {
  const { description, department, title } = courseData
  try {
    const query = { description, department, title };
    const data = await courseCollection.insertOne(query);
    return { ...data, "msg": "success" };
  } catch (error) {
    return "error"
  }
}


async function dbGetCRN() {

  try {
    const pipeline = [
      {
        $project: {
          crnsArray: { $objectToArray: "$crns" }
        }
      },
      {
        $unwind: "$crnsArray"
      },
      {
        $group: {
          _id: null,
          crns: { $addToSet: "$crnsArray.k" }
        }
      }
    ];

    const result = await sectionCollection.aggregate(pipeline).toArray();
    console.log("result crns  : ", result[0].crns)
    return { 'crns': result[0].crns };

  } catch (error) {
    return "error"
  }
}


async function dbGetCrnByDepart(department) {
  try {
    const query = { "department": department };
    const data = await departmentCollection.find(query).project({ crn: 1, _id: 0 }).toArray();
    const resultData = await sectionCollection.findOne({ _id: data[0].crn });
    const crns = Object.keys(resultData.crns)
    console.log("dbGetCrnByDepart  data ", crns)
    return { "crns": crns };
  } catch (error) {
    console.log("error ", error.message)
    return "error"
  }
}

async function dbGetCrnById(id) {
  try {

    const resultData = await sectionCollection.findOne({ [`crns.${id}`]: { $exists: true } });


    console.log("dbGetCrnByDepart  data ", resultData.crns[id])
    return { "crnArray": resultData.crns[id] };
  } catch (error) {
    console.log("error ", error.message)
    return "error"
  }
}

async function dbCheckEmailExists({ mail }) {
  try {

    const result = await professorCollection.findOne({ mail: mail });

    console.log(" dbCheckEmailExists data ", result)
    if (result === null) {
      return { "result": result };
    } else {
      return { "result": result["mail"] };
    }

  } catch (error) {
    console.log("error ", error.message)
    return "error"
  }
}



async function dbAddProfessor({ professorEnrollmentData, professorCollectionData, sections }) {
  try {
    const query = {
      ...professorCollectionData,
      role: "professor",
      courseId: new ObjectId(professorCollectionData.courseId),
    };
    const professorResult = await professorCollection.insertOne(query);
    const enrollmentQuery = {
      ...professorEnrollmentData,
      courseId: new ObjectId(professorCollectionData.courseId),
      professorId: professorResult.insertedId,
    }

    const enrollmentResult = await professorEnrollmentCollection.insertOne(enrollmentQuery);

    let sectionQuery = { [`crns.${professorEnrollmentData.crn}`]: { $exists: true } };
    const projection = { _id: 1 };

    let resultSection = await sectionCollection.findOne(sectionQuery, projection);


    const result = await sectionCollection.updateOne(
      { "_id": resultSection._id },
      { "$set": { [`crns.${professorEnrollmentData.crn}`]: Object.values(sections)[0] } }
    );


    return { "success": "success" };
  } catch (error) {
    console.log("error ", error.message)
    return "error"
  }
}


async function dbGetProfessors() {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: "$course",
      },
      {
        $lookup: {
          from: "professor",
          localField: "professorId",
          foreignField: "_id",
          as: "professor",
        },
      },
      {
        $unwind: "$professor",
      },
      {
        $project: {
          "professor.firstName": 1,
          "professor.lastName": 1,
          "professor.mail": 1,
          professorId: "$professor._id",
          enrolls: 1,
          crn: 1,
          "course.department": 1,
          "course.title": 1,
        },
      },
    ];
    const result = await professorEnrollmentCollection.aggregate(pipeline).toArray();
    console.log(result);

    return { ...result };
  } catch (error) {
    console.log("error ", error.message)
    return "error"
  }
}


async function dbGetProfEnrollmentById({ courseId }) {
  try {
    console.log(" courseid ", courseId)
    const enrollmentresult = await professorEnrollmentCollection.findOne({ courseId: new ObjectId(courseId) });
    const professorResult = await professorCollection.findOne({ _id: enrollmentresult.professorId })

    const outputResult = {
      professorId: professorResult._id,
      enrolls: enrollmentresult.enrolls,
      crn: enrollmentresult.crn,
      professorName: `${professorResult.firstName} ${professorResult.lastName} `,
      professorMail: professorResult.mail

    }
    return { ...outputResult };
  } catch (error) {
    return "error"
  }
}

async function dbGetAllDepartments() {

  try {
    const fetchDept = await departmentCollection.find({}).project({ department: 1, _id: 0 }).toArray();
    let arrayD = []
    Object.keys(fetchDept).forEach((x)=>
     
      arrayD.push(fetchDept[x]["department"])
    )
    return {"departments":arrayD};
  } catch (error) {
    return "error"
  }
}
module.exports = {
  dbAdminLogin,
  dbStudentLogin,
  dbStudentRegistration,
  dbGetStudentDetailsById,
  dbGetAdminDetailsById,
  dbGetDepartmentsAndCourses,
  dbAddDepartments,
  dbAddCourse,
  dbGetCRN,
  dbGetCrnByDepart,
  dbAddProfessor,
  dbGetProfessors,
  dbGetCrnById,
  dbCheckEmailExists,
  dbGetProfEnrollmentById,
  dbRegisterStudentClass,
  dbGetStudentClassDetails,
  dbDropCourse,
  dbGetAllDepartments
}

