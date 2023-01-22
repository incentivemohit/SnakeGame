var boxsize = 25;
var rows = 18;
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
var score = 25;

window.onload = function () {
  board = document.getElementById("board");
  board.width = cols * boxsize;
  board.height = rows * boxsize;
  context = board.getContext("2d");
  placeFood();
  document.getElementById("leftButton").addEventListener("click", moveLeft);
  document.getElementById("upButton").addEventListener("click", moveUp);
  document.getElementById("rightButton").addEventListener("click", moveRight);
  document.getElementById("downButton").addEventListener("click", moveDown);

  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    location.reload();
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "yellow";
  context.fillRect(foodX, foodY, boxsize, boxsize);

  if (snakeX == foodX && snakeY == foodY) {
    snake.push([foodX, foodY]);
    score = score + 25;
    document.getElementById("game-score").innerHTML = score;
    placeFood();
  }

  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = snake[i - 1];
  }
  if (snake.length) {
    snake[0] = [snakeX, snakeY];
  }

  context.fillStyle = "white";
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
    document.getElementById("game-body").style.display = "none";
    document.getElementById("game-over-indicator1").style.display = "block";
    document.getElementById("play-button").onclick = function () {
      gameOver = true;
    };
  }
  for (let i = 0; i < snake.length; i++) {
    if (snakeX == snake[i][0] && snakeY == snake[i][1]) {
      document.getElementById("game-body").style.display = "none";
      document.getElementById("game-over-indicator2").style.display = "block";
      document.getElementById("play-button").onclick = function () {
        gameOver = true;
      };
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * boxsize;
  foodY = Math.floor(Math.random() * rows) * boxsize;
}

//game control functions

function moveLeft() {
  if (velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
}

function moveUp() {
  if (velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  }
}

function moveRight() {
  if (velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}
function moveDown() {
  if (velocityX != -1) {
    velocityX = 0;
    velocityY = 1;
  }
}

//play and pause audio

document.getElementById("musicButton").addEventListener("click", togglePlay);

function togglePlay() {
  var myAudio = document.getElementById("myAudio");
  var btn = document.getElementById("musicButton");
  if (myAudio.paused && btn.value == "OFF") {
    myAudio.play();
    btn.value = "ON";
  } else {
    myAudio.pause();
    btn.value = "OFF";
  }
}
