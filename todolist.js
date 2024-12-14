const STATUSES = {
  TODO: "todo",
  INPROGRESS: "inProgress",
  DONE: "done",
  BLOCKED: "blocked",
};

let todos = [
  {
    id: 1,
    text: "Shudee ugaah",
    status: STATUSES.TODO,
  },
  {
    id: 2,
    text: "hool hiih",
    status: STATUSES.TODO,
  },
  {
    id: 3,
    text: "mashin tseverleh",
    status: STATUSES.INPROGRESS,
  },
  {
    id: 4,
    text: "Nom unshih",
    status: STATUSES.DONE,
  },
  {
    id: 5,
    text: "Money oloh",
    status: STATUSES.BLOCKED,
  },
  {
    id: 6,
    text: "ajil haih",
    status: STATUSES.BLOCKED,
  },
];

// DOM Element Selection
const todoTasksContainer = document.getElementById("todo_tasks_container");
const inProgressTasksContainer = document.getElementById(
  "inprogress_tasks_container"
);
const doneTasksContainer = document.getElementById("done_tasks_container");
const blockedTasksContainer = document.getElementById(
  "blocked_tasks_container"
);
const addTaskButton = document.getElementById("add_task_button");
const submitButton = document.getElementById("submit_button");
const dialogContainer = document.querySelector(".dialog_container");
const inputElement = document.getElementById("input_element");
const selectElement = document.getElementById("select_status");

// State Management
let isEditingTask = false;
let currentTaskId = null;

// Render Task HTML
function createTaskHTML(task) {
  return `
    <div class="task" data-id="${task.id}">
      <p>${task.text}</p>
      <div class="task-actions">
        <i onclick="editTask(${task.id})" class="fa-solid fa-pencil"></i>
        <i onclick="removeTask(${task.id})" class="fa-solid fa-trash red"></i>
      </div>
    </div>
  `;
}

// Render Todo App
function renderTodoApp() {
  const tasksByStatus = {
    [STATUSES.TODO]: [],
    [STATUSES.INPROGRESS]: [],
    [STATUSES.DONE]: [],
    [STATUSES.BLOCKED]: [],
  };

  // Organize tasks by status
  todos.forEach((todo) => {
    tasksByStatus[todo.status].push(todo);
  });

  // Render tasks in respective containers
  todoTasksContainer.innerHTML = tasksByStatus[STATUSES.TODO]
    .map(createTaskHTML)
    .join("");
  inProgressTasksContainer.innerHTML = tasksByStatus[STATUSES.INPROGRESS]
    .map(createTaskHTML)
    .join("");
  doneTasksContainer.innerHTML = tasksByStatus[STATUSES.DONE]
    .map(createTaskHTML)
    .join("");
  blockedTasksContainer.innerHTML = tasksByStatus[STATUSES.BLOCKED]
    .map(createTaskHTML)
    .join("");

  // Reset dialog and state
  resetDialog();
}

// Reset Dialog
function resetDialog() {
  inputElement.value = "";
  selectElement.value = STATUSES.TODO;
  isEditingTask = false;
  currentTaskId = null;
  dialogContainer.classList.remove("flex");
}

// Add Task Button Handler
function addTask() {
  resetDialog();
  dialogContainer.classList.add("flex");
}

// Submit Task
function submit() {
  const taskText = inputElement.value.trim();

  // Validate input
  if (!taskText) {
    alert("Task text cannot be empty!");
    return;
  }

  if (isEditingTask && currentTaskId !== null) {
    // Edit existing task
    todos = todos.map((todo) =>
      todo.id === currentTaskId
        ? { ...todo, text: taskText, status: selectElement.value }
        : todo
    );
  } else {
    // Add new task
    todos.push({
      id: generateUniqueId(),
      text: taskText,
      status: selectElement.value,
    });
  }

  renderTodoApp();
}

// Remove Task
function removeTask(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodoApp();
}

// Edit Task
function editTask(id) {
  const taskToEdit = todos.find((todo) => todo.id === id);

  if (taskToEdit) {
    inputElement.value = taskToEdit.text;
    selectElement.value = taskToEdit.status;
    currentTaskId = id;
    isEditingTask = true;
    dialogContainer.classList.add("flex");
  }
}

// Generate Unique ID
function generateUniqueId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

// Event Listeners
function initializeEventListeners() {
  addTaskButton.addEventListener("click", addTask);
  submitButton.addEventListener("click", submit);

  // Close dialog when clicking outside
  dialogContainer.addEventListener("click", (e) => {
    if (e.target === dialogContainer) {
      resetDialog();
    }
  });
}

// Initialize App
function initApp() {
  renderTodoApp();
  initializeEventListeners();
}

// Start the application
initApp();
