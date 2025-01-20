const taskInput = document.getElementById("task-name");
const timeInput = document.getElementById("task-time");
const dayInput = document.getElementById("task-day");
const addTaskBtn = document.getElementById("add-task");
const generateTimetableBtn = document.getElementById("generate-timetable");
const taskList = document.getElementById("task-list");
const timetableDiv = document.getElementById("timetable");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("data-index", index);

    taskDiv.innerHTML = `
      <span>${task.name} (${task.day} at ${task.time})</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;

    taskList.appendChild(taskDiv);
  });
}

function addTask() {
  const taskName = taskInput.value.trim();
  const taskTime = timeInput.value;
  const taskDay = dayInput.value;

  if (taskName && taskTime && taskDay) {
    tasks.push({ name: taskName, time: taskTime, day: taskDay });
    saveTasks();
    renderTasks();
    taskInput.value = "";
    timeInput.value = "";
    dayInput.value = "Monday";
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function generateTimetable() {
  // Clear previous timetable
  timetableDiv.innerHTML = "";

  // Group tasks by day
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const groupedTasks = {};
  days.forEach((day) => {
    groupedTasks[day] = tasks.filter((task) => task.day === day);
  });

  // Create a timetable
  days.forEach((day) => {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.innerHTML = `<h3>${day}</h3>`;

    const dayTasks = groupedTasks[day];
    if (dayTasks.length > 0) {
      dayTasks.sort((a, b) => a.time.localeCompare(b.time)); // Sort tasks by time
      dayTasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("timetable-task");
        taskDiv.textContent = `${task.time} - ${task.name}`;
        dayDiv.appendChild(taskDiv);
      });
    } else {
      dayDiv.innerHTML += `<p>No tasks</p>`;
    }

    timetableDiv.appendChild(dayDiv);
  });
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);
generateTimetableBtn.addEventListener("click", generateTimetable);
window.onload = renderTasks;