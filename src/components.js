// HTML Component Templates
export const ComponentTemplates = {
  // Button Component
  button: (text, type = 'primary', size = '', icon = '', onClick = '') => `
    <button class="btn btn-${type} ${size ? `btn-${size}` : ''} ${icon ? 'btn-icon' : ''}" ${onClick ? `onclick="${onClick}"` : ''}>
      ${icon ? `<i class="${icon}"></i>` : ''}
      <span>${text}</span>
    </button>
  `,

  // Card Component
  card: (content, type = '', hover = true) => `
    <div class="card ${type ? `card-${type}` : ''} ${hover ? 'card-hover' : ''}">
      <div class="card-body">
        ${content}
      </div>
    </div>
  `,

  // Service Card Component
  serviceCard: (icon, iconBg, title, description, linkColor, link = '#') => `
    <div class="service-card card-gradient card-${iconBg}">
      <div class="service-icon bg-${iconBg}-600">
        <i class="${icon} text-white text-2xl"></i>
      </div>
      <h3 class="card-title">${title}</h3>
      <p class="card-text mb-6">${description}</p>
      <a href="${link}" class="text-${linkColor}-600 font-semibold hover:text-${linkColor}-700 transition-colors">
        Learn More <i class="fas fa-arrow-right ml-1"></i>
      </a>
    </div>
  `,

  // Team Member Component
  teamMember: (image, name, role, alt = '') => `
    <div class="team-member">
      <div class="team-image-wrapper">
        <img src="${image}" alt="${alt || name}" class="team-image">
        <div class="team-overlay"></div>
      </div>
      <h3 class="team-name">${name}</h3>
      <p class="team-role">${role}</p>
    </div>
  `,

  // Testimonial Component
  testimonial: (avatar, name, role, content, rating = 5) => `
    <div class="testimonial-card">
      <div class="testimonial-header">
        <img src="${avatar}" alt="${name}" class="testimonial-avatar">
        <div class="testimonial-info">
          <h4 class="testimonial-name">${name}</h4>
          <p class="testimonial-role">${role}</p>
        </div>
      </div>
      <p class="testimonial-content">"${content}"</p>
      <div class="testimonial-rating">
        ${Array(rating).fill('<i class="fas fa-star"></i>').join('')}
      </div>
    </div>
  `,

  // Form Input Component
  formInput: (type, placeholder, required = false, id = '') => `
    <div class="form-group">
      ${id ? `<label for="${id}" class="form-label">${placeholder}</label>` : ''}
      <input 
        type="${type}" 
        ${id ? `id="${id}" name="${id}"` : ''} 
        placeholder="${placeholder}" 
        class="form-input" 
        ${required ? 'required' : ''}
      >
    </div>
  `,

  // Form Select Component
  formSelect: (options, placeholder, required = false, id = '') => `
    <div class="form-group">
      ${id ? `<label for="${id}" class="form-label">${placeholder}</label>` : ''}
      <select 
        ${id ? `id="${id}" name="${id}"` : ''} 
        class="form-select" 
        ${required ? 'required' : ''}
      >
        <option value="">${placeholder}</option>
        ${options.map(option => `<option value="${option.value}">${option.text}</option>`).join('')}
      </select>
    </div>
  `,

  // Form Textarea Component
  formTextarea: (placeholder, rows = 4, required = false, id = '') => `
    <div class="form-group">
      ${id ? `<label for="${id}" class="form-label">${placeholder}</label>` : ''}
      <textarea 
        ${id ? `id="${id}" name="${id}"` : ''} 
        placeholder="${placeholder}" 
        rows="${rows}" 
        class="form-textarea" 
        ${required ? 'required' : ''}
      ></textarea>
    </div>
  `,

  // Contact Info Item Component
  contactInfo: (icon, label, value) => `
    <div class="contact-info-item">
      <div class="contact-icon-wrapper">
        <i class="${icon} contact-icon"></i>
      </div>
      <div class="contact-details">
        <h4 class="contact-label">${label}</h4>
        <p class="contact-value">${value}</p>
      </div>
    </div>
  `,

  // Social Link Component
  socialLink: (icon, url, platform) => `
    <a href="${url}" class="social-link" aria-label="${platform}" target="_blank" rel="noopener noreferrer">
      <i class="${icon} text-white"></i>
    </a>
  `,

  // Badge Component
  badge: (text, type = 'primary') => `
    <span class="badge badge-${type}">${text}</span>
  `,

  // Hero Stat Component
  heroStat: (number, label, prefix = '', suffix = '') => `
    <div class="hero-stat">
      <div class="hero-stat-number counter">${prefix}${number}${suffix}</div>
      <div class="hero-stat-label">${label}</div>
    </div>
  `,

  // Section Header Component
  sectionHeader: (title, subtitle = '') => `
    <div class="section-header">
      <h2 class="section-title">${title}</h2>
      ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
    </div>
  `,

  // Navigation Component
  navbar: (brand, logo, links, ctaText = 'Get Started') => `
    <header class="navbar">
      <nav class="nav-container">
        <div class="flex items-center justify-between">
          <div class="nav-brand">
            <img src="${logo}" alt="${brand}" class="nav-logo">
            <span class="nav-title">${brand}</span>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="nav-menu">
            ${links.map(link => `<a href="${link.href}" class="nav-link">${link.text}</a>`).join('')}
            <button class="btn btn-primary">${ctaText}</button>
          </div>

          <!-- Mobile Menu Button -->
          <button id="mobile-menu-btn" class="nav-mobile-btn">
            <i class="fas fa-bars text-xl"></i>
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div id="mobile-menu" class="nav-mobile-menu hidden">
          ${links.map(link => `<a href="${link.href}" class="nav-mobile-link">${link.text}</a>`).join('')}
          <button class="btn btn-primary btn-full mt-2">${ctaText}</button>
        </div>
      </nav>
    </header>
  `,

  // Footer Component
  footer: (brand, logo, sections, contactInfo, socialLinks) => `
    <footer class="footer">
      <div class="container mx-auto px-6">
        <div class="footer-content">
          <div class="footer-section">
            <div class="nav-brand mb-4">
              <img src="${logo}" alt="${brand}" class="h-8 w-auto">
              <span class="text-lg font-bold">${brand}</span>
            </div>
            <p class="text-gray-400 mb-4">
              Your trusted financial advisor for investments, insurance, and comprehensive financial planning.
            </p>
            <div class="social-links">
              ${socialLinks.map(link => ComponentTemplates.socialLink(link.icon, link.url, link.platform)).join('')}
            </div>
          </div>
          
          ${sections.map(section => `
            <div class="footer-section">
              <h4 class="footer-title">${section.title}</h4>
              <ul class="footer-links">
                ${section.links.map(link => `<li><a href="${link.href}" class="footer-link">${link.text}</a></li>`).join('')}
              </ul>
            </div>
          `).join('')}

          <div class="footer-section">
            <h4 class="footer-title">Contact Info</h4>
            <ul class="footer-links">
              ${contactInfo.map(info => `
                <li class="flex items-center">
                  <i class="${info.icon} mr-2"></i>
                  ${info.value}
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2025 ${brand}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,

  // Toast Component
  toast: (message, type = 'success', icon = 'fas fa-check-circle') => `
    <div class="toast toast-${type}">
      <i class="${icon}"></i>
      <span>${message}</span>
      <button class="toast-close">&times;</button>
    </div>
  `,

  // Loading Component
  loading: (text = 'Loading...') => `
    <div class="loading-component flex items-center justify-center p-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
      <span class="text-gray-600">${text}</span>
    </div>
  `,

  // Modal Component
  modal: (id, title, content, size = 'md') => `
    <div id="${id}" class="modal fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
      <div class="modal-content bg-white rounded-xl p-6 max-w-${size} w-full mx-4 max-h-full overflow-y-auto">
        <div class="modal-header flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold">${title}</h3>
          <button class="modal-close text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
      </div>
    </div>
  `,

  // Image Component with lazy loading
  image: (src, alt, className = '', lazy = true) => `
    <img 
      ${lazy ? 'data-src' : 'src'}="${src}" 
      alt="${alt}" 
      class="${className} ${lazy ? 'lazy' : ''}"
      ${lazy ? 'loading="lazy"' : ''}
    >
  `
};

// Component Builder Class
export class ComponentBuilder {
  constructor() {
    this.components = [];
  }

  // Add component to builder
  add(componentHtml) {
    this.components.push(componentHtml);
    return this;
  }

  // Build and return HTML string
  build() {
    return this.components.join('\n');
  }

  // Clear components
  clear() {
    this.components = [];
    return this;
  }

  // Render to DOM element
  renderTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = this.build();
    }
    return this;
  }
}

// Helper function to create components easily
export function createComponent(type, ...args) {
  if (ComponentTemplates[type]) {
    return ComponentTemplates[type](...args);
  }
  console.warn(`Component type "${type}" not found`);
  return '';
}

// Export all for easy access
export default { ComponentTemplates, ComponentBuilder, createComponent };
