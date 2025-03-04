// assets/js/chat.js
import './common.js';

// المراجع إلى عناصر واجهة الدردشة
const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// دالة للحصول على رد البوت من API (وهمية لأغراض التجربة)
async function getBotReply(message) {
  // استدعاء API خارجي (استبدل الرابط أدناه بالخاص بخدمتكم الفعلية)
  try {
    const response = await fetch('https://api.example.com/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: message })
    });
    if (response.ok) {
      const data = await response.json();
      if (data.reply) {
        return data.reply;
      }
    }
  } catch (err) {
    console.error('خطأ في استدعاء واجهة الدردشة:', err);
  }
  // ردود افتراضية (بديلة) في حال عدم توفر استجابة من API
  const msgLower = message.toLowerCase();
  if (msgLower.includes('مرحبا') || msgLower.includes('hello')) {
    return 'مرحبًا! كيف يمكنني مساعدتك؟';
  }
  if (msgLower.includes('اسم')) {
    return 'أنا مجرد بوت دردشة تجريبي.';
  }
  // رد افتراضي عام
  return 'عذرًا، لم أفهم سؤالك. سأواصل التعلم لتحسين إجاباتي.';
}

// إرسال رسالة عند النقر على زر الإرسال أو عند الضغط على Enter
function sendMessage() {
  const userText = chatInput.value.trim();
  if (userText === '') return; // لا ترسل رسالة فارغة
  // إنشاء عنصر لرسالة المستخدم وإضافته إلى نافذة الدردشة
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'message user';
  userMsgEl.textContent = userText;
  chatWindow.appendChild(userMsgEl);
  chatInput.value = ''; // تفريغ حقل الإدخال بعد الإرسال

  // الحصول على رد البوت وإضافته للنافذة
  getBotReply(userText).then(replyText => {
    const botMsgEl = document.createElement('div');
    botMsgEl.className = 'message bot';
    botMsgEl.textContent = replyText;
    chatWindow.appendChild(botMsgEl);
    // تمرير نافذة الدردشة إلى الأسفل لإظهار الرسالة الأخيرة
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });
}

// ربط زر الإرسال ووظيفة الإرسال مع الضغط على Enter
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
