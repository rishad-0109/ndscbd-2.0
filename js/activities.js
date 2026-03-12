function showTab(tabId) {
  document.querySelectorAll('.activity-grid').forEach(tab => {
    tab.classList.remove('active-tab');
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  document.getElementById(tabId).classList.add('active-tab');

  event.target.classList.add('active');
}