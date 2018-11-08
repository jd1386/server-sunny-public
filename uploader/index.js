const path = require('path');
const fs = require('fs');
const util = require('util');
const mime = require('mime-types');
const readFile = util.promisify(fs.readFile);
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const AWS = require('aws-sdk');
const Article = require('../models').Article;
require('colors');

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
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: file,
          Body: base64Data,
          Prefix: 'mp3',
          ACL: 'public-read',
          ContentEncoding: 'base64',
          ContentType: mime.lookup(file)
        }, function (err, data) {
          if (err) { reject(err); }
          console.log('Successfully uploaded to S3'.green);
          resolve(data);
        });
      })
      .catch(err => { throw err; });
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

const updateAndUploadMp3 = async (aid) => {
  await Article.findOne({ where: {
    aid: aid
  } })
    .then(async (savedArticle) => {
      if (savedArticle) {
        if (!savedArticle.get('file_url')) {
          await savedArticle.update({
            file_url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${savedArticle.get('aid')}.mp3`
          });
          await upload(`${savedArticle.get('aid')}.mp3`);
          return null;
        }
      } else {
        // has no article in the db
        console.log('no article saved in the db');
      }
    })
    .catch(err => { throw err; });
};

module.exports = {
  upload,
  find,
  updateAndUploadMp3
};
