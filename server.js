var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');
/*var popularMemesArray = require('./memes_data/popular');
var israeliMemesArray = require('./memes_data/israeli');
var popMemesArray = require('./memes_data/pop');
var situationsMemesArray = require('./memes_data/situations');
var differentMemesArray = require('./memes_data/different');
var classicMemesArray = require('./memes_data/classic');*/

var bodyParser = require('body-parser');

var multer  = require('multer');

var fotology = require("fotology");

var memeIdentifire = Math.random();


app.use(bodyParser.urlencoded({
                                  extended: true
                              }));

var storage = multer.diskStorage({
                                     destination: function (req, file, cb) {
                                         cb(null, './uploads/')
                                     },
                                     filename: function (req, file, cb) {
                                         cb(null,'uploaded-meme' + memeIdentifire + '.png')
                                     }
                                 });

var upload = multer({ storage: storage });

app.use(express.static(__dirname + '/public/'));

var jsonParser       = bodyParser.json({limit:/*1024*1024*20*/ '50mb', type:'application/json'});
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding',limit: '50mb' })
app.use(jsonParser);
app.use(urlencodedParser);

//saving a meme to the server
app.post("/save", function (req, res) {

    var data = req.body.canvas;

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
    fs.writeFile('saved-memes/' + 'meme' + Math.random() + '.png', imageBuffer.data, function(err) {  });

});


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

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

app.post('/upload', upload.single('displayImage'), function (req, res, next) {
    console.log(req);
    fs.writeFile('./upload-details/meme-description'+ memeIdentifire + '.txt', req.body.name + '\n' + req.body.title + '\n' +  req.body.description + '\n' +  memeIdentifire, function (err) {
        memeIdentifire++;
        if (err) throw err;
    });
})


app.get('/categories', function (req, res) {
    var arr = [];
    const testFolder = './public/cat/' + req.query.cat + '/';
    fs.readdir(testFolder, function(err, files) {
        files.forEach(function(file){
            arr.push(file.toString())
        })
    })
    setTimeout(function(){
        res.send(arr);
    },2000)
});



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})
app.get('/popular', function (req, res) {
    res.send(popularMemesArray);
})
app.get('/classic', function (req, res) {
    res.send(classicMemesArray);
})
app.get('/situations', function (req, res) {
    res.send(situationsMemesArray);
})
app.get('/israeli', function (req, res) {
    res.send(israeliMemesArray);
})
app.get('/pop', function (req, res) {
    res.send(popMemesArray);
})
app.get('/different', function (req, res) {
    res.send(differentMemesArray);
})




/*
 var server = app.listen(8081, function () {
 var host = server.address().address;
 var port = server.address().port;
 console.log("Example app listening at http://%s:%s", host, port)
 });
 */








var port = process.env.PORT || 8081; //(or whatever)

app.listen(port);
