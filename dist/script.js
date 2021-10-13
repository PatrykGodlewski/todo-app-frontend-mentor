const todoInput = document.getElementById("todo--input"),
  todoSubmit = document.getElementById("todo--submit"),
  todoList = document.getElementById("todo--list"),
  clearButton = document.getElementById("todo--button--clear"),
  filterButtonAll = document.getElementById("All"),
  filterButtonActive = document.getElementById("Active"),
  filterButtonCompleted = document.getElementById("Completed");

window.onload = onLoadSetTodo();

filterButtonAll.addEventListener("click", filterAll, false);
filterButtonActive.addEventListener("click", filterActive, false);
filterButtonCompleted.addEventListener("click", filterCompleted, false);

clearButton.addEventListener("click", clearCompleted, false);
todoInput.addEventListener("keypress", addTodo, false);
todoList.addEventListener("click", todoComplete, false);

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
    storageTodo(todoInput.value);
    //Seting inpust value to ""
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

    li.appendChild(circle);
    p.appendChild(text);
    wrap.appendChild(p);
    wrap.appendChild(btn);
    li.appendChild(wrap);

    todoList.appendChild(li);
    ///check counter
    todoCounter();
  }
}

function removeTodo(e) {
  ///Remove todo localStorage
  let lis = todoList.getElementsByTagName("li");
  let index = [...lis].indexOf(e.target.parentNode.parentNode);
  let todos = JSON.parse(localStorage.getItem("tasks") || "[]");
  todos.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(todos));
  ///Remove todo visual
  e.target.parentNode.parentNode.remove();
  ///check counter
  todoCounter();
}
function todoCounter() {
  let lis = todoList.getElementsByTagName("li");
  let lastIndex = [...lis].length;

  const counterTag = document.getElementById("todo--counter");
  counterTag.innerText = lastIndex + " ";
}

function todoComplete(e) {
  if (e.target.classList.value === "todo--circle") {
    e.target.classList = "todo--circle__completed";
    e.target.parentNode.style.textDecoration = "line-through";
    e.target.parentNode.style.color = "hsl(235, 19%, 35%)";
  } else if (e.target.classList.value === "todo--circle__completed") {
    e.target.classList = "todo--circle";
    e.target.parentNode.style.textDecoration = "";
    e.target.parentNode.style.color = "";
  }
}

function clearCompleted() {
  let lis = todoList.getElementsByTagName("li");
  let length = [...lis].length;
  let c = 0;
  for (let i = 0; i < length; i++) {
    if (lis[0 + c].children[0].classList.value === "todo--circle__completed") {
      lis[0 + c].remove();
      let todos = JSON.parse(localStorage.getItem("tasks") || "[]");
      todos.splice(length, 1);
      localStorage.setItem("tasks", JSON.stringify(todos));
    } else {
      c++;
    }
    todoCounter();
  }
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
