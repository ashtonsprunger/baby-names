let namesList = document.getElementById("names");
let search = document.getElementById("search");
let button = document.getElementById("random-button");
let h = document.querySelector("h2");

let namesArray = [];
let namesToShow = [];

let url =
  "https://data.cityofnewyork.us/api/views/25th-nujf/rows.json?accessType=DOWNLOAD";

search.addEventListener("keyup", (e) => {
  filterNames(e.target.value);
});

const filterNames = (query) => {
  namesToShow = [];
  namesArray.map((name) => {
    if (name.toLowerCase().includes(query)) {
      namesToShow.push(name);
    }
  });
  drawNames(namesToShow);
};

const getRandomName = () => {
  let name = namesArray[Math.floor(Math.random() * namesArray.length)];
  button.innerHTML = name;
};

const drawNames = (names) => {
  h.innerHTML = `${names.length} Results found`;
  namesList.innerHTML = "";
  names.map((name) => {
    let li = document.createElement("li");
    li.innerHTML = name;
    namesList.appendChild(li);
  });
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

fetch(url)
  .then((res) => res.json())
  .then((json) => {
    json.data.map((name, index) => {
      if (name[10] === "WHITE NON HISPANIC" || name[10] === "WHITE NON HISP") {
        namesArray.push(name[11]);
      }
    });
    namesArray = capNames(namesArray);
    namesArray = trimNames(namesArray);
    namesArray.sort();
    drawNames(namesArray);
  });
