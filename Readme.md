# 🔐 Secure Encoder Decoder

Secure Encoder Decoder is a small Chrome extension I built to encrypt and decrypt messages locally using password-based AES-GCM encryption via the browser’s Web Crypto API. The main goal here is simple: keep everything on the user’s device. No servers. No tracking. No background requests. Just local encryption.

## 🚀 What It Can Do

- 🔒 Encrypt messages using AES-GCM (same standard used in modern secure systems)
- 🔑 Generate secure keys from passwords (PBKDF2)
- 💻 Works completely offline
- 📋 Copy results with one click
- ⚡ Lightweight — no unnecessary libraries
- 🎨 Clean and minimal UI (nothing fancy, just functional)

## 🛠️ Built With

- HTML – For the UI layout
- CSS – Basic styling (kept intentionally simple)
- JavaScript – Handles encryption/decryption logic
- Web Crypto API – Native browser crypto (no third-party libraries)
- Chrome Extension Manifest v3
I avoided external crypto libraries on purpose since the browser already provides secure, optimized primitives.

## 📌 How It Works (High Level)

1. Type your message
2. Enter a password
3. Click Encrypt
4. You get unreadable ciphertext
5. Share it if needed
6. To decrypt, paste it back and use the same password
If the password is wrong, decryption fails — there’s no fallback or recovery mechanism (by design).

## 🔐 Security Notes

- All encryption happens locally in your browser
- Nothing is sent anywhere — no APIs, no backend
- Uses AES-GCM for authenticated encryption
- Passwords are converted into crypto keys using PBKDF2

This helps prevent tampering and protects against interception risks.

Important:
If you forget your password, there is no way to recover your message. That’s the trade-off for not storing anything externally.