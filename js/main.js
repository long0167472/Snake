const snake = new Snake(0, 0, 20, "red");
const food = new Food(100, 100, 10, "green");
const score = new Score();
const barrier = new Barrier(250, 0, 100, "black", 2);

function play() {
  snake.move();
  food.draw();
  snake.eat(food, score);
  score.draw();
  barrier.move();
  snake.gameOver(barrier, score);
  requestAnimationFrame(play);
}

barrier.draw();
play();
