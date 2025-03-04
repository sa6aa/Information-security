// assets/js/common.js
// تعريف محتوى الهيدر المشترك:
const headerHTML = `
  <div class="header-container">
    <h1 class="logo">موقعي</h1>
    <nav>
      <a href="index.html">الرئيسية</a>
      <a href="about.html">من نحن</a>
      <a href="contact.html">اتصل بنا</a>
      <a href="chat.html">الدردشة</a>
      <a href="pentest.html">اختبار الاختراق</a>
    </nav>
  </div>
`;
// تعريف محتوى الفوتر المشترك:
const footerHTML = `
  <div class="footer-container">
    <p>© 2025 شركتي - جميع الحقوق محفوظة.</p>
  </div>
`;
// إدراج الهيدر والفوتر في الصفحة الحالية:
document.getElementById('site-header').innerHTML = headerHTML;
document.getElementById('site-footer').innerHTML = footerHTML;
