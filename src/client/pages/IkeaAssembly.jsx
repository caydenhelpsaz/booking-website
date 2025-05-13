import React, { useState } from 'react';
import { Alert, Box, Snackbar, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs}  from '@mui/x-date-pickers/AdapterDayjs';
import Header from '../components/Header';
import Search from '../components/Search';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';

export default function IkeaAssembly() {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Message notification states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Add product to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.item_no === product.item_no);
      if (existing) {
        return prev.map((item) =>
          item.item_no === product.item_no
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prev, product];
      }
    });
  };

  // Open the checkout dialog
  const handleCheckoutClick = () => {
    if (cartItems.length >= 1) {
      setCheckoutOpen(true);
    }
  };

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
      
      <Stack spacing={2}>

        <Header />

        <Search 
          onAddToCart={addToCart}
          snackbarOpen={snackbarOpen}
          setSnackbarOpen={setSnackbarOpen}
          snackbarMessage={snackbarMessage}
          setSnackbarMessage={setSnackbarMessage}
        />
        
        <Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{ mb: 15 }}
          >
            <Alert 
              onClose={handleCloseSnackbar} 
              severity={snackbarSeverity} 
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>

        <Cart 
          cartItems={cartItems}
          onCheckoutClick={handleCheckoutClick} 
          setCartItems={setCartItems} 
        />

        <Checkout 
          cartItems={cartItems} 
          checkoutOpen={checkoutOpen} 
          handleCloseSnackbar={handleCloseSnackbar} 
          handleCheckoutClose={handleCheckoutClose} 
          setCartItems={setCartItems} 
          isIkea={true}
        />

      </Stack>
      
    </LocalizationProvider>
  );
}