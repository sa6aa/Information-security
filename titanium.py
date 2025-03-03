from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_wtf.csrf import CSRFProtect
import secrets
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)
csrf = CSRFProtect(app)

# بيانات مستخدمين مؤقتة
users = {
    "admin": {
        "password": generate_password_hash("123456"),  # تخزين كلمة المرور بتشفير
        "name": "مدير النظام"
    }
}

@app.route("/", methods=["GET", "POST"])
def login():
    if session.get('logged_in'):
        return redirect(url_for('dashboard'))
    
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        
        user = users.get(username)
        if user and check_password_hash(user['password'], password):
            session['logged_in'] = True
            session['username'] = username
            flash("✅ مرحبا بك! تم تسجيل الدخول بنجاح", "success")
            return redirect(url_for("dashboard"))
        else:
            flash("⚠️ بيانات الدخول غير صحيحة", "danger")
    
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template("dashboard.html", username=session.get("username"))

@app.route("/logout")
def logout():
    session.clear()
    flash("❌ تم تسجيل الخروج", "info")
    return redirect(url_for('login'))

if __name__ == "__main__":
    app.run(debug=True)
