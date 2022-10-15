let card1 = document.getElementsByClassName("card1");

let myFunction1 = function () {
  let attribute = window.open(
    "https://dalbir-1.github.io/uni-exercises/s1/serveur-web/date.js/",
    "_blank"
  );
};

for (let i = 0; i < card1.length; i++) {
  card1[i].addEventListener("click", myFunction1, true);
}

let card2 = document.getElementsByClassName("card2");

let myFunction2 = function () {
  let attribute = window.open(
    "https://dalbir-1.github.io/uni-exercises/s1/serveur-web/des.js/",
    "_blank"
  );
};

for (let i = 0; i < card2.length; i++) {
  card2[i].addEventListener("click", myFunction2, true);
}

let card3 = document.getElementsByClassName("card3");

let myFunction3 = function () {
  let attribute = window.open(
    "https://dalbir-1.github.io/uni-exercises/s1/serveur-web/statique.js",
    "_blank"
  );
};

for (let i = 0; i < card3.length; i++) {
  card3[i].addEventListener("click", myFunction3, true);
}
