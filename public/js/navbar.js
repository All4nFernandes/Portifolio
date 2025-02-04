document.addEventListener("DOMContentLoaded", function () {
  fetch("Navbar/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("Navbar").innerHTML = data;
    })
    .catch((error) => console.error("Erro ao carregar a navbar:", error));
});
