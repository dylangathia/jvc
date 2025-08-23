document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const mpesaForm = document.getElementById('mpesa-form');
  const recurringForm = document.getElementById('recurring-form');
  const amountOptions = document.querySelectorAll('.amount-option');
  const customAmount = document.getElementById('custom-amount');
  const paymentModal = document.getElementById('payment-modal');
  const closeModalBtn = document.getElementById('close-payment-modal');
  const faqItems = document.querySelectorAll('.faq-item');
  
  // Clipboard.js for copy button
  new ClipboardJS('.copy-btn').on('success', function(e) {
    const originalText = e.trigger.innerHTML;
    e.trigger.innerHTML = '<i class="ri-check-line"></i> Copied!';
    setTimeout(() => {
      e.trigger.innerHTML = originalText;
    }, 2000);
  });

  // Amount selection
  amountOptions.forEach(option => {
    option.addEventListener('click', function() {
      amountOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      customAmount.value = '';
    });
  });

  customAmount.addEventListener('focus', function() {
    amountOptions.forEach(opt => opt.classList.remove('active'));
  });

  // M-Pesa Form Submission
  mpesaForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amount = document.getElementById('amount').value;
    const phone = document.getElementById('phone').value;
    const mpesaButton = document.getElementById('mpesa-button');
    const mpesaStatus = document.getElementById('mpesa-status');
    
    // Validate inputs
    if (!phone.match(/^7\d{8}$/)) {
      showStatus(mpesaStatus, 'Please enter a valid M-Pesa number (7XXXXXXXX)', 'error');
      return;
    }
    
    if (amount < 10) {
      showStatus(mpesaStatus, 'Minimum amount is KES 10', 'error');
      return;
    }

    // Show processing modal
    showPaymentModal({
      message: 'Processing your donation',
      details: `Sending KES ${amount} request to 254${phone}`
    });

    // Disable button during processing
    mpesaButton.disabled = true;
    mpesaButton.innerHTML = '<i class="ri-loader-4-line spin"></i> Processing...';

    // Simulate API call (replace with actual fetch to your backend)
    setTimeout(() => {
      // This is where you would normally call your backend API
      // fetch('/initiate-payment', { method: 'POST', body: JSON.stringify({ phone, amount }) })
      
      // For demo purposes, we're simulating a successful response
      mpesaButton.disabled = false;
      mpesaButton.innerHTML = '<i class="ri-send-plane-fill"></i> Send Payment Request';
      
      updatePaymentModal({
        message: 'Payment Request Sent',
        details: `Check your phone 254${phone} to complete payment`
      });
      
      // Show success in form
      showStatus(mpesaStatus, `M-Pesa request sent to 254${phone}! Check your phone to complete payment.`, 'success');
      
      // Reset form after 5 seconds
      setTimeout(() => {
        mpesaForm.reset();
        mpesaStatus.style.display = 'none';
      }, 5000);
    }, 3000);
  });

  // Recurring Form Submission
  recurringForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amount = document.querySelector('.amount-option.active')?.dataset.amount || customAmount.value;
    const frequency = document.getElementById('frequency').value;
    
    if (!amount || amount < 100) {
      alert('Please select or enter an amount (minimum KES 100)');
      return;
    }

    showPaymentModal({
      message: 'Setting Up Recurring Giving',
      details: `KES ${amount} ${frequency} from your M-Pesa`
    });

    // Simulate processing
    setTimeout(() => {
      updatePaymentModal({
        message: 'Recurring Giving Set Up',
        details: `You'll receive a confirmation SMS shortly`
      });
    }, 3000);
  });

  // FAQ Accordion
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
      const answer = item.querySelector('.faq-answer');
      
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = null;
      }
    });
  });

  // Modal Controls
  closeModalBtn.addEventListener('click', () => {
    paymentModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
      paymentModal.style.display = 'none';
    }
  });

  // Helper Functions
  function showPaymentModal({ message, details }) {
    document.getElementById('payment-message').textContent = message;
    document.getElementById('payment-details').textContent = details;
    paymentModal.style.display = 'flex';
  }

  function updatePaymentModal({ message, details }) {
    document.getElementById('payment-message').textContent = message;
    document.getElementById('payment-details').textContent = details;
    document.getElementById('payment-loader').style.display = 'none';
  }

  function showStatus(element, message, type) {
    element.innerHTML = message;
    element.className = `payment-status ${type}`;
    element.style.display = 'block';
  }
});