// enquiry-validation.js
// In-browser validation for all enquiry forms

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('form#enquiry').forEach(form => {
    form.addEventListener('submit', function(e) {
      let valid = true;
      let messages = [];
      // Validate all required inputs
      form.querySelectorAll('input[required], textarea[required], select[required]').forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          messages.push(input.placeholder || input.name + ' is required');
          input.classList.add('border-red-500');
        } else {
          input.classList.remove('border-red-500');
        }
        // Email validation
        if (input.type === 'email' && input.value) {
          const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
          if (!emailPattern.test(input.value)) {
            valid = false;
            messages.push('Please enter a valid email address');
            input.classList.add('border-red-500');
          }
        }
        // Phone validation
        if (input.type === 'tel' && input.value) {
          const phonePattern = /^[0-9]{10}$/;
          if (!phonePattern.test(input.value.replace(/\D/g, ''))) {
            valid = false;
            messages.push('Please enter a valid 10-digit phone number');
            input.classList.add('border-red-500');
          }
        }
      });
      if (!valid) {
        e.preventDefault();
        alert(messages.join('\n'));
      } else {
        e.preventDefault();
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Show OTP modal
        showOTPModal(otp, form);
      }
    });
  });

  // OTP modal logic
  function showOTPModal(otp, form) {
    // Create modal HTML
    let modal = document.createElement('div');
    modal.id = 'otp-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.4)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    modal.innerHTML = `
      <div style="background:#fff;padding:2rem 2rem 1.5rem 2rem;border-radius:1rem;box-shadow:0 2px 16px #0002;max-width:350px;width:100%;text-align:center;">
        <h3 style="font-size:1.2rem;font-weight:600;color:#2563eb;margin-bottom:0.5rem;">OTP Verification</h3>
        <p style="font-size:0.95rem;color:#444;margin-bottom:1rem;">Enter the OTP shown below to verify your enquiry.</p>
        <div style="font-size:1.5rem;font-weight:700;letter-spacing:0.2em;color:#2563eb;margin-bottom:1rem;">${otp}</div>
        <input id="otp-input" type="text" maxlength="6" style="width:100%;border:1px solid #2563eb;border-radius:6px;padding:0.5rem 1rem;font-size:1.1rem;text-align:center;margin-bottom:1rem;" placeholder="Enter OTP">
        <button id="otp-verify-btn" style="background:#2563eb;color:#fff;font-weight:600;padding:0.5rem 1.5rem;border:none;border-radius:6px;cursor:pointer;font-size:1rem;">Verify</button>
        <div id="otp-error" style="color:#e11d48;font-size:0.95rem;margin-top:0.5rem;display:none;"></div>
      </div>
    `;
    document.body.appendChild(modal);
    // Focus input
    modal.querySelector('#otp-input').focus();
    // Handle verify
    modal.querySelector('#otp-verify-btn').onclick = function() {
      const val = modal.querySelector('#otp-input').value.trim();
      if (val === otp) {
        document.body.removeChild(modal);
        alert('Thank you! Your enquiry has been verified and received. We will contact you soon.');
        form.reset();
        form.querySelector('input, textarea, select')?.focus();
      } else {
        modal.querySelector('#otp-error').textContent = 'Incorrect OTP. Please try again.';
        modal.querySelector('#otp-error').style.display = 'block';
      }
    };
  }
});
