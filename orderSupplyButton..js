const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sql = require('mssql');

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Sateesh',
    password: 'Sateesh',
    database: 'StatinarySupply'
  });

app.post('/orders', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO orders (productId, quantity)
      VALUES (${req.body.productId}, 1)
    `;
    res.json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  } finally {
    sql.close();
  }
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
