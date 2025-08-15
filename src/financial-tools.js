// financial-tools.js
// Simple in-page financial calculators for the widget

document.addEventListener('DOMContentLoaded', function() {
  // SIP Calculator
  function calculateSIP(p, r, n) {
    r = r / 100 / 12;
    return Math.round(p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  }

  // Loan EMI Calculator
  function calculateEMI(p, r, n) {
    r = r / 100 / 12;
    return Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  }

  // Retirement Calculator (simple future value)
  function calculateRetirement(p, r, n) {
    r = r / 100;
    return Math.round(p * Math.pow(1 + r, n));
  }

  // Inflation Calculator
  function calculateInflation(p, r, n) {
    r = r / 100;
    return Math.round(p * Math.pow(1 + r, n));
  }

  // Widget logic
  function showTool(toolId) {
    document.querySelectorAll('.widget-tool').forEach(el => el.classList.add('hidden'));
    document.getElementById(toolId).classList.remove('hidden');
  }

  // Add toggler event listeners for calculator buttons
  document.querySelectorAll('.widget-tool-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      // Remove active class from all toggler buttons
      document.querySelectorAll('.widget-tool-btn').forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      // Show the corresponding calculator form
      showTool(btn.getAttribute('data-tool'));
    });
  });

  // Helper: Format result
  function formatResult(val) {
    return isNaN(val) ? '' : val.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }

  // SIP Calculator Form
  document.getElementById('sip-calc-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const amount = parseFloat(form.amount.value);
    const rate = parseFloat(form.rate.value);
    const months = parseInt(form.months.value);
    if (isNaN(amount) || isNaN(rate) || isNaN(months) || amount <= 0 || rate <= 0 || months <= 0) {
      form.result.value = '';
      form.result.placeholder = 'Please enter valid values.';
      return;
    }
    // SIP formula: FV = P * [((1 + r)^n - 1) / r] * (1 + r)
    const r = rate / 100 / 12;
    const maturity = amount * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    form.result.value = formatResult(maturity);
    form.result.placeholder = '';
  });

  // EMI Calculator Form
  document.getElementById('emi-calc-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const amount = parseFloat(form.amount.value);
    const rate = parseFloat(form.rate.value);
    const months = parseInt(form.months.value);
    if (isNaN(amount) || isNaN(rate) || isNaN(months) || amount <= 0 || rate <= 0 || months <= 0) {
      form.result.value = '';
      form.result.placeholder = 'Please enter valid values.';
      return;
    }
    // EMI formula: EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
    const r = rate / 100 / 12;
    const emi = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    form.result.value = formatResult(emi);
    form.result.placeholder = '';
  });

  // Retirement Calculator Form
  document.getElementById('ret-calc-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const amount = parseFloat(form.amount.value);
    const rate = parseFloat(form.rate.value);
    const years = parseInt(form.years.value);
    if (isNaN(amount) || isNaN(rate) || isNaN(years) || amount <= 0 || rate <= 0 || years <= 0) {
      form.result.value = '';
      form.result.placeholder = 'Please enter valid values.';
      return;
    }
    // Retirement FV formula: FV = P * (1 + r)^n
    const r = rate / 100;
    const future = amount * Math.pow(1 + r, years);
    form.result.value = formatResult(future);
    form.result.placeholder = '';
  });

  // Inflation Calculator Form
  document.getElementById('inf-calc-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const amount = parseFloat(form.amount.value);
    const rate = parseFloat(form.rate.value);
    const years = parseInt(form.years.value);
    if (isNaN(amount) || isNaN(rate) || isNaN(years) || amount <= 0 || rate <= 0 || years <= 0) {
      form.result.value = '';
      form.result.placeholder = 'Please enter valid values.';
      return;
    }
    // Inflation FV formula: FV = P * (1 + r)^n
    const r = rate / 100;
    const future = amount * Math.pow(1 + r, years);
    form.result.value = formatResult(future);
    form.result.placeholder = '';
  });
});

