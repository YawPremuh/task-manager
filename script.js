const taskInput = document.getElementById("task-name");
const timeInput = document.getElementById("task-time");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    if (checkConflict(task.time)) taskDiv.classList.add("conflict");

    taskDiv.innerHTML = `
      <span>${task.name} - ${task.time}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(taskDiv);
  });
}

function addTask() {
  const taskName = taskInput.value.trim();
  const taskTime = timeInput.value;

  if (taskName && taskTime) {
    tasks.push({ name: taskName, time: taskTime });
    saveTasks();
    renderTasks();
    taskInput.value = "";
    timeInput.value = "";
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function checkConflict(newTime) {
  return tasks.some((task) => task.time === newTime);
}

addTaskBtn.addEventListener("click", addTask);
window.onload = renderTasks;
