let namesList = document.getElementById("names");
let search = document.getElementById("search");
let button = document.getElementById("random-button");
let h = document.querySelector("h2");
let toggleButton = document.getElementById("toggle-button");
let globalButton = document.getElementById("toggle-global");

let namesArray = [];
let showing = [];

let start = true;
let global = false;

let url =
  "https://data.cityofnewyork.us/api/views/25th-nujf/rows.json?accessType=DOWNLOAD";

search.addEventListener("keyup", (e) => {
  filterNames(e.target.value);
});

const toggleStart = () => {
  start = !start;
  toggleButton.innerHTML = start ? "START" : "ALL";
  filterNames(search.value);
};

const toggleGlobal = () => {
  global = !global;
  globalButton.innerHTML = global ? "GLOBAL" : "AMERICAN";
  fetchResults();
};

const filterNames = (query) => {
  let namesToShow = [];
  if (start) {
    namesArray.map((name) => {
      if (name.toLowerCase().startsWith(query.toLowerCase())) {
        namesToShow.push(name);
      }
    });
  } else {
    namesArray.map((name) => {
      if (name.toLowerCase().includes(query.toLowerCase())) {
        namesToShow.push(name);
      }
    });
  }
  drawNames(namesToShow);
};

const getRandomName = () => {
  let name = showing[Math.floor(Math.random() * showing.length)];
  button.innerHTML = name;
};

const drawNames = (names) => {
  h.innerHTML = `${names.length} ${names.length == 1 ? "result" : "results"}`;
  namesList.innerHTML = "";
  names.map((name) => {
    let li = document.createElement("li");
    li.innerHTML = name;
    namesList.appendChild(li);
  });
  showing = names;
  console.log(names.length);
};

const capNames = (names) => {
  let namesArr = names.map(
    (name) => name[0].toUpperCase() + name.slice(1, name.length).toLowerCase()
  );
  return namesArr;
};

const trimNames = (names) => {
  let namesArr = [];
  names.map((name) => {
    if (!namesArr.includes(name)) {
      namesArr.push(name);
    }
  });
  return namesArr;
};

const fetchResults = () => {
  namesArray = [];
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      json.data.map((name, index) => {
        if (global) {
          namesArray.push(name[11]);
        } else {
          if (
            name[10] === "WHITE NON HISPANIC" ||
            name[10] === "WHITE NON HISP"
          ) {
            namesArray.push(name[11]);
          }
        }
      });
      namesArray = capNames(namesArray);
      namesArray = trimNames(namesArray);
      namesArray.sort();
      drawNames(namesArray);
      filterNames(search.value);
    });
};

fetchResults();
