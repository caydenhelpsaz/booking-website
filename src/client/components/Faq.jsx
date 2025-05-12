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
                    py: 6,
                    mt: 4,
                }}
            >
                <Container maxWidth='md'>
                    <Typography variant='h5' fontWeight='bold' sx={{ textAlign: 'center', mb: 3 }} gutterBottom>
                        FAQ
                    </Typography>

                    {[  
                        {
                            question: 'What are your rates?',
                            answer: "IKEA assembly jobs are fixed rate per item, based on current assembly rates from TaskRabbit (assembly service owned by IKEA). All other jobs are $50/hour, the average rate charged by furniture assemblers on that same platform. However, if you can provide a link to your item (i.e. Wayfair, Target, Walmart, Amazon etc.) that includes professional assembly as an optional add-on, I will match whatever quote they give.",
                        },
                        {
                            question: 'What areas do you serve?',
                            answer: 'Phoenix, AZ and surrounding areas.',
                        },
                        {
                            question: 'What is your availability?',
                            answer: 'Queens, NY/Western Long Island: Monday, Tuesday, Friday, Saturday from 8AM to 8PM; Northern NJ: Wednesday & Thursday from 10AM to 2PM.',
                        },
                        {
                            question: 'Do you assemble furniture only from IKEA?',
                            answer: 'No, I assemble furniture from any brand, as long as it includes instructions and all necessary parts. For IKEA assembly, tap the "IKEA Assembly" button and search/add your items before checkout. For non-IKEA assembly, tap the "Furniture Assembly" button and fill out the checkout form completely.',
                        },
                        {
                            question: 'What if my IKEA item is not listed?',
                            answer: 'Send me an email at <a href="mailto:ryan@builtbyry.com">ryan@builtbyry.com</a> and I will add your item(s) and complete the booking for you.',
                        },
                        {
                            question: 'I have both IKEA and non-IKEA items that need to be assembled, what do I do?',
                            answer: 'Not a problem! Schedule an appointment using either method and just shoot me an email at <a href="mailto:ryan@builtbyry.com">ryan@builtbyry.com</a> and I will handle all the details for you.',
                        },
                        {
                            question: 'Do you bring tools with you?',
                            answer: 'Yes, I bring all the necessary tools to complete the job.',
                        },
                        {
                            question: 'How does payment work? Are there any additional fees?',
                            answer: '$0 due when making an appointment. Payment is due after completion of assembly via cash, PayPal, Venmo or Zelle. A 5% processing fee applies unless paid with cash.',
                        },
                        {
                            question: 'I have more questions, how can I reach you?',
                            answer: 'Best way to contact me is via email at <a href="mailto:ryan@builtbyry.com">ryan@builtbyry.com</a>.',
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