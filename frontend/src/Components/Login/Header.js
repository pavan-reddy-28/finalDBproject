import React from 'react';
import { styled } from '@mui/system';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Home, ExitToApp, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor:'black',
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));


const Header = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
  const role = cookies.get("role")
//   const handleCartClick = () => {
//     navigate('/cart');
//   };
 const handleLogout = async () =>{
    await cookies.remove("id");
   await cookies.remove("role");
    navigate("/login")

 }


 const handleHome = () =>{
   
    navigate(cookies.get("role") == "student"?"/studentDashboard":"adminDashboard");
 }
  return (
    <AppBarStyled position="static">
      <Toolbar>
        <Title variant="h6">
          Student Enrollment System
        </Title>
        
         {
          role == "student" || role == "admin" ?
          <IconButton color="inherit" onClick={()=>handleHome()}>
          <Home />
        </IconButton>
        :<></>
        }
        {
          role == "student" || role == "admin" ?
          <IconButton color="inherit"  onClick={()=>handleLogout()} >
          <ExitToApp />
        </IconButton>
        :<></>
        }
        
      </Toolbar>
    </AppBarStyled>
  );
};

export default Header;
