var ball1;
var gatGrootte;
var scoreboard = 0;
var gameState = 0;


class Ball {
  constructor(x, y, w, h, vy, ay) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vy = vy;
    this.ay = 0.3;
  }

  drawBall() {
    fill("white");
    ellipse(this.x, this.y, this.w, this.h)
    this.vy = this.vy + this.ay;
    this.y = this.y + this.vy;

    if (this.y > 385) {
      this.vy = 0;
      this.ay = 0;
    }
    else {
      this.ay = 0.3;
    }
    if (this.y < 0) {
      this.y = 0;
    }
  }
}

class Balk {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = "green";
  }

  drawBalk() {
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
    this.x -= 5;
  }

  isColliding() {
    if (ball1.x < this.x + this.w &&
      ball1.x + ball1.w > this.x &&
      ball1.y < this.y + this.h &&
      ball1.y + ball1.h > this.y) {
      this.c = "red";
      gameState = 2;
    }
    else {
      this.c = "green";
    }
  }

}

function setup() {
  createCanvas(800, 400);

  ball1 = new Ball(150, 200, 30, 30, 2)

  gatGrootte = 100;
}

var balk = [];

function draw() {

  text("gameState" + gameState, 30, 30);

  if (gameState == 0) {
    background("yellow");
    menu();
  }

  if (gameState == 1) {
    background("blue");
    text("Start game", 30, 40)
    game();
  }

  if (gameState == 2) {
    background("red");    
    text("GAME OVER", 50, 40);
    ball1 = new Ball(150, 200, 30, 30, 2)
    balk = [];
    x = 0;
  }
}


// if (frameCount % 90 == 0) {
//   scoreboard = scoreboard + 1
// }
// }

function game() {
  background(225);

  fill("white");
  text(scoreboard, 300, 50);


  if (frameCount % 80 == 0) {

    var gatHoogte = random(0, 400 - gatGrootte);

    let balk1 = new Balk(800, 0, 50, gatHoogte);
    let balk2 = new Balk(800, gatHoogte + gatGrootte, 50, 400);

    balk.push(balk1);
    balk.push(balk2);

    if (balk.length > 6) {
      balk.splice(0, 2);
    }
  }

  ball1.drawBall();
  balk.forEach((b) => {
    b.drawBalk();
    b.isColliding();
  });
}

function keyPressed() {
  if (keyCode == 32) {
    ball1.vy = -5;
  }

  if (keyCode == 49) {
    gameState = 1;
  }

  if (keyCode == 50) {
    gameState = 2;
  }

  if (keyCode == 51) {
    gameState = 0;
  }
}

function isColliding() {
  colliding = false;
}

var x = 0;

function menu() {
  background("white");
  text("Menu", 30, 40);
  text("1. Start", 25, 65);
  text("2. Game over", 25, 85);
  text("3. Terug naar menu", 25, 105);
  fill("black");
}