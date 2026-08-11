// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc,
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ---------- FIREBASE PROJECT CONFIG ----------
const firebaseConfig = {
  apiKey: "AIzaSyC-JYak4K9_fDF25Vx5RvU_5pcX-rvf69k",
  authDomain: "tutorpro-1ca4c.firebaseapp.com",
  projectId: "tutorpro-1ca4c",
  storageBucket: "tutorpro-1ca4c.firebasestorage.app",
  messagingSenderId: "191425127029",
  appId: "1:191425127029:web:c87554634e52e2287bce3c",
  measurementId: "G-85RYGVGC7Z"
};

// ---------- INITIALIZE SERVICES ----------
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Services for Login & Dashboard
export { 
  auth,
  db,
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  collection, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc 
};

// ---------- WIRE UP PUBLIC QUERY FORM ----------
const queryForm = document.getElementById("queryForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitQueryBtn");

let statusTimeout;
function showStatusMessage(text, isError = false, duration = 5000) {
  clearTimeout(statusTimeout);
  if (!formStatus) return;

  formStatus.textContent = text;
  formStatus.className = "form-status show";
  if (isError) {
    formStatus.classList.add("error");
  }

  statusTimeout = setTimeout(() => {
    formStatus.classList.remove("show", "error");
    formStatus.textContent = "";
  }, duration);
}

if (queryForm && formStatus && submitBtn) {
  queryForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullNameInput = document.getElementById("fullNameInput");
    const whatsappInput = document.getElementById("whatsappInput");
    const gradeSelect = document.getElementById("gradeSelect");
    const applyAsSelect = document.getElementById("applyAsSelect");

    const fullName = fullNameInput ? fullNameInput.value.trim() : "";
    const whatsapp = whatsappInput ? whatsappInput.value.trim() : "";
    const grade = gradeSelect ? gradeSelect.value : "";
    const applyAs = applyAsSelect ? applyAsSelect.value : "";

    if (!fullName || !whatsapp || !grade || !applyAs) {
      showStatusMessage("Please fill in all fields.", true);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
      // Direct Firestore Save to "queries" collection
      await addDoc(collection(db, "queries"), {
        fullName: fullName,
        whatsapp: whatsapp,
        grade: grade,
        applyAs: applyAs,
        status: false, // Checkbox default value for Dashboard tracking
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