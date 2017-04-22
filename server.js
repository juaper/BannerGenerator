const express = require('express');
const app = express();
const fs = require("fs");
const path = require('path');
const bodyParser = require('body-parser');
const multer  = require('multer');
const fotology = require("fotology");
const memeIdentifire = Math.random();
const s3Uploader = require('./server-modules/s3');
const fireBase = require('./server-modules/firebase');
const PopularController = require('./server-modules/PopularController');


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

app.use(express.static(__dirname + '/public/'));

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


//saving a meme to the server
app.post("/save", function (req, res) {
    var data = req.body.data;

    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        return response;
    }
    var imageBuffer = decodeBase64Image(data);
    //fs.writeFile('saved-memes/' + 'meme' + Math.random() + '.png', imageBuffer.data, function(err) {  });
    s3Uploader(imageBuffer.data)

});


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'  ));
});


app.post('/update-popular-meme-rating', function (req, res) {
    fireBase.updatePopularMeme(req.body.data,req.body.description);
});

app.post('/save-search-text', function (req, res) {
    fireBase.saveSearchText(req.body.data);
});



app.get('/get-popular-memes', function (req, res) {

    const promise = new Promise((resolve,reject)=>{
        resolve(fireBase.getPopularData(''))
    }).then((data)=>  {
        res.send(PopularController.getCurrentSortedData(data));
    });

});





app.set( 'port', ( process.env.PORT || 3000 ));

// Start node server
app.listen( app.get( 'port' ), function() {
    console.log( 'Node server is running on port ' + app.get( 'port' ));

});












