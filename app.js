const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
const client = require('@mailchimp/mailchimp_marketing');
// const https = require('https');

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  // console.log(req.body.firstname);
  // console.log(req.body.lastname);
  // console.log(req.body.email);

  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;

  console.log(firstName, lastName, email);

  const subscribingUser = { firstName: firstName, lastName: lastName, email: email };

  client.setConfig({
    apiKey: 'd4a44d62b9eb79790933a44b3780df4e-us17',
    server: 'us17',
  });

  const run = async () => {
    const response = await client.lists.addListMember('63c685e33d', {
      email_address: subscribingUser.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });
    console.log(response);
  };
  run();
});

app.listen(port, () => {
  console.log(`Server is running of port ${port}`);
});

// API from mailchimp
// d4a44d62b9eb79790933a44b3780df4e-us17

// list ID
// 63c685e33d
