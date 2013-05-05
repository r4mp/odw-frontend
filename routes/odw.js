fs = require('fs');

exports.findAll = function(req, res) {
//    res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
  getMap(req, res);
};
 
exports.findById = function(req, res) {
  res.send({id:req.params.id, test:req.params.test,  name: "The Name", description: "description"});
};

exports.getByFormat = function(req, res) {
  switch(req.params.format.toLowerCase()) {
    case 'json':
      res.send({test:123});
      break;
    default:
      res.send("Unterst&uuml;zte Formate: json");
      break;
  }
};


exports.getMap = function(req, res) {
  //var body = req.body;
  //res.send(JSON.stringify(body));
  //console.log(JSON.stringify(body));
  getMap(req, res);
  /*var databaseUrl = "odw"; // "username:password@example.com/mydb"
  var collections = ["users", "reports"]
  var db = require("mongojs").connect(databaseUrl, collections);

  db.users.save({email: "srirangan@gmail.com", password: "iLoveMongo", sex: "male"}, function(err, saved) {
    if( err || !saved ) console.log("User not saved");
    else console.log("User saved");
  });*/
};

var getMap = function(req, res) {

  //var body = JSON.stringify(req.body);
  //console.log(req.body.name);

  fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    
    if((isNaN(req.body.lon)) || (isNaN(req.body.lan)) || (isNaN(req.body.zoom))) {  
      lon = 51.216609;
      lan = 6.7836145;
      zoom = 20;
    }
    else {
      lon = req.body.lon;        
      lan = req.body.lan;
      zoom = req.body.zoom;
    }

    res.writeHeader(200, {"Content-Type": "text/html"});  
    res.write(html);  
    res.write("<script>");
    res.write("  map.setView(["+ lon + ", " + lan + "], " + zoom +");");
    res.write("  L.marker([" + lon + ", " + lan + "]).addTo(map)");
    res.write("    .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')");
    res.write("    .openPopup();");
    res.write("</script>");
    res.end();  
  });
}

