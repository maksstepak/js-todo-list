const createTaskForm = document.querySelector(".create-task");
const createTaskInput = document.querySelector(".create-task__input");
const tasksList = document.querySelector(".tasks");

function getTasksLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function addTaskLocalStorage(task) {
  const tasks = getTasksLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskLocalStorage(id) {
  let tasks = getTasksLocalStorage();
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function tickTaskLocalStorage(id) {
  const tasks = getTasksLocalStorage();
  const task = tasks.find((item) => {
    return item.id === id;
  });
  task.done = !task.done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(event) {
  const li = event.currentTarget.parentElement;
  const id = li.getAttribute("data-id");
  deleteTaskLocalStorage(id);
  li.remove();
}

function tickTask(event) {
  const checkbox = event.currentTarget;
  const li = checkbox.parentElement;
  const id = li.getAttribute("data-id");
  const par = li.querySelector(".tasks__text");
  par.classList.toggle("tasks__text--done");
  tickTaskLocalStorage(id);
}

function createTaskElement(data) {
  const li = document.createElement("li");
  li.setAttribute("data-id", data.id);
  li.classList.add("tasks__item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  if (data.done) {
    checkbox.checked = true;
  }
  checkbox.classList.add("tasks__checkbox");
  checkbox.addEventListener("change", tickTask);
  li.appendChild(checkbox);

  const par = document.createElement("p");
  par.classList.add("tasks__text");
  if (data.done) {
    par.classList.add("tasks__text--done");
  }
  par.innerText = data.value;
  li.appendChild(par);

  const btn = document.createElement("button");
  btn.classList.add("tasks__delete");
  btn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
  btn.addEventListener("click", deleteTask);
  li.appendChild(btn);

  return li;
}

function generateList() {
  const tasks = getTasksLocalStorage();
  const list = document.createDocumentFragment();
  tasks.forEach((task) => {
    const el = createTaskElement(task);
    list.appendChild(el);
  });
  tasksList.appendChild(list);
}

function addTask(event) {
  event.preventDefault();

  const newValue = createTaskInput.value;
  if (newValue) {
    const data = {
      id: Math.random().toString(36).substring(2, 15),
      value: newValue,
      done: false,
    };
    addTaskLocalStorage(data);
    const el = createTaskElement(data);
    tasksList.appendChild(el);
    createTaskForm.reset();
  }
}

createTaskForm.addEventListener("submit", addTask);

generateList();
