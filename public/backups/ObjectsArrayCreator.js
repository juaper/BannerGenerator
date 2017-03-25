const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const junk = require('junk');
const resetArrayToFileNames = require('./FilesArrayCreator');

function getFileContent(directory , filesList) {
    const newerArray = filesList.map(file => `{name :'${directory}/${file}', description : ''}`);
    return `module.exports =  [${newerArray}]`
}

// return all the sub directories in a certain given path
function getDirectories(srcPath) {
    return fs.readdirSync(srcPath)
        .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())
}

//loop through the files inside the directory and execute the changeDimension Method on each one
function getFileList(directory) {
    return fs.readdirSync(`./public/public/memes/${directory}/`).filter(junk.not);

}
//resetArrayToFileNames();

    const directories = getDirectories('./public/public/memes');
// perform the script on every file inside the sub directory
    directories.forEach((directory) => {
        const filesList = getFileList(directory);
        const path = `./public/public/memes/${directory}`;
            console.log(path)
            fs.writeFile(`./public/src/data/${directory}.js`, getFileContent(directory, filesList), (err)=> {
                console.log(err)
            });

    });


