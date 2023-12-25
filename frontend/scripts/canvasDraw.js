const canvas = document.getElementById("drawArea");
const ctx = canvas.getContext("2d");
let isDrawing = false;

// Event Listeners
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDrawing);
canvas.addEventListener("mouseout", endDrawing);

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function draw(e) {
  if (!isDrawing) return;

  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function endDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
