import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import Header from '../components/Header';

export default function Terms() {
  return (
    <>
      <Header />

      <Box sx={{ py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Terms & Conditions
          </Typography>

          <Typography component="p" sx={{ mb: 2 }}>
            By using this service, you agree to the following terms and conditions. These terms govern your use of furniture assembly services provided by Ryan at Built By Ry.
          </Typography>

          <Typography component="p" sx={{ mb: 2 }}>
            Payment is due immediately upon completion of services. A 5% processing fee will be added unless paid in cash. Payments may be made via Venmo, Zelle, PayPal, or cash.
          </Typography>

          <Typography component="p" sx={{ mb: 2 }}>
            You are responsible for ensuring that all parts and instructions for furniture are available and accessible at the time of assembly. Additional charges may apply for moving or transporting heavy boxes.
          </Typography>

          <Typography component="p" sx={{ mb: 2 }}>
            Appointments may be rescheduled or canceled up to 24 hours in advance. Cancellations within 24 hours may be subject to a fee.
          </Typography>

          <Typography component="p" sx={{ mb: 2 }}>
            For questions or concerns, please contact <Link href="mailto:ryan@builtbyry.com">ryan@builtbyry.com</Link>.
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
