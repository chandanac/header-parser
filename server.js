var express = require('express')
var app = express()

var useragent = require('useragent')

var port = process.env.PORT || 3500;

app.listen(port, function(){
  console.log("Listening on port: " + port);
});

app.get('/', function(req, res) {
  var agent = useragent.parse(req.headers['user-agent']);

  var ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }

  var info = {
           'ip-address': ipAddr,
          'language': req.headers["accept-language"].split(',')[0],
          'software': req.headers['user-agent'].split(') ')[0].split(' (')[1]
     };
     res.send(JSON.stringify(info));
    });
  /*res.json({
    ipadress: ipAddr,
    "language": req.headers['accept-language'].split(',')[0],
    software: req.headers['user-agent'].split(') ')[0].split(' (')[1]
  });
  
  */
