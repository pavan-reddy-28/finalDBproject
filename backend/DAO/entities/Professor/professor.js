

//professor collection

/*

id:
professorname :
mail:
password:
courseId:
timings:['MON]
roomNumber:"A501"
*/



const { ObjectId } = require("mongodb");
const { professorCollection, departmentCollection, courseCollection } = require("../Collections");

const insertProfessor = async (professorData) => {
    try {
        const { firstName, lastName, mail, enrolls, department, isUpdate } = professorData
        let professorQuery = {
            firstName,
            lastName,
            mail,
            enrolls: [
                {
                    timings: enrolls[0]["timings"],
                    roomNumber: enrolls[0]["roomNumber"],
                    crn: enrolls[0]["crn"],
                    courseId: new ObjectId(enrolls[0]["courseId"]),
                    available: parseInt(enrolls[0]["available"]),
                }
            ]
        }
        let professorResult = ""
        let professorResultArray = ""
        if (isUpdate) {
            professorResultArray = await professorCollection.find({ mail: mail }).project({ "enrolls": 1, _id: 1 }).toArray();
            let enrollArrayData = professorResultArray[0]["enrolls"]
            professorResult = await professorCollection.updateOne(
                { _id: professorResultArray[0]["_id"] },
                {
                    "$set":
                    {
                        "enrolls": [
                            ...enrollArrayData,
                            {
                                timings: enrolls[0]["timings"],
                                roomNumber: enrolls[0]["roomNumber"],
                                crn: enrolls[0]["crn"],
                                courseId: new ObjectId(enrolls[0]["courseId"]),
                                available: parseInt(enrolls[0]["available"]),
                            }
                        ]
                    }
                })
        } else {
            professorResultArray = await professorCollection.insertOne(professorQuery);
            console.log("professorResultArray ", professorResultArray)
            professorResultArray = [{
                "_id": professorResultArray["insertedId"]
            }]
        }
        console.log("depart array value    ", professorResultArray[0]["_id"])

        const courseResult = await courseCollection.find({ _id: new ObjectId(enrolls[0]["courseId"]) }).project({ crnArray: 1, _id: 0 }).toArray();

        let newCrnArray = courseResult[0]["crnArray"].map((obj) => (
            obj.crn === enrolls[0]["crn"] ? {
                 ...obj, 
                pid: professorResultArray[0]["_id"],
                timings: enrolls[0]["timings"],
                roomNumber: enrolls[0]["roomNumber"],
                crn: enrolls[0]["crn"],
                pName:firstName+" "+lastName,
                available: parseInt(enrolls[0]["available"]),
                } : obj
        ))

        const updatedCourseResult = await courseCollection.updateOne(
            { "_id": new ObjectId(enrolls[0]["courseId"]) },
            {
                "$set":
                {
                    "crnArray": [
                        ...newCrnArray
                    ]
                }

            })

        const departmentResult = await departmentCollection.find({ "department": department }).project({ classRoom: 1, _id: 0 }).toArray();

        let classRoomObj = departmentResult[0]["classRoom"]
        classRoomObj = {
            ...classRoomObj,
            [enrolls[0]["roomNumber"]]: classRoomObj[enrolls[0]["roomNumber"]] == "" ? enrolls[0]["timings"] : `${classRoomObj[enrolls[0]["roomNumber"]]};${enrolls[0]["timings"]}`
        }
        const updatedDepartmentResult = await departmentCollection.updateOne(
            { "department": department },
            {
                "$set":
                {
                    "classRoom": {
                        ...classRoomObj
                    }
                }
            })

        return { "msg": "good" };

    } catch (error) {
        console.log(" insertDepartment error  ", error.message);
        return {
            "msg": "bad"
        }

    }
}

const fetchProfessosMails = async () => {

    try {
        const fetchArray = await professorCollection.find({}).project({ mail: 1, _id: 0 }).toArray();
        let arrayD = []
        arrayD = fetchArray.map(o => o["mail"])
        console.log("prof array ", arrayD)
        return { "professorMails": arrayD };
    } catch (error) {
        console.log(" fetchProfessosMails error  ", error.message);
        return {
            "professorMails": []
        }
    }
}



module.exports = {
    insertProfessor,
    fetchProfessosMails
}