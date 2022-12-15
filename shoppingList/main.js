const section = document.querySelector("section");
const ul = document.querySelector("ul");
const inputText = document.querySelector(".input-text");
const addBtn = document.querySelector(".add-btn");
const resetBtn = document.querySelector(".reset-btn");
const count = document.querySelector(".count");
const warnTxt = document.querySelector(".warn-txt");

let tobuys = [];

const save = () => {
  localStorage.setItem("tobuys", JSON.stringify(tobuys));
};

function addList() {
  const inputTextValue = inputText.value;
  if (inputTextValue === "") {
    inputText.focus();
    section.setAttribute("class", "section section-warn");
    warnTxt.setAttribute("class", "warn");
    return;
  }
  createList(inputTextValue);

  inputText.value = "";
  inputText.focus();
}

function createList(localtext) {
  section.setAttribute("class", "section");
  warnTxt.setAttribute("class", "warn-txt");
  const list = document.createElement("li");
  list.setAttribute("class", "item-wrap");

  const item = document.createElement("span");
  item.innerText = localtext;

  const itemIcon = document.createElement("div");

  const checkBox = document.createElement("input");
  checkBox.setAttribute("class", "checkbox");
  checkBox.setAttribute("type", "checkbox");
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      item.style.textDecoration = "line-through";
      item.style.textDecorationThickness = "2px";

      item.style.textDecorationColor = "#49c628";
    } else {
      item.style.textDecoration = "none";
    }
  });

  const delBtn = document.createElement("button");
  delBtn.setAttribute("class", "del-btn");
  delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  delBtn.addEventListener("click", () => {
    tobuys = tobuys.filter((tobuy) => tobuy.id !== parseInt(list.id));
    ul.removeChild(list);
    count.textContent = tobuys.length;
    save();
  });

  itemIcon.appendChild(checkBox);
  itemIcon.appendChild(delBtn);
  list.appendChild(item);
  list.appendChild(itemIcon);

  const newList = ul.appendChild(list);
  newList.scrollIntoView();

  const tobuy = {
    id: tobuys.length + 1,
    text: localtext,
  };
  tobuys.push(tobuy);
  counter();

  save();
  list.id = tobuys.length;
  return list;
}

function counter() {
  count.textContent = tobuys.length;
}
function load() {
  const loadLists = JSON.parse(localStorage.getItem("tobuys"));
  if (loadLists) {
    loadLists.forEach((list) => {
      console.log(list);
      console.log(list.text);
      createList(list.text);
    });
  }
}

function init() {
  load();
  addBtn.addEventListener("click", () => {
    addList();
    counter();
  });
  inputText.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      addList();
      counter();
    }
  });
  resetBtn.addEventListener("click", () => {
    tobuys = [];
    ul.innerHTML = "";
    section.setAttribute("class", "section");
    warnTxt.setAttribute("class", "warn-txt");
    counter();
    save();
  });
}

init();
