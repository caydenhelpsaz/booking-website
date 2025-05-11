import React, { useState } from 'react';
import { 
  Paper,
  Box,
  Stack,
  Typography, 
  Badge,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link } from 'react-router';

export default function Cart({ cartItems, setCartItems, onCheckoutClick }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  // Calculate the total price of the items in the cart
  const getTotal = () => {
    if (cartItems.length === 0) return '0.00';

    const total = cartItems.reduce(
      (sum, item) => sum + item.assembly_price_cents * item.quantity * 0.01,
      0
    );

    return (total < 52 ? 52 : total).toFixed(2);
  };

  // Get the total quantity of all items in the cart
  const getQuantity = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Paper elevation={8} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100, px: 2, py: 1 }}>

      <Box sx={{ maxWidth: 600, mx: 'auto' }}>

        <Stack direction='row' justifyContent='center' alignItems='center' spacing={2} sx={{ pt: 0.5, mt: 2 }}>

          <Badge badgeContent={getQuantity()} color='primary'>
            <ShoppingCart />
          </Badge>

          <Typography variant='body2' fontWeight='bold'>
            Total: ${getTotal()}
          </Typography>

          {getTotal() < 52 && (
            <>
              <IconButton onClick={handleDialogOpen}>
                <InfoOutlinedIcon fontSize='small' />
              </IconButton>

              <Dialog open={dialogOpen} onClose={handleDialogClose}>

                <DialogTitle>Minimum Order Required</DialogTitle>

                <DialogContent>
                  <Typography>
                    A minimum order of <strong>$52.00</strong> is required. Your current total is <strong>${getTotal()}</strong>.
                  </Typography>
                </DialogContent>

                <DialogActions>
                  <Button onClick={handleDialogClose} autoFocus>OK</Button>
                </DialogActions>

              </Dialog>
            </>
          )}

        </Stack>

        {/* Checkout Button */}
        <Box 
          display='flex' 
          justifyContent='center'
          gap={2}
        >
          <Button
            variant='contained'
            size='large'
            sx={{
              mt: 2, 
              mb: 4, 
              px: 4, 
              py: 2,
              borderRadius: 5 
            }}
            onClick={onCheckoutClick}
            disabled={cartItems.length === 0}
          >
            Checkout
          </Button>

          <Button
            variant='outlined'
            color='info'
            size='large'
            sx={{
              mt: 2,
              mb: 4,
              px: 4,
              py: 2,
              borderRadius: 5
            }}
            component={Link}
            to='/'
          >
            Go Back
          </Button>
        </Box>

      </Box>
      
    </Paper>
  );
}