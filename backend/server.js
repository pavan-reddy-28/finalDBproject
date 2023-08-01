const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const bodyParser = require('body-parser');
const { signInAdmin,getAdminDetailsById } = require('./controllers/admin');
const { signInStudent,dropCourse, registerStudent,getStudentDetailsById,registerStudentClass, getStudentClassDetails } = require('./controllers/student');
const { addDepartments, getAllDepartments,getDepartments,addCourse,getCRN,getCrnByDepart, getCrnById } = require('./controllers/course');
const { addProfessor,getProfessors,checkEmailExists , getProfEnrollmentById} = require('./controllers/professor');


const app = express();
const upload = multer();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post('/adminLogin',upload.any(), async (req, res) => {
    const { email, password } = req.body;
    // console.log({email,password})
    const data = await signInAdmin({ mail: email, password: password })
     res.json({ data: data });
    
});
app.get('/getAdminDetailsById',upload.any(), async (req, res) => {
    const { id } = req.body;
    const data = await getAdminDetailsById({ id})
     res.json({ data: data });
});

app.post('/studentLogin',upload.any(), async (req, res) => {
    const { email, password } = req.body;
    // console.log("body data ",{email,password})
    const data = await signInStudent({ mail: email, password: password })
     res.json({ data: data });
    
});

app.get('/getStudentDetailsById',upload.any(), async (req, res) => {
    const { id } = req.body;
    const data = await getStudentDetailsById({ id})
     res.json({ data: data });
    
});


app.post("/studentSignup",upload.any(), async (req,res) => {
    const { firstName, lastName, mail, password  } = req.body;
    const data = await registerStudent( { firstName, lastName, mail, password  } )
    res.json({data:data});
})





app.get("/getDepartments",upload.any(), async (req,res) => {
    const data = await getDepartments()
    res.json({...data});
})

app.post("/fetchAllDepartments",upload.any(), async (req,res) => {
    const data = await getAllDepartments()
    res.json({...data});
})
app.post("/getStudentClassDetails",upload.any(), async (req,res) => {
    const { studentId } = req.body;
    const data = await getStudentClassDetails({studentId})
    res.json({...data});
})

app.post("/getProfEnrollmentById",upload.any(), async (req,res) => {
    const { courseId } = req.body;
    const data = await getProfEnrollmentById( { courseId  } )
    res.json({...data});
})


app.post("/dropCourse",upload.any(), async (req,res) => {
    const { courseId,studentId } = req.body;
    const data = await dropCourse( { courseId ,studentId } )
    res.json({...data,"message":"success"});
})

app.post("/registerStudentClass",upload.any(), async (req,res) => {
    const { studentId,enrollData } = req.body;
    console.log(" { studentId,enrollData } ",{ studentId,enrollData })
    const data = await registerStudentClass( { studentId,enrollData  } )

    res.json({...data});
})


app.post("/addCourses",upload.any(), async (req,res) => {
    const { title, description, department } = req.body;
    const data = await addCourse({ title, description, department })
    res.json({...data});
})

app.post("/addDepartments",upload.any(), async (req,res) => {
    const { department,crn } = req.body;
    const data = await addDepartments({ department,crn })
    res.json({...data});
})


app.get("/fetchCRN",upload.any(), async (req,res) => {
    const data = await getCRN();
    res.json({...data});
})

app.post("/fetchCrnByDepart",upload.any(), async (req,res) => {
    const { department} = req.body;
    console.log("department in server js ",department)
    const data = await getCrnByDepart(department);
    res.json({...data});
})

app.post("/fetchCrnById",upload.any(), async (req,res) => {
    const { id } = req.body;
    console.log("department in server js ",id)
    const data = await getCrnById(id);
    res.json({...data});
})

app.post("/checkEmail",upload.any(), async (req,res) => {
    const { email } = req.body;
    console.log("department in server js ",email)
    const data = await checkEmailExists({ mail: email });
    res.json({...data});
})



app.post("/registerProfessor",upload.any(), async (req,res) => {
    const { professorEnrollmentData, professorCollectionData,sections } = req.body;
    const data = await addProfessor({ professorEnrollmentData, professorCollectionData ,sections});
    res.json({...data});
})

app.get("/fetchProfessors",upload.any(), async (req,res) => {
    const data = await getProfessors();
    res.json({...data});
})



app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});