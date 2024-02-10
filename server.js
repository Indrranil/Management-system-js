const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// define the path to db
const dbPath = path.resolve(__dirname, 'drug_data.db');





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
const bodyParser = require('body-parser');

// Create an instance of Express.js
const app = express();
app.use(bodyParser.json());
// Define a port for the server to listen on
const PORT = process.env.PORT || 3000;


// Define routes to serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend.html'));
});

// Serve login.html
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});


// Define a route for user login
app.post('/login', (req, res) => {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Check if username and password are valid (e.g., authenticate against a database)
    if (username === 'admin' && password === 'password') {
        // If credentials are valid, set up a session or generate a JWT token
        // Here you might use a library like express-session or jsonwebtoken
        // For simplicity, we'll just respond with a success message
        res.status(200).json({ message: 'Login successful' });
    } else {
        // If credentials are invalid, respond with an error message
        res.status(401).json({ message: 'Invalid username or password' });
    }
});
// Define a route for user signup
app.post('/signup', (req, res) => {
    // Extract signup data from request body
    const { username, email, password } = req.body;

    // Validate signup data (e.g., check for required fields, validate email format, etc.)
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required for signup' });
    }

    // Perform signup logic here (e.g., store user data in a database)
    // For simplicity, we'll just respond with a success message
    res.status(200).json({ message: 'Signup successful' });
});

// Define a route for the admin dashboard
app.get('/admin', (req, res) => {
    // Perform any admin-specific logic here (e.g., fetch admin data from database)
    // For simplicity, we'll just respond with a success message
    res.status(200).json({ message: 'Welcome to the admin dashboard' });
});





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

    const query = `SELECT * FROM customers`;

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


