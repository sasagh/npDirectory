const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV;

app.listen(PORT, console.log(`Server is running in ${ENV} on port ${PORT}`))