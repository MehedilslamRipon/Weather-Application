const mongoose = require('mongoose');

const HistorySchema = mongoose.Schema({
   icon: String,
   name: String,
   country: String,
   main: String,
   description: String,
   temp: Number,
   pressure: Number,
   humidity: Number,
   minTemp: Number,
   maxTemp: Number,
});

const History = mongoose.model('History', HistorySchema);

module.exports = History;
