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
        const threshold = 160;
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
        const key = e.key.toLowerCase();

        const combo = [
            e.metaKey && e.altKey && ['i', 'j', 'c', 'u'].includes(key),
            e.metaKey && e.shiftKey && key === 'c',
            e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key),
            e.key === 'F12',
            e.ctrlKey && key === 'u'
        ];

        if (combo.some(Boolean)) {
            e.preventDefault();
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
  