import React, { useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import Header from './Header';

const baseUrl = import.meta.env.VITE_HOST;

export default function Checkout({
    cartItems,
    setCartItems,
    checkoutOpen,
    handleCheckoutClose,
    handleCloseSnackbar,
    isIkea,
}) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(() => ({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        date: null,
        time: '',
        ...(isIkea ? {} : { details: '' }), // <- only add 'details' if not IKEA
    }));

    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessageOpen, setErrorMessageOpen] = useState(false);

    const states = ['Arizona'];

    /**
     * ================================================================================
     * 
     * SET YOUR AVAILABILITY HERE
     * 
     * ================================================================================
     */

    const disableDays = (date) => {
        const day = dayjs(date).day(); // Sunday: 0, Monday: 1, ..., Saturday: 6

        /**
         * ================================================================================
         * 
         * DISABLE DAYS OF THE WEEK:
         * 
         * All days are enabled by default
         * 
         * Disable the days you are unavailable by "uncommenting" the code
         * 
         * I.e. removing the "//"" at the start of the line 
         * 
         * ================================================================================
         */

        // if (day === 0) return true; /** Disable all Sundays */

        // if (day === 1) return true; /** Disable all Mondays */

        // if (day === 2) return true; /** Disable all Tuesdays */

       // if (day === 3) return true; /** Disable all Wednesdays */

        // if (day === 4) return true; /** Disable all Thursdays */

       // if (day === 5) return true; /** Disable all Fridays */

        // if (day === 6) return true; /** Disable all Saturdays */

        /**
         * ================================================================================
         * 
         * DISABLE SPECIFIC DATES:
         * 
         * Add specific dates you are unavailable between the brackets
         * 
         * Make sure each date is enclosed in single quotes and formatted as "YYYY-MM-DD"
         * 
         * I included some examples below
         * 
         * ================================================================================
         */

        const disabledDates = [
            '2025-06-18',
            '2025-06-19',
            '2025-07-04', // Independence Day
            '2025-07-05', // Thanksgiving
            '2025-07-06', // Christmas
        ];

        if (disabledDates.includes(dayjs(date).format('YYYY-MM-DD')))
            return true;

        return false; // Otherwise allow
    };

    const getAvailableTimes = (date) => {
        if (!date) return [];

        const day = dayjs(date).day(); // Sunday: 0, Monday: 1, ..., Saturday: 6

        /**
         * ================================================================================
         * 
         * SET AVAILABLE TIMES:
         * 
         * Add or delete times between the [] brackets
         * 
         * Make sure each time is enclosed in single quotes and followed by a comma
         * 
         * I included some times below
         * 
         * ================================================================================
         */

        // Sunday
        if (day === 0)
            return [
                '10:00 AM',
                '10:30 AM',
                '11:00 AM',
                '11:30 AM',
                '12:00 PM',
                '12:30 PM',
                '1:00 PM',
                '1:30 PM',
                '2:00 PM',
                '2:30 PM',
                '3:00 PM',
                '3:30 PM',
                '4:00 PM',
                '4:30 PM',
                '5:00 PM',
                '5:30 PM',
                '6:00 PM',
                '6:30 PM',
                '7:00 PM',
            ];

        // Monday
        if (day === 1)
            return [
                '10:00 AM',
                '10:30 AM',
                '11:00 AM',
                '11:30 AM',
                '12:00 PM',
                '12:30 PM',
                '1:00 PM',
                '1:30 PM',
                '2:00 PM',
                '2:30 PM',
                '3:00 PM',
                '3:30 PM',
                '4:00 PM',
                '4:30 PM',
                '5:00 PM',
                '5:30 PM',
                '6:00 PM',
                '6:30 PM',
                '7:00 PM',
            ];

        // Tuesday
        if (day === 2)
            return [
                '10:00 AM',
                '10:30 AM',
                '11:00 AM',
                '11:30 AM',
                '12:00 PM',
                '12:30 PM',
                '1:00 PM',
                '1:30 PM',
                '2:00 PM',
                '2:30 PM',
                '3:00 PM',
                '3:30 PM',
                '4:00 PM',
                '4:30 PM',
                '5:00 PM',
                '5:30 PM',
                '6:00 PM',
                '6:30 PM',
                '7:00 PM',
            ];

        // Wednesday
        if (day === 3)
            return [
                '10:00 AM',
                '10:30 AM',
                '11:00 AM',
                '11:30 AM',
                '12:00 PM',
                '12:30 PM',
                '1:00 PM',
                '1:30 PM',
                '2:00 PM',
                '2:30 PM',
                '3:00 PM',
                '3:30 PM',
                '4:00 PM',
                '4:30 PM',
                '5:00 PM',
                '5:30 PM',
                '6:00 PM',
                '6:30 PM',
                '7:00 PM',
            ];

        // Thursday
        if (day === 4)
            return [
                '10:00 AM',
                '10:30 AM',
                '11:00 AM',
                '11:30 AM',
                '12:00 PM',
                '12:30 PM',
                '1:00 PM',
                '1:30 PM',
                '2:00 PM',
                '2:30 PM',
                '3:00 PM',
                '3:30 PM',
                '4:00 PM',
                '4:30 PM',
                '5:00 PM',
                '5:30 PM',
                '6:00 PM',
                '6:30 PM',
                '7:00 PM',
            ];

        // Friday
        if (day === 5)
            return [
                '10:00 AM',
                '10:30 AM',
                '11:00 AM',
                '11:30 AM',
                '12:00 PM',
                '12:30 PM',
                '1:00 PM',
                '1:30 PM',
                '2:00 PM',
                '2:30 PM',
                '3:00 PM',
                '3:30 PM',
                '4:00 PM',
                '4:30 PM',
                '5:00 PM',
                '5:30 PM',
                '6:00 PM',
                '6:30 PM',
                '7:00 PM',
            ];

        // Saturday
        if (day === 6)
            return [
                '10:00 AM',
                '10:30 AM',
                '11:00 AM',
                '11:30 AM',
                '12:00 PM',
                '12:30 PM',
                '1:00 PM',
                '1:30 PM',
                '2:00 PM',
                '2:30 PM',
                '3:00 PM',
                '3:30 PM',
                '4:00 PM',
                '4:30 PM',
                '5:00 PM',
                '5:30 PM',
                '6:00 PM',
                '6:30 PM',
                '7:00 PM',
            ];

        return [];
    };

    let total;

    if (isIkea) {
        total =
            cartItems.length > 0
                ? Math.max(
                      cartItems.reduce(
                          (sum, item) =>
                              sum +
                              item.assembly_price_cents *
                                  item.quantity *
                                  0.01 *
                                  0.85,
                          0
                      ),
                      52
                  ).toFixed(2)
                : '0.00';
    }

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleDateChange = (newDate) => {
        setFormData((prev) => ({
            ...prev,
            date: newDate,
            time: '', // Clear time when date changes
        }));
    };

    const handleTimeChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            time: e.target.value,
        }));
    };

    const updateQuantity = (itemNo, quantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.item_no === itemNo ? { ...item, quantity } : item
            )
        );
    };

    const removeItem = (itemNo) => {
        setCartItems((prev) => prev.filter((item) => item.item_no !== itemNo));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        return phoneRegex.test(phone);
    };

    const submitOrder = async (e) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            setErrorMessage('Please enter a valid email address.');
            setErrorMessageOpen(true);
            return;
        }

        if (!validatePhone(formData.phone)) {
            setErrorMessage(
                'Please enter a valid phone number (e.g., (123) 456-7890).'
            );
            setErrorMessageOpen(true);
            return;
        }

        setIsSubmitting(true);

        const orderPayload = {
            customer: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
                phone: formData.phone,
            },
            appointment: {
                date: formData.date,
                time: formData.time,
            },
            ...(isIkea && {
                items: cartItems.map(
                    ({ item_no, display_name, quantity, formatted_cost }) => ({
                        item_no,
                        display_name,
                        quantity,
                        formatted_cost,
                    })
                ),
            }),
            ...(!isIkea && {
                details: formData.details,
            }),
            total: total,
        };

        try {
            const response = await fetch(`${baseUrl}/api/submit-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload),
            });

            const data = await response.json();

            if (response.ok) {
                if (isIkea) {
                    setCartItems([]);
                }
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: '',
                    phone: '',
                    date: null,
                    time: '',
                    ...(isIkea ? {} : { details: '' }),
                });
                navigate('/', { state: { orderSuccess: true } });
            } else {
                setErrorMessage(
                    `Order submission failed: ${JSON.stringify(data.error) || 'Something went wrong.'}`
                );
                setErrorMessageOpen(true);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Failed to submit order. Please try again.');
            setErrorMessageOpen(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePhoneChange = (e) => {
        const formattedPhone = e.target.value
            .replace(/\D/g, '') // Remove non-numeric characters
            .replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3'); // Format as (xxx) xxx-xxxx
        setFormData({ ...formData, phone: formattedPhone });
    };

    return (
        <>
            <Dialog
                open={checkoutOpen}
                onClose={handleCheckoutClose}
                fullScreen
            >
                <Header />

                <DialogContent>
                    <Typography
                        variant='h5'
                        sx={{ textAlign: 'center' }}
                    >
                        {isIkea && 'IKEA Assembly Booking'}
                        {!isIkea && 'Appointment Booking'}
                    </Typography>

                    <Paper
                        elevation={0}
                        sx={{ p: 2, mt: 1, maxWidth: 600, mx: 'auto' }}
                    >
                        <form onSubmit={submitOrder}>
                            <Grid
                                container
                                spacing={2}
                                direction='column'
                            >
                                {/* First Name */}
                                <Grid>
                                    <TextField
                                        label='First Name'
                                        value={formData.firstName}
                                        onChange={handleChange('firstName')}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                {/* Last Name */}
                                <Grid>
                                    <TextField
                                        label='Last Name'
                                        value={formData.lastName}
                                        onChange={handleChange('lastName')}
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                {/* Email Address */}
                                <Grid>
                                    <TextField
                                        label='Email Address'
                                        type='email'
                                        value={formData.email}
                                        onChange={handleChange('email')}
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                {/* Phone Number */}
                                <Grid>
                                    <TextField
                                        label='Phone Number'
                                        type='tel'
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        fullWidth
                                        required
                                        placeholder='(XXX) XXX-XXXX'
                                        slotProps={{
                                            input: {
                                                inputProps: {
                                                    maxLength: 10,
                                                },
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*',
                                            },
                                        }}
                                    />
                                </Grid>

                                {/* Address Info */}
                                <Grid>
                                    <TextField
                                        label='Street Address'
                                        value={formData.address}
                                        onChange={handleChange('address')}
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                <Grid>
                                    <TextField
                                        label='City'
                                        value={formData.city}
                                        onChange={handleChange('city')}
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                <Grid
                                    container
                                    spacing={2}
                                >
                                    <Grid>
                                        <FormControl fullWidth>
                                            <InputLabel id='select-state-label'>
                                                State*
                                            </InputLabel>
                                            <Select
                                                sx={{ minWidth: 100 }}
                                                labelId='select-state-label'
                                                id='select-state'
                                                label='State'
                                                value={formData.state}
                                                onChange={handleChange('state')}
                                                required
                                            >
                                                {states.map((state) => (
                                                    <MenuItem
                                                        key={state}
                                                        value={state}
                                                    >
                                                        {state}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid>
                                        <TextField
                                            label='ZIP Code'
                                            type='tel'
                                            value={formData.zip}
                                            onChange={handleChange('zip')}
                                            fullWidth
                                            required
                                            slotProps={{
                                                input: {
                                                    inputProps: {
                                                        maxLength: 5,
                                                    },
                                                    inputMode: 'numeric',
                                                    pattern: '[0-9]*',
                                                },
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Date and Time */}
                                <Grid>
                                    <Typography
                                        variant='subtitle1'
                                        sx={{
                                            mt: 2,
                                            mb: 2,
                                            textAlign: 'center',
                                        }}
                                    >
                                        Select Appointment Date:
                                    </Typography>
                                    <DateCalendar
                                        disablePast
                                        shouldDisableDate={disableDays}
                                        value={formData.date}
                                        onChange={handleDateChange}
                                    />
                                </Grid>

                                <Grid>
                                    {formData.date && (
                                        <Typography
                                            variant='subtitle1'
                                            sx={{ mb: 1 }}
                                        >
                                            Selected Date:{' '}
                                            {dayjs(formData.date).format(
                                                'dddd, MMMM D, YYYY'
                                            )}
                                        </Typography>
                                    )}
                                </Grid>

                                <Grid>
                                    <FormControl
                                        fullWidth
                                        required
                                        sx={{ mt: 2 }}
                                    >
                                        <InputLabel id='select-time-label'>
                                            Select Time
                                        </InputLabel>
                                        <Select
                                            labelId='select-time-label'
                                            label='Select Time'
                                            value={formData.time}
                                            onChange={handleTimeChange}
                                        >
                                            {getAvailableTimes(
                                                formData.date
                                            ).map((timeStr) => (
                                                <MenuItem
                                                    key={timeStr}
                                                    value={timeStr}
                                                >
                                                    {timeStr}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Cart Items */}
                                {isIkea && (
                                    <>
                                        <Grid sx={{ my: 3 }}>
                                            {cartItems.length === 0 ? (
                                                <Typography
                                                    variant='body1'
                                                    color='text.secondary'
                                                >
                                                    Your cart is empty.
                                                </Typography>
                                            ) : (
                                                <Typography
                                                    variant='subtitle1'
                                                    sx={{ mb: 3 }}
                                                >
                                                    Items in Cart:
                                                </Typography>
                                            )}

                                            {cartItems.map((item) => (
                                                <Box
                                                    key={item.item_no}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems:
                                                            'flex-start',
                                                        gap: 2,
                                                        flexWrap: 'wrap',
                                                        mb: 3,
                                                    }}
                                                >
                                                    <TextField
                                                        label='Qty'
                                                        type='number'
                                                        size='small'
                                                        value={
                                                            item.quantity === 0
                                                                ? ''
                                                                : item.quantity
                                                        }
                                                        onChange={(e) => {
                                                            const val =
                                                                e.target.value;
                                                            // Allow blank input
                                                            if (val === '') {
                                                                updateQuantity(
                                                                    item.item_no,
                                                                    0
                                                                );
                                                                return;
                                                            }

                                                            const parsed =
                                                                parseInt(
                                                                    val,
                                                                    10
                                                                );
                                                            if (
                                                                !isNaN(parsed)
                                                            ) {
                                                                updateQuantity(
                                                                    item.item_no,
                                                                    parsed
                                                                );
                                                            }
                                                        }}
                                                        onBlur={() => {
                                                            // On blur, if quantity is 0 or invalid, set it to 1
                                                            if (
                                                                !item.quantity ||
                                                                item.quantity <
                                                                    1
                                                            ) {
                                                                updateQuantity(
                                                                    item.item_no,
                                                                    1
                                                                );
                                                            }
                                                        }}
                                                        sx={{ width: 50 }}
                                                        slotProps={{
                                                            input: {
                                                                min: 1,
                                                                onKeyDown: (
                                                                    e
                                                                ) => {
                                                                    if (
                                                                        [
                                                                            'e',
                                                                            'E',
                                                                            '+',
                                                                            '-',
                                                                            '.',
                                                                            ',',
                                                                        ].includes(
                                                                            e.key
                                                                        )
                                                                    ) {
                                                                        e.preventDefault();
                                                                    }
                                                                },
                                                            },
                                                        }}
                                                    />

                                                    <Box
                                                        sx={{
                                                            flexGrow: 1,
                                                            minWidth: 0,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant='body2'
                                                            sx={{
                                                                fontWeight:
                                                                    'bold',
                                                                overflow:
                                                                    'hidden',
                                                                textOverflow:
                                                                    'ellipsis',
                                                                whiteSpace:
                                                                    'nowrap',
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Typography>

                                                        <Typography
                                                            variant='body2'
                                                            sx={{
                                                                overflow:
                                                                    'hidden',
                                                                textOverflow:
                                                                    'ellipsis',
                                                                whiteSpace:
                                                                    'nowrap',
                                                            }}
                                                        >
                                                            {
                                                                item.article_number
                                                            }
                                                        </Typography>

                                                        <Typography
                                                            variant='caption'
                                                            sx={{
                                                                color: 'text.secondary',
                                                                overflow:
                                                                    'hidden',
                                                                textOverflow:
                                                                    'ellipsis',
                                                            }}
                                                        >
                                                            {item.description}
                                                        </Typography>
                                                    </Box>

                                                    <Typography
                                                        sx={{
                                                            whiteSpace:
                                                                'nowrap',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        $
                                                        {(
                                                            item.assembly_price_cents *
                                                            0.01 *
                                                            0.85 *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </Typography>

                                                    <IconButton
                                                        onClick={() =>
                                                            removeItem(
                                                                item.item_no
                                                            )
                                                        }
                                                        size='small'
                                                        color='error'
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                        </Grid>

                                        {/* Total Assembly Cost */}
                                        <Grid>
                                            <Box
                                                sx={{
                                                    ml: 2,
                                                    mb: 2,
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                }}
                                            >
                                                <Stack>
                                                    <Typography fontWeight='bold'>
                                                        Total Assembly Cost: $
                                                        {total}
                                                    </Typography>
                                                    <Typography>
                                                        <small>
                                                            $0 due now - balance
                                                            due upon completion
                                                            of assembly.
                                                        </small>
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Grid>
                                    </>
                                )}

                                {/** Details if not IKEA assembly */}
                                {!isIkea && (
                                    <Grid>
                                        <TextField
                                            label='Details'
                                            multiline
                                            rows={4}
                                            value={formData.details}
                                            onChange={handleChange('details')}
                                            fullWidth
                                            required
                                            placeholder='Please describe the task(s) you need done, including links to items for assembly if possible.'
                                        />
                                    </Grid>
                                )}

                                {/* Submit Button */}
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Stack>
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            size='large'
                                            sx={{
                                                mt: 2,
                                                mb: 2,
                                                px: 4,
                                                py: 2,
                                                borderRadius: 5,
                                            }}
                                            disabled={
                                                (isIkea &&
                                                    cartItems.length < 1) ||
                                                isSubmitting
                                            }
                                        >
                                            {isSubmitting
                                                ? 'Booking assembly date & time...'
                                                : 'Book Assembly'}
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
                                                borderRadius: 5,
                                            }}
                                            {...(isIkea && {
                                                onClick: handleCheckoutClose,
                                            })}
                                            {...(!isIkea && {
                                                component: Link,
                                                to: '/',
                                            })}
                                        >
                                            Go Back
                                        </Button>
                                    </Stack>
                                </Box>
                            </Grid>
                        </form>

                        {/* Snackbar for errors */}
                        <Snackbar
                            open={errorMessageOpen}
                            onClose={handleCloseSnackbar}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                        >
                            <Alert
                                onClose={handleCloseSnackbar}
                                severity={'error'}
                            >
                                {errorMessage}
                            </Alert>
                        </Snackbar>
                    </Paper>
                </DialogContent>
            </Dialog>
        </>
    );
}
