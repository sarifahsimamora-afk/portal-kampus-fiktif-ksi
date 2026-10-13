// PORTAL KAMPUS FIKTIF - LAB LATIHAN KSI. SENGAJA RENTAN. JALANKAN LOKAL/DOCKER SAJA.
const express=require('express'),Database=require('better-sqlite3'),multer=require('multer'),cp=require('cookie-parser');
const app=express(),db=new Database(':memory:'),S={};let sidCounter=1000;
app.use(express.urlencoded({extended:false}));app.use(cp());
app.use('/uploads',express.static(__dirname+'/uploads'));
const up=multer({storage:multer.diskStorage({destination:'uploads',filename:(r,f,cb)=>cb(null,f.originalname)})}); // [V6] tanpa validasi berkas
db.exec(`CREATE TABLE users(id INTEGER PRIMARY KEY,username,password,role,name);
CREATE TABLE grades(id INTEGER PRIMARY KEY,student_id INTEGER,course TEXT,score INTEGER);
CREATE TABLE posts(id INTEGER PRIMARY KEY,author,body);
CREATE TABLE uploads(id INTEGER PRIMARY KEY,student_id INTEGER,filename TEXT);`);
[['admin_lab','admin123','admin','Admin Fiktif Lintang'],['dosen_raka','dosen123','dosen','Dr. Raka Pratama (fiktif)'],
 ['mhs_nala','nala123','mahasiswa','Nala Safira (fiktif)'],['mhs_dirga','dirga123','mahasiswa','Dirga Wicaksana (fiktif)']]
 .forEach(u=>db.prepare('INSERT INTO users(username,password,role,name) VALUES(?,?,?,?)').run(...u));
[[3,'Basis Data',88],[3,'Jaringan Komputer',79],[3,'Keamanan Sistem Informasi',92],[4,'Basis Data',65],[4,'Jaringan Komputer',91]]
 .forEach(g=>db.prepare('INSERT INTO grades(student_id,course,score) VALUES(?,?,?)').run(...g));
db.prepare('INSERT INTO posts(author,body) VALUES(?,?)').run('Dr. Raka Pratama (fiktif)','Selamat datang di forum diskusi. Silakan bertanya seputar materi.');

const CSS=`*{box-sizing:border-box}body{margin:0;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;background:#f1f5f9;color:#0f172a}
a{text-decoration:none;color:inherit}
.top{background:linear-gradient(120deg,#4338ca,#7c3aed 60%,#db2777);color:#fff;padding:0 28px;display:flex;align-items:center;gap:24px;height:64px;box-shadow:0 4px 18px rgba(79,70,229,.35);position:sticky;top:0;z-index:5}
.brand{font-weight:800;font-size:19px;letter-spacing:.3px}.brand small{display:block;font-size:10px;font-weight:500;opacity:.8;letter-spacing:1.5px}
.nav{display:flex;gap:6px;flex:1}.nav a{padding:8px 14px;border-radius:10px;font-size:14px;opacity:.85;transition:.2s}.nav a:hover{background:rgba(255,255,255,.15);opacity:1}.nav a.on{background:rgba(255,255,255,.22);opacity:1;font-weight:600}
.me{display:flex;align-items:center;gap:10px;font-size:13px}.av{width:36px;height:36px;border-radius:50%;background:#fff;color:#4338ca;display:grid;place-items:center;font-weight:800}
.out{background:rgba(255,255,255,.18);padding:7px 12px;border-radius:9px;font-size:13px}.out:hover{background:rgba(255,255,255,.3)}
.wrap{max-width:1120px;margin:28px auto;padding:0 20px}h1{font-size:26px;margin:0 0 4px}.sub{color:#64748b;margin:0 0 22px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:22px}
.stat{background:#fff;border-radius:16px;padding:20px;box-shadow:0 2px 10px rgba(15,23,42,.06);border-top:4px solid var(--c)}
.stat b{font-size:30px;display:block}.stat span{color:#64748b;font-size:13px}
.card{background:#fff;border-radius:16px;padding:24px;box-shadow:0 2px 10px rgba(15,23,42,.06);margin-bottom:20px}.card h3{margin:0 0 14px}
table{width:100%;border-collapse:collapse}th{text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.8px;color:#64748b;padding:10px;border-bottom:2px solid #e2e8f0}td{padding:12px 10px;border-bottom:1px solid #f1f5f9}
.bar{height:8px;background:#e2e8f0;border-radius:99px;overflow:hidden;min-width:120px}.bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#6366f1,#ec4899)}
.badge{padding:3px 10px;border-radius:99px;font-size:12px;font-weight:600}.mahasiswa{background:#dbeafe;color:#1d4ed8}.dosen{background:#dcfce7;color:#15803d}.admin{background:#fce7f3;color:#be185d}
input,select{padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:10px;font-size:14px;outline:none;transition:.2s;font-family:inherit}input:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.2)}
button{background:linear-gradient(120deg,#4f46e5,#7c3aed);color:#fff;border:0;padding:10px 20px;border-radius:10px;font-weight:600;cursor:pointer;font-size:14px;transition:.2s}button:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(79,70,229,.4)}
.row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}.drop{border:2px dashed #a5b4fc;background:#eef2ff;border-radius:14px;padding:26px;text-align:center}
.file{display:flex;align-items:center;gap:10px;padding:10px 14px;background:#f8fafc;border-radius:10px;margin-top:8px}
.msg{display:flex;gap:12px;margin-bottom:14px}.msg .av{background:#e0e7ff;flex:none}.bub{background:#f1f5f9;padding:10px 16px;border-radius:4px 16px 16px 16px}.bub b{display:block;font-size:13px;color:#4338ca}
.err{background:#fee2e2;color:#b91c1c;padding:12px 16px;border-radius:10px;margin-bottom:14px;font-size:14px}
.foot{text-align:center;color:#94a3b8;font-size:12px;padding:20px}
.login{min-height:100vh;display:grid;grid-template-columns:1.1fr 1fr}.hero{background:linear-gradient(135deg,#312e81,#6d28d9 55%,#be185d);color:#fff;padding:60px;display:flex;flex-direction:column;justify-content:center}
.hero h1{font-size:42px;line-height:1.15}.hero p{opacity:.85;max-width:420px;line-height:1.6}.pill{display:inline-block;margin:6px 6px 0 0;padding:6px 14px;background:rgba(255,255,255,.16);border-radius:99px;font-size:13px}
.form{display:grid;place-items:center;padding:40px}.form .card{width:100%;max-width:380px;padding:34px}.form input{width:100%;margin-bottom:14px}.form button{width:100%;padding:12px}
.hero2{position:relative;overflow:hidden;border-radius:24px;padding:34px 38px;color:#fff;background:linear-gradient(120deg,#4338ca,#7c3aed 55%,#db2777);box-shadow:0 18px 40px rgba(124,58,237,.35);margin-bottom:24px;animation:up .6s both}
.hero2:before,.hero2:after{content:'';position:absolute;border-radius:50%;background:rgba(255,255,255,.12)}.hero2:before{width:260px;height:260px;right:-60px;top:-90px}.hero2:after{width:160px;height:160px;right:140px;bottom:-90px}
.hero2 h1{font-size:30px;margin:0 0 6px;position:relative}.hero2 p{margin:0 0 18px;opacity:.9;position:relative}.hero2 .btns{position:relative;display:flex;gap:10px;flex-wrap:wrap}
.btn2{background:#fff;color:#4338ca;padding:10px 18px;border-radius:12px;font-weight:700;font-size:14px;transition:.2s}.btn2:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(0,0,0,.2)}.btn2.g{background:rgba(255,255,255,.18);color:#fff}
.stat{position:relative;animation:up .6s both;transition:.25s}.stat:hover{transform:translateY(-5px);box-shadow:0 14px 28px rgba(15,23,42,.12)}.stat .ic{position:absolute;right:16px;top:14px;font-size:26px;opacity:.9}
.two{display:grid;grid-template-columns:1.5fr 1fr;gap:20px}.card{animation:up .7s both}
.ann{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #f1f5f9}.ann:last-child{border:0}.dot{width:10px;height:10px;border-radius:50%;margin-top:6px;flex:none;background:var(--c)}.ann b{font-size:14px;display:block}.ann span{font-size:12px;color:#64748b}
.jd{display:flex;align-items:center;gap:14px;padding:12px 14px;border-radius:12px;background:#f8fafc;margin-bottom:10px;border-left:4px solid var(--c)}.jd .t{font-weight:700;font-size:13px;color:#4338ca;min-width:92px}.jd small{display:block;color:#64748b}
.gr{margin-bottom:14px}.gr .h{display:flex;justify-content:space-between;font-size:14px;margin-bottom:6px}
.drop input[type=file]{padding:10px;background:#fff;border:1.5px dashed #a5b4fc;width:100%}.drop input::file-selector-button{background:#4f46e5;color:#fff;border:0;padding:8px 14px;border-radius:8px;margin-right:12px;cursor:pointer}
@keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.grid .stat:nth-child(2){animation-delay:.1s}.grid .stat:nth-child(3){animation-delay:.2s}.grid .stat:nth-child(4){animation-delay:.3s}
@media(max-width:800px){.two{grid-template-columns:1fr}}
@media(max-width:800px){.login{grid-template-columns:1fr}.hero{padding:36px}.nav{overflow:auto}}`;
const esc=s=>String(s);
const init=n=>n.split(' ').map(w=>w[0]).slice(0,2).join('');
const layout=(on,body,u)=>`<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>SIAKAD Nusantara - Portal Kampus Fiktif</title><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel=stylesheet><style>${CSS}</style>
<div class=top><div class=brand>SIAKAD NUSANTARA<small>PORTAL KAMPUS FIKTIF</small></div>
<div class=nav>${[['/','Beranda'],['/grades','Nilai'],['/forum','Diskusi']].concat(u.role==='admin'?[['/admin','Kelola Akun']]:[]).map(([h,t])=>`<a href=${h} class="${on===h?'on':''}">${t}</a>`).join('')}</div>
<div class=me><div class=av>${init(u.name)}</div><div><b>${u.name}</b><br><span class="badge ${u.role}">${u.role}</span></div><a class=out href=/logout>Keluar</a></div></div>
<div class=wrap>${body}</div><div class=foot>Lab KSI M5-M6 | Seluruh akun dan data bersifat sintetis | Aplikasi sengaja rentan, jangan dipublikasikan dengan data asli</div>`;
const loginPage=(err)=>`<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Masuk - SIAKAD Nusantara</title><style>${CSS}</style>
<div class=login><div class=hero><div><span class=pill>Lab Keamanan Sistem Informasi</span></div><h1>Portal Akademik<br>Kampus Nusantara</h1>
<p>Lihat nilai, kumpulkan tugas, dan berdiskusi dengan dosen dan teman sekelas dalam satu tempat. Seluruh data di sini fiktif untuk latihan.</p>
<div><span class=pill>Nilai</span><span class=pill>Tugas</span><span class=pill>Forum</span><span class=pill>Admin</span></div></div>
<div class=form><div class=card><h1 style="font-size:24px">Selamat datang</h1><p class=sub>Masuk untuk melanjutkan</p>${err?`<div class=err>${err}</div>`:''}
<form method=post action=/login><label>Username</label><input name=u placeholder="mhs_nala"><label>Kata sandi</label><input name=p type=password placeholder="••••••••"><button>Masuk</button></form>
<p class=sub style="font-size:12px;margin:16px 0 0">Akun demo: mhs_nala / nala123</p></div></div></div>`;
const me=(req,res)=>{const u=S[req.cookies.sid];if(!u)res.redirect('/');return u};

app.get('/',(req,res)=>{const u=S[req.cookies.sid];if(!u)return res.send(loginPage());
 const avg=db.prepare('SELECT AVG(score) a,COUNT(*) n FROM grades WHERE student_id=?').get(u.id);
 const gr=db.prepare('SELECT * FROM grades WHERE student_id=?').all(u.id);
 const files=db.prepare('SELECT * FROM uploads WHERE student_id=?').all(u.id);
 const np=db.prepare('SELECT COUNT(*) n FROM posts').get().n;
 const hari=new Date().toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
 const ipk=avg.a?(avg.a/25).toFixed(2):'-';
 res.send(layout('/',`<div class=hero2><h1>Halo, ${u.name.split(' ')[0]} 👋</h1><p>${hari} | Semester Ganjil 2026/2027</p>
 <div class=btns><a class=btn2 href=/grades>Lihat nilai</a><a class="btn2 g" href=/forum>Buka diskusi</a></div></div>
 <div class=grid>
 <div class=stat style="--c:#6366f1"><span class=ic>📚</span><b data-n="${avg.n}">0</b><span>Mata kuliah bernilai</span></div>
 <div class=stat style="--c:#ec4899"><span class=ic>⭐</span><b>${ipk}</b><span>Indeks prestasi (estimasi)</span></div>
 <div class=stat style="--c:#10b981"><span class=ic>📤</span><b data-n="${files.length}">0</b><span>Tugas terunggah</span></div>
 <div class=stat style="--c:#f59e0b"><span class=ic>💬</span><b data-n="${np}">0</b><span>Pesan di forum</span></div></div>
 <div class=two><div>
  <div class=card><h3>📈 Nilai terbaru</h3>${gr.map(g=>`<div class=gr><div class=h><span>${g.course}</span><b>${g.score}</b></div><div class=bar><i style="width:${g.score}%"></i></div></div>`).join('')||'<p class=sub>Belum ada nilai.</p>'}</div>
  <div class=card><h3>🗓️ Jadwal hari ini</h3>
   <div class=jd style="--c:#6366f1"><div class=t>08.00 - 09.40</div><div><b>Basis Data</b><small>Lab Komputer 2</small></div></div>
   <div class=jd style="--c:#ec4899"><div class=t>10.00 - 11.40</div><div><b>Keamanan Sistem Informasi</b><small>Ruang B.204</small></div></div>
   <div class=jd style="--c:#10b981"><div class=t>13.00 - 14.40</div><div><b>Jaringan Komputer</b><small>Lab Jaringan</small></div></div></div>
 </div><div>
  <div class=card><h3>📢 Pengumuman</h3>
   <div class=ann style="--c:#ef4444"><i class=dot></i><div><b>Batas unggah tugas M5-M6</b><span>Jumat, 23.59 WIB</span></div></div>
   <div class=ann style="--c:#6366f1"><i class=dot></i><div><b>Kuis KSI minggu depan</b><span>Materi keamanan aplikasi web</span></div></div>
   <div class=ann style="--c:#10b981"><i class=dot></i><div><b>Forum diskusi dibuka</b><span>Tanya dosen langsung</span></div></div></div>
  <div class=card><h3>📁 Unggah tugas</h3><form method=post action=/upload enctype=multipart/form-data><div class=drop><input type=file name=f><br><br><button>Unggah tugas</button></div></form>
   ${files.map(x=>`<div class=file>📄 <a href=/uploads/${x.filename}>${x.filename}</a></div>`).join('')}</div>
 </div></div>
 <script>document.querySelectorAll('[data-n]').forEach(e=>{let t=+e.dataset.n,i=0;if(!t){e.textContent=0;return}const k=setInterval(()=>{e.textContent=++i;if(i>=t)clearInterval(k)},120)})</script>`,u))});

app.post('/login',(req,res)=>{ // [V1] SQL injection; [V5] tanpa batas percobaan
 let r;try{r=db.prepare(`SELECT * FROM users WHERE username='${req.body.u}' AND password='${req.body.p}'`).get()}catch(e){return res.send(loginPage('Error: '+e.message))}
 if(!r)return res.send(loginPage('Username atau kata sandi salah.'));
 const sid=String(++sidCounter);S[sid]=r;res.cookie('sid',sid);res.redirect('/')});
app.get('/logout',(req,res)=>{res.clearCookie('sid');res.redirect('/')}); // [V7] sesi tetap hidup di server

app.get('/grades',(req,res)=>{const u=me(req,res);if(!u)return;
 const sid=req.query.student_id||u.id; // [V3] IDOR
 const rows=db.prepare('SELECT * FROM grades WHERE student_id=?').all(sid);
 const L=s=>s>=85?'A':s>=75?'B':s>=65?'C':'D';
 res.send(layout('/grades',`<h1>Nilai Akademik</h1><p class=sub>Menampilkan nilai untuk student_id=${sid}</p>
 <div class=card><table><tr><th>Mata kuliah</th><th>Nilai</th><th>Capaian</th><th>Huruf</th></tr>
 ${rows.map(g=>`<tr><td>${g.course}</td><td><b>${g.score}</b></td><td><div class=bar><i style="width:${g.score}%"></i></div></td><td><span class="badge dosen">${L(g.score)}</span></td></tr>`).join('')||'<tr><td colspan=4>Belum ada nilai.</td></tr>'}</table></div>
 ${u.role==='dosen'?`<div class=card><h3>Input nilai (dosen)</h3><form method=post action=/grades class=row><select name=sid>${db.prepare("SELECT id,name FROM users WHERE role='mahasiswa'").all().map(m=>`<option value=${m.id}>${m.name} (ID ${m.id})</option>`).join('')}</select><input name=c placeholder="Mata kuliah"><input name=s placeholder="Nilai" size=6><button>Simpan nilai</button></form></div>`:''}`,u))});
app.post('/grades',(req,res)=>{const u=me(req,res);if(!u)return; // [V4] CSRF: tanpa token
 if(u.role!=='dosen')return res.status(403).send('Hanya dosen');
 db.prepare('INSERT INTO grades(student_id,course,score) VALUES(?,?,?)').run(req.body.sid,req.body.c,req.body.s);res.redirect('/grades?student_id='+req.body.sid)});

app.get('/forum',(req,res)=>{const u=me(req,res);if(!u)return; // [V2] Stored XSS: body tanpa escape
 res.send(layout('/forum',`<h1>Forum Diskusi</h1><p class=sub>Bertanya dan berbagi dengan sivitas kampus.</p>
 <div class=card><form method=post action=/forum class=row><input name=b style="flex:1;min-width:220px" placeholder="Tulis pesan..."><button>Kirim</button></form></div>
 <div class=card>${db.prepare('SELECT * FROM posts').all().map(p=>`<div class=msg><div class=av>${init(p.author)}</div><div class=bub><b>${p.author}</b>${p.body}</div></div>`).join('')}</div>`,u))});
app.post('/forum',(req,res)=>{const u=me(req,res);if(!u)return;db.prepare('INSERT INTO posts(author,body) VALUES(?,?)').run(u.name,req.body.b);res.redirect('/forum')});
app.post('/upload',up.single('f'),(req,res)=>{const u=me(req,res);if(!u)return;if(req.file)db.prepare('INSERT INTO uploads(student_id,filename) VALUES(?,?)').run(u.id,req.file.originalname);res.redirect('/')});

app.get('/admin',(req,res)=>{const u=me(req,res);if(!u)return;if(u.role!=='admin')return res.status(403).send(layout('',`<div class=card><h3>Akses ditolak</h3>Halaman ini khusus admin.</div>`,u));
 res.send(layout('/admin',`<h1>Kelola Akun</h1><p class=sub>Atur peran pengguna portal.</p>
 <div class=card><table><tr><th>ID</th><th>Username</th><th>Peran</th><th>Aksi</th></tr>${db.prepare('SELECT id,username,role FROM users').all().map(x=>`<tr><td>${x.id}</td><td>${x.username}</td><td><span class="badge ${x.role}">${x.role}</span></td><td><form method=post action=/admin/del style="margin:0"><input type=hidden name=id value=${x.id}><button style="padding:5px 12px;background:#ef4444">Hapus</button></form></td></tr>`).join('')}</table></div>
 <div class=card><h3>Tambah akun</h3><form method=post action=/admin/add class=row><input name=name placeholder="Nama lengkap (fiktif)"><input name=username placeholder="Username"><input name=password placeholder="Sandi"><select name=role><option>mahasiswa<option>dosen<option>admin</select><button>Tambah</button></form></div>
 <div class=card><h3>Ubah peran</h3><form method=post action=/admin/role class=row><input name=id placeholder="ID akun" size=8><select name=role><option>mahasiswa<option>dosen<option>admin</select><button>Simpan</button></form></div>`,u))});
app.post('/admin/add',(req,res)=>{const u=me(req,res);if(!u)return;if(u.role!=='admin')return res.status(403).send('Hanya admin');
 db.prepare('INSERT INTO users(username,password,role,name) VALUES(?,?,?,?)').run(req.body.username,req.body.password,req.body.role,req.body.name);res.redirect('/admin')});
app.post('/admin/del',(req,res)=>{const u=me(req,res);if(!u)return;if(u.role!=='admin')return res.status(403).send('Hanya admin');
 db.prepare('DELETE FROM users WHERE id=? AND id<>?').run(req.body.id,u.id);res.redirect('/admin')});
app.post('/admin/role',(req,res)=>{if(!me(req,res))return; // [V8] eskalasi hak akses
 db.prepare('UPDATE users SET role=? WHERE id=?').run(req.body.role,req.body.id);res.redirect('/')});
app.listen(process.env.PORT||3000,()=>console.log('Lab jalan di port 3000'));
