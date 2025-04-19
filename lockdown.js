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

const LOCKDOWN = (() => {
    let options = {
      redirectUrl: '',
      disableContextMenu: true,
      disableShorcuts: true,
      disableTextCopy: true,
      disableTextCut: true,
      disableTextSelection: true,
      disableMouseDown: true,
      disableDevTools: true
    };
  
    function DevToolsOpened() {
      if (options.redirectUrl) {
        location.href = options.redirectUrl;
      }
    }
  
    function blockContextMenu() {
      document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
      }, true);
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
  
    function blockTextCopy() {
      document.addEventListener('copy', (e) => e.preventDefault());
    }
  
    function blockTextCut() {
      document.addEventListener('cut', (e) => e.preventDefault());
    }
  
    function blockTextSelection() {
      document.addEventListener('selectstart', (e) => e.preventDefault());
    }
  
    function blockMouseDown() {
      document.addEventListener('mousedown', (e) => e.preventDefault());
    }
  
    function detectDevTools() {
      // Chrome/Edge detection
      const devtools = function () {};
      devtools.toString = function () {
        DevToolsOpened();
        return '-';
      };
  
      setInterval(() => {
        console.profile(devtools);
        console.profileEnd(devtools);
        if (console.clear) {
          console.clear();
        }
      }, 1000);
  
      // Firefox resize detection
      if (navigator.userAgent.toLowerCase().includes('firefox')) {
        window.onresize = function () {
          if (
            (window.outerHeight - window.innerHeight > 100) ||
            (window.outerWidth - window.innerWidth > 100)
          ) {
            DevToolsOpened();
          }
        };
      }
  
      // Firebug detection
      if ((window.console && window.console.firebug) || console.assert(1) === '_firebugIgnore') {
        DevToolsOpened();
      }
  
      // Inspect element trap
      let checkStatus;
      const element = document.createElement('any');
      Object.defineProperty(element, 'id', {
        get: function () {
          checkStatus = 'on';
          return '';
        }
      });
  
      setInterval(() => {
        checkStatus = 'off';
        console.log(element);
        console.clear();
  
        if (checkStatus === 'on') {
          DevToolsOpened();
        }
      }, 1000);
    }
  
    return {
      init(config) {
        options = { ...options, ...config };
  
        if (options.disableContextMenu) blockContextMenu();
        if (options.disableShorcuts) blockShortcuts();
        if (options.disableTextCopy) blockTextCopy();
        if (options.disableTextCut) blockTextCut();
        if (options.disableTextSelection) blockTextSelection();
        if (options.disableMouseDown) blockMouseDown();
        if (options.disableDevTools) detectDevTools();
      }
    };
  })();
  