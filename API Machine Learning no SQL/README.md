# MyKIP API Machine Learning

Dokumentasi MyKIP API Machine Learning

## Base Url : `*Tahap Deployment*`

#### Predict


```http
    POST /predict
```
Melakukan predict dengan request json

| Parameter    | Type               | Description                |
| :--------    | :-------           | :------------------------- |
|`prestasi`    | `Boolean`          | **required**; **1**; true, **0**; false  |
|`nilai_ujian` | `int`              | **required**; 90 / 100 / 55 |
|`gaji_ortu`   | `int`              | **required**; 5000000 |
|`status_kip`  | `boolean`          |**required**; **1**; true, **0**; false |
|`status_rumah`| `Enum('1','2','3')`|**required**; **1**;Milik Sendiri, **2**; Sewa, **3**; Pinjam |
| `foto_rumah` | `string`           | **required**; Public **URL** dari Google Storage |



