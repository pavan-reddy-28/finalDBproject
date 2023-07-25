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
    // const navigate = useNavigate();
    // const cookies = new Cookies();

//   const handleCartClick = () => {
//     navigate('/cart');
//   };
//  const handleLogout = async () =>{
//     const removeData = Object.keys(cookies.getAll())
//     for(let i =0;i<removeData.length;i++){
//        await cookies.remove(removeData[i]);
//     }

//     setUser("");
//     navigate('/');
//  }


//  const handleHome = () =>{
//     navigate("/");
//  }
  return (
    <AppBarStyled position="static">
      <Toolbar>
        <Title variant="h6">
          Student Enrollment System
        </Title>
        {/* {
          user!=""?
          <>
        <IconButton color="inherit" onClick={()=>handleHome()}>
          <Home />
        </IconButton>
        
        <IconButton color="inherit" onClick={()=>handleLogout()}>
          <ExitToApp />
        </IconButton>
        </>
        :<></>

        } */}
        
        <IconButton color="inherit" >
          <ShoppingCart />
        </IconButton>
        
      </Toolbar>
    </AppBarStyled>
  );
};

export default Header;
