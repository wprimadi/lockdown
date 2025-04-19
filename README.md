# LOCKDOWN 🛡️

**Log Obfuscation & Console Kill-switch with Devtools Override Warning Network**

**LOCKDOWN** is a lightweight JavaScript library designed to protect your website from unwanted user interactions such as opening DevTools, copying text, right-clicking, and more. This library helps you add an extra layer of front-end security in just a few lines of code.

---

## ✨ Features

- 🔒 Detect and block browser DevTools
- 🖱️ Disable right-click (context menu)
- 🧠 Block keyboard shortcuts like F12, Ctrl+Shift+I, Ctrl+U, etc.
- 📋 Prevent text copy and cut
- ❌ Disable text selection
- 🚫 Block mouse down actions
- 🔄 Optional redirect when DevTools is detected

---

## 🚀 Getting Started

### 1. Install

You can include it directly in your HTML file:

```html
<script src="lockdown.js"></script>
```

### 2. Initialize

```javascript
lockdown.init({
  redirectUrl: '/access_denied',       // URL to redirect when DevTools is opened
  disableContextMenu: true,            // Default: true
  disableShorcuts: true,               // Default: true
  disableTextCopy: true,               // Default: true
  disableTextCut: true,                // Default: true
  disableTextSelection: true,          // Default: true
  disableMouseDown: true,              // Default: true
  disableDevTools: true                // Default: true
});
```

All options are optional. If omitted, they will use the default values.

---

## ⚙️ Configuration Options

| Option                 | Type     | Default       | Description                                                              |
|------------------------|----------|---------------|--------------------------------------------------------------------------|
| `redirectUrl`          | `string` | empty string  | URL to redirect when DevTools is detected. Leave empty to skip redirect. |
| `disableContextMenu`   | `bool`   | `true`        | Disable right-click menu.                                                |
| `disableShorcuts`      | `bool`   | `true`        | Block developer tool-related keyboard shortcuts.                         |
| `disableTextCopy`      | `bool`   | `true`        | Prevent users from copying text.                                         |
| `disableTextCut`       | `bool`   | `true`        | Prevent users from cutting text.                                         |
| `disableTextSelection` | `bool`   | `true`        | Disable text selection on the page.                                      |
| `disableMouseDown`     | `bool`   | `true`        | Disable mouse down interaction.                                          |
| `disableDevTools`      | `bool`   | `true`        | Enable/disable DevTools detection mechanism.                             |

---

## 🔐 Use Case

LOCKDOWN is perfect for:
- Web-based quizzes or assessments
- SaaS dashboards with sensitive UI elements
- Public landing pages where copying or debugging is discouraged
- Frontend-only applications requiring extra client-side security

---

## 🌐 Compatibility

![Chrome](https://img.shields.io/badge/Chrome-135.0.7049.85-blue?logo=googlechrome)
![Edge](https://img.shields.io/badge/Edge-135.0.3179.73-blue?logo=microsoftedge)
![Firefox](https://img.shields.io/badge/Firefox-137.0.2-orange?logo=firefox)
![Opera](https://img.shields.io/badge/Opera-117.0.5408.197-red?logo=opera)

---

## ⚠️ Disclaimer

This library only provides basic obfuscation and deterrence. It is not a foolproof security solution and should be used alongside proper backend validation and security best practices.

---

## 📄 License

MIT License © 2025 Wahyu Primadi