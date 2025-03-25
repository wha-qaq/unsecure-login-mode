// Import required packages
const express = require('express');             // Web framework
const sqlite3 = require('sqlite3').verbose();   // SQLite database
const bodyParser = require('body-parser');      // Middleware to parse form data
const path = require('path');                   // To handle file paths
const bcrypt = require('bcrypt');               // For hashing passwords

// Create Express app and database connection
const app = express();
const db = new sqlite3.Database('database.db'); // Creates or opens the SQLite database
const saltRounds = 10;                          // bcrypt salt complexity

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded form data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files like CSS/JS

// Initialize the users table if it doesn't exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)");
});

// Redirect root to login page
app.get('/', (req, res) => res.redirect('/login'));

// Serve the registration page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Handle registration form submission
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store username and hashed password in the database using parameterized query
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(sql, [username, hashedPassword], (err) => {
        if (err) return res.send('Error: ' + err.message); // Send DB error if any
        res.send('User registered securely! <a href="/login">Login here</a>'); // Success
    });
});

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Look up user by username
    const sql = `SELECT * FROM users WHERE username = ?`;
    db.get(sql, [username], async (err, row) => {
        if (err) return res.send('Error: ' + err.message); // DB error
        if (!row) return res.send('User not found.');      // No user in DB

        // Compare entered password with stored hashed password
        const match = await bcrypt.compare(password, row.password);
        if (match) {
            res.send(`Welcome, ${username}!`); // Successful login
        } else {
            res.send('Incorrect password. <a href="/login">Try again</a>'); // Wrong password
        }
    });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Secure app running on http://localhost:3000');
});
