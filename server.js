const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// define the path to db
const dbPath = path.resolve(__dirname, 'management-system-js', 'drug_data.db');

// connection to sqlite
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => { 
    if (err) {
        console.error('error openeing the database: ', err.message);
    }
    else {
        console.log('Connection Successful to db');
    }
});

// Import required modules
const express = require('express');

// Create an instance of Express.js
const app = express();

// Define a port for the server to listen on
const PORT = process.env.PORT || 3000;

// Define routes
// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the Management System!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// fetch customers from db 

app.get('/customers', (req, res) => {

    const query = `SELECT * FROM customer`;

    //execute the query
    db.all(query, [], (err, rows) => {

        if (err) {
            console.error('Error executing the query: ', err.message);
            res.status(500).json({ error: 'internal server error' });
        }
        else {
            res.json(rows);
        }
    });
});

// Route to fetch all drugs from the database
app.get('/drugs', (req, res) => {
    // Query to fetch all drugs
    const query = `SELECT * FROM Drugs`;

    // Execute the query
    db.all(query, [], (err, rows) => {
        if (err) {
            // Error handling
            console.error('Error executing query:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Send the retrieved data as a JSON response
            res.json(rows);
        }
    });
});

// Route to fetch all orders from the database
app.get('/orders', (req, res) => {
    // Query to fetch all orders
    const query = `SELECT * FROM Orders`;

    // Execute the query
    db.all(query, [], (err, rows) => {
        if (err) {
            // Error handling
            console.error('Error executing query:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Send the retrieved data as a JSON response
            res.json(rows);
        }
    });
});


