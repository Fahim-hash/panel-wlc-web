// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// আপনার দেওয়া অফিসিয়াল ফায়ারবেস কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyDUydeISF9BqDdw4sM0WeqnbZwplVfGd78",
  authDomain: "wlc-web-bf259.firebaseapp.com",
  projectId: "wlc-web-bf259",
  storageBucket: "wlc-web-bf259.firebasestorage.app",
  messagingSenderId: "526167751031",
  appId: "1:526167751031:web:bf4a0da5bd45548c858972"
};

// Next.js-এর ডুপ্লিকেট অ্যাপ ইনিশিয়ালাইজেশন এরর এড়ানোর জন্য এই কন্ডিশন:
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ডেটাবেজ এবং স্টোরেজ এক্সপোর্ট
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
