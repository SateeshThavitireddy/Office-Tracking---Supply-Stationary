const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

app.use(bodyParser.json());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Sateesh',
    password: 'Sateesh',
    database: 'StatinarySupply'
  });

app.post('/products/check', (req, res) => {
  const connection = new Connection(config);
  connection.on('connect', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database connection failed');
    }

    const query = `
      SELECT * 
      FROM products 
      WHERE name = @name
    `;
    const request = new Request(query, (err, rowCount, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Database query failed');
      }

      if (rowCount > 0) {
        res.json({ message: 'Product found' });
      } else {
        res.json({ message: 'Product not found' });
      }

      connection.close();
    });
    request.addParameter('name', TYPES.NVarChar, req.body.name);
    connection.execSql(request);
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
