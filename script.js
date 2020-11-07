let namesUl = document.getElementById("names");
let searchInput = document.getElementById("search");
let randomButton = document.getElementById("random-button");
let h2 = document.querySelector("h2");
let pageInfo = document.getElementById("page-info");
let buttons = document.getElementsByClassName("buttons")[0];

let toggleButton = document.getElementById("toggle-button");
let searchButton = document.getElementById("search-button");
let form = document.getElementById("form");

let namesPerPage = 100;
let page = 0;

let searchByStart = true;

let currentNames = [];
let visibleNames = [];

let ALL_NAMES = [];

fetch("./names.json")
  .then((res) => res.json())
  .then((json) => {
    ALL_NAMES = json;
    drawNames(ALL_NAMES);
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const toggleStart = () => {
  searchByStart = !searchByStart;
  toggleButton.innerHTML = searchByStart ? "START" : "ALL";
};

const nextPage = () => {
  if (namesPerPage * page + namesPerPage >= currentNames.length) {
    console.log("NO");
  } else {
    page++;
    window.scrollTo(0, 0);
    drawNames(currentNames);
  }
};

const previousPage = () => {
  if (page > 0) {
    page--;
    window.scrollTo(0, 0);
    drawNames(currentNames);
  }
};

const firstPage = () => {
  if (page > 0) {
    page = 0;
    window.scrollTo(0, 0);
    drawNames(currentNames);
  }
};

const filterNames = (query) => {
  let namesToShow = [];
  if (searchByStart) {
    ALL_NAMES.map((name) => {
      if (name.toLowerCase().startsWith(query.toLowerCase())) {
        namesToShow.push(name);
      }
    });
  } else {
    ALL_NAMES.map((name) => {
      if (name.toLowerCase().includes(query.toLowerCase())) {
        namesToShow.push(name);
      }
    });
  }
  return namesToShow;
};

// search.addEventListener("submit", () => {
//   console.log("enter");
// });

const searchNames = () => {
  page = 0;
  drawNames(filterNames(search.value));
};

const getRandomName = () => {
  let name;
  if (currentNames.length > 0) {
    name = currentNames[Math.floor(Math.random() * currentNames.length)];
  } else {
    name = "No names!";
  }
  randomButton.innerHTML = name;
};

const drawNames = (names) => {
  if (names.length == 0) {
    h2.innerHTML = `no results for '${search.value}'`;
  } else {
    h2.innerHTML = `${names.length} ${
      names.length == 1 ? "result" : "results"
    }, page ${page + 1}`;
  }
  namesUl.innerHTML = "";
  names
    .slice(page * namesPerPage, page * namesPerPage + namesPerPage)
    .map((name) => {
      let li = document.createElement("li");
      li.innerHTML = name;
      namesUl.appendChild(li);
    });
  pageInfo.innerHTML = `page ${page + 1} of ${Math.ceil(
    names.length / namesPerPage
  )}`;
  buttons.style.display = names.length != 0 ? "grid" : "none";
  currentNames = names;
};
