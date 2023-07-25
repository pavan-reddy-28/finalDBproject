const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const bodyParser = require('body-parser');
const { signInAdmin,getAdminDetailsById } = require('./controllers/admin');
const { signInStudent, registerStudent,getStudentDetailsById } = require('./controllers/student');


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


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});