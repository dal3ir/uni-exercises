let secretNumber = 10;
let score = 10;
let highestRecord = 0;

document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelector(".score").textContent = "Score: " + score;
  document.querySelector(".message").textContent = "Guess the number!";
  secretNumber = Math.floor(Math.random() * 10 + 1);
  document.querySelector(".number").textContent = "?";
  document.querySelector(".record").textContent = "Highest Record: " + 0;
  console.log(secretNumber);
});

document.querySelector(".check-btn").addEventListener("click", function () {
  let inputNumber = document.querySelector(".guess-number").value;
  console.log(inputNumber === secretNumber);
  console.log(secretNumber);
  if (inputNumber == secretNumber) {
    document.querySelector(".message").textContent = "Congratulations!";
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector("body").style.backgroundColor = "#7ef760e6";
    if (score > highestRecord) {
      document.querySelector(".record").textContent =
        "Highest Record: " + score;
    }
    return;
  } else if (inputNumber < secretNumber) {
    document.querySelector(".message").textContent = "Plus Petite!";
    score--;
  } else {
    document.querySelector(".message").textContent = "Trop Grand!";
    score--;
  }
  document.querySelector(".score").textContent = "Point: " + score;
});

document.querySelector(".again-btn").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.floor(Math.random() * 10 + 1);
  document.querySelector(".score").textContent = "Score: " + score;
  document.querySelector(".message").textContent = "Nombre Secret!";
  document.querySelector(".number").textContent = "?";
  document.querySelector("body").style.backgroundColor = "rgb(20, 20, 20, 0.9)";
});
