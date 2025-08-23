// Account Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
const accountBtn = document.getElementById('account-btn');
const accountModal = document.getElementById('account-modal');
const closeModal = document.querySelector('.close-modal');
const authTabs = document.querySelectorAll('.auth-tab');
const authContents = document.querySelectorAll('.auth-content');

// Open modal when account button clicked
accountBtn.addEventListener('click', function() {
  accountModal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Close modal
closeModal.addEventListener('click', function() {
  accountModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Close when clicking outside modal
accountModal.addEventListener('click', function(e) {
  if (e.target === accountModal) {
    accountModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Tab switching
authTabs.forEach(tab => {
  tab.addEventListener('click', function() {
    const tabId = this.getAttribute('data-tab');
    
    // Update active tab
    authTabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    
    // Update active content
    authContents.forEach(c => c.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
  });
});
});
