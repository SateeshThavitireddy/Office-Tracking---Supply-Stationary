const express = require('express');
  const mysql = require('mysql');
  const app = express();
  const port = 3000;
  
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'Sateesh',
    password: 'Sateesh',
    database: 'Stationary'
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
  });
  
  app.get('/api/orders', (req, res) => {
    const sql = 'SELECT * FROM orders WHERE order_status < 2';
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
  app.listen(port, () => console.log(`Listening on port ${port}`));