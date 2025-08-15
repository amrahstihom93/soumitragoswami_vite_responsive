// Unified navbar logic for desktop and mobile
document.addEventListener('DOMContentLoaded', function () {
  // Desktop dropdown click support (only on desktop)
  function isDesktop() {
    return window.matchMedia('(min-width: 768px)').matches;
  }
  function setupDesktopDropdowns() {
    document.querySelectorAll('#main-menu-desktop .group > button').forEach(btn => {
      btn.addEventListener('click', function(e) {
        if (!isDesktop()) return;
        e.preventDefault();
        const parent = btn.parentElement;
        const dd = parent.querySelector('ul');
        if (!dd) return;
        const isOpen = dd.style.opacity === '1';
        // Close all dropdowns
        document.querySelectorAll('#main-menu-desktop .group > ul').forEach(u => { u.style.opacity = ''; u.style.pointerEvents = ''; });
        if (!isOpen) {
          dd.style.opacity = '1';
          dd.style.pointerEvents = 'auto';
        }
      });
      // Close dropdown on outside click
      document.addEventListener('click', function(e) {
        if (!btn.parentElement.contains(e.target)) {
          const dd = btn.parentElement.querySelector('ul');
          if (dd) { dd.style.opacity = ''; dd.style.pointerEvents = ''; }
        }
      });
    });
  }

  // Mobile menu toggle
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function (e) {
      if (isDesktop()) return; // Only for mobile
      e.stopPropagation();
      menu.classList.toggle('hidden');
      document.body.style.overflow = menu.classList.contains('hidden') ? '' : 'hidden';
    });
    document.addEventListener('click', function (e) {
      if (!isDesktop() && !menu.classList.contains('hidden') && !menu.contains(e.target) && e.target !== toggle) {
        menu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (!isDesktop()) {
        menu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }));
  }

  // Mobile accordion dropdowns
  document.querySelectorAll('[data-accordion]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      if (isDesktop()) return;
      e.stopPropagation();
      const sel = btn.getAttribute('data-accordion');
      const panel = btn.parentElement.querySelector(sel);
      const isOpen = !panel.classList.contains('hidden');
      // Close all
      btn.closest('ul').querySelectorAll('ul[id]').forEach(p => p.classList.add('hidden'));
      btn.closest('ul').querySelectorAll('[data-accordion]').forEach(b => b.setAttribute('aria-expanded', 'false'));
      if (!isOpen) {
        panel.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Setup desktop dropdowns on load and on resize
  setupDesktopDropdowns();
  window.addEventListener('resize', setupDesktopDropdowns);
});
