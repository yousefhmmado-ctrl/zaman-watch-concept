/* ZAMAN website — shared header/footer + Arabic product data */
(function () {
  const M = window.ZAMAN_MODELS;
  window.ORDER = ['layl', 'noor', 'qamar', 'bahr', 'sahra', 'jamr', 'sawad', 'fajr'];
  window.LINE_AR = { Heritage: 'التراث', Sport: 'الرياضة', Limited: 'إصدار محدود' };
  window.TAG_AR = { Leather: 'جلد', Steel: 'ستيل', Limited: 'محدود' };
  window.SPEC_AR = k => (M[k].strapType === 'steel' ? 'سوار ستيل' : 'حزام جلد') + ' · ٤٠ مم · أوتوماتيك';
  window.priceAR = n => n.toLocaleString('ar-SA') + ' ر.س';

  const page = document.body.dataset.page;
  const icons = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.4 2.2 1.8 3.7 4 4v3c-1.5 0-2.9-.4-4-1.2V15a6 6 0 1 1-6-6v3.1a3 3 0 1 0 3 2.9V3h3z"/></svg>',
    snapchat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3c3 0 5 2.2 5 5v3l2-.6c.6 0 .8.8.2 1.1l-2.2 1c.6 1.7 1.9 3 3.6 3.5-.4.8-1.6 1-2.8 1.1-.3.6-.2 1.4-1 1.4-1 0-1.9-.5-3 .1-.7.4-1.2 1.4-2.8 1.4s-2.1-1-2.8-1.4c-1.1-.6-2-.1-3-.1-.8 0-.7-.8-1-1.4-1.2-.1-2.4-.3-2.8-1.1 1.7-.5 3-1.8 3.6-3.5l-2.2-1c-.6-.3-.4-1.1.2-1.1l2 .6V8c0-2.8 2-5 5-5z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20z" stroke-linejoin="round"/><path d="M9 8.5c0 3 2.5 6.5 6.5 6.5l1-1.5-2-1-1 1c-1-.4-2.6-2-3-3l1-1-1-2L9 8.5z" fill="currentColor" stroke="none"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3l-6.6 7.6L21.7 21h-6.1l-4.8-6.2L5.3 21h-3l7.1-8.1L2 3h6.3l4.3 5.7L17.5 3zm-1 16.2h1.7L7.6 4.7H5.8l10.7 14.5z"/></svg>'
  };

  const head = document.createElement('header');
  head.className = 'site-head';
  head.innerHTML = `<div class="wrap">
    <a class="logo" href="index.html" aria-label="ZAMAN">${zamanMark('#C9A86A', 3)}<b>ZAMAN</b></a>
    <ul class="nav">
      <li><a href="index.html" class="${page === 'home' ? 'on' : ''}">الرئيسية</a></li>
      <li><a href="collection.html" class="${page === 'collection' ? 'on' : ''}">كل الساعات</a></li>
    </ul>
    <a class="head-act" href="#" aria-label="السلة"><span class="lbl">السلة</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M5 8h14l-1.2 12H6.2L5 8z" stroke-linejoin="round"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg><span class="count" id="bagCount">0</span></a>
  </div>`;
  document.body.prepend(head);

  const foot = document.createElement('footer');
  foot.className = 'site-foot';
  foot.id = 'contact';
  foot.innerHTML = `<div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="logo" href="index.html">${zamanMark('#C9A86A', 3)}<b>ZAMAN</b></a>
        <p class="foot-about">ساعات أوتوماتيكية بتصميم هادئ، صُنعت لتُلبس كل يوم.</p>
        <div class="socials">
          <a href="#" aria-label="Instagram">${icons.instagram}</a>
          <a href="#" aria-label="TikTok">${icons.tiktok}</a>
          <a href="#" aria-label="Snapchat">${icons.snapchat}</a>
          <a href="#" aria-label="WhatsApp">${icons.whatsapp}</a>
          <a href="#" aria-label="X">${icons.x}</a>
        </div>
      </div>
      <div><h4>المتجر</h4><ul><li><a href="collection.html">كل الساعات</a></li><li><a href="collection.html#Limited">الإصدارات المحدودة</a></li><li><a href="#">الأحزمة</a></li></ul></div>
      <div><h4>المساعدة</h4><ul><li><a href="#">الشحن والتوصيل</a></li><li><a href="#">الاستبدال والإرجاع</a></li><li><a href="#">الضمان والصيانة</a></li><li><a href="#">الأسئلة الشائعة</a></li></ul></div>
    </div>
    <div class="foot-bar">
      <span>© ٢٠٢٦ <span class="latin">ZAMAN</span>. جميع الحقوق محفوظة.</span>
      <nav><a href="#">سياسة الخصوصية</a><a href="#">الشروط والأحكام</a><a href="#">سياسة الاستخدام</a></nav>
    </div>
  </div>`;
  document.body.append(foot);

  let bag = 0;
  window.addToBag = () => { bag++; document.getElementById('bagCount').textContent = bag.toLocaleString('ar-SA'); };
})();
