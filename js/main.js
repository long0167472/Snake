const snake = new Snake(30, 30, 20, "red");
const food = new Food(100, 100, 10, "green");
const score = new Score();
const barrier = new Barrier(250, 0, 100, "black", 10);

function play() {
  snake.move();
  food.draw();
  snake.eat(food, score);
  score.draw();
  barrier.move();
  requestAnimationFrame(play);
}

barrier.draw();

play();
