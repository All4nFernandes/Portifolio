const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

// Função para redimensionar o canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Chama a função de redimensionamento inicial
resizeCanvas();

// Ouve o evento de redimensionamento da janela
window.addEventListener("resize", resizeCanvas);

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = Array.from({ length: columns }).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Ajuste o fundo do canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0"; // Cor do texto (verde)
  ctx.font = `${fontSize}px monospace`;

  drops.forEach((y, index) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    const x = index * fontSize;
    ctx.fillText(text, x, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[index] = 0;
    }

    drops[index]++;
  });
}

setInterval(draw, 33);
