// index.js
var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

// Microservicio de marca de tiempo con ruta corregida
app.get("/api/timestamp/:date?", (req, res) => {
  let dateInput = req.params.date;
  let date;

  if (!dateInput) {
    date = new Date();
  } else if (!isNaN(dateInput)) {
    // Si es un número (unix timestamp)
    date = new Date(parseInt(dateInput));
  } else {
    // Si es una fecha en formato string
    date = new Date(dateInput);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});
app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: req.ip,
    language: req.get("Accept-Language"),
    software: req.get("User-Agent"),
  });
});

var listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
