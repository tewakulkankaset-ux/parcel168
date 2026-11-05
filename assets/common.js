// ฟังก์ชันที่ใช้ร่วมกันระหว่างหน้าลูกค้า (index.html) และหน้าร้าน (admin.html)
var Parcel = (function () {
  function $(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // "jd 3098 0171 3 th" -> "JD309801713TH"
  function normTrack(t) { return String(t || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }

  // "JD309801713TH" -> "JD 3098 0171 3 TH"
  function fmtTrack(t) {
    var m = /^([A-Z]{2})(\d{4})(\d{4})(\d)([A-Z]{2})$/.exec(t);
    return m ? m.slice(1).join(' ') : t;
  }

  function digits(s) { return String(s || '').replace(/\D/g, ''); }

  // "2026-11-04" -> "04/11/2569"
  function thDate(iso) {
    if (!iso) return '';
    var p = iso.split('-');
    if (p.length < 3) return iso;
    return p[2] + '/' + p[1] + '/' + (parseInt(p[0], 10) + 543);
  }

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function postLink(t) { return 'https://track.thailandpost.co.th/?trackNumber=' + encodeURIComponent(t); }

  function byDateDesc(a, b) { return b.d < a.d ? -1 : b.d > a.d ? 1 : 0; }

  function toast(msg) {
    var el = $('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast.t);
    toast.t = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }

  function copy(text) {
    var fail = function () { toast('คัดลอกไม่ได้ กรุณากดค้างเพื่อเลือกข้อความ'); };
    try { navigator.clipboard.writeText(text).then(function () { toast('คัดลอกแล้ว'); }, fail); }
    catch (e) { fail(); }
  }

  return {
    $: $, esc: esc, normTrack: normTrack, fmtTrack: fmtTrack, digits: digits,
    thDate: thDate, today: today, postLink: postLink, byDateDesc: byDateDesc,
    toast: toast, copy: copy
  };
})();
