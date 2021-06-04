const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/router');

const app = express();
app.use(cors());

// public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routers
app.use('/api/history', router);

// server PORT
const PORT = process.env.PORT || 3000;

// start server
app.listen(PORT, () => {
   console.log(`Server ss Running on PORT: ${PORT}`);
   mongoose.connect(
      `mongodb+srv://XeroxWeather:4FSBA3sK3dKWVz4l@cluster0.tfias.mongodb.net/weatherHistory?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
         console.log(`Database Connected!`);
      }
   );
});
