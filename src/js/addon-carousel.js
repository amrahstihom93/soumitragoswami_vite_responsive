// Simple horizontal carousel for add-on cards
// Usage: Place your add-on cards inside a container with id 'addon-carousel'
// and left/right buttons with ids 'carousel-left' and 'carousel-right'.

const carousel = document.getElementById('addon-carousel');
const leftBtn = document.getElementById('carousel-left');
const rightBtn = document.getElementById('carousel-right');
const scrollStep = 240; // Card width + gap, adjust as needed
let autoScrollInterval = null;


function moveFirstToLast() {
  if (!carousel) return;
  const first = carousel.children[0];
  carousel.appendChild(first);
}

function moveLastToFirst() {
  if (!carousel) return;
  const last = carousel.children[carousel.children.length - 1];
  carousel.insertBefore(last, carousel.children[0]);
}

function scrollRight() {
  if (!carousel) return;
  carousel.scrollBy({ left: scrollStep, behavior: 'smooth' });
  setTimeout(() => {
    moveFirstToLast();
    carousel.scrollLeft = 0;
  }, 350);
}

function scrollLeft() {
  if (!carousel) return;
  moveLastToFirst();
  carousel.scrollLeft = scrollStep;
  carousel.scrollBy({ left: -scrollStep, behavior: 'smooth' });
}

if (carousel && leftBtn && rightBtn) {
  leftBtn.addEventListener('click', scrollLeft);
  rightBtn.addEventListener('click', scrollRight);
}

// Auto-scroll every 4 seconds, with infinite loop
if (carousel) {
  autoScrollInterval = setInterval(scrollRight, 4000);
  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  carousel.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(scrollRight, 4000);
  });
}
