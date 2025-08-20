// --- Premium glass nav pill animation ---
document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.glass-nav-menu');
  const pill = document.querySelector('.glass-nav-pill');
  const items = Array.from(menu.querySelectorAll('.glass-nav-item, .glass-nav-btn'));
  function movePillTo(el) {
    const menuRect = menu.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    pill.style.left = (rect.left - menuRect.left) + 'px';
    pill.style.width = rect.width + 'px';
  }
  // Set initial pill position
  const active = menu.querySelector('.active') || items[0];
  movePillTo(active);
  // Animate pill on hover/focus/click
  items.forEach(item => {
    item.addEventListener('mouseenter', () => movePillTo(item));
    item.addEventListener('focus', () => movePillTo(item));
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      movePillTo(item);
    });
  });
  menu.addEventListener('mouseleave', () => movePillTo(menu.querySelector('.active') || items[0]));
});
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
