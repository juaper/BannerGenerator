const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');

const directories = getDirectories('./public/public/build-memes/memes');
// perform the script on every fie inside the sub directory
directories.forEach((directory) => {

    const filesList = getFileList(directory);
    const stringifyFileList = filesList.map(file => `'${directory}/${file}'`);
    fs.writeFile(`./public/src/data/${directory}.js`, `export default [${stringifyFileList}]`, function(err) {
    });
});

// return all the sub directories in a certain given path
function getDirectories(srcPath) {
    return fs.readdirSync(srcPath)
        .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())
}

//loop through the files inside the directory and execute the changeDimension Method on each one
function getFileList(directory) {
    /*recursive(`./public/public/build-memes/memes/${directory}/`, function (err, files) {

    });*/
    let myFiles = [];
    return fs.readdirSync(`./public/public/build-memes/memes/${directory}/`);

}