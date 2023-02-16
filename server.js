const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001;

// API route to get all notes
app.get('/api/notes', (req, res) => {

    const notes = JSON.parse(fs.readFileSync('./db.json'));

    res.json(notes);
});

app.use(express.json());

// API route to create a new note
app.post('/api/notes', (req, res) => {

    const notes = JSON.parse(fs.readFileSync('./db.json'));

    // Generate a unique id for the new note
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };

    notes.push(newNote);

    fs.writeFileSync('./db.json', JSON.stringify(notes));

    res.json(newNote);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to delete a note
app.delete('/api/notes/:id', (req, res) => {

    const notes = JSON.parse(fs.readFileSync('./db.json'));

    const filteredNotes = notes.filter(note => note.id !== req.params.id);

    fs.writeFileSync('./db.json', JSON.stringify(filteredNotes));

    res.send('Note deleted successfully.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});