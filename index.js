// Import the pets array from data.js
const pets = require('./data');

// Initialize Express app
const express = require('express');
const app = express();

const PORT = 8080;

// Define a GET route for the homepage
app.get('/', (req, res) => {
    // Serve up the public folder as static index.html file
    // __dirname is the directory name of the current module (i.e., the location where this script is running)
    res.sendFile(__dirname + '/public/index.html');
});

// Define a GET route for /api that returns 'Hello World!'
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// Define a GET route for /api/v1/pets that returns all pets
app.get('/api/v1/pets', (req, res) => {
    // Send the pets array as a response in JSON format
    res.json(pets);
});

// Define a GET route for /api/v1/pets/owner that returns a pet by owner's name
app.get('/api/v1/pets/owner', (req, res) => {
    // Get the owner from the request query parameters
    const owner = req.query.owner;

    // Find the pet in the pets array that has the same owner
    const pet = pets.find(pet => pet.owner === owner);

    // Send the pet as a response in JSON format
    res.json(pet);
});

// Define a GET route for /api/v1/pets/:name that returns a pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // Get the name from the request parameters
    const name = req.params.name;

    // Find the pet in the pets array that has the same name
    const pet = pets.find(pet => pet.name === name);

    // Send the pet as a response in JSON format
    res.json(pet);
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is listening on port at http://localhost:${PORT}`);
});

app.use(express.static('public'));

// Export the app (useful for testing)
module.exports = app;