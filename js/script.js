// Firebase config e init (com compat)
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

// Inicializa Firebase compat
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// DOM Elements
const intro = document.getElementById("intro");
const mainContent = document.getElementById("main-content");
const introText = document.querySelector("#intro .intro-content p");
const music = document.getElementById("music");

const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");
const likeCount = document.getElementById("like-count");
const dislikeCount = document.getElementById("dislike-count");

// Intro messages
const messages = ["Não clica porra", "Ok, você que sabe."];
let clickCount = 0;

// Evento clique intro
intro.addEventListener("click", () => {
  console.log("Intro clicado!"); // DEBUG

  if (clickCount < messages.length) {
    introText.textContent = messages[clickCount];
    clickCount++;
  } else {
    intro.classList.add("fade-out");
    setTimeout(() => {
      mainContent.classList.remove("hidden");
      playMusic();
      // desativa o intro para não interferir mais no clique
      intro.style.pointerEvents = "none";
    }, 500);
  }
});

function playMusic() {
  music.play().catch(e => console.log("Erro ao tocar música:", e));
}

// Título animado na aba
const titles = ["Polonie", "2k25!"];
let index = 0;
setInterval(() => {
  document.title = titles[index];
  index = (index + 1) % titles.length;
}, 1000);

// Atualiza contagem no DOM
function updateCounts(likes, dislikes) {
  likeCount.textContent = likes;
  dislikeCount.textContent = dislikes;
}

// Ler votos do Firebase ao carregar
function loadVotes() {
  db.ref("votes").once("value")
    .then(snapshot => {
      const data = snapshot.val() || { likes: 0, dislikes: 0 };
      console.log("Votos carregados:", data);
      updateCounts(data.likes, data.dislikes);
    })
    .catch(err => console.error("Erro ao carregar votos:", err));
}

loadVotes();

// Adiciona voto com transação para evitar conflito
function addVote(type) {
  const voteRef = db.ref("votes");
  voteRef.transaction(currentData => {
    if (currentData === null) {
      currentData = { likes: 0, dislikes: 0 };
    }
    if (type === "like") currentData.likes++;
    if (type === "dislike") currentData.dislikes++;
    return currentData;
  }, (error, committed, snapshot) => {
    if (error) {
      console.error("Erro ao atualizar votos:", error);
    } else if (committed) {
      const data = snapshot.val();
      console.log("Votos atualizados:", data);
      updateCounts(data.likes, data.dislikes);
    }
  });
}

// Controle de múltiplos votos usando localStorage
function canVote() {
  return !localStorage.getItem("hasVoted");
}

function markVoted() {
  localStorage.setItem("hasVoted", "true");
}

// Botões de like/dislike
likeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  if (canVote()) {
    addVote("like");
    markVoted();
  } else {
    alert("Você já votou!");
  }
});

dislikeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  if (canVote()) {
    addVote("dislike");
    markVoted();
  } else {
    alert("Você já votou!");
  }
});
