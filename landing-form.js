// Form dung chung cho 2 landing. Khach bam gui -> du lieu ve Google Form "KHACH DE LAI SO - LANDING"
// (form tu do cau tra loi vao Google Sheet, bat thong bao email trong muc Cau tra loi cua form).
// Form co 4 o: trang, ho_ten, so_dien_thoai, chi_tiet (cac thong tin con lai gop vao chi_tiet).
var GOOGLE_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSdL5L5CKwsjFCUksQUzq65zBuEs0Q6rSGcSX_-rFX_ybOJomQ/formResponse';
var O_FORM = {
  trang: 'entry.1548133256',
  ho_ten: 'entry.67681077',
  so_dien_thoai: 'entry.673667126',
  chi_tiet: 'entry.634407155'
};

function guiForm(form) {
  var trang = document.body.getAttribute('data-trang') || location.pathname;
  var nguon = new URLSearchParams(location.search).get('utm_source') || document.referrer || 'truc tiep';

  var dong = [];      // tom tat day du (hien lai cho khach)
  var chiTiet = [];   // cac o khac ho ten / sdt
  form.querySelectorAll('[name]').forEach(function (o) {
    if (!o.value || !o.dataset.nhan) return;
    dong.push(o.dataset.nhan + ': ' + o.value);
    if (o.name !== 'ho_ten' && o.name !== 'so_dien_thoai') chiTiet.push(o.dataset.nhan + ': ' + o.value);
  });
  chiTiet.push('Nguon: ' + nguon);
  var tomTat = dong.join('\n');

  var duLieu = new URLSearchParams();
  duLieu.append(O_FORM.trang, trang);
  duLieu.append(O_FORM.ho_ten, form.ho_ten ? form.ho_ten.value : '');
  duLieu.append(O_FORM.so_dien_thoai, form.so_dien_thoai ? form.so_dien_thoai.value : '');
  duLieu.append(O_FORM.chi_tiet, chiTiet.join('\n'));

  var nut = form.querySelector('button[type=submit]');
  nut.disabled = true;
  nut.textContent = 'Đang gửi...';

  function hien(daGui) {
    form.style.display = 'none';
    var kq = form.parentNode.querySelector('.ket-qua');
    kq.querySelector('pre').textContent = tomTat;
    kq.querySelector('.da-gui').style.display = daGui ? 'block' : 'none';
    kq.querySelector('.chua-gui').style.display = daGui ? 'none' : 'block';
    kq.style.display = 'block';
    kq.scrollIntoView({ block: 'center' });
    if (window.fbq) fbq('track', 'Lead');
  }

  if (!GOOGLE_FORM) { hien(false); return false; }
  fetch(GOOGLE_FORM, { method: 'POST', mode: 'no-cors', body: duLieu })
    .then(function () { hien(true); })
    .catch(function () { hien(false); });
  return false;
}

// Bam nut "Chon combo nay" -> dien san combo vao form
document.addEventListener('click', function (e) {
  var nut = e.target.closest('[data-chon]');
  if (!nut) return;
  var o = document.getElementById('o-combo');
  if (o) o.value = nut.getAttribute('data-chon');
});
