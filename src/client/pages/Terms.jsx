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
            Need to edit this!!!
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
