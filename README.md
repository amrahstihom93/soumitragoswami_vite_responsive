# Soumitra Goswami - Financial Advisor Website

This is a responsive website for Soumitra Goswami, a financial advisor and investment consultant. The site provides information about services, team, testimonials, and includes a contact form with OTP verification (demo mode). It also features financial calculators (SIP, EMI, Retirement, Inflation) as a floating widget.

## Features

- Responsive design using Tailwind CSS
- Modern navigation with dropdowns and mobile drawer
- Service, About, Team, and Testimonials sections
- Contact form with OTP modal (demo, not connected to backend)
- Floating financial tools widget (SIP, EMI, Retirement, Inflation calculators)
- Social media and important links in the footer

## Project Structure

- `index.html` - Main landing page
- `sip.html`, `ins.html`, `loan.html`, `itr.html`, `other.html`, `cert.html`, `login.html` - Service and info pages
- `src/style.css` - Main stylesheet (Tailwind CSS)
- `src/main.js` - Main JavaScript for UI interactions
- `src/financial-tools.js` - Financial calculators logic
- `public/img/` - Images and assets

## How to Use

1. **Install dependencies** (if using Tailwind or npm scripts):
   ```
   npm install
   ```

2. **Development**:
   - Open `index.html` directly in your browser for static preview.
   - If using a local server (recommended for modules and routing), run:
     ```
     npx serve .
     ```
     or use the Vite dev server if configured.

3. **Build CSS** (if you change Tailwind classes):
   ```
   npx tailwindcss -i ./src/style.css -o ./src/style.css --watch
   ```

4. **Deployment**:
   - Upload all files to your web hosting (including `index.html`, `src/`, `public/img/`, etc.).
   - No backend is required for the static site, but OTP and contact form will need backend integration for production.

## Fast2SMS Integration (for OTP)

- The current OTP modal is a demo and does not send real SMS.
- To enable real OTP via Fast2SMS:
  1. Create a backend endpoint (Node.js/Express recommended).
  2. Use the [Fast2SMS API](https://www.fast2sms.com/) to send OTP to the user's phone.
  3. Update the contact form JS to call your backend for OTP send/verify.

**Example Fast2SMS Node.js usage:**
```js
const axios = require('axios');
axios.post('https://www.fast2sms.com/dev/bulkV2', {
  variables_values: '123456',
  route: 'otp',
  numbers: '9876543210'
}, {
  headers: { 'authorization': 'YOUR_FAST2SMS_API_KEY' }
});
```

## Customization

- Update images in `public/img/` as needed.
- Edit content in `index.html` and other HTML files for your branding.
- Adjust styles in `src/style.css`.

## License

This project is for personal/portfolio use. For commercial use, please consult the author.

---

Designed by Pixel&Protocol.