const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const { connectionMongo } = require("./src/DB/Mongo.js");

//Documentation
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { options } = require("./src/Utils/swaggerOptions");

const swaggerSpec = swaggerJsdoc(options);

const app = express();
const PORT = process.env.PORT || 3050;
const corsOptions = {
  origin: [
    "*",
    "https://task-manager-front-one.vercel.app",
    "http://localhost:3000",
  ], // Lista de IPs permitidas
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl:
      "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
  })
);
app.use("/api/v1", require("./src/Routes/index"));

connectionMongo()
  .then(() => {
    console.log("Database mongoDB running! 😎");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB😱☠:", error);
  });

app.listen(PORT, () => console.log("Server Running on port", PORT, "✔✔"));
