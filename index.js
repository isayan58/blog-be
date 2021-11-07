const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs")
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const path= require("path");
const headerRoutes = require("./Routes/header.routes");
const cors = require("cors");  //Cross Region, different environment setups.
const dotenv = require("dotenv");  //For obtaining env variables
const dbConfig = require("./dbConfig/dbConfig");  //For database connection
app.use(express.json());
dotenv.config();  //install dotenv and mongoose
dbConfig.connect(process.env.DATABASE_URL);  //Connection formation with Mongodb

const accessLogs=fs.createWriteStream(path.join(__dirname, "access.logs"),
{
  flags: "a",
});

app.use(cors());  //Use CORS.
app.use(helmet());  //Helmet for extra security headers
app.use(morgan("combined", {stream: accessLogs}));  //Log in files.
headerRoutes.blogRoutes(app);

const PORT = process.env.PORT;  //PORT is from environment files.
app.listen(PORT, () => {
  console.log(`Server has been started at PORT:${PORT}`);
});