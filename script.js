// DOM Elements
const taskInput = document.getElementById("task-name");
const startTimeInput = document.getElementById("start-time");
const endTimeInput = document.getElementById("end-time");
const dayInput = document.getElementById("task-day");
const addTaskBtn = document.getElementById("add-task");
const feedbackDiv = document.getElementById("feedback");
const taskList = document.getElementById("task-list");
const generateTimetableBtn = document.getElementById("generate-timetable");
const timeInput = document.getElementById("task-time");
const dayInput = document.getElementById("task-day");
const addTaskBtn = document.getElementById("add-task");
const generateTimetableBtn = document.getElementById("generate-timetable");
const taskList = document.getElementById("task-list");
const timetableDiv = document.getElementById("timetable");

// Load tasks from localStorage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
    feedbackDiv.textContent = "Failed to save tasks. Please try again.";
    feedbackDiv.style.color = "red";
  }
}

// Render tasks in the task list
function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `<p id="no-tasks-message">No tasks added yet. Start by adding a task above!</p>`;
    return;
  }

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("data-index", index);

    taskDiv.innerHTML = `
<<<<<<< HEAD
      <span>${task.name} (${task.day} ${task.startTime} - ${task.endTime})</span>
      <span>${task.name} (${task.day} at ${task.time})</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;

    taskList.appendChild(taskDiv);
  });
}

// Check for time conflicts with existing tasks
function isTimeConflict(newTask) {
  return tasks.some(
    (task) =>
      task.day === newTask.day &&
      ((newTask.startTime >= task.startTime && newTask.startTime < task.endTime) ||
        (newTask.endTime > task.startTime && newTask.endTime <= task.endTime) ||
        (newTask.startTime <= task.startTime && newTask.endTime >= task.endTime))
  );
}

// Add a new task
function addTask() {
  const taskName = taskInput.value.trim();
  const startTime = startTimeInput.value;
  const endTime = endTimeInput.value;
  const taskDay = dayInput.value;

  feedbackDiv.textContent = ""; // Clear previous feedback

  // Validate inputs
  if (!taskName || !startTime || !endTime) {
    feedbackDiv.textContent = "Please fill in all fields.";
    feedbackDiv.style.color = "red";
    return;
  }

  if (startTime >= endTime) {
    feedbackDiv.textContent = "End time must be later than start time.";
    feedbackDiv.style.color = "red";
    return;
  }

  const newTask = { name: taskName, startTime, endTime, day: taskDay };

  // Check for time conflicts
  if (isTimeConflict(newTask)) {
    feedbackDiv.textContent = "Time conflict detected with another task!";
    feedbackDiv.style.color = "red";
    return;
  }

  // Add the task and update the UI
  tasks.push(newTask);
  saveTasks();
  renderTasks();

  // Clear input fields
  taskInput.value = "";
  startTimeInput.value = "";
  endTimeInput.value = "";
  dayInput.value = "Monday";

  // Provide success feedback
  feedbackDiv.textContent = "Task added successfully!";
  feedbackDiv.style.color = "green";
  setTimeout(() => {
    feedbackDiv.textContent = "";
  }, 2000);
}

// Delete a task
function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    feedbackDiv.textContent = "Task deleted successfully!";
    feedbackDiv.style.color = "green";
    setTimeout(() => {
      feedbackDiv.textContent = "";
    }, 2000);
  }
}

// Generate the timetable
function generateTimetable() {
  timetableDiv.innerHTML = "";

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const groupedTasks = {};

  // Group tasks by day
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

  // Display tasks for each day
  // Create a timetable
  days.forEach((day) => {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.innerHTML = `<h3>${day}</h3>`;

    const dayTasks = groupedTasks[day];
    if (dayTasks.length > 0) {
      // Sort tasks by start time
      dayTasks.sort((a, b) => a.startTime.localeCompare(b.startTime));

      // Display each task
      dayTasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("timetable-task");
        taskDiv.textContent = `${task.startTime} - ${task.endTime}: ${task.name}`;
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

// Event Listeners
addTaskBtn.addEventListener("click", addTask);
generateTimetableBtn.addEventListener("click", generateTimetable);

// Render tasks on page load
window.onload = renderTasks;
// Event listeners
addTaskBtn.addEventListener("click", addTask);
generateTimetableBtn.addEventListener("click", generateTimetable);
window.onload = renderTasks;
