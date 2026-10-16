// Form dung chung cho 2 landing. Khach bam gui -> du lieu do ve Google Sheet cua cong ty.
// DIA_CHI_NHAN: dan dia chi Web App cua Google Apps Script (xem production/landing-page/google-sheet-nhan-form.gs).
// Khi con de trong: trang van chay, khach thay tom tat don + nut goi/nhan fanpage de tu gui.
var DIA_CHI_NHAN = '';

function guiForm(form) {
  var duLieu = new FormData(form);
  duLieu.append('trang', document.body.getAttribute('data-trang') || location.pathname);
  duLieu.append('thoi_gian', new Date().toLocaleString('vi-VN'));
  duLieu.append('nguon', new URLSearchParams(location.search).get('utm_source') || document.referrer || 'truc tiep');

  var dong = [];
  form.querySelectorAll('[name]').forEach(function (o) {
    if (o.value && o.dataset.nhan) dong.push(o.dataset.nhan + ': ' + o.value);
  });
  var tomTat = dong.join('\n');

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

  if (!DIA_CHI_NHAN) { hien(false); return false; }
  fetch(DIA_CHI_NHAN, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(duLieu) })
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
