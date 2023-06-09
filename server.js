const express = require('express');
const app = express();
const { Client } = require('pg');
const bodyParser = require('body-parser');

const connectionString = 'enter_url_here';
const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();


app.use(bodyParser.json());

// Serve the static files
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  const { fullName, address, email, phoneNumber } = req.body;

  const query = 'INSERT INTO contact_form (full_name, address, email, phone_number) VALUES ($1, $2, $3, $4)';
  const values = [fullName, address, email, phoneNumber];

  client.query(query, values, (err) => {
    if (err) 
    {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } 
    else 
    {
      res.sendStatus(200);
    }
  });
});

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
