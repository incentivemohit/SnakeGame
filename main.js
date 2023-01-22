var boxsize = 25;
var rows = 20;
var cols = 20;
var context;
var board;

var snakeX = boxsize * 5;
var snakeY = boxsize * 5;

var foodX = boxsize * 10;
var foodY = boxsize * 15;

var velocityX = 0;
var velocityY = 0;

var snake = [];
var gameOver = false;
var count = 0;
var snakeLength = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.width = cols * boxsize;
  board.height = rows * boxsize;
  context = board.getContext("2d");
  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    location.reload();
    return;
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "green";
  context.fillRect(foodX, foodY, boxsize, boxsize);

  if (snakeX == foodX && snakeY == foodY) {
    snake.push([foodX, foodY]);
    snakeLength++;
    document.getElementById("game-score").innerHTML = snakeLength;
    placeFood();
  }

  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = snake[i - 1];
  }
  if (snake.length) {
    snake[0] = [snakeX, snakeY];
  }

  context.fillStyle = "red";
  snakeX += velocityX * boxsize;
  snakeY += velocityY * boxsize;
  context.fillRect(snakeX, snakeY, boxsize, boxsize);

  for (let i = 0; i < snake.length; i++) {
    context.fillRect(snake[i][0], snake[i][1], boxsize, boxsize);
  }

  if (
    snakeX < 0 ||
    snakeX > (cols - 1) * boxsize ||
    snakeY < 0 ||
    snakeY > (rows - 1) * boxsize
  ) {
    document.getElementById("game-over").style.display = "block";
    document.getElementById("play-button").onclick = function () {
      gameOver = true;
    };
  }
  for (let i = 0; i < snake.length; i++) {
    if (snakeX == snake[i][0] && snakeY == snake[i][1]) {
      gameOver = true;
      alert("Game Over! Play Again");
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * boxsize;
  foodY = Math.floor(Math.random() * rows) * boxsize;
}
