// ==========================================================
// FIREBASE SETUP — TutorPro Query Form
// ==========================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---------- 1. YOUR FIREBASE PROJECT CONFIG ----------
const firebaseConfig = {
  apiKey: "AIzaSyC-JYak4K9_fDF25Vx5RvU_5pcX-rvf69k",
  authDomain: "tutorpro-1ca4c.firebaseapp.com",
  projectId: "tutorpro-1ca4c",
  storageBucket: "tutorpro-1ca4c.firebasestorage.app",
  messagingSenderId: "191425127029",
  appId: "1:191425127029:web:c87554634e52e2287bce3c",
  measurementId: "G-85RYGVGC7Z"
};

// ---------- 2. INITIALIZE FIREBASE + FIRESTORE ----------
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------- 3. WIRE UP THE FORM ----------
const queryForm = document.getElementById("queryForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitQueryBtn");

// मैसेज को कुछ देर बाद ऑटो-डिलीट (Hide) करने का फ़ंक्शन
let statusTimeout;
function showStatusMessage(text, isError = false, duration = 5000) {
  // अगर कोई पुराना टाइमर चल रहा है तो उसे रोकें
  clearTimeout(statusTimeout);

  formStatus.textContent = text;
  formStatus.className = "form-status show"; // शो क्लास जोड़ें
  if (isError) {
    formStatus.classList.add("error");
  }

  // 5 सेकंड (5000ms) बाद मैसेज हटा दें
  statusTimeout = setTimeout(() => {
    formStatus.classList.remove("show", "error");
    formStatus.textContent = "";
  }, duration);
}

if (queryForm && formStatus && submitBtn) {
  queryForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullNameInput").value.trim();
    const whatsapp = document.getElementById("whatsappInput").value.trim();
    const grade = document.getElementById("gradeSelect").value;
    const applyAs = document.getElementById("applyAsSelect").value;

    if (!fullName || !whatsapp || !grade || !applyAs) {
      showStatusMessage("Please fill in all fields.", true);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
      await addDoc(collection(db, "queries"), {
        fullName: fullName,
        whatsapp: whatsapp,
        grade: grade,
        applyAs: applyAs,
        createdAt: serverTimestamp()
      });

      showStatusMessage("✅ Thanks! Our team will contact you within 24 hours.", false);
      queryForm.reset();
    } catch (err) {
      console.error("Firestore submit error:", err);
      showStatusMessage("Something went wrong. Please try again or WhatsApp us directly.", true);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Query";
    }
  });
}