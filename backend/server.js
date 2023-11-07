const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/routes'); 

const app = express();
const port = 5000;

// Enable CORS for Cross-Origin requests
app.use(cors());
// Parse incoming JSON requests
app.use(bodyParser.json());
// Use the defined routes
app.use(router);

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

