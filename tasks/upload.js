const path = require('path');
const fs = require('fs');
const mime = require('mime-types');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const AWS = require('aws-sdk');
const Uploader = require('../uploader');

fs.readdir(path.join(__dirname, '..', 'tmp'), (err, files) => {
  if (err) { throw err; }

  files.forEach(file => {
    Uploader.upload(file);
  });
});
