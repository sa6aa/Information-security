document.getElementById("password").addEventListener('input', checkStrength);

function checkStrength() {
    let password = document.getElementById("password").value;
    let progress = 0;
    let requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[^A-Za-z0-9]/.test(password)
    };

    progress = 0;
    for (let key in requirements) {
        if (requirements[key]) progress += 25;
    }

    let strengthText = document.getElementById("strength");
    let progressBar = document.getElementById("progress-bar");

    if (progress === 100) {
        strengthText.textContent = "💪 قوية جدًا";
        progressBar.style.backgroundColor = "green";
    } else if (progress >= 50) {
        strengthText.textContent = "⚠️ متوسطة";
        progressBar.style.backgroundColor = "orange";
    } else {
        strengthText.textContent = "❌ ضعيفة";
        progressBar.style.backgroundColor = "red";
    }

    progressBar.style.width = `${progress}%`;
}

function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById("password").value = password;
    checkStrength();
}

function copyPassword() {
    navigator.clipboard.writeText(document.getElementById("password").value).then(() => {
        alert("تم نسخ كلمة المرور بنجاح");
    });
}
