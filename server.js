var express = require('express'),
    odw = require('./routes/odw');
    app = express();

    app.configure(function(){
      app.use(express.bodyParser());
      app.use(app.router);
    }); 

app.get('/odw', odw.findAll);
app.post('/odw', odw.getMap);
app.get('/odw/:format', odw.getByFormat);
app.post('/odw/:format', odw.getByFormat);
app.get('/odw/:id', odw.findById);
 
app.listen(1337);
console.log('Listening on port 1337...');
