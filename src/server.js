const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";
    this.server = require("http").Server(this.express);
    this.io = require("socket.io")(this.server);

    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    mongoose.connect(
      "mongodb+srv://admin:admin@cluster0-atsla.mongodb.net/test?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useNewUrlParser: true
      }
    );
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "uploads", "resized"))
    );
    this.express.use(cors());

    this.express.use((req, res, next) => {
      req.io = this.io;

      next();
    });
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;
