document.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("startScreen");
  const introTextContainer = document.getElementById("IntroText");
  const introTitle = introTextContainer.querySelector(".titulo");
  const mainContent = document.querySelector("main");

  // Esconde intro inicialmente
  introTextContainer.style.opacity = "0";
  introTextContainer.style.pointerEvents = "none";

  startScreen.addEventListener("click", () => {
    
    // Fade out Start
    startScreen.style.opacity = "0";

    setTimeout(() => {
      startScreen.style.display = "none";

      // Mostra intro
      introTextContainer.style.opacity = "1";
      introTitle.classList.add("show");

      // Após 3 segundos mostra conteúdo principal
      setTimeout(() => {
        introTextContainer.style.opacity = "0";

        setTimeout(() => {
          introTextContainer.style.display = "none";
          mainContent.style.opacity = "1";
          document.body.style.overflow = "auto";
        }, 1000);

      }, 3000);

    }, 500);

  });
});
