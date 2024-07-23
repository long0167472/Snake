class Snake {
  _x;
  _y;
  _size;
  _color;
  _speed;
  _ctx;
  _flag;
  _body;

  constructor(x, y, size, color) {
    this._x = x;
    this._y = y;
    this._size = size;
    this._color = color;
    this._speed = 5;
    this._canvas = document.getElementById("screen-game");
    this._ctx = this._canvas.getContext("2d");
    this._flag = "right";
    this._body = [{ x: this._x, y: this._y }];
    this._barrier_x = 20;
    this._barrier_y = 20;
  }
  grow() {
    const lastPart = this._body[this._body.length - 1];
    this._body.push({ ...lastPart });
  }

  draw() {
    this._ctx.fillStyle = this._color;
    for (let part of this._body) {
      this._ctx.fillRect(part.x, part.y, this._size, this._size);
    }
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
    // Move head
    switch (this._flag) {
      case "left":
        this._x -= this._speed;
        break;
      case "right":
        this._x += this._speed;
        break;
      case "up":
        this._y -= this._speed;
        break;
      case "down":
        this._y += this._speed;
        break;
    }

    // Move body
    for (let i = this._body.length - 1; i > 0; i--) {
      this._body[i] = { ...this._body[i - 1] };
    }

    // Update head
    this._body[0] = { x: this._x, y: this._y };
  }

  controlFlag() {
    window.addEventListener("keydown", (evt) => {
      const keyNumber = evt.keyCode;
      if (keyNumber === 40 && this._flag !== "up") {
        this._flag = "down";
      } else if (keyNumber === 39 && this._flag !== "left") {
        this._flag = "right";
      } else if (keyNumber === 37 && this._flag !== "right") {
        this._flag = "left";
      } else if (keyNumber === 38 && this._flag !== "down") {
        this._flag = "up";
      }
    });
  }

  clearScreen() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  eat(food, score) {
    let head = this._body[0];
    switch (this._flag) {
      case "right":
        if (
          head.x + this._size >= food._x - food._radius &&
          head.y <= food._y &&
          food._y <= head.y + this._size
        ) {
          food.randomPosition();
          score.increment();
          this.grow();
        }
        break;
      case "left":
        if (
          head.x <= food._x + food._radius &&
          head.y <= food._y &&
          food._y <= head.y + this._size
        ) {
          food.randomPosition();
          score.increment();
          this.grow();
        }
        break;
      case "up":
        if (
          head.y <= food._y + food._radius &&
          head.x <= food._x &&
          food._x <= head.x + this._size
        ) {
          food.randomPosition();
          score.increment();
          this.grow();
        }
        break;
      default:
        if (
          head.y + this._size >= food._y - food._radius &&
          head.x <= food._x &&
          food._x <= head.x + this._size
        ) {
          food.randomPosition();
          score.increment();
          this.grow();
        }
    }
  }
}
