const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');

const naturalPersons = require('./routes/naturalPersons');
const relations = require('./routes/relations');

dotenv.config({ path: './config/config.env' });

connectDb();

const app = express();
app.use(express.json());

app.use('/api/v1/naturalPersons', naturalPersons);
app.use('/api/v1/relations', relations);

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV;

app.listen(PORT, console.log(`Server is running in ${ENV} on port ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
});