"use strict";
let number = Math.trunc(Math.random() * 10 + 1);
let score = 10;
let highscore = 0;

console.log(number);
const lost = () => {
  document.querySelector(".message").textContent = "❌ Vous Perdu ...";
  document.querySelector(".score").textContent = 0;
  document.querySelector(".highscore").textContent = 0;
  document.querySelector("h1").textContent = "Vous avez perdu la partie";
};
document.querySelector(".number").textContent = "?";
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  if (!guess) {
    document.querySelector(".message").textContent = "⛔ Ecrire un nombre ...";
  } else if (guess === number) {
    document.querySelector(".message").textContent = "✅ Cest Ca ...";
    document.querySelector(".number").textContent = number;
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector("h1").textContent = "Vous avez gagné!";
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  } else if (guess > number) {
    if (score > 1) {
      document.querySelector(".message").textContent = "⬆️ Trop Grand ...";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      lost();
    }
  } else if (guess < number) {
    if (score > 1) {
      document.querySelector(".message").textContent = "⬇️ Trop Petit ...";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      lost();
    }
  }
});
document.querySelector(".again").addEventListener("click", function () {
  score = 10;
  number = Math.trunc(Math.random() * 10 + 1);
  document.querySelector(".message").textContent = "";
  document.querySelector(".score").textContent = score;
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("h1").textContent = "Nombre Secret!";
});
