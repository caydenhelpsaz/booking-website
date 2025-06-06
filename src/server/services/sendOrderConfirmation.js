import { Resend } from 'resend';
import dayjs from 'dayjs';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOrderConfirmation = async ({ customer, items, details, appointment, total }) => {
  const { firstName, lastName, email, address, city, state, zip, phone } = customer;
  const assemblyDate = dayjs(appointment.date).format('dddd, MMMM D, YYYY');
  const assemblyTime = appointment.time;

  const isIkea = Array.isArray(items) && items.length > 0;
  const isFurniture = !!details;

  let taskDetailsHtml = '';
  if (isIkea) {
    const itemsHtml = items.map(item => `
      <li>
        ${item.quantity} x ${item.display_name} @ ${item.formatted_cost} ea.
      </li>
    `).join('');
    taskDetailsHtml = `
      <p><strong>Project Details:</strong></p>
      <ul>${itemsHtml}</ul>
    `;
  } else if (isFurniture) {
    taskDetailsHtml = `
      <p><strong>Project Details:</strong></p>
      <p>${details}</p>
    `;
  } else {
    taskDetailsHtml = `<p><strong>No assembly details provided.</strong></p>`;
  }

  const totalHtml = isIkea ? `<p><strong>Total:</strong> $${total}&#42;</p>` : '';

  const htmlContent = `
    <p>Hi ${firstName},</p>
    <p>Thank you for booking me! The details of your task are outlined below:</p>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Address:</strong> ${address}, ${city}, ${state} ${zip}</p>
    <p><strong>Date/Time:</strong> ${assemblyDate} at ${assemblyTime}</p>
    ${taskDetailsHtml}
    ${totalHtml}
    <br>
    <p>Be on the lookout for a text from me confirming the appointment and in case I have any clarifying questions. Also, on the day of I’ll let you know when I’m on my way with my ETA. Looking forward to helping!</p>
    <p>
      Best, 
      <br> 
      Cayden
    </p>
    <br>
    <hr>
    <small>&#42; Invoice due upon completion of assembly. A 5% processing fee will be added to the total amount due. Payment methods accepted include credit/debit card or cash (fee waived).</small>
  `;

  try {
    await resend.emails.send({
      from: 'Cayden Helps AZ <cayden@caydenhelpsaz.com>',
      to: email,
      bcc: 'caydenhelpsaz@gmail.com',
      subject: `Cayden Helps AZ Booking Confirmation - ${assemblyDate} at ${assemblyTime}`,
      html: htmlContent,
    });
    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
};

export default sendOrderConfirmation;
