var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", (req, res) => {
  const clock = new Date();
  const time = {
    utc: clock.toGMTString(),
    unix: clock.getTime(),
  };
  res.send(time);
});

app.get("/api/:time", (req, res) => {
  let clock;
  let isParsable = /\w*[\s-]\w*/g;
  if (isParsable.test(req.params.time)) {
    clock = new Date(req.params.time);
  } else {
    clock = new Date(Number.parseInt(req.params.time));
  }
  const time = {
    utc: clock.toGMTString(),
    unix: clock.getTime(),
  };
  if (time.utc == "Invalid Date") {
    res.send({
      error: time.utc,
    });
  }
  res.send(time);
});

var listener = app.listen(process.env.PORT || 4000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
