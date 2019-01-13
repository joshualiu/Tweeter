"use strict";

// Basic express setup:
require('dotenv').config()
const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sassMiddleware = require("node-sass-middleware");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  sassMiddleware({
    src: "./stylesheets", // Location of SASS files
    dest: "./public/css", // Compiled CSS location
    prefix: "/css" // URL path to be intercepted by the middleware and
  })
); // compiled on the fly. When the browser tries to
// GET /css/main.css, it compiles ./stylesheets/main.scss

const { MongoClient } = require("mongodb");
// const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";
const MONGODB_URI = process.env.MONGODB_URI;

// connect to mongoDB:

MongoClient.connect(
  MONGODB_URI,
  (err, db) => {
    if (err) {
      console.error(`Failed to connect: ${MONGODB_URI}`);
      throw err;
    }
    console.log(`Connected to mongodb: ${MONGODB_URI}`);

    const DataHelpers = require("./lib/data-helpers.js")(db);
    const tweetsRoutes = require("./routes/tweets")(DataHelpers);
    app.use("/tweets", tweetsRoutes);

    app.listen(PORT, () => {
      console.log("Example app listening on port " + PORT);
    });
  }
);
