const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const junk = require('junk');




const ObjectsArrayCreator = ()=>{

    function containsFile(file, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].name.includes(file)) {
                return true;
            }
        }
        return false;
    }

    function getFileContent(directory,filesList) {
        const newerArray = filesList.map(file => `{name :'${directory}/${file}', description : ''}`);
        return `module.exports =  [${newerArray}]`
    }

    function getFileContentOfExistingFile(directory,fileList){

        const filePath = `../public/src/data/${directory}.js`;

            let isUpdated = false;
            const oldObject = require(filePath);
            const currentArray = oldObject.memes.slice();
            fileList.forEach((file)=>{
                if(!containsFile(file, currentArray)){
                    currentArray.push({name:`${directory}/${file}`,description:''});
                    isUpdated = true;
                }
            });
            const dateOfUpdate  = isUpdated ? new Date() : oldObject.date;
            // return `module.exports =  ${JSON.stringify(currentArray)}`
        return `module.exports = { memes : ${JSON.stringify(currentArray)} , date : '${dateOfUpdate}' } `

    }

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
        if (!fs.existsSync(`../public/src/data/${directory}.js`)) {
            fs.writeFile(`../public/src/data/${directory}.js`, getFileContent(directory, filesList), (err)=> {
                if(err){
                    console.log(err, 'err')
                }
            });
        }
        else{
            fs.writeFile(`../public/src/data/${directory}.js`, getFileContentOfExistingFile(directory, filesList), (err)=> {
                if(err){
                    console.log(err,'err')
                }
            });
        }
    });



};

module.exports = ObjectsArrayCreator;