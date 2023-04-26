const mysql = require('mysql');
const express = require('express');
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'Sateesh',
  password: 'Sateesh',
  database: 'Stationary'
});

app.post('/OrderQuantity', (req, res) => {
  const productId = req.body.productId;
  const requiredQuantity = req.body.quantity;

  const sql = `SELECT quantity FROM products WHERE id = ${productId}`;
  db.query(sql, (err, result) => {
    if (err) throw err;

    const currentQuantity = result[0].quantity;

    if (requiredQuantity > currentQuantity) {
      res.send({ message: 'Quantity exceeds limit' });
    } else {
      const updatedQuantity = currentQuantity - requiredQuantity;
      const sqlUpdate = `UPDATE products SET quantity = ${updatedQuantity} WHERE id = ${productId}`;
      db.query(sqlUpdate, (err, result) => {
        if (err) throw err;
        res.send({ message: 'Quantity updated successfully' });
      });
    }
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));