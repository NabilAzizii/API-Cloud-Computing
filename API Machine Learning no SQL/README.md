# MyKIP API Machine Learning

Dokumentasi MyKIP API Machine Learning

Melakukan predict dengan requests json

**Request Body:**
| Parameter    | Type               | Description                |
| :--------    | :-------           | :------------------------- |
|`prestasi`    | `Boolean`          | **required**; **1**; true, **0**; false  |
|`nilai_ujian` | `int`              | **required**; 90 / 100 / 55 |
|`gaji_ortu`   | `int`              | **required**; 5000000 |
|`status_kip`  | `boolean`          |**required**; **1**; true, **0**; false |
|`status_rumah`| `Enum('1','2','3')`|**required**; **1**;Milik Sendiri, **2**; Sewa, **3**; Pinjam |
| `foto_rumah` | `string`           | **required**; Public **URL** dari Google Storage |

*Contoh JSON API Machine Learning:

![contoh Json API Machine Learning2](https://github.com/NabilAzizii/API-Cloud-Computing/assets/128737322/fc6922d7-6c62-4c50-beb5-a761e3ef7580)
