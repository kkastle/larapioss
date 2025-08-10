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

  // Função Like / Dislike com armazenamento e bloqueio múltiplo
  const likeBtn = document.getElementById("like-btn");
  const dislikeBtn = document.getElementById("dislike-btn");
  const likeCount = document.getElementById("like-count");
  const dislikeCount = document.getElementById("dislike-count");

  // Chave para localStorage — pode mudar se quiser identificar por perfil diferente
  const STORAGE_KEY = "profile1-likes-dislikes";

  // Tenta pegar do localStorage
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    likes: 0,
    dislikes: 0,
    userAction: null, // "like" ou "dislike"
  };

  // Atualiza visual com os dados salvos
  likeCount.textContent = data.likes;
  dislikeCount.textContent = data.dislikes;

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  likeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (data.userAction === "like") return; // já curtiu
    if (data.userAction === "dislike") {
      // remove dislike antes
      data.dislikes = Math.max(0, data.dislikes - 1);
    }
    data.likes++;
    data.userAction = "like";
    updateUI();
    saveData();
  });

  dislikeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (data.userAction === "dislike") return; // já descurtiu
    if (data.userAction === "like") {
      // remove like antes
      data.likes = Math.max(0, data.likes - 1);
    }
    data.dislikes++;
    data.userAction = "dislike";
    updateUI();
    saveData();
  });

  function updateUI() {
    likeCount.textContent = data.likes;
    dislikeCount.textContent = data.dislikes;

    // Estilo simples para mostrar qual botão está ativo
    if (data.userAction === "like") {
      likeBtn.style.backgroundColor = "#00ffff";
      likeBtn.style.color = "#000";
      dislikeBtn.style.backgroundColor = "rgba(0,255,255,0.1)";
      dislikeBtn.style.color = "#00ffff";
    } else if (data.userAction === "dislike") {
      dislikeBtn.style.backgroundColor = "#00ffff";
      dislikeBtn.style.color = "#000";
      likeBtn.style.backgroundColor = "rgba(0,255,255,0.1)";
      likeBtn.style.color = "#00ffff";
    } else {
      // Nenhum escolhido
      likeBtn.style.backgroundColor = "rgba(0,255,255,0.1)";
      likeBtn.style.color = "#00ffff";
      dislikeBtn.style.backgroundColor = "rgba(0,255,255,0.1)";
      dislikeBtn.style.color = "#00ffff";
    }
  }

  updateUI();
});
