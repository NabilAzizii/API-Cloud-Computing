'use strict';
require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const moment = require('moment');
const path = require('path');

const pathKey = path.resolve('./mykip-387204-7382d224601b.json');

const gcs = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: pathKey,
});

const bucketName = 'fotorumah';
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  if (!req.file) return next();

  const timestamp = moment().format('YYYYMMDD-HHmmss');
  const nik = req.body.nik;
  const gcsname = `foto_rumah_${nik}_${timestamp}`;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

module.exports = ImgUpload;
