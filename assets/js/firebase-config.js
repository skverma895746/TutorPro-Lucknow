// ==========================================================
// FIREBASE SETUP — TutorPro Query Form
// ==========================================================
// This file connects the "Get Started Today" form to a
// Firebase Firestore database using the modular v10 SDK
// loaded straight from Google's CDN (no build step needed).
//
// 1) Replace the firebaseConfig values below with YOUR OWN
//    project's config (Firebase Console → Project Settings →
//    General → "Your apps" → SDK setup and configuration).
// 2) In Firestore, form submissions will be saved to a
//    collection called "queries".
// ==========================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---------- 1. YOUR FIREBASE PROJECT CONFIG ----------
// TODO: replace these placeholder values with the config
// copied from your own Firebase project.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ---------- 2. INITIALIZE FIREBASE + FIRESTORE ----------
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------- 3. WIRE UP THE FORM ----------
const queryForm = document.getElementById("queryForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitQueryBtn");

if (queryForm && formStatus && submitBtn) {
  queryForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullNameInput").value.trim();
    const whatsapp = document.getElementById("whatsappInput").value.trim();
    const grade = document.getElementById("gradeSelect").value;
    const applyAs = document.getElementById("applyAsSelect").value;

    if (!fullName || !whatsapp || !grade || !applyAs) {
      formStatus.textContent = "Please fill in all fields.";
      formStatus.classList.add("show", "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    formStatus.classList.remove("show", "error");

    try {
      await addDoc(collection(db, "queries"), {
        fullName: fullName,
        whatsapp: whatsapp,
        grade: grade,
        applyAs: applyAs,
        createdAt: serverTimestamp()
      });

      formStatus.textContent = "✅ Thanks! Our team will contact you within 24 hours.";
      formStatus.classList.add("show");
      queryForm.reset();
    } catch (err) {
      console.error("Firestore submit error:", err);
      formStatus.textContent = "Something went wrong. Please try again or WhatsApp us directly.";
      formStatus.classList.add("show", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Query";
    }
  });
}