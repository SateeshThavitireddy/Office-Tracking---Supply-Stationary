const express = require('express');
const app = express();

app.use(express.json());
app.get('/orders', (req, res) => {
  res.json(orders);
});

app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).send('Order not found');
  }
  res.json(order);
});

app.put('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).send('Order not found');
  }
  order.quantity = req.body.quantity;
  res.json(order);
});

app.delete('/orders/:id', (req, res) => {
  const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (orderIndex === -1) {
    return res.status(404).send('Order not found');
  }
  orders.splice(orderIndex, 1);
  res.sendStatus(204);
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});