require('dotenv').config()
const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require('body-parser');
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const launchRouter = require("./routes/launch");
const statisticsRouter = require("./routes/statistics");
const usersRouter = require("./routes/users");
const  {validateToken} = require("./middleware/tokenValidator");
const PORT = process.env.PORT || 6000;


const options = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
};

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
const jsonParser = bodyParser.json()

app.use("/login",jsonParser ,loginRouter);
app.all("*",[validateToken]);
app.use("/logout",jsonParser, logoutRouter);
app.use("/launch",jsonParser, launchRouter);
app.use("/users",jsonParser, usersRouter);
app.use("/statistics",jsonParser, statisticsRouter);


app.get("/api", (req, res) => {
  console.log(req.data);
  res.json({ Username: req.data.username, Rolename: req.data.role });
});
  
app.post("/post", jsonParser,(req, res) => {
    res.status(200).json({message: "OK"});
  });


https.createServer(options, app).listen(PORT, console.log(`Server started on port ${PORT}`));