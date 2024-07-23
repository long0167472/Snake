class Food {
  _x;
  _y;
  _radius;
  _color;
  _ctx;

  constructor(x, y, radius, color) {
    this._x = x;
    this._y = y;
    this._radius = radius;
    this._color = color;
    this._canvas = document.getElementById("screen-game");
    this._ctx = this._canvas.getContext("2d");
  }

  draw() {
    this._ctx.beginPath();
    this._ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
    this._ctx.fillStyle = this._color;
    this._ctx.fill();
    this._ctx.closePath();
  }

  randomPosition() {
    this._x =
      Math.floor(Math.random() * (this._canvas.width - this._radius * 2)) +
      this._radius;
    this._y =
      Math.floor(Math.random() * (this._canvas.height - this._radius * 2)) +
      this._radius;
  }
}
