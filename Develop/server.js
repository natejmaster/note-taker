//Required routes and installations for this application
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
//Port address is declared here
const PORT = process.env.PORT || 3001;
//Express is initialized under a declared variable 'app'
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

//GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Wildcard Route for all invalid endings returns to home page
app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);
//Listener for terminal (and testing)
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);