// assets/js/contact.js
import './common.js';

// العثور على عنصر النموذج وإضافة حدث الإرسال له
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // منع الإرسال الحقيقي
    alert('تم إرسال رسالتك! شكرًا لتواصلك معنا.'); // رسالة تأكيد بسيطة
    contactForm.reset(); // إعادة تعيين النموذج
  });
}
