const todoInput = document.getElementById("todo--input"),
  todoSubmit = document.getElementById("todo--submit"),
  todoList = document.getElementById("todo--list"),
  clearButton = document.getElementById("todo--button--clear"),
  filterButtonAll = document.getElementById("All"),
  filterButtonActive = document.getElementById("Active"),
  filterButtonCompleted = document.getElementById("Completed"),
  filterButtonAll2 = document.getElementById("All2"),
  filterButtonActive2 = document.getElementById("Active2"),
  filterButtonCompleted2 = document.getElementById("Completed2"),
  ldmButton = document.getElementById("todo--switch--ldm"),
  htmlHead = document.getElementsByTagName("head"),
  iconForDark = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>`,
  iconForLight = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>`;

const styleLinkDark = document.createElement("link");
styleLinkDark.id = "s_dark";
styleLinkDark.rel = "stylesheet";
styleLinkDark.href = "dist/css/dark-trigger.css";

const styleLinkLight = document.createElement("link");
styleLinkLight.id = "s_light";
styleLinkLight.rel = "stylesheet";
styleLinkLight.href = "dist/css/light-trigger.css";

const prefersDarkScheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
// If the OS is set to dark mode...
if (prefersDarkScheme) {
  ldmButton.innerHTML = iconForLight;
  ldmButton.children[0].id = "i_light";
} else {
  ldmButton.innerHTML = iconForDark;
  ldmButton.children[0].id = "i_dark";
}

ldmButton.addEventListener(
  "click",
  function (e) {
    if (ldmButton.children[0].id === "i_light") {
      ldmButton.innerHTML = iconForDark;
      ldmButton.children[0].id = "i_dark";
    } else if (ldmButton.children[0].id === "i_dark") {
      ldmButton.innerHTML = iconForLight;
      ldmButton.children[0].id = "i_light";
    }

    let s_light = document.getElementById("s_light");
    console.log(s_light);
    s_light === null
      ? htmlHead[0].appendChild(styleLinkLight)
      : s_light.remove();
  },
  false
);

window.addEventListener("DOMContentLoaded", onLoadSetTodo);
window.addEventListener("DOMContentLoaded", todoCounter);

filterButtonAll.addEventListener("click", filterAll, false);
filterButtonActive.addEventListener("click", filterActive, false);
filterButtonCompleted.addEventListener("click", filterCompleted, false);
filterButtonAll2.addEventListener("click", filterAll, false);
filterButtonActive2.addEventListener("click", filterActive, false);
filterButtonCompleted2.addEventListener("click", filterCompleted, false);

clearButton.addEventListener("click", clearCompleted, false);
todoInput.addEventListener("keypress", addTodo, false);
todoList.addEventListener("click", todoComplete, false);
todoList.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  return false;
});

function addTodo(e) {
  e.preventDefault();
  if (e.key === "Enter") {
    if (todoInput.value === "" || null || undefined) {
      throw "Input is empty";
      ///element div with class thas tells error
    }
    ///Creating elems
    const li = document.createElement("li"),
      btn = document.createElement("button"),
      circle = document.createElement("div"),
      text = document.createTextNode(todoInput.value),
      p = document.createElement("p"),
      wrap = document.createElement("div");

    ///Event for button
    btn.addEventListener("click", removeTodo, false);

    li.classList = "todo--li";
    circle.classList = "todo--circle";
    wrap.classList = "todo--li--wrap";

    li.appendChild(circle);
    p.appendChild(text);
    wrap.appendChild(p);
    wrap.appendChild(btn);
    li.appendChild(wrap);
    todoList.appendChild(li);
    //storage VALUE
    storageTodo(todoInput.value); //thi can be then removed
    // localStorageUpdate();// <========== same and i think better resolve
    todoInput.value = "";
    ///check counter
    todoCounter();
  } else {
    todoInput.value += e.key;
  }
}

function storageTodo(add_item) {
  let existingTodos = JSON.parse(localStorage.getItem("tasks") || "[]");

  existingTodos.push(add_item);
  localStorage.setItem("tasks", JSON.stringify(existingTodos));
}

function onLoadSetTodo() {
  let todos = JSON.parse(localStorage.getItem("tasks") || "[]");
  for (let i in todos) {
    const li = document.createElement("li"),
      btn = document.createElement("button"),
      circle = document.createElement("div"),
      text = document.createTextNode(todos[i]),
      p = document.createElement("p"),
      wrap = document.createElement("div");

    ///Event for button
    btn.addEventListener("click", removeTodo, false);

    li.classList = "todo--li";
    circle.classList = "todo--circle";
    wrap.classList = "todo--li--wrap";

    li.setAttribute("draggable", "true");
    li.appendChild(circle);
    p.appendChild(text);
    wrap.appendChild(p);
    wrap.appendChild(btn);
    li.appendChild(wrap);

    todoList.appendChild(li);
    ///check counter
    todoCounter();
  }
  let index = JSON.parse(localStorage.getItem("completedIndex") || "[]");
  for (let i = 0; i < index.length; i++) {
    [...todoList.children][index[i]].children[0].classList =
      "todo--circle__completed";
    [...todoList.children][index[i]].style.textDecoration = "line-through";
    [...todoList.children][index[i]].style.color = "hsl(235, 19%, 35%)";
  }
}

function removeTodo(e) {
  ///Remove todo localStorage
  let lis = todoList.getElementsByTagName("li");
  let index = [...lis].indexOf(e.target.parentNode.parentNode);
  ///Remove todo visual
  e.target.parentNode.parentNode.remove();
  //update localstorage
  localStorageUpdate();
  ///check counter
  todoCounter();
}
function todoCounter() {
  let lis = todoList.getElementsByTagName("li");
  let lastIndex = [...lis].length;

  const counterTag = document.getElementById("todo--counter");
  counterTag.innerText = counterTag.innerText === "" ? "0 " : lastIndex + " ";
}
function updateCompletedIndex() {
  let list = getIndex();
  localStorage.removeItem("completedIndex");
  localStorage.setItem("completedIndex", JSON.stringify(list));
}

function todoComplete(e) {
  if (e.target.classList.value === "todo--circle") {
    e.target.classList = "todo--circle__completed";
    e.target.parentNode.style.textDecoration = "line-through";
    e.target.parentNode.style.color = "hsl(235, 19%, 35%)";
    updateCompletedIndex();
  } else if (e.target.classList.value === "todo--circle__completed") {
    e.target.classList = "todo--circle";
    e.target.parentNode.style.textDecoration = "";
    e.target.parentNode.style.color = "";
    updateCompletedIndex();
  }
}
////////index of completed//////
function getIndex() {
  let index = [];
  for (let i = 0; i < [...todoList.children].length; i++) {
    [...todoList.children][i].children[0].classList.value ===
    "todo--circle__completed"
      ? index.push(i)
      : null;
  }
  return index;
}
/////////////////////////////////////////////////////////////////

////////////////////////////////////////// localStorageUpdate
function getList() {
  let list = [];
  for (let i = 0; i < [...todoList.children].length; i++) {
    list.push([...todoList.children][i].children[1].children[0].innerText);
  }
  return list;
}
function localStorageUpdate() {
  let list = getList();
  localStorage.clear();
  localStorage.setItem("tasks", JSON.stringify(list));
  updateCompletedIndex();
}
//////////////////////////////////////////

///////////////////FILTERS
function clearCompleted() {
  let lis = todoList.getElementsByTagName("li");
  let length = [...lis].length;
  let c = 0;
  for (let i = 0; i < length; i++) {
    if (lis[0 + c].children[0].classList.value === "todo--circle__completed") {
      lis[0 + c].remove();
    } else {
      c++;
    }
    todoCounter();
  }
  localStorageUpdate();
}
function filterAll() {
  let lis = todoList.getElementsByTagName("li");
  for (let i in [...lis]) {
    lis[i].style.display = "";
  }
}
function filterActive() {
  ///reset styles
  filterAll();
  //filter completed
  let completed = document.getElementsByClassName("todo--circle__completed");
  for (let i in [...completed]) completed[i].parentNode.style.display = "none";
}
function filterCompleted() {
  ///reset styles
  filterAll();
  //filter active
  let active = document.getElementsByClassName("todo--circle");
  for (let i in [...active]) active[i].parentNode.style.display = "none";
}

let liSort = new Sortable(todoList, {
  animation: 150,
  onEnd: function (e) {
    localStorageUpdate();
  },

  delayOnTouchOnly: true,
  delay: 100,
});
