'use strict'

//3rd party dependencies 
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');

const authRoutes = require('./auth/routes.js');
const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');

// prepare the express app
const app = express();

//App Level middleware
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello')
})
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
app.use(authRoutes);

//Catch errors
app.use(notFound);
app.use(errorHandler);


module.exports = {
  server: app, 
  start: (port) => { 
    app.listen(port, () => {
      console.log(`Server is Up on ${port}`)
    })
  }
}