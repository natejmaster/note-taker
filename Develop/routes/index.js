//Variable requires express
const express = require('express');
// Import our modular routers for /notes
const notesRouter = require('./notes');
//Initializes express
const app = express();
//Initializes the notes router
app.use('/notes', notesRouter);
//Exports the app variable for us in other documents
module.exports = app;