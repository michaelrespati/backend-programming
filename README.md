Kuis Backend Programming

NAMA  : Michael Respati Sanjaya Ho
NIM   : 535250008 / Teknik Informatika
KELAS : A

Penjelasan Mengenai Endpoint :
1) POST localhost:5000/api/gacha/play =  Parameter ini digunakan untuk melakukan gacha dengan memasukan ID user pemain yang nantinya sistem akan mengundi sebanyak 5 kali dalam satu hari.
Contoh : 
Kita memasukkan ID user ke dalam Body JSON pada echoAPI
{
  "userId" = "69df16303c1d61bdc3446537"
}
Apabila pemain berhasil mendapatkan hadiah, maka akan muncul output :
{
  "message": "Selamat! Anda mendapatkan hadiah: Smartwatch Y", 
  "prize": "Smartwatch Y"
}
Dan jika tidak mendapatkan apa - apa, maka akan muncul output :
{
  "message": "Maaf, Anda belum beruntung. Coba lagi!", 
  "prize": null
}
Namun, jika user sudah melakukan gacha sebanyak 5 kali pada hari ini, maka akan muncul output :
{
  "statusCode": 422,
	"error": "UNPROCESSABLE_ENTITY_ERROR",
	"description": "Unprocessable entity",
	"message": "Anda Sudah Mencoba 5 Kali Hari Ini. Coba Lagi Besok!"
}

2) GET localhost:5000/api/gacha/prizes = Parameter ini digunakan untuk menampilkan hadiah dan kuota hadiah tersisa dari setiap undian yang sudah dilakukan user. 
Contoh :
[
	{
		"name": "Emas 10 gram",
		"remainingQuota": 1
	},
	{
		"name": "Smartphone X",
		"remainingQuota": 4
	},
	{
		"name": "Smartwatch Y",
		"remainingQuota": 7
	},
	{
		"name": "Voucher Rp100.000",
		"remainingQuota": 98
	},
	{
		"name": "Pulsa Rp50.000",
		"remainingQuota": 498
	}
]

3) GET localhost:5000/api/gacha/history/:userID = Parameter ini digunakan untuk menampilkan history dan hadiah yang dimenangkan dari setiap user jika sudah melakukan gacha, baik berhasil maupun gagal.
Contoh :
[
	{
		"_id": "69e1d0e40c48a8b93d3ca388",
		"userId": "69d5ca6eec2ade0f048db1bb",
		"reward": null,
		"createdAt": "2026-04-17T06:19:16.377Z",
		"__v": 0
	},
	{
		"_id": "69e1d0e80c48a8b93d3ca38c",
		"userId": "69d5ca6eec2ade0f048db1bb",
		"reward": null,
		"createdAt": "2026-04-17T06:19:20.626Z",
		"__v": 0
	},
	{
		"_id": "69e1d0ed0c48a8b93d3ca391",
		"userId": "69d5ca6eec2ade0f048db1bb",
		"reward": "Pulsa Rp50.000",
		"createdAt": "2026-04-17T06:19:25.386Z",
		"__v": 0
	},
	{
		"_id": "69e1d0f20c48a8b93d3ca395",
		"userId": "69d5ca6eec2ade0f048db1bb",
		"reward": null,
		"createdAt": "2026-04-17T06:19:30.681Z",
		"__v": 0
	},
	{
		"_id": "69e1d0f60c48a8b93d3ca39a",
		"userId": "69d5ca6eec2ade0f048db1bb",
		"reward": "Voucher Rp100.000",
		"createdAt": "2026-04-17T06:19:34.758Z",
		"__v": 0
	}
]

4) GET localhost:5000/api/gacha/winners = Parameter ini berfungsi untuk menampilkan daftar user yang memenangkan gacha, dimana nama setiap user disamarkan.
Contoh :
[
	{
		"name": "J*** D*e",
		"reward": "Smartwatch Y"
	},
	{
		"name": "*a** *oe",
		"reward": "Smartwatch Y"
	},
	{
		"name": "*a** Do*",
		"reward": "Smartwatch Y"
	},
	{
		"name": "**ch*el",
		"reward": "Pulsa Rp50.000"
	},
	{
		"name": "*i****l",
		"reward": "Smartphone X"
	},
	{
		"name": "*i*h***",
		"reward": "Voucher Rp100.000"
	},
	{
		"name": "***",
		"reward": "Pulsa Rp50.000"
	},
	{
		"name": "**C",
		"reward": "Voucher Rp100.000"
	}
]
