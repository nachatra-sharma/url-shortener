const express = require("express");
const connectToDB = require("./database/db");
require("dotenv").config();
const PORT = process.env.PORT;
const url = process.env.MONGOURL;
const app = express();
const URLRoutes = require("./routes/route");
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", URLRoutes);

app.listen(PORT, async () => {
  console.log(`Server is up and running on PORT ${PORT}`);
  await connectToDB(url);
  console.log(`MongoDB Connected SuccessFully`);
});
