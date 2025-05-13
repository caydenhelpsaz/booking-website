import React from 'react';
import { AppBar, Box } from '@mui/material';
import Logo from '../assets/caydenhelpsaz-logo.png';
import { Link } from 'react-router';

export default function Header() {
  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

      <Box>
          <Link to='/'><img src={Logo} alt='Cayden Helps AZ Logo' width='180' height='180' /></Link>
      </Box>
      
    </AppBar>
  );
}