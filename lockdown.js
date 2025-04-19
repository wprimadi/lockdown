/*!
 * LOCKDOWN - Log Obfuscation & Console Kill-switch with Devtools Override Warning Network
 * 
 * Lightweight JavaScript library to secure your website by blocking DevTools access, 
 * disabling context menu, shortcuts, text copy/cut/select, and more. 
 * Built for front-end security hardening.
 * 
 * Author: Wahyu Primadi
 * Email: saya@wahyuprimadi.com
 * Website: https://wahyuprimadi.com
 * 
 * © 2025 Wahyu Primadi. All rights reserved.
 */

// LOCKDOWN.js

const lockdown = (function () {
    let config = {
      redirectUrl: '',
      disableContextMenu: true,
      disableShorcuts: true,
      disableTextCopy: true,
      disableTextCut: true,
      disableTextSelection: true,
      disableMouseDown: true,
      disableDevTools: true
    };
  
    function activateForbidden() {
      if (config.redirectUrl) {
        window.location.href = config.redirectUrl;
      } else {
        console.warn('DevTools opened!');
      }
    }
  
    function detectDevTools() {
      if (!config.disableDevTools) return;
  
      setInterval(() => {
        const threshold = 160; // typical devtools width/height
        const isDevToolsOpen = (
          window.outerWidth - window.innerWidth > threshold ||
          window.outerHeight - window.innerHeight > threshold
        );
  
        if (isDevToolsOpen) {
          activateForbidden();
        }
      }, 1000);
    }
  
    function blockShortcuts() {
      window.addEventListener('keydown', function (e) {
        if (
          (e.metaKey && e.altKey && [73, 74, 67, 85].includes(e.keyCode)) ||
          (e.metaKey && e.shiftKey && e.keyCode === 67) ||
          (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) ||
          (e.ctrlKey && e.keyCode === 85) ||
          e.keyCode === 123
        ) {
          e.preventDefault();
          //activateForbidden();
        }
      });
    }
  
    function preventDefaultAction(selector, eventType) {
      document.addEventListener(eventType, function (e) {
        e.preventDefault();
      });
    }
  
    function disableTextSelection() {
      document.addEventListener('selectstart', function (e) {
        e.preventDefault();
      });
    }
  
    function disableMouseDown() {
      document.addEventListener('mousedown', function (e) {
        e.preventDefault();
      });
    }
  
    return {
      init: function (options = {}) {
        config = { ...config, ...options };
  
        detectDevTools();
  
        if (config.disableContextMenu) {
          preventDefaultAction(document, 'contextmenu');
        }
  
        if (config.disableShorcuts) {
          blockShortcuts();
        }
  
        if (config.disableTextCopy) {
          preventDefaultAction(document, 'copy');
        }
  
        if (config.disableTextCut) {
          preventDefaultAction(document, 'cut');
        }
  
        if (config.disableTextSelection) {
          disableTextSelection();
        }
  
        if (config.disableMouseDown) {
          disableMouseDown();
        }
      }
    }
  })();
  
  