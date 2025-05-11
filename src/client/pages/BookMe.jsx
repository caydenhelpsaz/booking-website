import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs}  from '@mui/x-date-pickers/AdapterDayjs';
import Header from '../components/Header';
import Checkout from '../components/Checkout';

export default function BookMe() {
  // Message notification states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

// Close the checkout dialog
const handleCheckoutClose = () => {
    setCheckoutOpen(false);
    };

  // Close the snackbar message notification
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <Stack spacing={4}>

        <Header />
        
        <Checkout 
          checkoutOpen={true}
          handleCheckoutClose={handleCheckoutClose}
          handleCloseSnackbar={handleCloseSnackbar} 
          snackbarOpen={snackbarOpen} 
          setSnackbarOpen={setSnackbarOpen} 
          snackbarMessage={snackbarMessage} 
          setSnackbarMessage={setSnackbarMessage} 
          snackbarSeverity={snackbarSeverity}
          setSnackbarSeverity={setSnackbarSeverity} 
          isIkea={false}
        />

      </Stack>
      
    </LocalizationProvider>
  );
}