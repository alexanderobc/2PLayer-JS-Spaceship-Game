/**
 * Title: Javascript Spaceship Game
 * Author: Alex Brook Conway
 * Date: 28/04/2023
 * Version: 1
 * Purpose: Game
 **/


// Set Variables

const WIDTH = 620,
  HEIGHT = 810,
  PLAYER_WIDTH = 45,
  PLAYER_HEIGHT = 75;

var numberOfAsteroids = 12,
  windowAnimationFrame,
  playerOneXPosition,
  playerOneYPosition,
  playerTwoXPosition,
  playerTwoYPosition,
  ctx,
  canvas,
  keyPressed,
  gameEnded,
  spaceshipVectorPlayerOne = new Image(),
  spaceshipVectorPlayerTwo = new Image(),
  asteroidVector = new Image(),
  Asteroids = [],
  AsteroidsSpeeds = [],
  asteroidsStarted,
  speed,
  PlayerOneKeys,
  PlayerTwoKeys,
  player,
  playerOneVelY,
  playerOneVelX,
  playerOnespeed,
  playerOnefriction,
  playerTwoVelY,
  playerTwoVelX,
  playerTwoSpeed,
  playerTwofriction,
  p1Points = 0,
  p2Points = 0,
  round = 0;

// Set images

spaceshipVectorPlayerOne.src = "spaceshipVectorPlayerOne.png";
spaceshipVectorPlayerTwo.src = "spaceshipVectorPlayerTwo.png";
asteroidVector.src = "asteroidVector.png";

function setVariables() { // Reset variables
  asteroidsStarted = false;
  PlayerOneKeys = [];
  (playerOneVelY = 0),
    (playerOneVelX = 0),
    (playerOneSpeed = 2),
    (playerOneFriction = 0.98),
    (PlayerTwoKeys = []);
  (playerTwoVelY = 0),
    (playerTwoVelX = 0),
    (playerTwoSpeed = 2),
    (playerTwoFriction = 0.98),
    (Asteroids = []);
    AsteroidsSpeeds = [];
  playerOneXPosition = 115;
  playerOneYPosition = 790;
  playerTwoXPosition = 480;
  playerTwoYPosition = 790;
  ctx;
  canvas;
  keyPressed = false;
  gameEnded = false;
  player = "";
  round = round + 1;
  numberOfAsteroids = Math.round(12 + round * 0.25);
}

// Setup canvas and dey up/down even listeners

window.onload = startCanvas;
window.addEventListener("keydown", keyDownFunction);
window.addEventListener("keyup", keyUpFunction);

function startCanvas() { // This will be executed once the page loads and the game restarts
  setVariables();
  window.cancelAnimationFrame(windowAnimationFrame);
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set up the map

  ctx.fillStyle = "black";
  ctx.fillRect(340, 750, 5, 200); // I know this looks uneven but its the only way I could get it to work idk why

  ctx.fillStyle = "MediumSeaGreen";
  ctx.fillRect(0, 0, 1000, 100);

  ctx.font = "20px monospace"; // Setup the text
  ctx.fillStyle = "black";
  let roundText = "Round: " + round;
  let playerOnePoints = "Player One Points: " + p1Points;
  let playerTwoPoints = "Player Two Points: " + p2Points;
  ctx.fillText(playerOnePoints, 10, 20);
  ctx.fillText(playerTwoPoints, 10, 45);
  ctx.fillText(roundText, 605, 20);

  ctx.font = "60px monospace";
  ctx.fillStyle = "black";
  ctx.fillText("END", 300, 65);

  

  ctx.drawImage( // Draw players
    spaceshipVectorPlayerOne,
    playerOneXPosition,
    playerOneYPosition,
    PLAYER_WIDTH,
    PLAYER_HEIGHT
  );
  ctx.drawImage( // 
  spaceshipVectorPlayerTwo,
    playerTwoXPosition,
    playerTwoYPosition,
    PLAYER_WIDTH,
    PLAYER_HEIGHT
  );

  for (let i = 1; i <= numberOfAsteroids; i++) { // Setup asteroids
    let asteroidName = "asteroid" + i;
    Asteroids[asteroidName] = new Asteroid();
  }

  windowAnimationFrame = window.requestAnimationFrame(updateCanvas);
  fadeOut();
}

function updateCanvas() { // This will execute on an ongoing basis to simulate movement
  if (keyPressed && !gameEnded) {
    if (!asteroidsStarted) {
      moveAsteroids(Asteroids);
      asteroidsStarted = true;
    }

    if (PlayerOneKeys[87]) { // Move the players
      if (playerOneVelY > -playerOneSpeed * 1.5) {
        playerOneVelY--;
      }
    }

    if (PlayerOneKeys[83]) {
      if (playerOneVelY < playerOneSpeed * 1.5) {
        playerOneVelY++;
      }
    }
    if (PlayerOneKeys[68]) {
      if (playerOneVelX < playerOneSpeed * 1.5) {
        playerOneVelX++;
      }
    }
    if (PlayerOneKeys[65]) {
      if (playerOneVelX > -playerOneSpeed * 1.5) {
        playerOneVelX--;
      }
    }

    playerOneVelY *= playerOneFriction;
    playerOneYPosition += playerOneVelY;
    playerOneVelX *= playerOneFriction;
    playerOneXPosition += playerOneVelX;

    if (PlayerTwoKeys[38]) {
      if (playerTwoVelY > -playerTwoSpeed * 1.5) {
        playerTwoVelY--;
      }
    }

    if (PlayerTwoKeys[40]) {
      if (playerTwoVelY < playerTwoSpeed * 1.5) {
        playerTwoVelY++;
      }
    }
    if (PlayerTwoKeys[39]) {
      if (playerTwoVelX < playerTwoSpeed * 1.5) {
        playerTwoVelX++;
      }
    }
    if (PlayerTwoKeys[37]) {
      if (playerTwoVelX > -playerTwoSpeed * 1.5) {
        playerTwoVelX--;
      }
    }

    playerTwoVelY *= playerTwoFriction;
    playerTwoYPosition += playerTwoVelY;
    playerTwoVelX *= playerTwoFriction;
    playerTwoXPosition += playerTwoVelX;

    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up the map

    ctx.fillStyle = "black";
    ctx.fillRect(340, 750, 5, 200); // I know this looks uneven but its the only way I could get it to work idk why

    ctx.fillStyle = "MediumSeaGreen";
    ctx.fillRect(0, 0, 1000, 100);

    ctx.font = "20px monospace"; // Setup the text
    ctx.fillStyle = "black";
    let roundText = "Round: " + round;
    let playerOnePoints = "Player One Points: " + p1Points;
    let playerTwoPoints = "Player Two Points: " + p2Points;
    ctx.fillText(playerOnePoints, 10, 20);
    ctx.fillText(playerTwoPoints, 10, 45);
    ctx.fillText(roundText, 605, 20);

    ctx.font = "60px monospace";
    ctx.fillStyle = "black";
    ctx.fillText("END", 300, 65);

    ctx.drawImage( // Draw the spaceships
      spaceshipVectorPlayerOne,
      playerOneXPosition,
      playerOneYPosition,
      PLAYER_WIDTH,
      PLAYER_HEIGHT
    );
    ctx.drawImage(
      spaceshipVectorPlayerTwo,
      playerTwoXPosition,
      playerTwoYPosition,
      PLAYER_WIDTH,
      PLAYER_HEIGHT
    );

    let loop;
    let asteroidName;
    let asteroid;

    for (loop = 1; loop <= numberOfAsteroids; loop++) { // Draw the asteroids
      asteroidName = "asteroid" + loop;
      asteroid = Asteroids[asteroidName];
      ctx.drawImage(
        asteroidVector,
        asteroid.xPosition,
        asteroid.yPosition,
        asteroid.width,
        asteroid.height
      );
    }

    for (loop = 1; loop <= numberOfAsteroids; loop++) { // Start the asteroids again from the other side if they go across the edge
      asteroidName = "asteroid" + loop;
      asteroid = Asteroids[asteroidName];

      if (asteroid.xPosition > WIDTH + 100 && asteroid.side == "left") {
        asteroid.xPosition = 0;
      }

      if (asteroid.xPosition < 0 - 100 && asteroid.side == "right") {
        asteroid.xPosition = WIDTH + 100;
      }

      if ( // If player crashes into asteroid
        playerOneXPosition < asteroid.xPosition + asteroid.width &&
        playerOneXPosition + PLAYER_WIDTH > asteroid.xPosition &&
        playerOneYPosition < asteroid.yPosition + asteroid.height &&
        playerOneYPosition + PLAYER_HEIGHT > asteroid.yPosition &&
        playerOneXPosition + PLAYER_WIDTH - 20 > asteroid.xPosition &&
        playerOneXPosition + 20 < asteroid.xPosition + asteroid.width &&
        playerOneYPosition + PLAYER_HEIGHT - 20 > asteroid.yPosition &&
        playerOneYPosition + 20 < asteroid.yPosition + asteroid.height
      ) {
        playerOnespeed = 0;
        playerOneXPosition = 115;
        playerOneYPosition = 790;
      }

      if (
        playerTwoXPosition < asteroid.xPosition + asteroid.width &&
        playerTwoXPosition + PLAYER_WIDTH > asteroid.xPosition &&
        playerTwoYPosition < asteroid.yPosition + asteroid.height &&
        playerTwoYPosition + PLAYER_HEIGHT > asteroid.yPosition &&
        playerTwoXPosition + PLAYER_WIDTH - 20 > asteroid.xPosition &&
        playerTwoXPosition + 20 < asteroid.xPosition + asteroid.width &&
        playerTwoYPosition + PLAYER_HEIGHT - 20 > asteroid.yPosition &&
        playerTwoYPosition + 20 < asteroid.yPosition + asteroid.height
      ) {
        playerTwospeed = 0;
        playerTwoXPosition = 480;
        playerTwoYPosition = 790;
      }
    }

    // If player one is beyond the border stop them from going out
    if (playerOneYPosition > HEIGHT + 20) {
      playerOneYPosition = HEIGHT + 20;
      playerOnespeed = 0;
    }

    if (playerOneYPosition < 0) {
      playerOneYPosition = 0;
      playerOnespeed = 0;
    }

    if (playerOneXPosition > WIDTH) {
      playerOneXPosition = WIDTH;
      playerOnespeed = 0;
    }

    if (playerOneXPosition < 0) {
      playerOneXPosition = 0;
      playerOnespeed = 0;
    }

    // If player two is beyond the border stop then from going out
    if (playerTwoYPosition > HEIGHT + 20) {
      playerTwoYPosition = HEIGHT + 20;
      playerTwospeed = 0;
    }

    if (playerTwoYPosition < 0) {
      playerTwoYPosition = 0;
      playerTwospeed = 0;
    }

    if (playerTwoXPosition > WIDTH + 50) {
      playerTwoXPosition = WIDTH + 50;
      playerTwospeed = 0;
    }

    if (playerTwoXPosition < 0) {
      playerTwoXPosition = 0;
      playerTwospeed = 0;
    }

    // If player gets into the "end" area end the game
    if (playerOneYPosition < 80) {
      player = "ONE";
      gameEnd(player);
    }

    if (playerTwoYPosition < 80) {
      player = "TWO";
      gameEnd(player);
    }
  }
  windowAnimationFrame = window.requestAnimationFrame(updateCanvas);
}

class Asteroid { // Setup asteroids
  constructor() {

    let newAsteroidWidth = // Random width
      (Math.random() * HEIGHT, Math.floor(Math.random() * (60 - 10 + 1)) + 10); 

    let newAsteroidHeight = // Random height
      Math.floor(
        Math.random() * (newAsteroidWidth + 5 - (newAsteroidWidth - 5) + 1)
      ) +
      (newAsteroidWidth - 5);

    if (Object.keys(Asteroids).length > numberOfAsteroids / 2) { // Half of the asteroids on each side
      this.side = "left";
      this.xPosition = 0 - 100;
    } else {
      this.side = "right";
      this.xPosition = WIDTH + 100;
    }

    this.width = newAsteroidWidth;
    this.height = newAsteroidHeight;

    this.yPosition =
      Math.floor(Math.random() * (750 - this.height - 110 + 1)) + 110; // Random y position

    this.speed = asteroidSpeedGetter(); // Function to make each asteroid a different speed
    AsteroidsSpeeds.push(this.speed);
  }
}

function randomNumber() { // Generate random number for the speed
  let randomArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomArray);
  let randomNumber = (randomArray[0] % 850) / 100 + 1.5;
  return randomNumber;
}

function asteroidSpeedGetter() { // Make sure each asteroid is a different speed
  if (AsteroidsSpeeds.length == 0) {
    speed = randomNumber();
    return speed;
  } else {
    for (let loop = 0; loop <= AsteroidsSpeeds.length; ) {
      if ((speed = AsteroidsSpeeds[loop])) {
        loop = 0;
        speed = randomNumber();
      } else {
        loop++;
      }
      if ((loop = AsteroidsSpeeds.length)) {
        return speed;
      }
    }
  }
}

function moveAsteroids(Asteroids) { // Move the asteroids
  for (let asteroidName in Asteroids) {
    let asteroid = Asteroids[asteroidName];
    let speed = asteroid.speed;
    let distancePerFrame = 2; // Distance to move per frame (in pixels)

    setInterval(() => {
      if (asteroid.side == "right") {
        asteroid.xPosition -= distancePerFrame;
      } else {
        asteroid.xPosition += distancePerFrame;
      }
    }, speed);
  }
}

function gameEnd(player) { // Handles what happens when the game ends
  if (player === "ONE") {
    p1Points++;
  } else if (player === "TWO") {
    p2Points++;
  }

  gameEnded = true;
  keyPressed = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  rainbowFlash();
}

function rainbowFlash() { // Flash the winner text rainbow
  ctx.font = "30px monospace";
  ctx.fillText("Press Enter to restart", 160, 400);

  let loop = 0;

  next(loop);
}

function next(loop) {
  let delay = 100;
  let x = 80;
  let y = 300;
  let colours = [
    "#FF2D00",
    "#FFFF00",
    "#61FF00",
    "#00FF93",
    "#00FFE8",
    "#007CFF",
    "#2700FF",
    "#9E00FF",
    "#FF00FF",
    "#FF0083",
    "#FF0000",
  ];

  if (!gameEnded) {
    ctx.clearRect(
      (WIDTH - ctx.measureText("PLAYER " + player + " WINS!!!!!").width) / 2,
      250,
      ctx.measureText("PLAYER " + player + " WINS!!!!!").width,
      50
    );
    return;
  }

  setTimeout(() => {
    if (!gameEnded) {
      ctx.clearRect(
        (WIDTH - ctx.measureText("PLAYER " + player + " WINS!!!!!").width) / 2,
        250,
        ctx.measureText("PLAYER " + player + " WINS!!!!!").width,
        50
      );
      return;
    }
    ctx.clearRect(
      (WIDTH - ctx.measureText("PLAYER " + player + " WINS!!!!!").width) / 2,
      250,
      ctx.measureText("PLAYER " + player + " WINS!!!!!").width,
      50
    );
    ctx.fillStyle = colours[loop];
    ctx.font = "50px monospace";
    let text = "PLAYER " + player + " WINS!!!!!";
    ctx.fillText(text, x, y);

    loop++;
    if (loop >= colours.length) {
      loop = 0;
    }

    if (gameEnded) {
      next(loop);
    }
  }, delay);
}

function keyUpFunction(keyboardEvent) {
  PlayerOneKeys[keyboardEvent.keyCode] = false;
  PlayerTwoKeys[keyboardEvent.keyCode] = false;
}

function keyDownFunction(keyboardEvent) {
  var keyDown = keyboardEvent.key.toLowerCase();

  PlayerOneKeys[keyboardEvent.keyCode] = true;
  PlayerTwoKeys[keyboardEvent.keyCode] = true;

  if (gameEnded) {
    if (keyDown == "enter") {
      startCanvas();
    }
  } else {
    keyPressed = true;
  }
}
function fadeOut() { // Fade out the "Press any button to start" text
  if (!keyPressed) {
    var alpha = 1.0, // full opacity
      fadeOutInterval = setInterval(function () {
        ctx.clearRect(147, 225, 415, 33);
        ctx.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
        ctx.font = "30px monospace";
        ctx.fillText("Press any button to start", 150, 250);
        alpha = alpha - 0.05; // decrease opacity (fade out)
        if (alpha < 0) {
          clearInterval(fadeOutInterval);
          fadeIn();
        }
      }, 50);
  } else {
    ctx.clearRect(147, 225, 415, 33);
    return;
  }
}

function fadeIn() { // Fade in the "Press any button to start" text
  if (!keyPressed) {
    var alpha = 0.0, // zero opacity
      fadeInInterval = setInterval(function () {
        ctx.clearRect(147, 225, 415, 33);
        ctx.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
        ctx.font = "30px monospace";
        ctx.fillText("Press any button to start", 150, 250);
        alpha = alpha + 0.05; // increase opacity (fade out)
        if (alpha > 1) {
          clearInterval(fadeInInterval);
          fadeOut();
        }
      }, 50);
  } else {
    ctx.clearRect(147, 225, 415, 33);
    return;
  }
}