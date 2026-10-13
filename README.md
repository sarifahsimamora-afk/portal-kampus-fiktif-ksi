# Portal Kampus Fiktif (Lab KSI M5-M6)
Aplikasi SENGAJA rentan untuk latihan. Seluruh akun/data sintetis. Jalankan hanya lokal/Docker/jaringan terisolasi, jangan isi data asli.

Jalankan: `npm install && npm start` -> http://localhost:3000

Akun: admin_lab/admin123, dosen_raka/dosen123, mhs_nala/nala123, mhs_dirga/dirga123

| Kode | Kerentanan | Lokasi | Cara uji (di lab sendiri) |
|---|---|---|---|
| V1 | SQL injection | POST /login (query konkatenasi) | username `admin_lab'--` |
| V2 | Stored XSS | /forum (tanpa escape) | kirim `<b>uji</b>` lalu lihat dirender sebagai HTML |
| V3 | IDOR | /grades?student_id= | login mhs_nala, ubah student_id=4 |
| V4 | CSRF | POST /grades (tanpa token) | form dari halaman lain |
| V5 | Percobaan sandi tanpa batas | POST /login | tidak ada rate limit |
| V6 | Validasi berkas lemah | POST /upload | tipe/ekstensi tidak dicek |
| V7 | Sesi aktif setelah logout | /logout | sid lama tetap valid di server |
| V8 | Eskalasi hak akses | POST /admin/role | tidak cek role admin |

Perbaikan: prepared statement, escape output, cek kepemilikan, token CSRF, rate limit, whitelist berkas, hapus sesi saat logout, cek role di server.

## Deploy (Render, Web Service)
1. Push repo ke GitHub (publik). `.gitignore` sudah menyiapkan `node_modules/` dan `uploads/*`.
2. Render > New > Web Service > pilih repo.
3. Runtime: Node. Build Command: `npm install`. Start Command: `npm start`. (Atau pilih Docker, Dockerfile sudah tersedia.)
4. Setelah live, salin URL `https://nama-app.onrender.com` ke kolom Link URL di form.
Catatan: aplikasi sengaja rentan dan datanya in-memory (reset tiap restart). Matikan service setelah penilaian.
