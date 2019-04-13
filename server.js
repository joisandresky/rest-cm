const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const cors = require('cors');

const app = express();

// Aktifkan jika masih terjadi masalah CORS
// app.use(cors());
app.use(bodyParser.json());
require('./routes')(app);

app.listen(PORT, () => console.log('Server running in PORT ' + PORT));
