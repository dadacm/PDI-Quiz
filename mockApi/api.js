const express = require('express');
const proxy = require('express-http-proxy');
require('dotenv').config();

const cors = require('cors');

const corsOptions = { origin: '*' };

const app = express();
app.use(cors(corsOptions));

app.post('/login', (req, res) => {
  setTimeout(
    () =>
      res.json({
        data: {},
      }),
    500,
  );
});
app.post('/register-question', (req, res) => {
  setTimeout(
    () =>
      res.json({
        data: {},
      }),
    500,
  );
});
app.post('/register-studant', (req, res) => {
  setTimeout(
    () =>
      res.json({
        data: {},
      }),
    500,
  );
});
app.post('/create-test', (req, res) => {
  setTimeout(
    () =>
      res.json({
        data: {},
      }),
    500,
  );
});
app.post('/send-test', (req, res) => {
  setTimeout(
    () =>
      res.json({
        data: {},
      }),
    500,
  );
});

app.all('*', proxy(process.env.API));

app.listen(3333, () => {
  console.log(`App listening at http://localhost:`);
});
