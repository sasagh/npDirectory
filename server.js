const express = require('express');
const dotenv = require('dotenv');

const naturalPersons = require('./routes/naturalPersons');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use('/api/v1/naturalPersons', naturalPersons);

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV;

app.listen(PORT, console.log(`Server is running in ${ENV} on port ${PORT}`))