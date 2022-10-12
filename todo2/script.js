function addMore() {
  let name = document.getElementById("name").value;
  if (name == "") {
    document.getElementById("error").innerHTML = "Entrez une valeur";
  } else {
    let box = document.getElementById("box");
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
  document.getElementById("name").value = "";
}

let btn = document.querySelector("ul");
btn.addEventListener("click", function (e) {
  let box = document.getElementById("box");
  let li = e.target.parentNode;
  box.removeChild(li);
});
