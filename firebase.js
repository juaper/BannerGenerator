const FireBase = (()=>{
    const admin = require("firebase-admin");
    var serviceAccount = require("./memeking-80290-firebase-adminsdk-tvh87-fcd47e07c4.json");


    admin.initializeApp({
                            credential: admin.credential.cert(serviceAccount),
                            databaseURL: "https://memeking-80290.firebaseio.com"
                        });

    var database = admin.database();



    const writPopularData = (memePath)=> {
        const memeKey = memePath.replace(/\./g, "").replace(/\//g, "");


        const promise = new Promise((resolve,reject) =>{
               resolve(getDataFromDataBase(memeKey))
            }).then((data)=>{

            const newData = Object.assign({}, data);
            //if the meme key exists --> update its rating else initialize it to 1
            newData.rating ? newData.rating = newData.rating + 1 : newData.rating = 1;

            database.ref( 'popular/' + memeKey ).set(Object.assign({name :memePath}, newData));

        });

    };

    const getDataFromDataBase = (key)=> {

        return database.ref('/popular/' + key || '').once('value').then(function(snapshot) {
            return snapshot.val();
        });
    };

    return{
        write : writPopularData,
        getData :getDataFromDataBase
    }
})();

module.exports = FireBase;