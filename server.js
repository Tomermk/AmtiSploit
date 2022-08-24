const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 6000;


app.get("/", (req, res) => {
  res.send("Hello World!");
});
  
app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
  });


app.listen(PORT, console.log(`Server started on port ${PORT}`));