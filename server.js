require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const loginRouter = require("./routes/login");
const PORT = process.env.PORT || 6000;


var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
const jsonParser = bodyParser.json()

app.use("/login",jsonParser ,loginRouter);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!"});
});
  
app.post("/post", jsonParser,(req, res) => {
    res.status(200).json({message: "OK"});
  });


app.listen(PORT, console.log(`Server started on port ${PORT}`));