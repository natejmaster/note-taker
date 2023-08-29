//Declaration of required installs or imported helper functions
const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
//GET Route for retrieving all notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

//POST Route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);
    //Declares the request body to find the two parameters of 'title' and 'text'
    const { title, text } = req.body;
    //A new note has a title, text, and an id created by the uuid helper function
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
      //Once a post request is initialized for the app, it is read and added to db.json or it throws an error if the process is unsuccessful
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });

//DELETE Route for deleting a note:
notes.delete('/:id', (req, res) => {
    //Note to delete is identified by its unique ID
    const noteIdToDelete = req.params.id;
    //Searches db.json for object with that particular id
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((notes) => {
        // Finds the index of the note to delete
        const indexToDelete = notes.findIndex((note) => note.id === noteIdToDelete);
        // As long as the index is present in the array of note objects, it is spliced from the list
        if (indexToDelete !== -1) {
          // Remove the note from the array
          notes.splice(indexToDelete, 1);
  
          // db.json is rewritten without the splcied note
          writeToFile('./db/db.json', notes);
          //Response is logged that particular note has been deleted. If it's not found, error message records that the note was not found
          res.json(`Note with ID ${noteIdToDelete} deleted successfully`);
        } else {
          res.status(404).json(`Note with ID ${noteIdToDelete} not found`);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
//Exports the notes route for use with other documents.
module.exports = notes;