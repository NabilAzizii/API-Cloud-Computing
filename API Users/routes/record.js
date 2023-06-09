const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const Multer = require('multer');
const bodyParser = require('body-parser');
const imgUpload = require('../modules/fotoUpload');
require('dotenv').config();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

//Rute untuk menerima permintaan GET dengan data JSON
router.get('/getdata', (req, res) => {
  const query = 'SELECT * FROM `apply_kip`';
  connection.query(query, (err, rows, field) => {
    if (err) {
      res.status(500).send({ message: err.sqlMessage });
    } else {
      res.json(rows);
    }
  });
});

//Rute untuk menerima permintaan GET berdasarkan id dengan data JSON
router.get('/getdata/:id', (req, res) => {
  const id = req.params.id;

  const query = 'SELECT * FROM `apply_kip` WHERE id = ?';
  connection.query(query, [id], (err, rows, field) => {
    if (err) {
      res.status(500).send({ message: err.sqlMessage });
    } else {
      if (rows.length === 0) {
        res.status(404).send({ message: 'ID Not Found' });
      } else {
        res.json(rows);
      }
    }
  });
});

// Rute untuk menerima permintaan POST dengan data JSON
router.post('/postdata', multer.single('foto_rumah'), imgUpload.uploadToGcs, (req, res) => {
  const nik = req.body.nik;
  const nisn = req.body.nisn;
  const npsn = req.body.npsn;
  const nama_lengkap = req.body.nama_lengkap;
  const jenis_kelamin = req.body.jenis_kelamin;
  const tempat_lahir = req.body.tempat_lahir;
  const tanggal_lahir = req.body.tanggal_lahir;
  const nama_ibu = req.body.nama_ibu;
  const alamat = req.body.alamat;
  const kode_pos = req.body.kode_pos;
  const agama = req.body.agama;
  const gaji = req.body.gaji;
  const asal_sekolah = req.body.asal_sekolah;
  const status_sekolah = req.body.status_sekolah;
  const prestasi = req.body.prestasi;
  const nilai_ujian = req.body.nilai_ujian;
  const status_kip = req.body.status_kip;
  const status_rumah = req.body.status_rumah;
  let imageUrl = '';

  if (req.file && req.file.cloudStoragePublicUrl) {
    imageUrl = req.file.cloudStoragePublicUrl;
  }

  const query =
    'INSERT INTO `apply_kip` (nik, nisn, npsn, nama_lengkap, jenis_kelamin, tempat_lahir, tanggal_lahir, nama_ibu, alamat, kode_pos, agama, gaji, asal_sekolah, status_sekolah, prestasi, nilai_ujian, status_kip, status_rumah, foto_rumah) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [nik, nisn, npsn, nama_lengkap, jenis_kelamin, tempat_lahir, tanggal_lahir, nama_ibu, alamat, kode_pos, agama, gaji, asal_sekolah, status_sekolah, prestasi, nilai_ujian, status_kip, status_rumah, imageUrl],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: err.sqlMessage });
      } else {
        // Data yang diunggah melalui rute uploadImage digabungkan ke respons
        const responseData = {
          nik,
          nisn,
          npsn,
          nama_lengkap,
          jenis_kelamin,
          tempat_lahir,
          tanggal_lahir,
          nama_ibu,
          alamat,
          kode_pos,
          agama,
          gaji,
          asal_sekolah,
          status_sekolah,
          prestasi,
          nilai_ujian,
          status_kip,
          status_rumah,
          foto_rumah: imageUrl,
        };

        res.send({ message: 'Insert Successful', data: responseData });
      }
    }
  );
});

router.post('/uploadImage', multer.single('image'), imgUpload.uploadToGcs, (req, res, next) => {
  const data = req.body;
  if (req.file && req.file.cloudStoragePublicUrl) {
    data.imageUrl = req.file.cloudStoragePublicUrl;
  }

  res.send(data);
});

router.delete('/deletedata/:id', (req, res) => {
  const id = req.params.id;

  const queryCheck = 'SELECT id FROM `apply_kip` WHERE id = ?';
  connection.query(queryCheck, [id], (err, rows, fields) => {
    if (err) {
      res.status(500).send({ message: err.sqlMessage });
    } else {
      if (rows.length === 0) {
        res.status(404).send({ message: 'id not found' });
      } else {
        const queryDelete = 'DELETE FROM `apply_kip` WHERE id = ?';
        connection.query(queryDelete, [id], (err, rows, fields) => {
          if (err) {
            res.status(500).send({ message: err.sqlMessage });
          } else {
            res.send({ message: 'Delete successful' });
          }
        });
      }
    }
  });
});

router.get('/getfoto/:id', (req, res) => {
  const id = req.params.id;

  const query = 'SELECT foto_rumah FROM `apply_kip` WHERE id = ?';
  connection.query(query, [id], (err, rows, field) => {
    if (err) {
      res.status(500).send({ message: err.sqlMessage });
    } else {
      if (rows.length === 0) {
        res.status(404).send({ message: 'id not found' });
      } else {
        res.json(rows);
      }
    }
  });
});

module.exports = router;
