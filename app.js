const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('database.db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize the database
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)");
});

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
    db.run(sql, (err) => {
        if (err) return res.send('Error: ' + err.message);
        res.send('User registered! <a href="/login">Login here</a>');
    });
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    db.get(sql, (err, row) => {
        if (err) return res.send('Error: ' + err.message);
        if (row) return res.send(`Welcome, ${username}!`);
        res.send('Login failed. <a href="/login">Try again</a>');
    });
});

app.listen(3000, () => {
    console.log('Unsecure app running on http://localhost:3000');
});
