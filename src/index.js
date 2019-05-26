// Game Constants
var score = 0;
var numLives = 20;
const NUMBLOCKS = 20;
const MAXSPEED = 30;
const MINSPEED = 5;
const FRAMERATE = 100;
const CARSPRITES = [
  'url("../imgs/Black_viper.png")',
  'url("../imgs/Mini_van.png")',
  'url("../imgs/Police.png")'
];
//t
// QUESTION 2.1 GENERATE ENEMIES
// document,getElementsByClassName('enemy_block').forEach(function(element)) {
document.body.style.backgroundImage = "url('../imgs/road.jpeg')";
document.body.style.backgroundSize = "auto";
// }
var i;
for (i = 0; i < NUMBLOCKS; i++) {
  var enemy_elem = document.createElement("div");
  enemy_elem.classList.add("enemy_block");
  document.body.appendChild(enemy_elem);
}

// QUESTION 2.2 STYLE ENEMIES
document.querySelectorAll(".enemy_block").forEach(element => {
  element.style.height = "90px";
  element.style.width = "40px";
  element.style.top = genRandomNum(0, window.innerHeight) + "px";
  element.style.position = "absolute";
  element.style.backgroundPosition = "center";
  element.style.left = genRandomNum(0, window.innerWidth) + "px";
  element.style.backgroundImage = CARSPRITES[genRandomNum(0, 2)];
  element.style.backgroundSize = "cover";
  element.setAttribute("data-speed", genRandomNum(MINSPEED, MAXSPEED));
});

// QUESTION 2.3 CREATE PLAYER
var player_elem = document.createElement("div");
player_elem.classList.add("player_block");
document.body.appendChild(player_elem);

player_elem.style.height = "90px";
player_elem.style.width = "40px";
player_elem.style.backgroundPosition = "center";
player_elem.style.position = "absolute";
player_elem.style.backgroundImage = "url('../imgs/Car.png')";
document.addEventListener("mousemove", function setCursorPos(e) {
  var player = document.querySelector(".player_block");
  var x_pos = e.clientX - parseInt(player.style.width, 10) / 2;
  var y_pos = e.clientY - parseInt(player.style.height, 10) / 2;
  player.style.left = x_pos + "px";
  player.style.top = y_pos + "px";
});

// YOUR CODE HERE

// QUESTION 2.4 Move and Reset Enemies
// Move the enemeies down the screen
function moveBlock() {
  document.querySelectorAll(".enemy_block").forEach(element => {
    element.style.top =
      parseInt(element.style.top, 10) +
      parseInt(element.getAttribute("data-speed"), 10) +
      "px";
  });
}

// Move the enemeies back to the top
// of the screen
function moveBack() {
  document.querySelectorAll(".enemy_block").forEach(element => {
    if (parseInt(element.style.top, 10) > parseInt(window.innerWidth)) {
      element.setAttribute("data-speed", genRandomNum(MINSPEED, MAXSPEED));
      element.style.top = "-100px";
      element.style.left = genRandomNum(0, window.innerWidth) + "px";
    }
    score += 1;
  });
}

// Check if we collided with any of them
function detectCollide() {
  var player = document.querySelector(".player_block");
  document.querySelectorAll(".enemy_block").forEach(enemy => {
    if (numLives === 0) {
      clearInterval(gameLoop);
      alert("Game Over. Your Score is " + score);
      return;
    }
    if (didCollide(enemy, player)) {
      numLives -= 1;
    }
  });
}

// The main game event loop
function playGame() {
  moveBlock();
  moveBack();
  detectCollide();
}

// QUESTION 2.5 RUNNING THE GAME
var gameLoop;
gameLoop = setInterval(playGame, FRAMERATE);

/* ----------------- */
/* HELPER FUNCTIONS  */
/* ----------------- */
// Generate A random integer between min_value
// and max_value (inclusive)
function genRandomNum(min_value, max_value) {
  return Math.round(Math.random() * (max_value - min_value) + min_value);
}

// Check if element a and element b are touching
// a and b *must* be of type Element
function didCollide(a, b) {
  let boundA = a.getBoundingClientRect();
  let ay = boundA.top;
  let ax = boundA.left;
  let ah = boundA.height;
  let aw = boundA.width;

  let boundB = b.getBoundingClientRect();
  let by = boundB.top;
  let bx = boundB.left;
  let bh = boundB.height;
  let bw = boundB.width;
  return !(ay + ah < by || ay > by + bh || ax + aw < bx || ax > bx + bw);
}
