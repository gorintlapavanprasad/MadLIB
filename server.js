const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from the "LAB" folder
const publicServedFilesPath = path.join(__dirname, 'LAB');
server.use(express.static(publicServedFilesPath));

// Serve the HTML file
server.get('/', (req, res) => {
  res.sendFile(path.join(publicServedFilesPath, 'index.html'));
});

// Handle form submission
server.post('/LAB', (req, res) => {
  const { noun, verb, adjective, adverb, place } = req.body;
  const madLib = `Once upon a time, a ${adjective} ${noun} wanted to ${verb} ${adverb} in ${place}. The end.`;
  res.send(madLib);
});

// The server uses port 80 by default unless started with the 'local' argument
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}

server.listen(port, () => console.log('Ready on localhost!'));
