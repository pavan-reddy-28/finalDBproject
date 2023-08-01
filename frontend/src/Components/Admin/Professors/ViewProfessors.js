import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Title } from '../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProfessors } from '../../../features/professor/professorSlice';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const BackButton = styled(Button)({
  marginTop: '20px',
});

const Card = styled('div')({
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    width: '90%',
    
    margin: 'auto',
    backgroundColor:'white',

    '&:hover': {
        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)', // Adjust the values to make the shadow bigger
      },
})
const ViewProfessors = () => {
  // Sample data for the table
  const cookies = new Cookies();
const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProfessorsData = useSelector(
    (state) => state.professor.allProfessors
  )

  useEffect(() => {
   dispatch(fetchAllProfessors()) 
  }, [])
  


  return (
    <div>
         <Title>
            View Professors
        </Title>
        {
            allProfessorsData ==={} ?
            <>
            <h1>Data Loading</h1>
            </> 
            :
            <Card>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow style={{border:'2px solid black',borderTopLeftRadius:"10px"}}>
                    <TableCell> Full Name</TableCell>
                    <TableCell> Mail ID</TableCell>
                    <TableCell>CRN</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Class Timings</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{border:'2px solid black'}}>
                  {Object.values(allProfessorsData).map((professor) => (
                    <TableRow style={{border:'2px solid black'}} key={professor.id}>
                      <TableCell>{`${professor["professor"]["firstName"]}  ${professor["professor"]["lastName"]}`}</TableCell>
                      <TableCell>{professor["professor"]["mail"]}</TableCell>
                      <TableCell>{professor["crn"]}</TableCell>
                      <TableCell>{professor["course"]["department"]}</TableCell>
                      <TableCell>{professor["course"]["title"]}</TableCell>
                      <TableCell>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Timings</TableCell>
                              <TableCell>Day</TableCell>
                              <TableCell>Available Slots</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                                professor["enrolls"].map((enrollObj,index) => (
                                    <TimingsTable day={enrollObj["day"]} time={enrollObj["time"]} availableSlots={enrollObj["available"]} />
                                ))
                            }
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Card>
        }
       
      <BackButton variant="contained" color="primary" onClick={()=>{
       navigate(cookies.get("role") == "student"?"/studentDashboard":"/adminDashboard")
      }}>
        Back
      </BackButton>
    </div>
  );
};
const TimingsTable = ({day,time,availableSlots})=>{

    const convertDay = (value) => {
        switch (value) {
            case "MON":
                return "Monday";
            case "TUE":
                return "Tuesday";
            case "WED":
                return "Wednesday";
            case "THU":
                return "Thursday";
            case "FRI":
                return "Friday";
        }
    }
    const convertTime = (value) => {
        switch (value) {
            case "1000":
                return "10:00 AM - 12:50 PM";
            case "0110":
                return "01:10 PM - 03:00 PM";
            case "0320":
                return "03:20 PM - 06:10 PM";
        }
    }

    return( <TableRow>
        <TableCell>{convertDay(day)}</TableCell>
        <TableCell>{convertTime(time)}</TableCell>
        <TableCell>{availableSlots}</TableCell>
      </TableRow>)
}
export default ViewProfessors;
