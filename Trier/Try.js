const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const junk = require('junk');
const admin = require("firebase-admin");
const serviceAccount = require("./../memeking-80290-firebase-adminsdk-tvh87-fcd47e07c4.json");
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://memeking-80290.firebaseio.com",
    storageBucket: "gs://memeking-80290.appspot.com", //"memeking-80290.appspot.com",

});

const database = admin.database();


const  updateAllDataToDataBase = (directory)=>{
    database.ref( `memes-data/${directory}`).set(currentMemesJson);

};
let counter = 0;
const writeImageToStorage = (directory)=>{

    if(counter > 10){
        return;
    }
    const storageRef = firebase.storage().ref();
    const memeImageRef = storageRef.child(`memes/${MEME_NAME}/${MEME_UNIQUE_NAME}.jpg`);
    imagemin([`../public/public/memes/${directory}/*.{jpg,png}`], null, {
        plugins: [
            imageminMozjpeg({targa: true}),
            imageminPngquant({quality: '65-80'})
        ]
    }).then(files => {
        console.log(files);
        //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
        files.forEach(file =>{})
    });
    counter ++;
}


const ObjectsArrayCreator = (()=>{


// return all the sub directories in a certain given path
    function getDirectories(srcPath) {
        return fs.readdirSync(srcPath)
            .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())
    }

//loop through the files inside the directory and execute the changeDimension Method on each one
    function getFileList(directory) {
        return fs.readdirSync(`../public/public/memes/${directory}/`).filter(junk.not);
    }
//resetArrayToFileNames();

    const directories = getDirectories('../public/public/memes');
// perform the script on every file inside the sub directory
    directories.forEach((directory) => {
        const currentMemesJson = require(`../public/src/data/${directory}.js`);

       //updateAllDataToDataBase(directory);
        writeImageToStorage(directory)

    });



})();

module.exports = ObjectsArrayCreator;