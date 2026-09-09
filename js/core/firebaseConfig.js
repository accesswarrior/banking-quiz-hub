// js/core/firebaseConfig.js

// Firebase configuration (compat SDK)
const firebaseConfig = {
  apiKey: "AIzaSyBwJzpnmSV845YrDDZYOVntL6sfFAVGaag",
  authDomain: "access-warrior-1d789.firebaseapp.com",
  projectId: "access-warrior-1d789",
  storageBucket: "access-warrior-1d789.firebasestorage.app",
  messagingSenderId: "875315539922",
  appId: "1:875315539922:web:df434dfd4316c0a457620b",
  measurementId: "G-N9JLL90K1E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
