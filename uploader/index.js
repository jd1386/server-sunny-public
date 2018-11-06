const path = require('path');
const fs = require('fs');
const mime = require('mime-types');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const AWS = require('aws-sdk');

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_SECRET_ACCESS_ID
});

const upload = (file) => {
  fs.readFile(path.join(__dirname, '..', `tmp/${file}`), (err, data) => {
    if (err) { throw err; }

    var base64Data = Buffer.from(data, 'binary');

    var S3 = new AWS.S3();
    S3.upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: file,
      Body: base64Data,
      Prefix: 'mp3',
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: mime.lookup(file)
    }, function (err, data) {
      if (err) { throw err; }
      console.log('Successfully uploaded file', data);
    });
  });
};

const find = (file) => {
  var getParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: 'search.mp3'
  };

  var S3 = new AWS.S3();

  S3.getObject(getParams, function (err, data) {
    // Handle any error and exit
    if (err) {
      if (err.message === 'The specified key does not exist.') {
        console.log('File not found');
      }
      // throw err;
    }

    // No error happened
    // The file exists in S3
    // do the rest ..

    // console.log(data);
  });
};

module.exports = {
  upload,
  find
};
