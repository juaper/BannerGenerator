const FireBase = (()=>{
    const admin = require("firebase-admin");
    const DateController = require('./DateController');
    const serviceAccount = require("./../memeking-80290-firebase-adminsdk-tvh87-fcd47e07c4.json");


    admin.initializeApp({
                            credential: admin.credential.cert(serviceAccount),
                            databaseURL: "https://memeking-80290.firebaseio.com"
                        });

    const database = admin.database();



    const writPopularData = (memePath,description)=> {
        const memeKey = memePath.replace(/\./g, "").replace(/\//g, "");


        const promise = new Promise((resolve,reject) =>{
               resolve(getPopularData(memeKey))
            }).then((data)=>{

            const newData = Object.assign({}, data);
            //if the meme key exists --> update its rating else initialize it to 1
            newData.rating ? newData.rating = newData.rating + 1 : newData.rating = 1;
            newData.description = description;
            const currentWeek = DateController.getCurrentWeekId();
            const finalMemeObject = Object.assign({name :memePath}, newData);
            database.ref( `popular/all_time/${memeKey}`).set(finalMemeObject);
            database.ref( `popular/${currentWeek}/${memeKey}`).set(finalMemeObject);
        });

    };

    const getPopularData = (key)=> {
        const currentWeek = DateController.getCurrentWeekId();
        const path = key ? `/popular/${currentWeek}/${key}/` : `/popular/${currentWeek}`;
        return database.ref(path).once('value').then(function(snapshot) {
            return snapshot.val();
        });
    };


    const saveSearchText = (text)=>{
        database.ref( `searchWords/`).set({text: text});

    }

    return{
        updatePopularMeme : writPopularData,
        getPopularData :getPopularData,
        saveSearchText : saveSearchText
    }
})();

module.exports = FireBase;