// js/core/auth.js

// Helper: convert username to synthetic email
function usernameToEmail(username) {
  return username + "@werewolf.local";
}

// Signup
document.getElementById('signup-btn').addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim().toLowerCase();
  const pin = document.getElementById('pin').value.trim();

  if (!username || !pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
    document.getElementById('auth-error').textContent = "Username and 4-digit PIN are required.";
    return;
  }

  const email = usernameToEmail(username);

  try {
    // Check username uniqueness first
    const usernameDoc = await db.collection('usernames').doc(username).get();
    if (usernameDoc.exists) {
      document.getElementById('auth-error').textContent = "Username already taken.";
      return;
    }

    // Create Firebase Auth user
    const userCredential = await auth.createUserWithEmailAndPassword(email, pin);
    const uid = userCredential.user.uid;

    // Reserve username and store profile
    await db.collection('usernames').doc(username).set({ uid });
    await db.collection('users').doc(uid).set({
      username: username,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Success -> auth state listener will show lobby
  } catch (error) {
    document.getElementById('auth-error').textContent = error.message;
  }
});

// Login
document.getElementById('login-btn').addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim().toLowerCase();
  const pin = document.getElementById('pin').value.trim();

  if (!username || !pin) {
    document.getElementById('auth-error').textContent = "Enter username and PIN.";
    return;
  }

  const email = usernameToEmail(username);

  try {
    await auth.signInWithEmailAndPassword(email, pin);
    // Auth state listener will handle redirect
  } catch (error) {
    document.getElementById('auth-error').textContent = "Invalid username or PIN.";
  }
});

function logout() {
  auth.signOut();
}
