# MyKIP API Machine Learning

Dokumentasi MyKIP API Machine Learning

## Base Url : `*Tahap Deployment*`

#### Predict


```http
    POST /predict
```
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

![contoh Json API Machine Learning](https://github.com/NabilAzizii/API-Cloud-Computing/assets/128737322/e1717800-e757-4a7f-8bab-a46c7cec82c4)
