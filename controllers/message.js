const asyncHandler = require('express-async-handler');

exports.new_message = (req, res) => {
    const inputValue = req.body.inputValue;
    console.log('Recieved value: ' + inputValue);
    res.json({ message: inputValue });
}