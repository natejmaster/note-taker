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
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });

//DELETE Route for deleting a note:
notes.delete('/:id', (req, res) => {
    const noteIdToDelete = req.params.id;
  
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((notes) => {
        // Find the index of the note to delete
        const indexToDelete = notes.findIndex((note) => note.id === noteIdToDelete);
  
        if (indexToDelete !== -1) {
          // Remove the note from the array
          notes.splice(indexToDelete, 1);
  
          // Write the updated notes back to the file
          writeToFile('./db/db.json', notes);
  
          res.json(`Note with ID ${noteIdToDelete} deleted successfully`);
        } else {
          res.status(404).json(`Note with ID ${noteIdToDelete} not found`);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

module.exports = notes;