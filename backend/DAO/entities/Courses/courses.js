

//departments



/*
department id :
department name :
classRoom:{
    "A501":"Y",
    "A506":"N",
}
*/

//courses coleection

/*

id:xxxxxx7889
name:Advance database systems
number:cs5000
description: "databse system"
department : 
crnArray: [
        {
           crn: crn12504,
           id: professor1
        },
        {
           crn: crn12508,
           id: professor2
        }
]
 


*/

const { departmentCollection,courseCollection } = require("../Collections");

const insertDepartment = async (departmentData) => {
    try {
    const { department,classRooms } = departmentData
    let classRoomString = classRooms;
    if (classRoomString.endsWith(";")) {
        classRoomString = classRoomString.slice(0, -1);
    }
    let calssRoomArray = classRoomString.split(";");
    const newObj = {};
    calssRoomArray.forEach(item => {
        const key = item.toUpperCase();
        newObj[key] = "";
    });
        const query = { department: department, classRoom: newObj };
        const data = await departmentCollection.insertOne(query)
        return { ...data, "msg": "good" };

    } catch (error) {
        console.log(" insertDepartment error  ", error.message);
        return {
            "msg": "bad"
        }

    }
}

const fetchDepartments = async () => {
    try {
        const data = await departmentCollection.find({}).project({ department: 1, _id: 0 }).toArray()
        let arrayD = []
        arrayD = data.map(obj => obj["department"])
        console.log("department data from db ", arrayD)

        return { "departments": arrayD };

    } catch (error) {
        console.log(" fetchDepartments error  ", error.message);
        return {
            "departments": []
        }

    }
}

const fetchClassRoomsByDepart = async (departmentData) => {
    try {
        const { department } = departmentData 
        const data = await departmentCollection.find({department}).project({ classRoom: 1, _id: 0 }).toArray()
        let arrayD = []
        arrayD = data.map(obj => obj["classRoom"])

        console.log("department data from db ", arrayD[0])

        return { "classRoomsByDepart": arrayD[0]==undefined ?{}: arrayD[0]};

    } catch (error) {
        console.log(" fetchClassRoomsByDepart error  ", error.message);
        return {
            "classRoomsByDepart": {}
        }

    }
}


const fetchClassRooms = async () => {
    try {
        const data = await departmentCollection.find({}).toArray()
        const classRooms = [];

        data.forEach(data => {
          Object.entries(data.classRoom).forEach(([room, status]) => {
            if (status === 'N') {
              classRooms.push({ [room]: status });
            }
          });

        });   
        console.log(" fetchClassRooms : ",classRooms)
        return { "classRooms": classRooms };

    } catch (error) {
        console.log(" fetchDepartments error  ", error.message);
        return {
            "classRooms": []
        }

    }
}
/*

id:xxxxxx7889
name:Advance database systems
cid:cs5000
description: "databse system"
department : 
crnArray: [
        {
           crn: crn12504,
           pid: professor1
        },
        {
           crn: crn12508,
           pid: professor2
        }
]
 


*/


const insertCourse = async (courseData) => {
    try {
    const { name,cid,description,department,crnArray } = courseData

    let crnArrayString = crnArray;
    if (crnArrayString.endsWith(";")) {
        crnArrayString = crnArrayString.slice(0, -1);
    }

    let crnArrayData = crnArrayString.split(";");

    const crnObjArray =  crnArrayData.map(item => ({
            crn: item,
            pid: null,
            timings:"",
            pName:"",
            roomNumber:""
         }));
        const query = { department: department,name:name,cid:cid,description:description,crnArray:crnObjArray };

         const data = await courseCollection.insertOne(query)
        return { ...data, "msg": "good" };

    } catch (error) {
        console.log(" insertCourse error  ", error.message);
        return {
            "msg": "bad"
        }

    }
}



const fetchCourses = async () => {
    try {
        const pipeline = [
            {
              $group: {
                _id: '$department',
                courses: { $push: '$$ROOT' }
              }
            }
          ];
        const data = await courseCollection.aggregate(pipeline).toArray()
       const nD = data.map((obj)=>({
        [obj._id]:obj["courses"]
    
    }))
        console.log(" courses : ",nD)
        return { "courses": nD };

    } catch (error) {
        console.log(" fetchDepartments error  ", error.message);
        return {
            "courses": []
        }

    }
}

module.exports = {
    fetchDepartments,
    insertDepartment,
    fetchClassRooms,
    insertCourse,
    fetchCourses,
    fetchClassRoomsByDepart
}