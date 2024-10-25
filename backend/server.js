import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors({
  origin: ['http://example.com'], //domain yang diperbolehkan
  optionsSuccessStatus: 200,
}));

const connection = new sqlite3.Database('./db/aplikasi.db')

app.get('/api/user/:id', (req, res) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.all(query, [req.params.id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
    res.json(results);
  });
});

app.post('/api/user/:id/change-email', (req, res) => {
  const newEmail = req.body.email;
  const query = 'UPDATE users SET email = ? WHERE id = ?';

  connection.run(query, [newEmail, req.params.id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    if (this.changes === 0) res.status(404).send('User not found');
    else res.status(200).send('Email updated successfully');
  });
});


const safeFileNames = ['file1.txt', 'file2.txt']; //daftar file yang diizinkan

app.get('/api/file', (req, res) => {
  const __filename = fileURLToPath(import.meta.url); 
  const __dirname = path.dirname(__filename); 

  const requestedFile = req.query.name;

  if (!safeFileNames.includes(requestedFile)) {
    return res.status(400).send('File not allowed');
  }

  const filePath = path.join(__dirname, 'files', requestedFile);
  res.sendFile(filePath);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
