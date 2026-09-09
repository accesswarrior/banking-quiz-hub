// js/core/auth.js

function usernameToEmail(username) {
  return username + "@werewolf.local";
}

document.getElementById('signup-btn').addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim().toLowerCase();
  const pin = document.getElementById('pin').value.trim();

  if (!username || !pin || pin.length !== 6 || !/^\d{6}$/.test(pin)) {
    document.getElementById('auth-error').textContent = "Username and 6-digit PIN are required.";
    return;
  }

  const email = usernameToEmail(username);

  try {
    // Check username uniqueness
    const usernameDoc = await db.collection('usernames').doc(username).get();
    if (usernameDoc.exists) {
      document.getElementById('auth-error').textContent = "Username already taken.";
      return;
    }

    // Create auth user
    const userCredential = await auth.createUserWithEmailAndPassword(email, pin);
    const uid = userCredential.user.uid;

    // Reserve username and profile
    await db.collection('usernames').doc(username).set({ uid });
    await db.collection('users').doc(uid).set({
      username: username,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Auth state listener will switch screen
  } catch (error) {
    console.error("Signup error:", error);
    document.getElementById('auth-error').textContent = error.message;
  }
});

document.getElementById('login-btn').addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim().toLowerCase();
  const pin = document.getElementById('pin').value.trim();

  if (!username || !pin) {
    document.getElementById('auth-error').textContent = "Enter username and 6-digit PIN.";
    return;
  }

  const email = usernameToEmail(username);

  try {
    await auth.signInWithEmailAndPassword(email, pin);
    // Auth state listener will handle redirect
  } catch (error) {
    console.error("Login error:", error);
    document.getElementById('auth-error').textContent = "Invalid username or PIN.";
  }
});

document.getElementById('logout-btn').addEventListener('click', () => {
  auth.signOut();
});
