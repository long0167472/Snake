class Score {
  _score;

  constructor() {
    this._score = 0;
    this._canvas = document.getElementById("screen-game");
    this._ctx = this._canvas.getContext("2d");
  }

  draw() {
    this._ctx.beginPath();
    this._ctx.font = "20px Arial";
    this._ctx.fillStyle = "black";
    this._ctx.fillText("Score: " + this._score, this._canvas.width - 100, 20);
    this._ctx.closePath();
  }

  increment() {
    this._score++;
  }
}
