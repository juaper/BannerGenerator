const s3Uploader =   (file)=>{
    var AWS = require('aws-sdk');
    AWS.config.update({
                          accessKeyId: "AKIAIDKPD6X7W5SH6BUQ",
                          secretAccessKey: "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",

                      });
    var s3 = new AWS.S3();


// Bucket names must be unique across all S3 users

    var myBucket = 'memeking.meme-storage';

    var myKey = 'AKIAI5ZDHFRHTTTETMJA';

    s3.putObject({
                     Bucket: myBucket,
                     Key: new Date() + '.jpg',
                     Body: file
                 }, function (err) {
        if (err) { throw err; }
    });

// s3.createBucket({Bucket: myBucket}, function(err, data) {
//
//     if (err) {
//
//         console.log(err);
//
//     } else {
//
//         params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};
//
//         s3.putObject(params, function(err, data) {
//
//             if (err) {
//
//                 console.log(err)
//
//             } else {
//
//                 console.log("Successfully uploaded data to myBucket/myKey");
//
//             }
//
//         });
//
//     }
//
// });



}

module.exports = s3Uploader;