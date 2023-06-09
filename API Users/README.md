# MyKIP API

Dokumentasi MyKIP API Data Users

## Base Url : https://backend-dot-mykip-387204.et.r.appspot.com

#### Get all data


```http
    GET /getdata
```
Mengambil semua data dari database

#### Get data by ID

```http
    GET /getdata/:id
```
Mengambil data dari tabel apply-kip berdasarkan ID.
| Parameter | Type     
| :-------- | :------- 
| `id`      | `int`    

#### Get Public URL Foto Rumah by ID

```http
    GET /getfoto/:id
```
Mengambil data dari database berdasarkan ID.
| Parameter | Type     
| :-------- | :------- 
| `id`      | `int`    

#### Post Data

```http
    POST /postdata
```
Membuat data baru ke database.
| Parameter | Type     | Description |
| :-------- | :------- | :-------    |
| `nik`     | `int`    |     1234        |
| `nisn`    | `int`    |      4321       |
| `npsn`    | `int`    |        2134     |
| `nama_lengkap`      | `string`  |  Ngibul   |
| `jenis_kelamin`      | `string`  | L / P |
| `tempat_lahir`      | `string`  | Antartika |
| `tanggal_lahir`      | `date`  | 2000-12-30 |
| `nama_ibu`      | `string`  | Kibulin |
| `alamat`      | `string`  | Jl.Lurus Aja No.berapa yaaa |
| `kode_pos`      | `int`  | 12542 |
| `agama`      | `string`  | --- |
| `gaji`      | `int`  |9999999|
| `asal_sekolah`      | `string`| SMAN 10000 Galaksi |
| `status_sekolah`      | `string`  | Negeri |
| `prestasi`      | `Boolean`  |  1; true, 0; false  |
| `nilai_ujian`      | `int`  | 90 |
| `status_kip`      | `Boolean`  | 1; true, 0; false |
| `status_rumah`      | `Enum('1','2','3')`| 1;Milik Sendiri, 2; Sewa, 3; Pinjam |
| `foto_rumah`      | `string`| Public URL dari Google Storage|

#### Delete data by ID

```http
    DELETE /deletedata/:id
```
Menghapus data dari database berdasarkan ID.
| Parameter | Type     
| :-------- | :------- 
| `id`      | `int`    

