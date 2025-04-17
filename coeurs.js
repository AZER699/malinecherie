const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "1000";

let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createHeart() {
  const x = Math.random() * canvas.width;
  const size = 10 + Math.random() * 10;
  const speed = 0.5 + Math.random() * 1.5;
  hearts.push({ x, y: 0, size, speed });
}

function drawHeart(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
  ctx.bezierCurveTo(x - size, y + size, x, y + size * 1.5, x, y + size * 2);
  ctx.bezierCurveTo(x, y + size * 1.5, x + size, y + size, x + size, y);
  ctx.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
  ctx.fillStyle = "#ff4d6d";
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let heart of hearts) {
    heart.y += heart.speed;
    drawHeart(heart.x, heart.y, heart.size);
  }
  hearts = hearts.filter(h => h.y < canvas.height);
  requestAnimationFrame(animate);
}

setInterval(createHeart, 300);
animate();
setTimeout(() => {
    const msg = document.getElementById("surprise-message");
    msg.classList.add("visible");
  }, 10000);
  