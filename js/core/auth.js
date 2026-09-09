// js/core/auth.js

// Show/hide username field on signup
document.getElementById('signup-btn').addEventListener('click', () => {
  document.getElementById('username').style.display = 'block';
  document.getElementById('login-btn').style.display = 'none';
  document.getElementById('signup-btn').style.display = 'none';
  document.getElementById('auth-error').textContent = '';
});

document.getElementById('login-btn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    await auth.signInWithEmailAndPassword(email, password);
    // Auth state listener will handle screen change
  } catch (error) {
    document.getElementById('auth-error').textContent = error.message;
  }
});

// Signup flow: first create user, then set username in Firestore
document.getElementById('signup-btn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value.trim();

  if (!username) {
    document.getElementById('auth-error').textContent = "Username required for signup.";
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    // Save username to Firestore user document
    await db.collection('users').doc(userCredential.user.uid).set({
      username: username,
      email: email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    // Auth state listener will now show lobby
  } catch (error) {
    document.getElementById('auth-error').textContent = error.message;
  }
});

// Logout function (can be called from lobby)
function logout() {
  auth.signOut();
}
