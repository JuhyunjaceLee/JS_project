const ul = document.querySelector("ul");
const inputText = document.querySelector(".input-text");
const addBtn = document.querySelector(".add-btn");
const resetBtn = document.querySelector(".reset-btn");

function addList() {
  const inputTextValue = inputText.value;
  if (inputTextValue === "") {
    inputText.focus();
    return;
  }
  const newList = createList(inputTextValue);

  ul.appendChild(newList);

  newList.scrollIntoView();

  inputText.value = "";
  inputText.focus();
}

function createList(inputTextValue) {
  const list = document.createElement("li");
  list.setAttribute("class", "item-wrap");

  const item = document.createElement("span");
  item.innerText = inputTextValue;

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
  delBtn.addEventListener("click", (e) => {
    ul.removeChild(list);
  });

  itemIcon.appendChild(checkBox);
  itemIcon.appendChild(delBtn);
  list.appendChild(item);
  list.appendChild(itemIcon);

  return list;
}

addBtn.addEventListener("click", () => {
  addList();
});

resetBtn.addEventListener("click", () => {
  ul.innerHTML = "";
});

inputText.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addList();
  }
});
