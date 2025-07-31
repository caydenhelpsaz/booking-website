import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
    Alert,
    Box,
    Button,
    Divider,
    Container,
    Snackbar, 
    Stack,
    Typography
} from '@mui/material';
import { Link } from 'react-router';
import Header from '../components/Header';
import Faq from '../components/Faq';

export default function Index() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.orderSuccess) {
            setSnackbarMessage('Your appointment was booked successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
    
            // Clear the state after showing the Snackbar
            navigate(location.pathname, { replace: true });
        }
    }, [location, navigate]);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Box display='flex' flexDirection='column' minHeight='100vh'>
            <Container maxWidth='md'>
                {/* Main Content */}
                <Stack spacing={2} flexGrow={1} sx={{ alignItems: 'center', mb: 4 }}>
                    <Header />

                    {/* Snackbar for displaying success message */}
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={4000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ mt: 15 }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>

                    {/* Intro with "How can I help?" text and List of Services */}
                    <Box sx={{ py: 3, bgcolor: 'background.default' }}>
                        <Container maxWidth="md">
                            {/* "How can I help?" Title */}
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    mb: 4
                                }}
                            >
                                Efficient • Insured • Affordable
                            </Typography>

                            <Typography
                                variant="body1"
                            >
                                {/* Map over the list of services */}
                                {[
                                    'Furniture assembly (Including 15% off the listed IKEA flat rate price)',
                                    'Cleaning (deep cleans, touch-ups, recurring upkeep)',
                                    'Mounting (TVs, shelves, curtains, mirrors, and more)',
                                    'Moving help (lifting, loading, unloading, and packing)',
                                    'General handyman work (small repairs, odd jobs, and problem-solving)',
                                    'Interior design help (space planning, style consulting, layout ideas)',
                                    'Floor plan creation (custom layouts with precise measurements)',
                                    '3D modeling of real spaces (to-scale, accurate, and usable for projects)',
                                    'Graphic design (logos, flyers, brand visuals)',
                                    'Logo design (custom-built identity for any brand or project)',
                                    '3D rendering (realistic visuals for spaces, products, or ideas)',
                                    'Tech help (smart home setup, troubleshooting, or device help)',
                                    'Organization and decluttering (closets, garages, kitchens, and more)',
                                    'Errands and personal assistant tasks (pickups, shopping, coordination)',
                                ].map((service, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.05)', // subtle dark box
                                            borderRadius: 2, // rounded corners
                                            padding: 2, // padding inside the box
                                            mb: 1, // space between each service
                                        }}
                                    >
                                        <Typography variant="body1"><li>{service}</li></Typography>
                                    </Box>
                                ))}

                                <Typography variant='body1' sx={{ my: 4 }}>
                                    + Many more! Just press the Book Now button, describe the details of your task and I’ll get back to you with a solution!
                                </Typography>
                                
                            </Typography>

                            {/* Navigation Buttons */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Button
                                    key={'/book-me'}
                                    component={Link}
                                    to={'book-me'}
                                    variant='contained'
                                    sx={{ mb: 8, px: 4, py: 2, borderRadius: 5, width: { xs:'250px', md: '200px' } }}
                                >
                                    Book Now
                                </Button>

                                <Typography variant='body1' sx={{ mb: 4, textAlign: 'center' }}>
                                    Have an IKEA item? Guaranteed 15% off the flat rate price from TaskRabbit!
                                </Typography>

                                <Button
                                    key={'/ikea-assembly'}
                                    component={Link}
                                    to={'ikea-assembly'}
                                    variant='contained'
                                    sx={{ mb: 8, px: 4, py: 2, borderRadius: 5, width: { xs:'250px', md: '200px' } }}
                                >
                                    Ikea Assembly
                                </Button>

                                <Typography variant='body1' sx={{ mb: 4, textAlign: 'center' }}>
                                    Want to see some of my previous work and read what past clients have said about working with me?
                                </Typography>

                                <Button
                                    href={'https://www.taskrabbit.com/profile/cayden-m'}
                                    target="_blank"
                                    variant='contained'
                                    sx={{ mb: 3, px: 4, py: 2, borderRadius: 5, width: { xs:'250px', md: '200px' } }}
                                >
                                    Click Here!
                                </Button>
                            </Box>
                        </Container>
                    </Box>          
                </Stack>

                <Divider sx={{ width: '100%' }} />

                <Faq />

                {/* Footer */}
                <Box component='footer' sx={{ width: '100%', py: 3, mt: 0 }}>
                    <Divider sx={{ mb: 2 }} />
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent='space-between'
                        spacing={2}
                        alignItems='center'
                    >
                        <Typography variant='body2'>
                            © {new Date().getFullYear()} Cayden Helps AZ. All rights reserved.
                        </Typography>
                        <Stack direction='row' spacing={3}>
                            <Link to='/terms' style={{ textDecoration: 'none' }}>
                                <Typography variant='body2' color='textSecondary'>Terms & Conditions</Typography>
                            </Link>
                            <Link to='/privacy' style={{ textDecoration: 'none' }}>
                                <Typography variant='body2' color='textSecondary'>Privacy Policy</Typography>
                            </Link>
                        </Stack>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}
