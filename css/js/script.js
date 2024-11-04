  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
 
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAebhAXefm1oJQr1mqOu9lA1LVVKNRPFeQ",
    authDomain: "authfirebase-86c77.firebaseapp.com",
    projectId: "authfirebase-86c77",
    storageBucket: "authfirebase-86c77.firebasestorage.app",
    messagingSenderId: "575022160860",
    appId: "1:575022160860:web:1ae0b0ee5d5071f6660d19",
    measurementId: "G-NDD8LQCGT0"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const auth = getAuth(app);

  document.getElementById("reg").addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah reload halaman
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;
    const firstname = document.getElementById("fn").value;
    const lastname = document.getElementById("ln").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
  
    // Simpan data pengguna ke Realtime Database
    set(ref(db, '/users/' + email.replace('.', '_')), {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname
    })
    .then(() => {
      alert("Register Succeed");
    })
    .catch((error) => {
      console.error("Error saat registrasi:", error);
      alert("Register Failed");
    });
  });
});

document.getElementById("login-btn").addEventListener('click', function(e) {
  e.preventDefault();
  
  const email = document.getElementById("Username").value;
  const password = document.getElementById("pass").value;

  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          console.log("Login successful:", userCredential.user);
          window.location.href = "home.html"; // Redirect ke halaman home setelah login berhasil
      })
      .catch((error) => {
          console.error("Login failed:", error);
          alert("Login failed: " + error.message);
      });
});

// Mendapatkan elemen dari DOM
const loginContainer = document.getElementById("login");
const registerContainer = document.getElementById("register");

// Fungsi untuk menampilkan form login
function login() {
    loginContainer.classList.add("active"); // Menambahkan kelas active pada form login
    registerContainer.classList.remove("active"); // Menghapus kelas active dari form registrasi
}

// Fungsi untuk menampilkan form registrasi
function register() {
    registerContainer.classList.add("active"); // Menambahkan kelas active pada form registrasi
    loginContainer.classList.remove("active"); // Menghapus kelas active dari form login
}

// Inisialisasi: Tampilkan form login secara default
window.onload = function() {
    login();
};
