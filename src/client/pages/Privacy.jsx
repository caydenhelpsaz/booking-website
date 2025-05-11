import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import Header from '../components/Header';

export default function Privacy() {
  return (
    <>
      <Header />

      <Box sx={{ py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Privacy Policy
          </Typography>

          <Typography component="p" sx={{ mb: 2 }}>
            Your privacy is important. This website only collects personal information necessary to process and fulfill your service request.
          </Typography>

          <Typography component="p" sx={{ mb: 2 }}>
            Information such as your name, contact details, address, and appointment time are used solely for the purpose of scheduling and confirming your order.
          </Typography>

          <Typography component="p" sx={{ mb: 2 }}>
            Your data will never be sold or shared with third parties. All communication is kept confidential and used strictly for service delivery.
          </Typography>

          <Typography component="p" sx={{ mb: 2 }}>
            If you have any concerns regarding your data or need to make changes, please email <Link href="">* CREATE EMAIL!!!</Link>.
          </Typography>

          <Typography sx={{ mt: 4 }}>
            <Link href="/" underline="hover">
              ← Back to Home
            </Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
}
