const client = require('@mailchimp/mailchimp_marketing');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

client.setConfig({
  apiKey: '4d17e37348b4f9c7d4a3ef45dde1c444-us17',
  server: 'us17',
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

  const run = async () => {
    try {
      const response = await client.lists.addListMember('63c685e33d', {
        email_address: subscribingUser.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });
      console.log(response);
      res.sendFile(__dirname + '/success.html');
    } catch (err) {
      console.log(err.status);
      res.sendFile(__dirname + '/failure.html');
    }
  };
  run();
});

app.post('/failure', (req, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running of port ${port}`);
});

// API from mailchimp
// 4d17e37348b4f9c7d4a3ef45dde1c444-us17

// list ID
// 63c685e33d
