import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import cors from "cors";
import cron from 'node-cron'; 
import sendOrderCofirmation from './services/sendOrderConfirmation.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/api/submit-order", async (req, res) => {
  const { customer, items, appointment, total, details } = req.body; // Extract data from the request body

  // Safeguard for items and details
  const orderItems = items && Array.isArray(items) && items.length > 0 ? items : []; // Default to empty array if items are undefined or empty
  const orderDetails = details || 'No details provided'; // Default value for details if undefined or empty

  try {
    const result = await sendOrderCofirmation({ customer, items: orderItems, appointment, total, details: orderDetails });

    if (result.success) {
      console.log('Appointment booking confirmation emails sent successfully.', req.body);
      res.status(200).json({ message: "Appointment booking confirmation emails sent successfully." });
    } else {
      res.status(500).json({ message: "Failed to send emails.", error: result.error });
    }
  } catch (err) {
    console.error("Error handling order submission:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Self-ping setup to prevent app sleeping
const RENDER_URL = "https://caydenhelpsaz.com";

cron.schedule('*/14 * * * *', async () => {
  try {
    const res = await fetch(RENDER_URL);
    if (res.ok) {
      console.log(`[Ping] ${new Date().toISOString()} - Server pinged successfully.`);
    } else {
      console.warn(`[Ping] ${new Date().toISOString()} - Server responded with status: ${res.status}`);
    }
  } catch (err) {
    console.error(`[Ping] ${new Date().toISOString()} - Error pinging server: ${err.message}`);
  }
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
