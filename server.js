require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const message_controller = require('./controllers/message');

// database connection setup using a secret key
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = MONGODB_CONNECTION_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(express.json());
app.use(cors());

// route for when a user submits a new post
app.post('/api/strike', message_controller.new_message);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});