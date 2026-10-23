/* Khung chat tu van Yen Sao Lanest — noi voi luong n8n "Lanest - Bot CSKH website".
   Gan vao trang: <script src="chat-lanest.js" defer></script>  (tu chen CSS, khong can file khac). */
(function () {
  if (window.__lanestChat) return; window.__lanestChat = 1;
  var DIA_CHI = 'https://pfaqwv.ezn8n.com/webhook/lanest-chat';
  var HOTLINE = '025.8627.8627', TEL = 'tel:02586278627';
  var CHAO = 'Dạ em chào anh/chị! Em là trợ lý tư vấn của Yến Sào Lanest. Anh/chị đang tìm yến cho ai, để em gợi ý loại hợp nhất ạ?';
  var GOI_Y = ['Bảng giá yến hũ', 'Mua yến biếu tặng', 'Yến tinh chế loại nào ngon?', 'Muốn làm đại lý'];

  function lay(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function luu(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var phien = lay('lnc_phien');
  if (!phien) { phien = 'w' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10); luu('lnc_phien', phien); }
  var tin = []; try { tin = JSON.parse(lay('lnc_tin') || '[]'); } catch (e) { tin = []; }
  var sau = Number(lay('lnc_sau')) || 0, cheDo = lay('lnc_chedo') || 'bot', hoatDong = Number(lay('lnc_hd')) || 0;
  var mo = false, dangGui = false, hen = null;

  var css = '' +
  '.lnc{--lnc-xanh:#0C3427;--lnc-vang:#A3762A;--lnc-vang2:#C9A14A;--lnc-nen:#FBF7EE;--lnc-mat:#FFFFFF;--lnc-chu:#1C2119;--lnc-mo:#5E6455;--lnc-vien:#E6DCC6;font-family:inherit;}' +
  '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .lnc{--lnc-nen:#13201A;--lnc-mat:#1B2A23;--lnc-chu:#EFE7D2;--lnc-mo:#B3AC96;--lnc-vien:#2E3F36;--lnc-vang:#D8B061;}}' +
  ':root[data-theme="dark"] .lnc{--lnc-nen:#13201A;--lnc-mat:#1B2A23;--lnc-chu:#EFE7D2;--lnc-mo:#B3AC96;--lnc-vien:#2E3F36;--lnc-vang:#D8B061;}' +
  '.lnc-nut{position:fixed;right:18px;bottom:18px;z-index:60;display:flex;align-items:center;gap:8px;height:54px;padding:0 18px 0 14px;border:0;border-radius:28px;background:var(--lnc-xanh);color:#F4EBD6;font-family:inherit;font-weight:600;font-size:15px;line-height:1;cursor:pointer;box-shadow:0 12px 30px -10px rgba(0,0,0,.55);}' +
  '.lnc-nut svg{flex:none}.lnc-nut:focus-visible{outline:3px solid var(--lnc-vang2);outline-offset:3px}' +
  '.lnc-cham{position:absolute;top:-3px;right:-3px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:#C0392B;color:#fff;font-family:inherit;font-weight:700;font-size:12px;line-height:20px;text-align:center;display:none}' +
  '.lnc-khung{padding:0;margin:0;box-sizing:border-box;position:fixed;right:18px;bottom:84px;z-index:61;width:370px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 110px);display:none;flex-direction:column;background:var(--lnc-nen);color:var(--lnc-chu);border:1px solid var(--lnc-vien);border-radius:18px;overflow:hidden;box-shadow:0 24px 60px -20px rgba(0,0,0,.5)}' +
  '.lnc-khung.mo{display:flex}' +
  '.lnc-dau{display:flex;align-items:center;gap:10px;padding:14px 14px 12px;background:var(--lnc-xanh);color:#F4EBD6}' +
  '.lnc-logo{width:38px;height:38px;border-radius:50%;background:var(--lnc-vang2);color:#241A05;display:flex;align-items:center;justify-content:center;font-weight:700;flex:none}' +
  '.lnc-ten{font-weight:700;font-size:15px;line-height:1.2}.lnc-tt{font-size:12px;opacity:.85;margin-top:2px;display:flex;align-items:center;gap:6px}' +
  '.lnc-tt i{width:8px;height:8px;border-radius:50%;background:#4CD07D;display:inline-block}' +
  '.lnc-dong{margin-left:auto;background:none;border:0;color:inherit;cursor:pointer;padding:6px;border-radius:8px}.lnc-dong:hover{background:rgba(255,255,255,.12)}' +
  '.lnc-than{flex:1;overflow-y:auto;padding:14px 12px;display:flex;flex-direction:column;gap:8px;overscroll-behavior:contain}' +
  '.lnc-b{max-width:84%;padding:9px 12px;border-radius:14px;font-size:14.5px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}' +
  '.lnc-b a{color:inherit;text-decoration:underline}' +
  '.lnc-b strong{font-weight:700}.lnc-li{display:block;padding-left:1.1em;text-indent:-.75em}.lnc-li:before{content:"\\2022";display:inline-block;width:.75em;text-indent:0}' +
  '.lnc-b.khach{align-self:flex-end;background:var(--lnc-xanh);color:#F4EBD6;border-bottom-right-radius:4px}' +
  '.lnc-b.bot,.lnc-b.sale{align-self:flex-start;background:var(--lnc-mat);border:1px solid var(--lnc-vien);border-bottom-left-radius:4px}' +
  '.lnc-b.sale{border-color:var(--lnc-vang)}.lnc-ai{font-size:11px;color:var(--lnc-mo);margin:2px 4px -4px}' +
  '.lnc-he{align-self:center;font-size:12px;color:var(--lnc-mo);text-align:center;padding:2px 8px}' +
  '.lnc-go{align-self:flex-start;display:flex;gap:4px;padding:12px 14px;background:var(--lnc-mat);border:1px solid var(--lnc-vien);border-radius:14px}' +
  '.lnc-go span{width:7px;height:7px;border-radius:50%;background:var(--lnc-mo);opacity:.4;animation:lnc-n 1.2s infinite}' +
  '.lnc-go span:nth-child(2){animation-delay:.2s}.lnc-go span:nth-child(3){animation-delay:.4s}' +
  '@keyframes lnc-n{0%,60%,100%{opacity:.3}30%{opacity:1}}' +
  '.lnc-goiy{display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 8px}' +
  '.lnc-goiy button{border:1px solid var(--lnc-vang);background:transparent;color:var(--lnc-chu);border-radius:16px;padding:6px 11px;font-family:inherit;font-weight:500;font-size:13px;line-height:1.2;cursor:pointer}' +
  '.lnc-goiy button:hover{background:var(--lnc-vang);color:#fff}' +
  '.lnc-chan{display:flex;gap:8px;padding:10px;border-top:1px solid var(--lnc-vien);background:var(--lnc-mat)}' +
  '.lnc-chan textarea{flex:1;resize:none;border:1px solid var(--lnc-vien);border-radius:12px;padding:9px 11px;font-family:inherit;font-size:16px;line-height:1.4;background:var(--lnc-nen);color:var(--lnc-chu);max-height:96px;height:42px;box-sizing:border-box}' +
  '.lnc-chan textarea:focus{outline:2px solid var(--lnc-vang2);border-color:transparent}' +
  '.lnc-gui{flex:none;width:42px;height:42px;border:0;border-radius:12px;background:var(--lnc-vang);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center}' +
  '.lnc-gui:disabled{opacity:.5;cursor:default}' +
  '.lnc-cuoi{font-size:11px;color:var(--lnc-mo);text-align:center;padding:0 10px 8px;background:var(--lnc-mat)}.lnc-cuoi a{color:inherit}' +
  '@media (max-width:520px){.lnc-khung{right:0;left:0;bottom:0;top:0;width:auto;max-width:none;height:auto;max-height:none;border-radius:0;border:0}.lnc-nut{padding:0 16px 0 13px}}' +
  '@media (prefers-reduced-motion:reduce){.lnc-go span{animation:none;opacity:.7}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var goc = document.createElement('div'); goc.className = 'lnc';
  goc.innerHTML =
    '<button class="lnc-nut" type="button" aria-label="Mở khung chat tư vấn Lanest" aria-expanded="false">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z"/></svg>' +
      '<span>Tư vấn ngay</span><b class="lnc-cham"></b></button>' +
    '<section class="lnc-khung" role="dialog" aria-label="Chat tư vấn Yến Sào Lanest">' +
      '<div class="lnc-dau"><div class="lnc-logo">L</div><div><div class="lnc-ten">Yến Sào Lanest</div>' +
      '<div class="lnc-tt"><i></i><span class="lnc-tt-chu">Trả lời ngay</span></div></div>' +
      '<button class="lnc-dong" type="button" aria-label="Đóng khung chat"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<div class="lnc-than" aria-live="polite"></div>' +
      '<div class="lnc-goiy"></div>' +
      '<form class="lnc-chan"><textarea rows="1" maxlength="800" placeholder="Nhập câu hỏi của anh/chị..." aria-label="Nội dung tin nhắn"></textarea>' +
      '<button class="lnc-gui" type="submit" aria-label="Gửi"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></button></form>' +
      '<div class="lnc-cuoi">Trợ lý tự động · nhân viên có thể vào hỗ trợ · Hotline <a href="' + TEL + '">' + HOTLINE + '</a></div>' +
    '</section>';
  document.body.appendChild(goc);
  var nut = goc.querySelector('.lnc-nut'), khung = goc.querySelector('.lnc-khung'), than = goc.querySelector('.lnc-than'),
      goiY = goc.querySelector('.lnc-goiy'), form = goc.querySelector('form'), o = goc.querySelector('textarea'),
      gui = goc.querySelector('.lnc-gui'), cham = goc.querySelector('.lnc-cham'), ttChu = goc.querySelector('.lnc-tt-chu');

  // Dat nut chat len tren nut goi (trang chu) hoac thanh dat hang (landing)
  function viTri() {
    var duoi = 18, fs = document.querySelector('.float-stack'), dock = document.querySelector('.dock');
    if (fs && getComputedStyle(fs).display !== 'none') duoi = Math.max(duoi, window.innerHeight - fs.getBoundingClientRect().top + 12);
    if (dock && getComputedStyle(dock).display !== 'none') duoi = Math.max(duoi, dock.offsetHeight + 12);
    nut.style.bottom = duoi + 'px';
    if (window.innerWidth > 520) khung.style.bottom = (duoi + 66) + 'px';
    else khung.style.bottom = '';
  }
  viTri(); window.addEventListener('resize', viTri); setTimeout(viTri, 1500);

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]; }); }
  function dep(s) {
    return esc(s)
      .replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
      .replace(/(0?25\.?8627\.?8627)/g, '<a href="' + TEL + '">$1</a>');
  }
  // Tin cua bot/nhan vien: doi **dam**, *nghieng*, dong "- " / "* " thanh gach dau dong; giu xuong dong
  function depMd(s) {
    var GACH = /^\s*[-*]\s+(.*)$/;
    var dong = String(s).split('\n'), ra = '';
    function chu(x) {
      return dep(x)
        .replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>')
        .replace(/(^|[^*\w])\*([^*\n]+?)\*(?!\*)/g, '$1<em>$2</em>');
    }
    for (var i = 0; i < dong.length; i++) {
      var g = dong[i].match(GACH);
      if (g) { ra += '<span class="lnc-li">' + chu(g[1]) + '</span>'; continue; }
      ra += chu(dong[i]);
      if (i < dong.length - 1 && !GACH.test(dong[i + 1])) ra += '\n';
    }
    return ra;
  }
  function veTin(m) {
    if (m.vai === 'sale' || m.vai === 'bot') {
      var ai = document.createElement('div'); ai.className = 'lnc-ai';
      ai.textContent = m.vai === 'sale' ? 'Nhân viên Lanest' : 'Trợ lý Lanest';
      than.appendChild(ai);
    }
    var d = document.createElement('div');
    d.className = m.vai === 'he' ? 'lnc-he' : 'lnc-b ' + m.vai;
    d.innerHTML = (m.vai === 'bot' || m.vai === 'sale') ? depMd(m.nd) : dep(m.nd);
    than.appendChild(d);
  }
  function cuon() { than.scrollTop = than.scrollHeight; }
  function luuTin() { luu('lnc_tin', JSON.stringify(tin.slice(-40))); }
  function them(m) { tin.push(m); luuTin(); veTin(m); cuon(); }
  function trangThai() {
    ttChu.textContent = cheDo === 'sale' ? 'Nhân viên Lanest đang hỗ trợ' : cheDo === 'cho' ? 'Đang mời nhân viên tư vấn vào' : 'Trả lời ngay';
    luu('lnc_chedo', cheDo);
  }
  function veGoiY() {
    goiY.innerHTML = '';
    if (tin.some(function (m) { return m.vai === 'khach'; })) return;
    GOI_Y.forEach(function (g) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = g;
      b.onclick = function () { guiTin(g); };
      goiY.appendChild(b);
    });
  }
  function dangGo(bat) {
    var g = than.querySelector('.lnc-go');
    if (bat && !g) { g = document.createElement('div'); g.className = 'lnc-go'; g.innerHTML = '<span></span><span></span><span></span>'; than.appendChild(g); cuon(); }
    if (!bat && g) g.remove();
  }
  function goi(du) {
    // Cho toi da 20 giay (AI thuong tra loi 2-4 giay); qua lau coi nhu may chu loi
    var ctl = window.AbortController ? new AbortController() : null;
    var hh = ctl ? setTimeout(function () { ctl.abort(); }, 20000) : null;
    return fetch(DIA_CHI, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(du), signal: ctl ? ctl.signal : undefined})
      .then(function (r) { clearTimeout(hh); if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); },
            function (e) { clearTimeout(hh); throw e; });
  }
  function nhanTin(ds) {
    (ds || []).forEach(function (m) {
      if (m.ts && m.vai === 'sale') { if (m.ts <= sau) return; sau = m.ts; luu('lnc_sau', sau); }
      them({vai: m.vai, nd: m.nd, ts: m.ts});
      if (!mo) { var n = Number(cham.textContent || 0) + 1; cham.textContent = n; cham.style.display = 'block'; }
    });
  }
  function guiTin(nd) {
    nd = String(nd || '').trim();
    if (!nd || dangGui) return;
    dangGui = true; gui.disabled = true; o.value = ''; doCao();
    them({vai: 'khach', nd: nd, ts: Date.now()}); veGoiY();
    hoatDong = Date.now(); luu('lnc_hd', hoatDong);
    if (!DIA_CHI) { them({vai: 'he', nd: 'Anh/chị vui lòng gọi hotline ' + HOTLINE + ' để được tư vấn ngay ạ.'}); dangGui = false; gui.disabled = false; return; }
    var cho = setTimeout(function () { dangGo(true); }, 250);
    goi({hanh_dong: 'gui', phien: phien, tin: nd, trang: location.href})
      .then(function (r) {
        clearTimeout(cho); dangGo(false);
        if (r.che_do) { cheDo = r.che_do; trangThai(); }
        nhanTin(r.tin);
      })
      .catch(function () {
        clearTimeout(cho); dangGo(false);
        duPhong(nd);
      })
      .then(function () { dangGui = false; gui.disabled = false; henHoi(); });
  }
  // May chu tu van khong tra loi -> xin so dien thoai, gui ve Google Form "KHACH DE LAI SO" de khong mat khach
  var FORM_DP = 'https://docs.google.com/forms/d/e/1FAIpQLSdL5L5CKwsjFCUksQUzq65zBuEs0Q6rSGcSX_-rFX_ybOJomQ/formResponse';
  var daXinSo = false, daGuiSo = '';
  function duPhong(nd) {
    var so = String(nd).replace(/[\s.\-()]/g, '').match(/(\+84|0)\d{9,10}/);
    if (so && so[0] !== daGuiSo) {
      daGuiSo = so[0];
      var lich = tin.filter(function (m) { return m.vai === 'khach'; }).map(function (m) { return m.nd; }).slice(-10).join('\n');
      var du = new URLSearchParams();
      du.append('entry.1548133256', 'Khung chat web (bot tạm gián đoạn) - ' + location.pathname);
      du.append('entry.67681077', '');
      du.append('entry.673667126', so[0]);
      du.append('entry.634407155', 'Khách nhắn trong khung chat:\n' + lich);
      fetch(FORM_DP, {method: 'POST', mode: 'no-cors', body: du}).catch(function () {});
      them({vai: 'bot', nd: 'Dạ em đã nhận số ' + so[0] + ' ạ. Nhân viên Lanest sẽ gọi lại cho anh/chị sớm nhất (giờ làm việc 8:00–17:30, thứ Hai–thứ Bảy). Cần gấp anh/chị gọi hotline ' + HOTLINE + ' nhé.'});
      return;
    }
    if (!daXinSo) {
      daXinSo = true;
      them({vai: 'bot', nd: 'Dạ hệ thống tư vấn tự động đang bận một chút ạ. Anh/chị để lại số điện thoại ngay tại đây, nhân viên Lanest sẽ gọi lại tư vấn cho anh/chị. Hoặc gọi hotline ' + HOTLINE + ' để được hỗ trợ ngay ạ.'});
    } else {
      them({vai: 'bot', nd: 'Dạ anh/chị gõ giúp em số điện thoại (10 số) để nhân viên gọi lại, hoặc gọi hotline ' + HOTLINE + ' ạ.'});
    }
  }
  // Hoi xem nhan vien da nhan gi chua: 5 giay/lan khi dang mo, 20 giay/lan khi dong; dung sau 30 phut khong hoat dong
  function henHoi() {
    clearTimeout(hen);
    if (!DIA_CHI || !tin.some(function (m) { return m.vai === 'khach'; })) return;
    if (Date.now() - hoatDong > 30 * 60e3) return;
    hen = setTimeout(function () {
      if (document.hidden) return henHoi();
      goi({hanh_dong: 'lay', phien: phien, sau: sau})
        .then(function (r) { if (r.che_do) { cheDo = r.che_do; trangThai(); } nhanTin(r.tin); })
        .catch(function () {})
        .then(henHoi);
    }, mo ? 5000 : 20000);
  }
  function doCao() { o.style.height = '42px'; if (o.value) o.style.height = Math.min(Math.max(o.scrollHeight + 2, 42), 96) + 'px'; }

  function moKhung(bat) {
    mo = bat; khung.classList.toggle('mo', bat); nut.setAttribute('aria-expanded', bat ? 'true' : 'false');
    if (bat) {
      cham.textContent = ''; cham.style.display = 'none';
      if (window.innerWidth <= 520) nut.style.display = 'none';
      cuon(); setTimeout(function () { o.focus(); }, 50); henHoi();
    } else { nut.style.display = ''; nut.focus(); }
  }
  nut.onclick = function () { moKhung(!mo); };
  goc.querySelector('.lnc-dong').onclick = function () { moKhung(false); };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mo) moKhung(false); });
  form.onsubmit = function (e) { e.preventDefault(); guiTin(o.value); };
  o.addEventListener('input', doCao);
  o.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); guiTin(o.value); } });

  if (!tin.length) tin.push({vai: 'bot', nd: CHAO, ts: 0});
  tin.forEach(veTin); veGoiY(); trangThai(); henHoi();
})();
