import './style.css';

// Liquid Glass Navigation System
class LiquidGlassNavigation {
  constructor() {
    this.navPlatter = null;
    this.navItems = [];
    this.dropletSelector = null;
    this.activeIndex = 0;
    this.isAnimating = false;
    this.init();
  }

  init() {
    setTimeout(() => {
      this.setupNavigation();
      this.bindEvents();
      this.setInitialPosition();
      
      // Ensure droplet is visible and positioned correctly after full initialization
      setTimeout(() => {
        if (!this.isMobile && this.dropletSelector) {
          this.dropletSelector.style.opacity = '1';
          this.dropletSelector.style.visibility = 'visible';
          // Re-position at Home button to ensure accuracy
          this.moveDropletToItem(0);
        }
      }, 200);
    }, 100);
  }

  setupNavigation() {
    this.navPlatter = document.querySelector('.glass-nav-platter');
    this.dropletSelector = document.querySelector('.liquid-droplet-selector');
    
    console.log('Glass platter element:', this.navPlatter);
    console.log('Droplet selector element:', this.dropletSelector);
    
    // Check if mobile
    this.isMobile = window.innerWidth <= 768;
    
    if (!this.navPlatter) {
      console.error('Navigation platter not found!');
      return;
    }
    
    // On mobile, droplet selector might not exist
    if (!this.dropletSelector && !this.isMobile) {
      console.error('Droplet selector not found!');
      return;
    }
    
    this.navItems = Array.from(this.navPlatter.querySelectorAll('.glass-nav-item'));
    console.log('=== NAVIGATION INITIALIZATION DEBUG ===');
    console.log('Found navigation items:', this.navItems.length);
    console.log('Navigation structure:');
    this.navItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      console.log(`  ${index}: "${item.textContent}" - Left: ${rect.left.toFixed(1)}, Width: ${rect.width.toFixed(1)}, Center: ${(rect.left + rect.width/2).toFixed(1)}`);
    });
    
    if (this.dropletSelector) {
      const dropletRect = this.dropletSelector.getBoundingClientRect();
      console.log('Droplet selector:', {
        left: dropletRect.left.toFixed(1),
        width: dropletRect.width.toFixed(1)
      });
    }
    
    const platterRect = this.navPlatter.getBoundingClientRect();
    console.log('Navigation platter:', {
      left: platterRect.left.toFixed(1),
      width: platterRect.width.toFixed(1)
    });
    console.log('=== END NAVIGATION DEBUG ===');
    
    // Ensure glass platter is visible
    this.navPlatter.style.display = 'block';
    this.navPlatter.style.visibility = 'visible';
    this.navPlatter.style.opacity = '1';
    
    this.navItems.forEach((item, index) => {
      item.dataset.index = index;
      console.log(`Nav item ${index}:`, item.textContent);
    });
  }

  setInitialPosition() {
    if (this.navItems.length > 0 && !this.isMobile) {
      // Always start at Home button (index 0) on page load
      const homeIndex = 0;
      
      // Set Home as active
      this.navItems.forEach((item, index) => {
        item.classList.toggle('active', index === homeIndex);
      });
      
      // Position the pill at Home button
      setTimeout(() => {
        this.moveDropletToItem(homeIndex);
      }, 150); // Small delay to ensure DOM is fully ready
    }
  }

  moveDropletToItem(index) {
    // Skip droplet movement on mobile
    if (this.isMobile || this.isAnimating || !this.dropletSelector || !this.navItems[index]) return;
    
    this.isAnimating = true;
    this.activeIndex = index;
    
    const targetItem = this.navItems[index];
    
    // Wait for DOM stability and use multiple frames for accuracy
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Get the container that holds both droplet and nav items
        const container = this.navPlatter;
        
        // Wait for next frame to ensure stable measurements
        setTimeout(() => {
          // Get fresh measurements
          const containerRect = container.getBoundingClientRect();
          const targetRect = targetItem.getBoundingClientRect();
          
          // Simple calculation: target's left edge relative to container + half of target's width - half of pill width
          const targetRelativeLeft = targetRect.left - containerRect.left;
          const targetCenter = targetRelativeLeft + (targetRect.width / 2);
          
          // Adaptive width
          const adaptiveWidth = Math.max(50, targetRect.width - 20);
          
          // Calculate pill position to center it on the button
          let pillLeft = targetCenter - (adaptiveWidth / 2);
          
          // Fine-tuning for each specific button
          switch(index) {
            case 0: // Home button
              pillLeft = pillLeft +0; // Already well positioned
              break;
            case 1: // Services button
              pillLeft = pillLeft - 10; // Shift slightly left
              break;
            case 2: // About button
              pillLeft = pillLeft - 16; // Shift slightly left
              break;
            case 3: // Team button
              pillLeft = pillLeft - 24; // Shift slightly right
              break;
            case 4: // Contact button
              pillLeft = pillLeft - 24; // Reduced from +2 to -1
              break;
          }
          
          console.log('FINE-TUNED CENTERING:', {
            index: index,
            target: targetItem.textContent.trim(),
            targetRelativeLeft: targetRelativeLeft.toFixed(1),
            targetCenter: targetCenter.toFixed(1),
            adaptiveWidth: adaptiveWidth.toFixed(1),
            pillLeft: pillLeft.toFixed(1),
            pillCenter: (pillLeft + adaptiveWidth/2).toFixed(1),
            adjustment: `Button ${index} (${targetItem.textContent.trim()})`
          });
          
          // Apply positioning
          this.dropletSelector.style.left = `${pillLeft}px`;
          this.dropletSelector.style.width = `${adaptiveWidth}px`;
        }, 10);
        this.dropletSelector.classList.add('morphing');
        
        // Create ripple effect
        this.createLiquidRipple(targetItem);
        
        // Update active states
        this.updateActiveStates(index);
        
        // Reset animation state
        setTimeout(() => {
          this.isAnimating = false;
          this.dropletSelector.classList.remove('morphing');
        }, 600);
      });
    });
  }

  createLiquidRipple(targetItem) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: radial-gradient(circle, 
        rgba(0, 122, 255, 0.4) 0%, 
        rgba(0, 122, 255, 0.2) 50%,
        transparent 100%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      pointer-events: none;
      z-index: 1;
      animation: liquidRippleExpand 0.6s ease-out forwards;
    `;
    
    targetItem.style.position = 'relative';
    targetItem.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  updateActiveStates(activeIndex) {
    this.navItems.forEach((item, index) => {
      item.classList.toggle('active', index === activeIndex);
    });
  }

  bindEvents() {
    if (!this.navPlatter || this.navItems.length === 0) return;
    
    this.navItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.moveDropletToItem(index);
        
        const targetId = item.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            const headerHeight = this.isMobile ? 80 : 120;
            const elementPosition = targetSection.offsetTop - headerHeight;
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        }
      });
      
      item.addEventListener('mouseenter', () => {
        if (!this.isMobile && !this.isAnimating) {
          item.style.transform = 'scale(1.05)';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        if (!this.isMobile && !this.isAnimating) {
          item.style.transform = 'scale(1)';
        }
      });
    });
    
    // Handle window resize for mobile detection
    window.addEventListener('resize', () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 768;
      
      if (wasMobile !== this.isMobile) {
        // Reinitialize navigation when switching between mobile/desktop
        setTimeout(() => {
          this.setupNavigation();
          this.setInitialPosition();
        }, 100);
      }
    });
  }
}

// Button Manager
class ButtonManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupButtons();
  }

  setupButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.createRipple(e, button);
      });
    });
  }

  createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    `;
    
    const buttonPos = window.getComputedStyle(button).position;
    if (buttonPos === 'static') {
      button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }
}

// Component System
class ComponentSystem {
  constructor() {
    this.init();
  }

  init() {
    console.log('Initializing Component System...');
    new LiquidGlassNavigation();
    new ButtonManager();
    console.log('Liquid Glass Navigation System Initialized');
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ComponentSystem();
});
