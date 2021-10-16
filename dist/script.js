const todoInput = document.getElementById("todo--input"),
  todoSubmit = document.getElementById("todo--submit"),
  todoList = document.getElementById("todo--list"),
  clearButton = document.getElementById("todo--button--clear"),
  filterButtonAll = document.getElementById("All"),
  filterButtonActive = document.getElementById("Active"),
  filterButtonCompleted = document.getElementById("Completed");
let = ldmButton = document.getElementById("todo--switch--ldm");

// ldmButton.addEventListener("click", function () {
//   const prefersDarkScheme = window.matchMedia(
//     "(prefers-color-scheme: dark)"
//   ).matches;
//   // If the OS is set to dark mode...
//   if (prefersDarkScheme) {
//     // ...then apply the .light-theme class to override those styles
//     document.body.classList.toggle("light-theme");
//     // Otherwise...
//   } else {
//     // ...apply the .dark-theme class to override the default light styles
//     document.body.classList.toggle("dark-theme");
//   }
// });

window.onload = onLoadSetTodo();

filterButtonAll.addEventListener("click", filterAll, false);
filterButtonActive.addEventListener("click", filterActive, false);
filterButtonCompleted.addEventListener("click", filterCompleted, false);

clearButton.addEventListener("click", clearCompleted, false);
todoInput.addEventListener("keypress", addTodo, false);
todoList.addEventListener("click", todoComplete, false);
todoList.addEventListener("contextmenu", (e) => e.preventDefault());

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
  counterTag.innerText = lastIndex + " ";
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
