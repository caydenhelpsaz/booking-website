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
            setSnackbarMessage('Your order was placed successfully!');
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
                <Stack spacing={4} flexGrow={1} sx={{ alignItems: 'center', mb: 10 }}>
                    <Header />

                    {/* Snackbar for displaying success message */}
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={4000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ mt: 9 }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>

                    {/* Intro */}
                    <Box sx={{ py: 3, bgcolor: 'background.default' }}>
                        <Container maxWidth="md">
                            <Typography
                                variant="body1"
                                sx={{ fontSize: '1.2rem', textAlign: 'center', lineHeight: 1.8 }}
                            >
                                <li>Furniture assembly (including IKEA builds with 15% off the flat rate)</li>  

                                <li>Cleaning (deep cleans, touch-ups, recurring upkeep)</li>    

                                <li>Mounting (TVs, shelves, curtains, mirrors, and more)</li>   

                                <li>Moving help (lifting, loading, unloading, and packing)</li> 

                                <li>General handyman work (small repairs, odd jobs, and problem-solving)</li>   

                                <li>Yard work (weeding, raking, basic landscaping, and outdoor cleanups)</li>   

                                <li>Interior design help (space planning, style consulting, layout ideas)</li>  

                                <li>Floor plan creation (custom layouts with precise measurements)</li> 

                                <li>3D modeling of real spaces (to-scale, accurate, and usable for projects)</li>   

                                <li>Graphic design (logos, flyers, brand visuals)</li>  

                                <li>Logo design (custom-built identity for any brand or project)</li>   

                                <li>3D rendering (realistic visuals for spaces, products, or ideas)</li>    

                                <li>Tech help (smart home setup, troubleshooting, or device help)</li>  

                                <li>Organization and decluttering (closets, garages, kitchens, and more)</li>   

                                <li>Errands and personal assistant tasks (pickups, shopping, coordination)</li> 
                            </Typography>
                        </Container>
                    </Box>

                    {/* Navigation Buttons */}
                    <Box width={250} sx={{ mb: 20 }}>
                            <Button
                                key={'/book-me'}
                                fullWidth
                                component={Link}
                                to={'book-me'}
                                variant='contained'
                                sx={{ mt: 2, mb: 6, px: 4, py: 2, borderRadius: 5 }}
                            >
                                Book Me!
                            </Button>

                            <Typography
                                variant='body1'
                                sx={{ mt: 3, mb: 3 }}
                            >
                                Have an IKEA item? Guaranteed 15% off the flat rate price from TaskRabbit!
                            </Typography>

                            <Button
                                key={'/ikea-assembly'}
                                fullWidth
                                component={Link}
                                to={'ikea-assembly'}
                                variant='contained'
                                sx={{ mt: 2, mb: 3, px: 4, py: 2, borderRadius: 5 }}
                            >
                                Ikea Assembly
                            </Button>
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
                            © {new Date().getFullYear()} Cayden Serves AZ. All rights reserved.
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
