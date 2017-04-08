const express = require('express');
const app = express();
const fs = require("fs");
const path = require('path');
const bodyParser = require('body-parser');
const multer  = require('multer');
const fotology = require("fotology");


app.use(bodyParser.urlencoded({
                                  extended: true
                              }));

const storage = multer.diskStorage({
                                       destination: function (req, file, cb) {
                                           cb(null, './uploads/')
                                       },
                                       filename: function (req, file, cb) {
                                           cb(null,'uploaded-meme' + memeIdentifire + '.png')
                                       }
                                   });

const upload = multer({ storage: storage });

app.use(express.static(__dirname + '/build'));

const jsonParser       = bodyParser.json({limit:/*1024*1024*20*/ '50mb', type:'application/json'});
const urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding',limit: '50mb' })
app.use(jsonParser);
app.use(urlencodedParser);



// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.post("/reset", function (req, res) {
    const ObjectArrayCreator = require('./ObjectsArrayCreator');
    ObjectArrayCreator();
});

app.get("/get-cat", function (req, res) {
    const type = req.query.type;
    const data =  require(`../public/src/data/${type}.js`);
    res.send(data);

});

app.post("/save", function (req, res) {
    const {type, data} = req.body;
    fs.writeFile(`../public/src/data/${type}.js`,`module.exports = ${JSON.stringify(data)}`, (err)=> {
        if(err){
            console.log(err,'err')
        }
    });


});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'  ));
});




app.set( 'port', ( process.env.PORT || 9000 ));

// Start node server
app.listen( app.get( 'port' ), function() {
    console.log( 'Node server is running on port ' + app.get( 'port' ));

});