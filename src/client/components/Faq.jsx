import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Container
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Faq() {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    py: 4,
                    mt: 3,
                }}
            >
                <Container maxWidth='md'>
                    <Typography variant='h5' fontWeight='bold' sx={{ textAlign: 'center', mb: 3 }} gutterBottom>
                        FAQ
                    </Typography>

                    {[  
                        {
                            question: 'What are your rates?',
                            answer: "IKEA assembly jobs are fixed rate per item, based on current assembly rates from TaskRabbit (assembly service owned by IKEA). I will also include 15% off their listed flat rate. All other jobs are $50/hour, the average rate charged by taskers on that same platform unless otherwise stated. However, if you can provide a link to your item (i.e. Wayfair, Target, Walmart, Amazon etc.) that includes professional assembly as an optional add-on, I will BEAT whatever quote they give.",
                        },
                        {
                            question: 'What areas do you serve?',
                            answer: 'Phoenix, AZ and surrounding areas (Ahwatukee, Chandler, Tempe, Scottsdale, Mesa, Gilbert, Fountain Hills, Sun Lakes).',
                        },
                        {
                            question: 'What is your availability?',
                            answer: 'Generally from 9am-8pm daily, but my availability changes month to month. Click the "Book Now" button to see all of my availability!',
                        },
                        {
                            question: 'What if my IKEA item is not listed?',
                            answer: 'Send me an email at <a href="mailto:cayden@caydenhelpsaz.com">cayden@caydenhelpsaz.com</a> with the item and article number(s) and I will find the listing manually and send you back a quote!.',
                        },
                        {
                            question: 'Do you bring tools with you?',
                            answer: 'Yes, I bring all the necessary tools to complete the job.',
                        },
                        {
                            question: 'How does payment work? Are there any additional fees?',
                            answer: '$0 due when making an appointment and any fees or expenses will be clearly stated beforehand. Payment via cash or card is due after completion of the job. A 5% processing fee may apply for unless paid with cash.',
                        },
                        {
                            question: 'I have more questions, how can I reach you?',
                            answer: 'Best way to contact me is via email at <a href="mailto:cayden@caydenhelpsaz.com">cayden@caydenhelpsaz.com</a>.',
                        },
                    ].map((faq, index) => (
                        <Accordion
                            key={index}
                            disableGutters
                            square
                            elevation={0}
                            sx={{
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                                border: 'none',
                                '&:before': {
                                    display: 'none',
                                },
                                mb: 2,
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                    px: 0,
                                    '& .MuiTypography-root': {
                                        fontSize: '1.2rem',
                                        fontWeight: 500,
                                    },
                                }}
                            >
                                <Typography>{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: 0 }}>
                                {faq.answer.includes('mailto:') ? (
                                    <Typography dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                ) : (
                                    <Typography>{faq.answer}</Typography>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Container>
            </Box>
        </>
    );
}
