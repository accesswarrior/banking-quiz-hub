// js/main.js

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(screenId);
  if (screen) screen.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  showScreen('loading-screen');

  auth.onAuthStateChanged(user => {
    if (user) {
      showScreen('lobby-screen');
      // We'll fill lobby content later
    } else {
      showScreen('auth-screen');
    }
  });
});
