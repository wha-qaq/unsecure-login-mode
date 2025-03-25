# unsecure-login-mode
# 🔐 The Unsecure Login System

This is an **intentionally insecure login system** built with Node.js, Express, and SQLite. It is designed for **educational purposes only** to help students learn about web application security by analyzing common vulnerabilities and practicing secure coding techniques.

> ⚠️ Do NOT deploy this app to production environments. It is insecure by design.

---

## 🚀 Features (All Insecure by Design)

- ✅ Plaintext password storage
- ✅ SQL injection vulnerability
- ✅ No session management
- ✅ No HTTPS
- ✅ Poor error handling
- ✅ No input sanitization or validation

---

## 🎓 Learning Objectives

This project allows students to:

- Identify vulnerabilities in web apps
- Perform white-box and black-box testing
- Simulate SQL injection and credential attacks
- Apply patches and security best practices
- Reflect on secure software design and development

---

## 🧠 Suggested Student Activities

1. 🔎 **Explore** the login system and register new users
2. 🐞 **Test** for vulnerabilities (e.g. try SQL injection)
3. 🛡️ **Fix** the issues by:
   - Adding input sanitization
   - Hashing passwords
   - Using parameterized queries
4. 📄 **Document** the risks and their impacts in a report
5. ✨ **Refactor** the system securely for comparison

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- SQLite
- HTML, CSS, JavaScript
- GitHub Codespaces (for sandboxed environments)

---

## ⚙️ Running in GitHub Codespaces

> ✅ Codespaces support is pre-configured with `.devcontainer/`

1. Fork this repository to your own GitHub account
2. Go to the green `Code` button → **Codespaces tab**
3. Click **Create codespace on main**
4. In the terminal inside Codespaces, run:

```bash
npm install
npm start


Open the forwarded port (usually 3000) to access the login system