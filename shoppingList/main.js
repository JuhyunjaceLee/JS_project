const ul = document.querySelector("ul");
const inputText = document.querySelector(".input-text");
const addBtn = document.querySelector(".add-btn");
const resetBtn = document.querySelector(".reset-btn");

let tobuys = [];

const save = () => {
  localStorage.setItem("tobuys", JSON.stringify(tobuys));
};

const load = () => {
  const loadList = JSON.parse(localStorage.getItem("tobuys"));

  if (loadList) {
    loadList.forEach((tobuy) => {
      addList(tobuy);
    });
    tobuys = loadList;
  }
};
load();

const inputTextValue = inputText.value;
function addList(inputTextValue) {
  if (inputTextValue === "") {
    inputText.focus();
    return;
  }

  const tobuy = {
    id: tobuys.length + 1,
    text: inputText.value,
  };

  let localText = tobuy.text;

  tobuys.push(tobuy);

  const newList = createList(localText);

  ul.appendChild(newList);

  newList.scrollIntoView();

  save();

  inputText.value = "";
  inputText.focus();
}

function createList(tobuy) {
  const list = document.createElement("li");
  list.setAttribute("class", "item-wrap");

  const item = document.createElement("span");
  item.innerText = tobuy;

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
    save();
  });

  itemIcon.appendChild(checkBox);
  itemIcon.appendChild(delBtn);
  list.appendChild(item);
  list.appendChild(itemIcon);

  list.id = tobuys.length;
  return list;
}

addBtn.addEventListener("click", () => {
  addList();
});

resetBtn.addEventListener("click", () => {
  tobuys = [];
  ul.innerHTML = "";
  save();
});

inputText.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addList();
  }
});
