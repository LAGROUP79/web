// Hieu ung cho 2 landing: hien dan khi cuon, dem so, bang chay.
// Dung setInterval (khong dung requestAnimationFrame) de khung xem thu cung chay.
(function () {
  var giam = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (giam || !document.documentElement.classList) return;
  document.documentElement.classList.add('hu');

  // Dan chim yen bay ngang dau trang
  var hero = document.querySelector('.hero');
  if (hero) {
    var chim = '<svg viewBox="-40 -12 80 30" aria-hidden="true"><path d="M0 2 C-7 -3 -20 -9 -38 -7 C-24 -4 -12 1 -3 6 L-5 16 L0 10 L5 16 L3 6 C12 1 24 -4 38 -7 C20 -9 7 -3 0 2 Z"/></svg>';
    var dan = document.createElement('div');
    dan.className = 'dan-yen';
    dan.innerHTML = chim + chim + chim + chim;
    hero.insertBefore(dan, hero.firstChild);
  }

  // 1. Gan lop .hien cho cac khoi, nhom nao xuat hien lan luot (tre dan)
  var nhom = [
    ['.center > *', ''],
    ['.dau li', 'trai'],
    ['.chung-nhan figure', 'zoom'],
    ['.chuyen .moc > div', ''],
    ['.chuyen blockquote', 'trai'],
    ['.loi-ich > div', ''],
    ['.chong li', 'phai'],
    ['.vi', 'zoom'],
    ['.combo', ''],
    ['.card', ''],
    ['.quote', ''],
    ['details', ''],
    ['.promise > div', ''],
    ['.split > *', ''],
    ['.form-box', 'zoom'],
    ['.neo', 'zoom'],
    ['.trust li', '']
  ];
  var tatCa = [];
  nhom.forEach(function (n) {
    var ds = document.querySelectorAll(n[0]);
    for (var i = 0; i < ds.length; i++) {
      var e = ds[i];
      if (e.closest('.hero') || e.classList.contains('hien')) continue;
      e.classList.add('hien');
      if (n[1]) e.classList.add(n[1]);
      e.style.transitionDelay = (i % 4) * 0.09 + 's';
      tatCa.push(e);
    }
  });
  // tieu de muc: gach vang chay
  var h2 = document.querySelectorAll('.center h2');
  for (var j = 0; j < h2.length; j++) tatCa.push(h2[j]);

  // Hien xong thi go lop hieu ung de hieu ung re chuot (noi len) chay binh thuong
  function hien(e) {
    if (e.classList.contains('xong')) return;
    e.classList.add('da-hien', 'xong');
    setTimeout(function () {
      e.classList.remove('hien', 'trai', 'phai', 'zoom', 'da-hien');
      e.style.transitionDelay = '';
    }, 1300);
  }
  // Kiem tra vi tri bang tay (chay ca o trinh duyet khong bao IntersectionObserver)
  var choHien = tatCa.slice();
  var choDem = Array.prototype.slice.call(document.querySelectorAll('[data-dem]'));
  function trongMan(e, ty) {
    var r = e.getBoundingClientRect();
    var cao = window.innerHeight || document.documentElement.clientHeight;
    return r.top < cao * ty && r.bottom > 0;
  }
  function soat() {
    choHien = choHien.filter(function (e) { if (trongMan(e, 0.92)) { hien(e); return false; } return true; });
    choDem = choDem.filter(function (e) { if (trongMan(e, 0.85)) { demSo(e); return false; } return true; });
    if (!choHien.length && !choDem.length) { clearInterval(nhipSoat); window.removeEventListener('scroll', soat); }
  }
  window.addEventListener('scroll', soat, { passive: true });
  var nhipSoat = setInterval(soat, 200);
  setTimeout(soat, 50);

  // 2. Dem so: "200+", "9 nam", "40.000d"...
  function demSo(el) {
    var goc = el.textContent;
    var m = goc.match(/[\d.]+/);
    if (!m) return;
    var dich = parseInt(m[0].replace(/\./g, ''), 10);
    if (!dich || dich > 10000000) return;
    var coCham = m[0].indexOf('.') > -1;
    var buoc = 0, tong = 40;
    var t = setInterval(function () {
      buoc++;
      var v = Math.round(dich * (1 - Math.pow(1 - buoc / tong, 3)));
      var chu = coCham ? v.toLocaleString('vi-VN') : String(v);
      el.textContent = goc.replace(m[0], chu);
      if (buoc >= tong) { clearInterval(t); el.textContent = goc; }
    }, 30);
  }
})();
