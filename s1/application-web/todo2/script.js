function addMore() {
  let name = document.querySelector("#name").value;
  if (name == "") {
    document.querySelector("#error").innerHTML = "Entrez une valeur";
  } else {
    let box = document.querySelector("#box");
    let li = document.createElement("li");
    li.textContent = name;
    li.className = "remove";

    let a = document.createElement("button");
    a.textContent = " -";
    a.href = "javascript:void(0)";
    a.className = "remove";

    li.append(a);

    let pos = box.firstElementChild;

    if (pos == null) {
      box.appendChild(li);
    } else {
      box.appendChild(li, pos);
    }
  }
  document.querySelector("#name").value = "";
  

let btn = document.querySelector("ul");
btn.addEventListener("click", function (e) {
  let box = document.querySelector("#box");
  let li = e.target.parentNode;
  box.removeChild(li);
});
