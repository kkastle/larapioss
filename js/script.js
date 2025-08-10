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

  // Função Like / Dislike
  const likeBtn = document.getElementById("like-btn");
  const dislikeBtn = document.getElementById("dislike-btn");
  const likeCount = document.getElementById("like-count");
  const dislikeCount = document.getElementById("dislike-count");

  let likes = 0;
  let dislikes = 0;

  likeBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // evita clique subir pra perfil
    likes++;
    likeCount.textContent = likes;
  });

  dislikeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dislikes++;
    dislikeCount.textContent = dislikes;
  });
});
