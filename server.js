const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());

app.listen(PORT, () => console.log('Server running in PORT ' + PORT));
