class Barrier {
  _x;
  _y;
  _color;
  _ctx;
  _size;
  _speed;

  constructor(x, y, size, color, speed) {
    this._x = x;
    this._y = y;
    this._size = size;
    this._color = color;
    this._speed = speed;
    this._canvas = document.getElementById("screen-game");
    this._ctx = this._canvas.getContext("2d");
  }

  draw() {
    this._ctx.beginPath();
    this._ctx.fillStyle = this._color;
    this._ctx.fillRect(this._x, this._y, 10, this._size);
    this._ctx.closePath();
  }

  move() {
    this._y += this._speed;
    if (this._y + this._size > this._canvas.height || this._y < 0) {
      this._speed = -this._speed;
    }
    this.draw();
  }
}
