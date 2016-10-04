var express = require('express');
var fs = require('fs');
var path = require('path');
var moment = require('moment');

var port = process.env.PORT || 8080;

var app = express();

app.listen(port, function() {
  console.log("Server up listening to: " + port);
});

app.get('/', function(req, res) {
  var fileName = path.join(__dirname, 'index.html');
  
  res.sendFile(fileName, function (err) {
    
    if (err) 
    {
      console.log(err);
      res.status(err.status).end();
      return;
    }

    console.log('Sent:', fileName);
    
  });
});

app.get('/:datestring', function(req, res) {
  var date;
  
  if(/^\d{8,}$/.test(req.params.datestring)) 
  {
    
    date = moment(req.params.datestring, "X");
    
  } else 
  {
    
    date = moment(req.params.datestring, "MMMM D, YYYY");
    
  }

  if(date.isValid()) 
  {
    
    res.json({
      unix: date.format("X"),
      natural: date.format("MMMM D, YYYY")
    });
    
  } else 
  {
    
    res.json({
      unix: null,
      natural: null
    });
    
  }


});