// js/main.js

// Simple screen management
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(screenId);
  if (screen) screen.classList.add('active');
}

// Wait for DOM and Firebase to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Initially show loading
  showScreen('loading-screen');

  // Check auth state
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is logged in; show lobby or game screen
      // For now, we'll show the lobby screen placeholder
      showScreen('lobby-screen');
      // We'll later integrate lobby logic
    } else {
      // Not logged in; show auth screen
      showScreen('auth-screen');
    }
  });
});
