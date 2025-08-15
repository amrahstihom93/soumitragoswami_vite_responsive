// Modern Premium Navbar Interactivity
// Handles mobile drawer, dropdowns, and accessibility

document.addEventListener('DOMContentLoaded', function () {
  // Mobile drawer open/close
  const burger = document.getElementById('navbar-burger');
  const drawer = document.getElementById('navbar-mobile');
  const closeBtn = document.getElementById('navbar-close');

  if (burger && drawer) {
    burger.addEventListener('click', () => {
      drawer.style.transform = 'translateX(0)';
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.style.transform = 'translateX(100%)';
      document.body.style.overflow = '';
    });
  }
  // Close drawer on outside click
  drawer && drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      drawer.style.transform = 'translateX(100%)';
      document.body.style.overflow = '';
    }
  });

  // Mobile dropdowns
  document.querySelectorAll('[data-mobile-dropdown]').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = btn.getAttribute('data-mobile-dropdown');
      const menu = document.getElementById('mobile-dropdown-' + id);
      if (menu) {
        menu.classList.toggle('open');
        btn.setAttribute('aria-expanded', menu.classList.contains('open'));
      }
    });
  });

  // Accessibility: close drawer with Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.style.transform === 'translateX(0)') {
      drawer.style.transform = 'translateX(100%)';
      document.body.style.overflow = '';
    }
  });
});
