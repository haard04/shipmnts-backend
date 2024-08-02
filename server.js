const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
// const fs = require("fs");
const routes = require('./routes/email')
const morgan = require('morgan')
require('dotenv').config();
global.__basedir = __dirname;
const app = express();
app.use(morgan('dev'))
app.use(express.json({limit:'50mb'}));
app.use(cors())
app.use('/',routes)
// fs.readdirSync("./routes").map((r) =>
//   app.use("", require("./routes/" + r))
// );
app.use("/uploads", express.static("uploads"));
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.log('Failed to connect to MongoDB', err));
