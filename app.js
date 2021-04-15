const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  console.log(req.body.firstname);
  console.log(req.body.lastname);
  console.log(req.body.email);
});

app.listen(port, () => {
  console.log(`Server is running of port ${port}`);
});
