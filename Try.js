const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const junk = require('junk');




const ObjectsArrayCreator = ()=>{


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
        const filesList = getFileList(directory);
            fs.writeFile(`../public/src/data/${directory}.js`, 'some text', (err)=> {
                if(err){
                    console.log(err, 'err')
                }
            });



    });



};

module.exports = ObjectsArrayCreator;