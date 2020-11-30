require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const TwilioClient = require("twilio");

const client = new TwilioClient();
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// This is a single page application and it's all rendered in public/index.html
app.use(express.static("public"));
// Parse the body of requests automatically
app.use(bodyParser.json());
//twilio sending text message
app.post("/api/messages", async (req, res) => {
  const to = req.body.to;
  //utilizes variable for sensative account info
  const from = process.env.TWILIO_PHONE_NUMBER;
  //structure of the text message sent to users
  const body = `${req.body.sender} says, ${req.body.receiver} ${req.body.message}. Thank you for using ${req.headers.referer}`;
  // Send a message, returns error in console if any
  try {
    await client.messages.create({ to, from, body });
  } catch (err) {
    res.status(err.status).json({ success: false, message: err.message });
  }

  res.json({ success: true });
});

app.listen(port, () => console.log(`Prototype is listening on port ${port}!`));
