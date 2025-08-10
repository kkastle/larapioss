// script.js

// Config do seu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGK_RvBvHq9RaX0pbAEJocThMbizAEm8w",
  authDomain: "polonie-d6c60.firebaseapp.com",
  databaseURL: "https://polonie-d6c60-default-rtdb.firebaseio.com",
  projectId: "polonie-d6c60",
  storageBucket: "polonie-d6c60.firebasestorage.app",
  messagingSenderId: "218120828682",
  appId: "1:218120828682:web:0faae8e3734549c9072cf3",
  measurementId: "G-8C37WPZ6B0"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Referências para likes e dislikes no Realtime Database
const likesRef = database.ref('likes');
const dislikesRef = database.ref('dislikes');

document.addEventListener("DOMContentLoaded", function () {
  const intro = document.getElementById("intro");
  const mainContent = document.getElementById("main-content");
  const music = document.getElementById("music");
  const introText = document.querySelector("#intro .intro-content p");

  const messages = ["Não clica porra", "Ok, você que sabe."];
  let clickCount = 0;

  intro.addEventListener("click", function () {
    if (clickCount < messages.length) {
      introText.textContent = messages[clickCount];
      clickCount++;
    } else {
      intro.classList.add("fade-out");
      mainContent.classList.remove("hidden");
      playMusic();
    }
  });

  function playMusic() {
    music.play();
  }

  // título animado na aba do navegador
  const titles = ["Polonie", "2k25!"];
  let index = 0;
  setInterval(function () {
    document.title = titles[index];
    index = (index + 1) % titles.length;
  }, 1000);

  // Contadores da interface
  const likeBtn = document.getElementById("like-btn");
  const dislikeBtn = document.getElementById("dislike-btn");
  const likeCount = document.getElementById("like-count");
  const dislikeCount = document.getElementById("dislike-count");

  // Atualiza os contadores em tempo real vindo do Firebase
  likesRef.on('value', (snapshot) => {
    const val = snapshot.val() || 0;
    likeCount.textContent = val;
  });

  dislikesRef.on('value', (snapshot) => {
    const val = snapshot.val() || 0;
    dislikeCount.textContent = val;
  });

  // Função para impedir múltiplos votos (localStorage)
  function canVote() {
    return !localStorage.getItem('voted');
  }

  likeBtn.addEventListener('click', () => {
    if (!canVote()) {
      alert('Você já votou!');
      return;
    }
    likesRef.transaction(current => (current || 0) + 1);
    localStorage.setItem('voted', 'true');
  });

  dislikeBtn.addEventListener('click', () => {
    if (!canVote()) {
      alert('Você já votou!');
      return;
    }
    dislikesRef.transaction(current => (current || 0) + 1);
    localStorage.setItem('voted', 'true');
  });
});
