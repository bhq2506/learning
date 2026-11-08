/* Manajemen Strategi ITS — diagram SVG bersama (digambar ulang & diadaptasi dari David & David, 2023).
   Pemakaian: <div class="dgm" data-dgm="model" data-ch="7"></div>, lalu SMD.renderAll(). */
(function(){
"use strict";
var NS="http://www.w3.org/2000/svg";
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var FONT='font-family="Plus Jakarta Sans,Segoe UI,system-ui,sans-serif"';
function svgOpen(w,h,label){return '<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+esc(label)+'" style="width:100%;height:auto;display:block">'+
 '<defs><marker id="ar'+uid+'" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--muted)"/></marker></defs>'}
var uid=0;
function arrowId(){return "ar"+uid}
/* kotak dengan teks multi-baris */
function box(x,y,w,h,lines,o){
  o=o||{};var fill=o.fill||"var(--surface)",stroke=o.stroke||"var(--line)",sw=o.sw||1.5,fs=o.fs||12,fw=o.fw||600,col=o.col||"var(--ink)",r=o.r==null?9:o.r;
  if(typeof lines==="string")lines=lines.split("\n");
  var g='<g'+(o.id?' data-k="'+o.id+'" style="cursor:pointer" tabindex="0" role="button" aria-label="'+esc(lines.join(" "))+'"':'')+'>';
  g+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" style="fill:'+fill+';stroke:'+stroke+';stroke-width:'+sw+'"/>';
  var lh=fs*1.25,y0=y+h/2-(lines.length-1)*lh/2+fs*0.35;
  lines.forEach(function(t,i){g+='<text x="'+(x+w/2)+'" y="'+(y0+i*lh)+'" text-anchor="middle" '+FONT+' font-size="'+fs+'" font-weight="'+(i===0&&o.bold1?800:fw)+'" style="fill:'+col+'">'+esc(t)+'</text>'});
  return g+'</g>';
}
function line(x1,y1,x2,y2,o){o=o||{};return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" style="stroke:'+(o.c||"var(--muted)")+';stroke-width:'+(o.w||1.6)+'"'+(o.dash?' stroke-dasharray="'+o.dash+'"':'')+(o.arrow?' marker-end="url(#'+arrowId()+')"':'')+'/>'}
function path(d,o){o=o||{};return '<path d="'+d+'" style="fill:none;stroke:'+(o.c||"var(--muted)")+';stroke-width:'+(o.w||1.6)+'"'+(o.dash?' stroke-dasharray="'+o.dash+'"':'')+(o.arrow?' marker-end="url(#'+arrowId()+')"':'')+'/>'}
function text(x,y,t,o){o=o||{};return '<text x="'+x+'" y="'+y+'" text-anchor="'+(o.a||"middle")+'" '+FONT+' font-size="'+(o.fs||11)+'" font-weight="'+(o.fw||600)+'" style="fill:'+(o.c||"var(--muted)")+'">'+esc(t)+'</text>'}
function wide(el){return (el.clientWidth||el.parentNode.clientWidth||700)>=560}

/* ============ 1. Model komprehensif (Gambar 7-1 / 8-1) ============ */
var STAGES={
 c2:{t:"Visi & Misi\nBisnis\nBab 2",ph:"F",d:"Menetapkan ke mana organisasi ingin menuju (visi) dan mengapa ia ada (misi). Menjadi acuan semua tahap berikutnya."},
 c3:{t:"Analisis\nEksternal\nBab 3",ph:"F",d:"Mengidentifikasi peluang dan ancaman dari lingkungan (ekonomi, sosial, politik, teknologi, pesaing), dirangkum dalam matriks EFE dan CPM."},
 c4:{t:"Analisis\nInternal\nBab 4",ph:"F",d:"Mengidentifikasi kekuatan dan kelemahan fungsi bisnis, termasuk analisis rasio keuangan, dirangkum dalam matriks IFE."},
 c5:{t:"Strategi\ndalam Aksi\nBab 5",ph:"F",d:"Jenis-jenis strategi: integrasi, intensif (penetrasi, pengembangan pasar dan produk), diversifikasi, defensif, serta strategi generik Porter."},
 c6:{t:"Analisis &\nPilihan Strategi\nBab 6",ph:"F",d:"Memilih strategi dengan kerangka tiga tahap: input (EFE, IFE, CPM), pencocokan (SWOT, SPACE, BCG, IE, Grand Strategy), dan keputusan (QSPM)."},
 c7:{t:"Implementasi:\nManajemen &\nPemasaran\nBab 7",ph:"I",d:"Sasaran tahunan, kebijakan, alokasi sumber daya, struktur dan bagan organisasi, isu operasi, SDM, serta segmentasi dan positioning.",href:"../ch07/"},
 c8:{t:"Implementasi:\nKeuangan &\nAkuntansi\nBab 8",ph:"I",d:"Struktur modal (EPS/EBIT), laporan keuangan proyeksi, valuasi perusahaan, rasio keuangan, IPO, kas, dan obligasi.",href:"../ch08/"},
 c9:{t:"Evaluasi\nStrategi &\nTata Kelola\nBab 9",ph:"E",d:"Meninjau dasar strategi, mengukur kinerja (termasuk balanced scorecard), dan mengambil tindakan korektif; peran dewan dalam tata kelola."},
 c10:{t:"Bab 10: Etika Bisnis, Keberlanjutan Lingkungan, dan Tanggung Jawab Sosial",ph:"X",d:"Etika, keberlanjutan, dan CSR melingkupi seluruh tahap proses manajemen strategis, bukan tahap terpisah."},
 c11:{t:"Bab 11: Isu Global dan Internasional",ph:"X",d:"Perbedaan budaya, hukum, mata uang, dan pasar global memengaruhi setiap tahap, dari analisis hingga evaluasi."},
 fb:{t:"Umpan balik",ph:"X",d:"Garis umpan balik menunjukkan bahwa proses manajemen strategis berlangsung terus-menerus: hasil evaluasi dan perubahan di satu tahap dapat mengubah tahap lain."}
};
var PH={F:"Formulasi strategi",I:"Implementasi strategi",E:"Evaluasi strategi",X:"Melingkupi semua tahap"};
function model(el){
  var ch="c"+(el.dataset.ch||"7"),sel=el._sel||ch,W=wide(el);
  function st(k){var s=STAGES[k],cur=k===ch,on=k===sel;return {fill:cur?"var(--gold-soft)":(s.ph==="I"?"var(--navy-soft)":"var(--surface)"),stroke:on?"var(--navy)":(cur?"var(--gold)":"var(--line)"),sw:on||cur?3:1.5,fs:W?11.5:11,id:k,bold1:false}}
  var g;
  if(W){
    g=svgOpen(780,440,"Model manajemen strategis komprehensif");
    g+=box(110,6,560,30,STAGES.c10.t,Object.assign(st("c10"),{fill:"var(--sunk)",fs:11}));
    g+='<rect x="60" y="58" width="668" height="288" rx="4" style="fill:none;stroke:var(--muted);stroke-width:2"/>';
    g+='<g data-k="fb" style="cursor:pointer">'+text(394,80,"⟲ Umpan balik",{fs:12,c:sel==="fb"?"var(--navy)":"var(--muted)",fw:800})+'</g>';
    [150,250,358,466,574].forEach(function(x){g+=line(x+30,36,x+30,56,{arrow:1});g+=line(x+30,366,x+30,348,{arrow:1})});
    g+=line(183,144,183,262,{w:1.4});
    g+=line(110,207,248,207,{arrow:1});g+=line(342,207,356,207,{arrow:1});g+=line(450,207,464,207,{arrow:1});g+=line(558,207,572,207,{arrow:1});g+=line(666,207,680,207,{arrow:1});
    g+=line(60,230,60,248,{});
    g+=box(8,166,100,82,STAGES.c2.t,st("c2"));
    g+=box(135,70,96,74,STAGES.c3.t,st("c3"));
    g+=box(135,262,96,74,STAGES.c4.t,st("c4"));
    g+=box(250,166,92,82,STAGES.c5.t,st("c5"));
    g+=box(358,166,92,82,STAGES.c6.t,st("c6"));
    g+=box(466,160,92,94,STAGES.c7.t,st("c7"));
    g+=box(574,160,92,94,STAGES.c8.t,st("c8"));
    g+=box(682,160,94,94,STAGES.c9.t,st("c9"));
    g+=box(110,366,560,30,STAGES.c11.t,Object.assign(st("c11"),{fill:"var(--sunk)",fs:11}));
    function br(x1,x2,t){return line(x1,410,x2,410,{w:1.4})+line(x1,404,x1,416,{w:1.4})+line(x2,404,x2,416,{w:1.4})+text((x1+x2)/2,432,t,{fs:11.5,c:"var(--ink)",fw:700})}
    g+=br(8,460,"Formulasi strategi")+br(466,666,"Implementasi strategi")+br(682,776,"Evaluasi");
  }else{
    var bw=150,cx=180,y=0,rows=[];g="";
    var H=900;
    var s=svgOpen(360,H,"Model manajemen strategis komprehensif");
    function vb(k,yy,x,w,h){return box(x,yy,w,h,STAGES[k].t.replace(/\n(Bab \d+)/,"  $1"),st(k))}
    g+=box(10,0,340,40,"Bab 10: Etika, Keberlanjutan & CSR",Object.assign(st("c10"),{fill:"var(--sunk)"}));
    y=56;g+=vb("c2",y,cx-bw/2,bw,62);y+=62;g+=line(cx,y,cx,y+16,{arrow:1});y+=18;
    g+=vb("c3",y,30,140,62)+vb("c4",y,190,140,62);g+=text(180,y+36,"+",{fs:16});y+=62;g+=line(cx,y,cx,y+16,{arrow:1});y+=18;
    ["c5","c6","c7","c8","c9"].forEach(function(k,i){var h=(k==="c5"||k==="c6")?62:76;g+=vb(k,y,cx-bw/2,bw,h);y+=h;if(i<4){g+=line(cx,y,cx,y+16,{arrow:1});y+=18}});
    g+=path("M"+(cx+bw/2)+","+(y-38)+" H 345 V 80 H "+(cx+bw/2),{arrow:1,dash:"5 4"});
    g+='<g data-k="fb" style="cursor:pointer">'+text(338,y/2+40,"umpan balik",{fs:10,a:"end"})+'</g>';
    y+=14;g+=box(10,y,340,40,"Bab 11: Isu Global & Internasional",Object.assign(st("c11"),{fill:"var(--sunk)"}));y+=52;
    g+=text(180,y+10,"Formulasi: Bab 2–6 · Implementasi: Bab 7–8 · Evaluasi: Bab 9",{fs:10.5,c:"var(--ink)"});y+=24;
    g=s.replace('viewBox="0 0 360 '+H+'"','viewBox="0 0 360 '+y+'"')+g;
  }
  g+='</svg>';
  var S=STAGES[sel];
  var info='<div class="dgm-info"><b>'+esc(S.t.replace(/\n/g," "))+'</b> <span class="tag">'+PH[S.ph]+'</span><p>'+esc(S.d)+'</p>'+(S.href&&sel!==ch?'<a href="'+S.href+'">Buka materi '+esc(S.t.match(/Bab \d+/)[0])+' →</a>':(sel===ch?'<span class="hint" style="margin:0">Anda sedang mempelajari tahap ini.</span>':''))+'</div>';
  el.innerHTML=g+'<p class="dgm-cap">Diadaptasi dari Gambar '+(ch==="c8"?"8-1":"7-1")+' (David &amp; David, 2023). Ketuk kotak untuk melihat penjelasan.</p>'+info;
  bindSel(el,function(k){el._sel=k;model(el)});
}
function bindSel(el,fn){Array.prototype.forEach.call(el.querySelectorAll("[data-k]"),function(n){n.addEventListener("click",function(){fn(n.getAttribute("data-k"))});n.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();fn(n.getAttribute("data-k"))}})})}

/* ============ 2. Siklus keunggulan bersaing (Gambar 7-13 / 8-3) ============ */
function cycle(el){
  var ch=el.dataset.ch||"7",W=wide(el);
  var nodes=[
   ["Tetapkan visi &\nmisi yang jelas"],
   ["Formulasi strategi:\nkumpulkan, analisis &\nprioritaskan data dengan\nmatriks; rencana jelas"],
   [ch==="8"?"Implementasi strategi:\nstruktur · sumber daya ·\nmotivasi & imbalan ·\npelanggan · KELOLA KEUANGAN":"Implementasi strategi:\nSTRUKTUR · SUMBER DAYA ·\nMOTIVASI & IMBALAN ·\nPELANGGAN · keuangan"],
   ["Evaluasi & pantau hasil:\ntindakan korektif;\nadaptasi pada perubahan"]
  ];
  var w=W?640:360,h=W?400:560,cx=w/2,cy=h/2,g=svgOpen(w,h,"Siklus meraih dan mempertahankan keunggulan bersaing");
  var bw=W?190:200,bh=W?80:84,pos=W?[[cx,58],[w-110,cy],[cx,h-58],[110,cy]]:[[cx,52],[cx,cy-92],[cx,h-52],[cx,cy+92]];
  if(W){g+=path("M"+(cx+bw/2)+",58 Q"+(w-110)+",58 "+(w-110)+","+(cy-bh/2-4),{arrow:1,w:2});g+=path("M"+(w-110)+","+(cy+bh/2)+" Q"+(w-110)+","+(h-58)+" "+(cx+bw/2+4)+","+(h-58),{arrow:1,w:2});g+=path("M"+(cx-bw/2)+","+(h-58)+" Q110,"+(h-58)+" 110,"+(cy+bh/2+4),{arrow:1,w:2});g+=path("M110,"+(cy-bh/2)+" Q110,58 "+(cx-bw/2-4)+",58",{arrow:1,w:2});
    g+='<circle cx="'+cx+'" cy="'+cy+'" r="70" style="fill:var(--navy);"/>';
    ["Raih &","pertahankan","keunggulan","bersaing"].forEach(function(t,i){g+=text(cx,cy-22+i*16,t,{fs:13,fw:800,c:"var(--navy-ink)"})});
  }else{
    // vertikal: lingkaran di tengah di antara node 2 dan 4
  }
  var order=W?[0,1,2,3]:[0,1,3,2];
  if(!W){var ys=[52,150,320,430];nodes.forEach(function(n,i){});}
  nodes.forEach(function(n,i){var p=pos[i],hl=i===2;g+=box(p[0]-bw/2,p[1]-bh/2,bw,bh,n[0],{fill:hl?"var(--gold-soft)":"var(--surface)",stroke:hl?"var(--gold)":"var(--line)",sw:hl?2.5:1.5,fs:11})});
  if(!W){g='';var yy=[10,120,250,360],hh=84;g=svgOpen(360,470,"Siklus meraih dan mempertahankan keunggulan bersaing");
    nodes.forEach(function(n,i){var hl=i===2;g+=box(20,yy[i],250,hh,n[0],{fill:hl?"var(--gold-soft)":"var(--surface)",stroke:hl?"var(--gold)":"var(--line)",sw:hl?2.5:1.5,fs:11});if(i<3)g+=line(145,yy[i]+hh,145,yy[i+1]-2,{arrow:1,w:2})});
    g+=path("M270,"+(yy[3]+hh/2)+" H 330 V "+(yy[0]+hh/2)+" H 272",{arrow:1,w:2});
    g+='<rect x="276" y="180" width="80" height="110" rx="10" style="fill:var(--navy)"/>';["Raih &","pertahan-","kan","keung-","gulan"].forEach(function(t,i){g+=text(316,206+i*16,t,{fs:11,fw:800,c:"var(--navy-ink)"})});
  }
  g+='</svg>';
  el.innerHTML=g+'<p class="dgm-cap">Diadaptasi dari Gambar '+(ch==="8"?"8-3":"7-13")+' (David &amp; David, 2023). Kotak yang disorot adalah fokus bab ini.</p>';
}

/* ============ 3. Hierarki sasaran Stamus (Gambar 7-3) ============ */
function aims(el){
  var W=wide(el),g;
  var top="Sasaran jangka panjang perusahaan:\nGandakan pendapatan dalam 2 tahun melalui\nmarket development & market penetration\n(pendapatan saat ini $2 juta)";
  var dv=[["Divisi I","Naikkan pendapatan 40%\ntahun ini & 40% tahun depan\n(saat ini $1 juta)"],["Divisi II","Naikkan pendapatan 40%\ntahun ini & 40% tahun depan\n(saat ini $0,5 juta)"],["Divisi III","Naikkan pendapatan 50%\ntahun ini & 50% tahun depan\n(saat ini $0,5 juta)"]];
  var fn=[["R&D","Kembangkan 2\nproduk baru yang\nberhasil dipasarkan"],["Produksi","Naikkan efisiensi\nproduksi 30%\ntahun ini"],["Pemasaran","Tambah 40\ntenaga penjual\ntahun ini"],["Keuangan","Peroleh pendanaan\njangka panjang\n$400.000 (6 bulan)"],["SDM","Turunkan absensi\ndari 10% ke 5%\ntahun ini"]];
  if(W){
    g=svgOpen(760,420,"Hierarki sasaran Stamus Company");
    g+=box(170,6,420,78,top,{fill:"var(--navy)",stroke:"var(--navy)",col:"var(--navy-ink)",fs:12,bold1:1});
    var dx=[20,275,530];dv.forEach(function(d,i){g+=line(380,84,dx[i]+105,130,{arrow:1});g+=box(dx[i],132,210,84,d[0]+"\n"+d[1],{fill:"var(--navy-soft)",stroke:"var(--navy)",fs:11.5,bold1:1})});
    g+=line(380,216,380,228,{dash:"4 3"})+text(380,244,"Sasaran tahunan fungsional (contoh untuk satu divisi)",{fs:11.5,c:"var(--ink)",fw:700});
    fn.forEach(function(f,i){var x=8+i*151;g+=line(380,252,x+70,284,{arrow:1,dash:"4 3"});g+=box(x,286,140,106,f[0]+"\n"+f[1],{fill:"var(--surface)",stroke:"var(--gold)",fs:11,bold1:1})});
  }else{
    var y=0;g="";var parts=[];
    g+=box(10,y,340,92,top.replace(/\n/g," ").replace("Sasaran jangka panjang perusahaan: ","Sasaran jangka panjang:\n").replace(/(.{1,40})(\s|$)/g,"$1\n").trim(),{fill:"var(--navy)",stroke:"var(--navy)",col:"var(--navy-ink)",fs:11});y=104;
    dv.forEach(function(d){g+=box(10,y,340,70,d[0]+"\n"+d[1].replace(/\n/g," "),{fill:"var(--navy-soft)",stroke:"var(--navy)",fs:11,bold1:1});y+=78});
    g+=text(180,y+12,"Sasaran fungsional (satu divisi)",{fs:11,c:"var(--ink)",fw:700});y+=22;
    fn.forEach(function(f,i){var x=i%2?185:10;g+=box(x,y,165,74,f[0]+"\n"+f[1],{stroke:"var(--gold)",fs:10.5,bold1:1});if(i%2||i===fn.length-1)y+=82});
    g=svgOpen(360,y,"Hierarki sasaran Stamus Company")+g;
  }
  el.innerHTML=g+'</svg><p class="dgm-cap">Diadaptasi dari Gambar 7-3 (David &amp; David, 2023). Sasaran mengalir dari perusahaan ke divisi lalu ke fungsi; setiap level harus konsisten secara vertikal dan horizontal.</p>';
}

/* ============ 4. Hierarki kebijakan (Tabel 7-3) ============ */
function policies(el){
  var T=[
   ["Strategi perusahaan","Akuisisi jaringan toko ritel untuk mencapai sasaran pertumbuhan penjualan dan profitabilitas.",["Semua toko buka 08.00–20.00, Senin–Sabtu.","Setiap toko menyumbang 5% pendapatan bulanan untuk iklan perusahaan."]],
   ["Sasaran divisi","Naikkan pendapatan divisi dari $10 juta (2020) menjadi $15 juta (2021).",["Setiap tenaga penjual wajib mengirim laporan aktivitas mingguan.","5% pendapatan kotor dikembalikan ke karyawan sebagai bonus akhir tahun."]],
   ["Sasaran departemen produksi","Naikkan produksi dari 20.000 unit (2020) menjadi 30.000 unit (2021).",["Karyawan boleh lembur hingga 20 jam per minggu.","Penghargaan $100 bagi karyawan yang tidak pernah absen setahun."]]
  ];
  var h='<div class="pol">';
  T.forEach(function(t,i){h+='<div class="pol-row" style="--lv:'+i+'"><div class="pol-obj"><small>'+t[0]+'</small>'+esc(t[1])+'</div><div class="pol-arrow" aria-hidden="true">◀ didukung oleh</div><div class="pol-pols">'+t[2].map(function(p){return '<span>📋 '+esc(p)+'</span>'}).join("")+'</div></div>'+(i<2?'<div class="pol-down" aria-hidden="true">▼ diturunkan menjadi</div>':'')});
  el.innerHTML=h+'</div><p class="dgm-cap">Diadaptasi dari Tabel 7-3 (David &amp; David, 2023). Setiap level sasaran memerlukan kebijakan pendukungnya sendiri.</p>';
}

/* ============ 5. Galeri struktur organisasi ============ */
var STR={
 fn:{t:"Fungsional",tree:["CEO",[["Keuangan"],["Pemasaran"],["Produksi"],["SDM"],["R&D"]]],p:"Sederhana, murah, spesialisasi, keputusan cepat.",c:"Akuntabilitas ke puncak, karier terbatas, pemikiran sempit, komunikasi antarfungsi sulit.",ex:"Usaha kecil; universitas menurut fungsi (akademik, kemahasiswaan, alumni, keuangan)."},
 geo:{t:"Divisi: wilayah",tree:["CEO",[["CFO"],["CMO"],["CHRO"],["COO",[["Presiden\nJawa"],["Presiden\nSumatra"],["Presiden\nIndonesia Timur"]]]]],p:"Strategi disesuaikan dengan kebutuhan lokal; manajer dekat pasar.",c:"Fungsi digandakan di tiap wilayah; mahal.",ex:"Bank atau distributor dengan cabang di banyak provinsi."},
 prod:{t:"Divisi: produk",tree:["CEO",[["CFO"],["CMO"],["CHRO"],["COO",[["Presiden\nMi Instan"],["Presiden\nMinuman"],["Presiden\nBumbu"]]]]],p:"Fokus pada lini produk yang sangat berbeda; akuntabilitas laba per produk.",c:"Duplikasi fungsi; persaingan antardivisi.",ex:"Perusahaan FMCG dengan banyak kategori."},
 cust:{t:"Divisi: pelanggan",tree:["CEO",[["CFO"],["CMO"],["CHRO"],["COO",[["Presiden\nSekolah"],["Presiden\nPerguruan Tinggi"],["Presiden\nLembaga Kursus"]]]]],p:"Melayani segelintir pelanggan besar secara mendalam.",c:"Bergantung pada segmen pelanggan yang stabil.",ex:"Penerbit buku (contoh buku); perusahaan listrik: rumah tangga, komersial, industri."},
 proc:{t:"Divisi: proses",tree:["CEO",[["CFO"],["CMO"],["CHRO"],["COO",[["Presiden\nPengecoran"],["Presiden\nPengelasan"],["Presiden\nPengecatan"]]]]],p:"Proses produksi yang khas menjadi sumber daya saing; tiap divisi akuntabel atas laba.",c:"Koordinasi antartahap proses.",ex:"Manufaktur logam (contoh buku)."},
 sbu:{t:"SBU",tree:["CEO",[["SBU\nAgribisnis",[["Div. A"],["Div. B"]]],["SBU\nProperti",[["Div. C"],["Div. D"]]],["SBU Jasa\nKeuangan",[["Div. E"],["Div. F"]]]]],p:"Memudahkan perencanaan dan kontrol di perusahaan besar (buku: lebih dari 10 divisi); sinergi antardivisi serupa.",c:"Menambah satu lapis manajemen; peran eksekutif SBU harus jelas.",ex:"Konglomerat; holding–subholding BUMN."},
 mx:{t:"Matriks",mx:1,p:"Sasaran proyek jelas, sumber daya fungsional dipakai bersama, proyek mudah ditutup.",c:"Dua atasan (melanggar unity of command), dua jalur anggaran, butuh komunikasi dan kepercayaan tinggi.",ex:"Kontraktor EPC, konsultan, rumah sakit, riset kedirgantaraan."}
};
function tree(el,T){
  var NW=96,NH=40,GX=10,GY=46;
  function wOf(n){var k=n[1]||[];if(!k.length)return NW;return Math.max(NW,k.reduce(function(a,c){return a+wOf(c)},0)+GX*(k.length-1))}
  var tw=wOf(T),depth=function d(n){return 1+Math.max.apply(null,[0].concat((n[1]||[]).map(d)))}(T),H=depth*(NH+GY)-GY+8,g="";
  function draw(n,x,y){var w=wOf(n),cx=x+w/2,isCeo=y===4,col=/COO/.test(n[0])?"var(--navy-soft)":(/Presiden|SBU|Div\./.test(n[0])?"var(--good-soft)":(isCeo?"var(--navy)":"var(--surface)"));
    g+=box(cx-NW/2,y,NW,NH,n[0],{fill:col,stroke:isCeo?"var(--navy)":"var(--line)",col:isCeo?"var(--navy-ink)":"var(--ink)",fs:10.5});
    var k=n[1]||[];if(!k.length)return;var xx=x+(w-(k.reduce(function(a,c){return a+wOf(c)},0)+GX*(k.length-1)))/2,yb=y+NH+GY/2;
    g+=line(cx,y+NH,cx,yb,{w:1.4});var first=null,last=null;
    k.forEach(function(c){var cw=wOf(c),ccx=xx+cw/2;if(first===null)first=ccx;last=ccx;g+=line(ccx,yb,ccx,y+NH+GY,{w:1.4});draw(c,xx,y+NH+GY);xx+=cw+GX});
    if(k.length>1)g+=line(first,yb,last,yb,{w:1.4});
  }
  draw(T,4,4);
  return svgOpen(tw+8,H,"Bagan struktur")+g+'</svg>';
}
function matrix(){
  var cols=["COO","CFO","CMO","CIO","SDM","R&D"],rows=["Manajer\nProyek 1","Manajer\nProyek 2","Manajer\nProyek 3"],W=560,H=300,g=svgOpen(W,H,"Struktur matriks");
  g+=box(W/2-45,4,90,34,"CEO",{fill:"var(--navy)",stroke:"var(--navy)",col:"var(--navy-ink)"});g+=line(W/2,38,W/2,54);g+=line(140,54,520,54);
  cols.forEach(function(c,i){var x=118+i*76;g+=line(x+30,54,x+30,62);g+=box(x,62,62,30,c,{fill:"var(--surface)",stroke:"var(--gold)",fs:10.5});g+=line(x+30,92,x+30,H-10,{dash:"3 3",w:1})});
  rows.forEach(function(r,j){var y=118+j*60;g+=box(6,y,96,40,r,{fill:"var(--good-soft)",stroke:"var(--good)",fs:10.5});g+=line(102,y+20,W-20,y+20,{dash:"3 3",w:1});
    cols.forEach(function(c,i){g+='<circle cx="'+(148+i*76)+'" cy="'+(y+20)+'" r="11" style="fill:var(--sunk);stroke:var(--muted)"/>'+text(148+i*76,y+24,String.fromCharCode(65+j*6+i),{fs:10,c:"var(--ink)"})})});
  g+=line(54,92,54,118,{});
  return g+text(W/2,H-2,"Setiap staf (A, B, C…) melapor ke kepala fungsi DAN manajer proyek",{fs:10.5})+'</svg>';
}
function structs(el){
  var cur=el._cur||"fn",S=STR[cur];
  var tabs='<div class="seg" role="tablist">'+Object.keys(STR).map(function(k){return '<button data-st="'+k+'" aria-pressed="'+(k===cur)+'">'+STR[k].t+'</button>'}).join("")+'</div>';
  el.innerHTML=tabs+'<div class="dgm-scroll">'+(S.mx?matrix():tree(el,S.tree))+'</div><div class="dgm-info"><b>'+S.t+'</b><p><b style="color:var(--good)">+</b> '+esc(S.p)+'<br><b style="color:var(--bad)">−</b> '+esc(S.c)+'<br><b>Contoh:</b> '+esc(S.ex)+'</p></div><p class="dgm-cap">Skema ilustratif berdasarkan uraian dan Gambar 7-4 (matriks) di David &amp; David (2023). Struktur divisional menempatkan eksekutif fungsional di bawah CEO dan presiden divisi di bawah COO, sesuai pedoman Tabel 7-10.</p>';
  Array.prototype.forEach.call(el.querySelectorAll("[data-st]"),function(b){b.addEventListener("click",function(){el._cur=b.dataset.st;structs(el)})});
}

/* ============ 6. Pay mix menurut level (ilustrasi) ============ */
function paymix(el){
  var L=[["Direksi",40,25,35],["Manajer senior",55,25,20],["Manajer menengah",70,20,10],["Supervisor",80,15,5],["Staf",90,10,0]];
  var W=wide(el),w=W?640:360,lw=W?130:96,bw=w-lw-20,h=L.length*36+56,g=svgOpen(w,h,"Komposisi imbalan menurut level");
  var C=["var(--sunk)","var(--navy-soft)","var(--gold-bg)"],N=["Gaji pokok","Bonus tahunan","Bonus jangka panjang"];
  L.forEach(function(l,i){var y=8+i*36,x=lw;g+=text(lw-8,y+18,l[0],{a:"end",fs:11,c:"var(--ink)"});
    [1,2,3].forEach(function(k){var ww=bw*l[k]/100;if(ww>0){g+='<rect x="'+x+'" y="'+y+'" width="'+ww+'" height="26" style="fill:'+C[k-1]+';stroke:var(--surface);stroke-width:1"/>';if(l[k]>=10)g+=text(x+ww/2,y+17,l[k]+"%",{fs:10,c:"var(--ink)"})}x+=ww})});
  var ly=h-30;N.forEach(function(n,k){var x=lw+k*(W?150:88);g+='<rect x="'+x+'" y="'+ly+'" width="12" height="12" rx="2" style="fill:'+C[k]+';stroke:var(--line)"/>'+text(x+16,ly+10,n,{a:"start",fs:W?11:9.5})});
  el.innerHTML=g+'</svg><p class="dgm-cap">Ilustrasi prinsip <em>dual bonus system</em> (David &amp; David, 2023, hlm. 247–248): semakin tinggi level, semakin besar porsi imbalan yang dikaitkan dengan sasaran jangka panjang. Persentase hanya contoh, bukan angka buku.</p>';
}

/* ============ 7. Positioning 4P (Gambar 7-10) ============ */
function pos4p(el){
  var g=svgOpen(420,300,"Positioning: marketing mix untuk target pasar");
  g+='<circle cx="210" cy="150" r="58" style="fill:var(--navy)"/>'+text(210,146,"Target",{fs:13,fw:800,c:"var(--navy-ink)"})+text(210,164,"pasar",{fs:13,fw:800,c:"var(--navy-ink)"});
  var P=[[210,34,"Produk","fitur, mutu, merek"],[346,150,"Harga","harga, diskon"],[210,266,"Promosi","iklan, media sosial"],[74,150,"Tempat","saluran, lokasi"]];
  P.forEach(function(p){g+=box(p[0]-66,p[1]-26,132,52,p[2]+"\n"+p[3],{fill:"var(--surface)",stroke:"var(--gold)",fs:11,bold1:1});var dx=210-p[0],dy=150-p[1],d=Math.hypot(dx,dy),sx=p[0]+dx/d*(p[1]===150?66:26),sy=p[1]+dy/d*(p[1]===150?0:26)+(p[1]===150?0:0),ex=210-dx/d*62,ey=150-dy/d*62;g+=line(sx,sy,ex,ey,{arrow:1,w:2})});
  el.innerHTML=g+'</svg><p class="dgm-cap">Diadaptasi dari Gambar 7-10 (David &amp; David, 2023). Keempat elemen bersama-sama memberi nilai unik bagi target pasar, sehingga permintaan tinggi (atau rendah) dibandingkan tawaran pesaing.</p>';
}

/* ============ 8. Struktur modal (Bab 8) ============ */
function capstruct(el){
  var d=el._d==null?50:el._d,g=svgOpen(520,250,"Struktur modal: aset didanai utang dan ekuitas");
  var top=20,H=180,dh=H*d/100;
  g+=box(40,top,180,H,"ASET\npenggunaan dana\n(pabrik, persediaan,\npiutang, kas)",{fill:"var(--sunk)",stroke:"var(--line)",fs:11.5,bold1:1,r:4});
  g+=text(260,top+H/2+4,"=",{fs:26,c:"var(--ink)"});
  if(dh>0)g+=box(300,top,180,dh,dh>46?"UTANG "+d+"%\nbunga tetap, wajib dibayar":"Utang "+d+"%",{fill:"var(--bad-soft)",stroke:"var(--bad)",fs:11,bold1:1,r:4});
  if(H-dh>0)g+=box(300,top+dh,180,H-dh,(H-dh)>46?"EKUITAS "+(100-d)+"%\ndividen tidak wajib; hak suara":"Ekuitas "+(100-d)+"%",{fill:"var(--good-soft)",stroke:"var(--good)",fs:11,bold1:1,r:4});
  g+=text(130,top+H+22,"Sisi kiri neraca",{fs:11})+text(390,top+H+22,"Sisi kanan neraca: sumber dana",{fs:11});
  var de=d>=100?"∞":(d/(100-d)).toFixed(2).replace(".",",");
  el.innerHTML=g+'</svg><label class="dgm-sl">Porsi utang dalam pendanaan: <input type="range" min="0" max="90" step="10" value="'+d+'"> <b>'+d+'%</b></label><div class="dgm-info"><b>Utang/ekuitas = '+de+'x · Utang/total aset = '+(d/100).toFixed(2).replace(".",",")+'</b><p>'+(d>=60?"Leverage tinggi: EPS naik tajam saat EBIT tinggi, tetapi risiko gagal bayar dan pembatasan (covenant) juga naik. Bandingkan dengan rata-rata industri (Tabel 8-3: situasi leverage).":d<=20?"Leverage rendah: risiko keuangan kecil, tetapi bila proyek menghasilkan imbal hasil di atas biaya utang, pemegang saham kehilangan potensi EPS lebih tinggi; saham baru juga mendilusi kepemilikan.":"Leverage moderat: keseimbangan antara manfaat utang (bunga dapat dikurangkan pajak, tanpa dilusi) dan risiko kewajiban tetap.")+'</p></div><p class="dgm-cap">Ilustrasi konsep <em>capital structure</em> (David &amp; David, 2023, hlm. 271–272).</p>';
  var r=el.querySelector("input");r.addEventListener("input",function(){el._d=+r.value;capstruct(el);el.querySelector("input").focus()});
}

/* ============ 9. Alur laporan proyeksi (Bab 8) ============ */
function pfsflow(el){
  var W=wide(el),S=[["1","Ramal penjualan","(tahun lalu + dampak\nrekomendasi)"],["2","HPP & beban","metode persentase\npenjualan"],["3","Laba bersih","EBIT − bunga − pajak"],["4","Laba ditahan","RE lalu + laba bersih\n− dividen"],["5","Ekuitas &\nkewajiban","neraca dari\nbawah ke atas"],["6","Aset; kas =\npenyeimbang","kas terlalu tinggi/\nrendah? tinjau asumsi"],["7","Catatan","jelaskan asumsi\n& perubahan besar"]];
  var g;
  if(W){g=svgOpen(760,280,"Alur menyusun laporan keuangan proyeksi");
    g+='<rect x="6" y="6" width="580" height="122" rx="10" style="fill:none;stroke:var(--navy);stroke-dasharray:4 3"/>'+text(16,24,"LAPORAN LABA RUGI PROYEKSI",{a:"start",fs:10.5,c:"var(--navy)",fw:800});
    g+='<rect x="6" y="148" width="748" height="126" rx="10" style="fill:none;stroke:var(--good);stroke-dasharray:4 3"/>'+text(744,166,"NERACA PROYEKSI",{a:"end",fs:10.5,c:"var(--good)",fw:800});
    var P=[[20,36],[210,36],[400,36],[20,176],[205,176],[390,176],[575,176]];
    S.forEach(function(s,i){var p=P[i],w=i<3?170:165;g+=box(p[0],p[1],w,80,s[0]+". "+s[1].replace("\n"," ")+"\n"+s[2],{fill:i===5?"var(--gold-soft)":"var(--surface)",stroke:i===5?"var(--gold)":"var(--line)",fs:10.5,bold1:1});
      if(i===0||i===1)g+=line(p[0]+w,76,P[i+1][0]-2,76,{arrow:1,w:2});
      if(i>=3&&i<6)g+=line(p[0]+w,216,P[i+1][0]-2,216,{arrow:1,w:2});});
    g+=path("M485,116 V 138 H 102 V 174",{arrow:1,w:2})+text(495,142,"laba bersih − dividen → laba ditahan",{a:"start",fs:10});
  }else{var y=4;g="";S.forEach(function(s,i){g+=box(20,y,320,58,s[0]+". "+s[1].replace("\n"," ")+"\n"+s[2].replace("\n"," "),{fill:i===5?"var(--gold-soft)":(i<3?"var(--navy-soft)":"var(--good-soft)"),stroke:i===5?"var(--gold)":"var(--line)",fs:10.5,bold1:1});y+=58;if(i<6){g+=line(180,y,180,y+14,{arrow:1});y+=16}});
    g+=path("M340,"+(y-100)+" H 352 V 200 H 342",{arrow:1,dash:"4 3"});g=svgOpen(360,y+6,"Alur menyusun laporan keuangan proyeksi")+g}
  el.innerHTML=g+'</svg><p class="dgm-cap">Diringkas dari tujuh langkah di David &amp; David (2023, hlm. 278–279). Laba rugi disusun dulu; hasilnya mengalir ke neraca melalui laba ditahan; kas menjadi angka penyeimbang.</p>';
}

/* ============ 10. Sumber data valuasi (Bab 8) ============ */
function valsrc(el){
  var g=svgOpen(620,230,"Empat metode valuasi dan sumber datanya");
  var L=[["Neraca","ekuitas, goodwill,\naset tak berwujud",20],["Laba rugi","laba bersih",90],["Pasar modal","harga saham,\nsaham beredar",160]];
  var R=[["1. Kekayaan bersih","ekuitas − (goodwill + tak berwujud)",10],["2. Laba bersih","laba bersih × 5",65],["3. Rasio P/E","(harga ÷ EPS) × laba bersih",120],["4. Kapitalisasi pasar","saham beredar × harga",175]];
  L.forEach(function(l){g+=box(10,l[2],150,52,l[0]+"\n"+l[1],{fill:"var(--sunk)",fs:10.5,bold1:1})});
  R.forEach(function(r){g+=box(380,r[2],230,46,r[0]+"\n"+r[1],{fill:"var(--surface)",stroke:"var(--navy)",fs:10.5,bold1:1})});
  [[0,0],[1,1],[1,2],[2,2],[2,3]].forEach(function(c){g+=path("M160,"+(L[c[0]][2]+26)+" C 270,"+(L[c[0]][2]+26)+" 270,"+(R[c[1]][2]+23)+" 378,"+(R[c[1]][2]+23),{arrow:1})});
  el.innerHTML=g+'</svg><p class="dgm-cap">Diringkas dari Tabel 8-12 dan uraian valuasi di David &amp; David (2023, hlm. 284–286). Metode 1–2 berbasis laporan keuangan; metode 3–4 memakai harga pasar.</p>';
}

/* ============ 11. Roda kategori rasio (Bab 8) ============ */
var RCAT=[["liq","Likuiditas","Bagaimana posisi kas?","var(--navy)"],["lev","Leverage","Bagaimana posisi utang?","var(--bad)"],["act","Aktivitas","Seberapa efisien operasi?","var(--gold)"],["pro","Profitabilitas","Bagaimana kinerjanya?","var(--good)"],["gro","Pertumbuhan","Apakah memenuhi harapan pemegang saham?","var(--muted)"]];
function ratiowheel(el){
  var sel=el._sel||"",cx=180,cy=170,R=150,r=62,g=svgOpen(360,340,"Lima kategori rasio keuangan");
  RCAT.forEach(function(c,i){var a0=-Math.PI/2+i*2*Math.PI/5,a1=a0+2*Math.PI/5,lg=0;
    function P(rad,a){return [cx+rad*Math.cos(a),cy+rad*Math.sin(a)]}
    var p1=P(R,a0),p2=P(R,a1),p3=P(r,a1),p4=P(r,a0),on=sel===c[0];
    g+='<g data-k="'+c[0]+'" style="cursor:pointer" tabindex="0" role="button" aria-label="'+c[1]+'"><path d="M'+p1+' A'+R+','+R+' 0 0 1 '+p2+' L'+p3+' A'+r+','+r+' 0 0 0 '+p4+' Z" style="fill:'+c[3]+';opacity:'+(sel&&!on?0.35:0.9)+';stroke:var(--surface);stroke-width:3"/>';
    var m=P((R+r)/2,(a0+a1)/2);g+=text(m[0],m[1]-2,c[1],{fs:12,fw:800,c:"#fff"})+text(m[0],m[1]+13,(i+1)+"",{fs:10,c:"rgba(255,255,255,.85)"})+'</g>'});
  g+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(r-4)+'" style="fill:var(--surface)"/>'+text(cx,cy-4,"Kesehatan",{fs:11.5,fw:800,c:"var(--ink)"})+text(cx,cy+12,"keuangan",{fs:11.5,fw:800,c:"var(--ink)"});
  var c=RCAT.filter(function(x){return x[0]===sel})[0];
  el.innerHTML=g+'</svg><div class="dgm-info">'+(c?'<b>'+c[1]+'</b><p>'+c[2]+' Tabel rasio di bawah kini menampilkan kategori ini. <button class="retry" data-clr="1">Tampilkan semua</button></p>':'<p style="margin:0">Ketuk satu kategori untuk memfilter tabel rasio di bawah.</p>')+'</div><p class="dgm-cap">Lima kategori dan pertanyaan kuncinya diringkas dari Tabel 4-9 (David &amp; David, 2023, hlm. 139).</p>';
  bindSel(el,function(k){el._sel=k===sel?"":k;ratiowheel(el);document.dispatchEvent(new CustomEvent("smd:ratiocat",{detail:el._sel}))});
  var clr=el.querySelector("[data-clr]");if(clr)clr.addEventListener("click",function(){el._sel="";ratiowheel(el);document.dispatchEvent(new CustomEvent("smd:ratiocat",{detail:""}))});
}

/* ============ 12. Tren rasio P&G (gaya Gambar 4-2, data Tabel 8-14/8-15) ============ */
function trend(el){
  var Y=["2016","2017","2018p","2019p","2020p"],S=[["Rasio lancar",[1.10,0.88,0.89,1.04,1.10],"var(--navy)"],["Utang/ekuitas",[1.19,1.16,1.07,1.00,1.00],"var(--bad)"]],T=[24,30,22,23,25];
  function panel(title,series,ymin,ymax,fmt){
    var w=330,h=200,m={l:40,r:20,t:26,b:30},pw=w-m.l-m.r,ph=h-m.t-m.b,X=function(i){return m.l+i*pw/4},YY=function(v){return m.t+ph-(v-ymin)/(ymax-ymin)*ph};
    var g=svgOpen(w,h,title)+text(m.l,16,title,{a:"start",fs:11.5,c:"var(--ink)",fw:800});
    for(var k=0;k<=4;k++){var v=ymin+(ymax-ymin)*k/4;g+=line(m.l,YY(v),w-m.r,YY(v),{c:"var(--line)",w:1})+text(m.l-5,YY(v)+4,fmt(v),{a:"end",fs:9.5})}
    Y.forEach(function(y,i){g+=text(X(i),h-10,y,{fs:9.5})});
    g+='<rect x="'+X(1)+'" y="'+m.t+'" width="'+(X(4)-X(1))+'" height="'+ph+'" style="fill:var(--sunk);opacity:.5"/>'+text((X(1)+X(4))/2,m.t+12,"proyeksi",{fs:9.5});
    series.forEach(function(s){var a=s[1].slice(0,2).map(function(v,i){return X(i)+","+YY(v)}).join(" "),b=s[1].slice(1).map(function(v,i){return X(i+1)+","+YY(v)}).join(" ");
      g+='<polyline points="'+a+'" style="fill:none;stroke:'+s[2]+';stroke-width:2.5"/><polyline points="'+b+'" style="fill:none;stroke:'+s[2]+';stroke-width:2.5" stroke-dasharray="5 4"/>';s[1].forEach(function(v,i){g+='<circle cx="'+X(i)+'" cy="'+YY(v)+'" r="3" style="fill:'+s[2]+'"/>'})});
    return g+'</svg>';
  }
  var leg='<div class="olegend">'+S.map(function(s){return '<span><i style="border-color:'+s[2]+';background:'+s[2]+'"></i>'+s[0]+'</span>'}).join("")+'<span><i style="border-color:var(--gold);background:var(--gold)"></i>Times interest earned</span><span>— aktual · - - proyeksi</span></div>';
  el.innerHTML='<div class="dgm-two"><div>'+panel("Rasio lancar & utang/ekuitas (x)",S,0.8,1.3,function(v){return v.toFixed(2).replace(".",",")})+'</div><div>'+panel("Times interest earned (x)",[["TIE",T,"var(--gold)"]],15,35,function(v){return Math.round(v)})+'</div></div>'+leg+'<p class="dgm-cap">Data: rasio aktual (30 Juni 2016–2017) dan proyeksi (2018–2020) P&amp;G dari Tabel 8-14 dan 8-15 (David &amp; David, 2023, hlm. 287); gaya penyajian mengikuti Gambar 4-2 (hlm. 137).</p>';
}

/* ============ registry ============ */
var R={model:model,cycle:cycle,aims:aims,policies:policies,structs:structs,paymix:paymix,pos4p:pos4p,capstruct:capstruct,pfsflow:pfsflow,valsrc:valsrc,ratiowheel:ratiowheel,trend:trend};
function render(el){var f=R[el.dataset.dgm];if(!f)return;uid++;try{f(el)}catch(e){el.innerHTML='<p class="hint">Diagram gagal dimuat.</p>';if(window.console)console.error(e)}}
function renderAll(root){Array.prototype.forEach.call((root||document).querySelectorAll(".dgm[data-dgm]"),render)}
var lastW=window.innerWidth,t;
window.addEventListener("resize",function(){clearTimeout(t);t=setTimeout(function(){if(Math.abs(window.innerWidth-lastW)>40){lastW=window.innerWidth;Array.prototype.forEach.call(document.querySelectorAll(".dgm[data-dgm]"),function(el){if(el.offsetParent!==null)render(el)})}},250)});
window.SMD={render:render,renderAll:renderAll};
})();
