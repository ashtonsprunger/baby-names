let namesList = document.getElementById("names");
let search = document.getElementById("search");
let button = document.getElementById("random-button");
let h = document.querySelector("h2");
let toggleButton = document.getElementById("toggle-button");
let globalButton = document.getElementById("toggle-global");
let form = document.getElementById("form");

let namesFile;
let start = true;
let showing = [];

$.get("/all.txt", {}, function (content) {
  namesFile = content.split("\n");

  drawNames(filterNames(search.value));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const toggleStart = () => {
  start = !start;
  toggleButton.innerHTML = start ? "START" : "ALL";
};

const filterNames = (query) => {
  let namesToShow = [];
  if (start) {
    namesFile.map((name) => {
      if (name.toLowerCase().startsWith(query.toLowerCase())) {
        namesToShow.push(name);
      }
    });
  } else {
    namesFile.map((name) => {
      if (name.toLowerCase().includes(query.toLowerCase())) {
        namesToShow.push(name);
      }
    });
  }
  return namesToShow;
};

search.addEventListener("submit", () => {
  console.log("enter");
});

const searchNames = () => {
  drawNames(filterNames(search.value));
};

const getRandomName = () => {
  let name = showing[Math.floor(Math.random() * showing.length)];
  button.innerHTML = name;
};

const drawNames = (names) => {
  if (names.length == 0) {
    h.innerHTML = `no results for '${search.value}'`;
  } else {
    h.innerHTML = `${names.length} ${names.length == 1 ? "result" : "results"}`;
  }
  namesList.innerHTML = "";
  names.map((name) => {
    let li = document.createElement("li");
    li.innerHTML = name;
    namesList.appendChild(li);
  });
  showing = names;
};
