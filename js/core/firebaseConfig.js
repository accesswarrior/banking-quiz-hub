// js/core/firebaseConfig.js
const firebaseConfig = {
  apiKey: "AIzaSyBwJzpnmSV845YrDDZYOVntL6sfFAVGaag",
  authDomain: "access-warrior-1d789.firebaseapp.com",
  projectId: "access-warrior-1d789",
  storageBucket: "access-warrior-1d789.firebasestorage.app",
  messagingSenderId: "875315539922",
  appId: "1:875315539922:web:df434dfd4316c0a457620b"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
