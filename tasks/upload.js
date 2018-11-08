const path = require('path');
const fs = require('fs');
const util = require('util');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Uploader = require('../uploader');
const readdir = util.promisify(fs.readdir);

readdir(path.join(__dirname, '..', 'tmp'))
  .then(async (files) => {
    for (let i = 0; i < files.length; i++) {
      let savedFile = await Uploader.upload(files[i]);
      let fileURL = savedFile.Location;
      let fileName = savedFile.Key;

      console.log('savedFile', fileName, fileURL);
    };
  })
  .catch(err => { throw err; });
