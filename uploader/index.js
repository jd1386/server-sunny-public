const path = require('path');
const fs = require('fs');
const util = require('util');
const mime = require('mime-types');
const readFile = util.promisify(fs.readFile);
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const AWS = require('aws-sdk');

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_SECRET_ACCESS_ID
});

const upload = async (file) => {
  return new Promise((resolve, reject) => {
    readFile(path.join(__dirname, '..', `tmp/${file}`))
      .then(data => {
        // file is read
        // file to base64 data for transfer
        var base64Data = Buffer.from(data, 'binary');

        var S3 = new AWS.S3();

        S3.upload({
          Bucket: process.env.AWS_S3_BUCKET_NAME_DEV,
          Key: file,
          Body: base64Data,
          Prefix: 'mp3',
          ACL: 'public-read',
          ContentEncoding: 'base64',
          ContentType: mime.lookup(file)
        }, function (err, data) {
          if (err) { reject(err); }
          console.log('uploaded to s3', data);
          resolve(data);
        });
      })
      .catch(err => { throw err; });
  });
};

const find = (file) => {
  var getParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME_DEV,
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
