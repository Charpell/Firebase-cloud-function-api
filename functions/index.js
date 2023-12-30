const functions = require('firebase-functions');
const express = require('express');
const { addEntry, getAllEntries, getEntry, updateEntry, deleteEntry } = require('./entryController');

const app = express();

app.get('/', (req, res) => res.status(200).send('Hey there!'));
app.post('/entries', addEntry);
app.get('/entries', getAllEntries);
app.get('/entries/:id', getEntry);
app.put('/entries/:id', updateEntry);
app.delete('/entries/:id', deleteEntry);

exports.app = functions.https.onRequest(app);
