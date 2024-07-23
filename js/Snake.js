class Snake {
  _x;
  _y;
  _size;
  _color;
  _speed;
  _ctx;
  _ctxgov;
  _flag;

  constructor(x, y, size, color) {
    this._x = x;
    this._y = y;
    this._size = size;
    this._color = color;
    this._speed = 0;
    this._canvas = document.getElementById("screen-game");
    this._ctxgov = document.getElementById("game-over");
    this._ctx = this._canvas.getContext("2d");
    this._flag = "right";
  }

  draw() {
    this._ctx.beginPath();
    this._ctx.rect(this._x, this._y, this._size, this._size);
    this._ctx.fillStyle = this._color;
    this._ctx.fill();
    this._ctx.closePath();
  }

  move() {
    // Move the snake
    this.clearScreen();
    // handle click events on the keyboard
    this.controlFlag();
    this.controlDirection();
    this.handleCollideScreen();
    this.draw();
  }

  handleCollideScreen() {
    switch (this._flag) {
      case "right":
        this.handleCollideRightScreen();
        break;
      case "left":
        this.handleCollideScreenLeft();
        break;
      case "up":
        this.handleCollideTopScreen();
        break;
      default:
        this.handleCollideBottomScreen();
        break;
    }
  }

  handleCollideBottomScreen() {
    if (this._y + this._size >= this._canvas.height) {
      this._y = 0;
    }
  }

  handleCollideTopScreen() {
    if (this._y <= 0) {
      this._y = this._canvas.height - this._size;
    }
  }

  handleCollideScreenLeft() {
    if (this._x <= 0) {
      this._x = this._canvas.width - this._size;
    }
  }

  handleCollideRightScreen() {
    if (this._x + this._size >= this._canvas.width) {
      this._x = 0;
    }
  }

  controlDirection() {
    switch (this._flag) {
      case "left":
        this.moveLeft();
        break;
      case "right":
        this.moveRight();
        break;
      case "up":
        this.moveUp();
        break;
      case "down":
        this.moveDown();
        break;
    }
  }

  controlFlag() {
    window.addEventListener("keydown", (evt) => {
      const keyNumber = evt.keyCode;
      if (keyNumber === 40) {
        this._flag = "down";
      } else if (keyNumber === 39) {
        this._flag = "right";
      } else if (keyNumber === 37) {
        this._flag = "left";
      } else if (keyNumber === 38) {
        this._flag = "up";
      }
    });
  }

  moveRight() {
    this._x += this._speed;
  }

  moveLeft() {
    this._x -= this._speed;
  }

  moveDown() {
    this._y += this._speed;
  }

  moveUp() {
    this._y -= this._speed;
  }

  clearScreen() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  gameOver(barrier, score) {
    if (
      this._x + this._size >= barrier._x &&
      this._x <= barrier._x + 10 &&
      this._y >= barrier._y &&
      this._y <= barrier._y + barrier._size
    ) {
      this._speed = 0;
      barrier._speed = 0;
      const gameOverScreen = document.getElementById("game-over-screen");
      gameOverScreen.style.display = "block";
      const finalScore = document.getElementById("final-score");
      finalScore.textContent = `Your score: ${score._score}`;
    }
  }

  eat(food, score) {
    if (
      this._x <= food._x + food._radius &&
      this._x + this._size >= food._x - food._radius &&
      this._y <= food._y &&
      food._y <= this._y + this._size
    ) {
      food.randomPosition();
      score.increment();
    }
  }
}
