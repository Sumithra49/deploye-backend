const express = require("express");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
const { connection } = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log(`Server is running at port: ${process.env.PORT}`);
  } catch (err) {
    console.log(err);
  }
});
