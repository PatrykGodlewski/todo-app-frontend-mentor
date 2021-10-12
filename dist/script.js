const todoInput = document.getElementById("todo--input");
const todoSubmit = document.getElementById("todo--submit");
const todoList = document.getElementById("todo--list");

window.onload = onLoadSetTodo();
todoInput.addEventListener("keypress", addTodo, false);

function addTodo(e) {
  e.preventDefault();
  if (e.key === "Enter") {
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
  }
}

function removeTodo(e) {
  ///Remove todo localStorage
  lis = todoList.getElementsByTagName("li");
  index = [...lis].indexOf(e.target.parentNode);
  let todos = JSON.parse(localStorage.getItem("tasks") || "[]");
  todos.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(todos));
  ///Remove todo visual
  e.target.parentNode.parentNode.remove();
}
