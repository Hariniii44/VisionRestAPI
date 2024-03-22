const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const api = express();
const port = 3000;

// Middleware to parse JSON bodies
api.use(bodyParser.json());

let user_command = "command";
let url = "sample url";

// Route to get the url
api.get('/url', (_, res) => {
  res.json(url);
});

// Route to update the url
api.post('/url', (req, res) => {
  console.log(req.body)
  let new_url = req.body.url;
  url = new_url;
  res.json({ message: 'URL updated successfully' });

  // Call new_commands.py
  exec('python NLP/new_commands.py');
});

// Route to get the user command
api.get('/user_command', (_, res) => {
  res.json(user_command);
});

// Route to update the user command
api.post('/user_command', (req, res) => {
  console.log(req.body)
  let command = req.body.user_command;
  user_command = command;
  res.status(201).json({ message: 'User command updated successfully'});
});

// Start the server
api.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = {
  startServer: function() {
    api.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
}; 