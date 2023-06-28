require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const message_controller = require('./controllers/message_controller');
const user_controller = require('./controllers/user_controller');

// database connection setup using a secret key
/*const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_CONNECTION_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}*/

app.use(express.json());
app.use(cors());

// route for when a user submits a new post
app.post('/api/strike', message_controller.new_message);

app.post('/api/signup', user_controller.signup);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});