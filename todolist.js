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
const dialogContainer = document.querySelector("div.dialog_container");
const inputElement = document.getElementById("input_element");
const selectElement = document.getElementById("select_status");

//code dund ashiglah huvisagchud
let isCreatingTask = false;
let taskId = 0;

function renderTodoApp() {
  let todoTasks = ``;
  let inProgessTasks = ``;
  let doneTasks = ``;
  let blockedTasks = ``;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].status === STATUSES.TODO) {
      todoTasks += `<div class="task">
                    <p>${todos[i].text}</p>
                    <i onclick="editTask(${todos[i].id})" class="fa-solid fa-pencil"></i>
                    <i onclick="removeTask(${todos[i].id})" class="fa-solid fa-trash red"></i>
                  </div>`;
    }
    if (todos[i].status === STATUSES.INPROGRESS) {
      inProgessTasks += `<div class="task">
                    <p>${todos[i].text}</p>
                      <i onclick="editTask(${todos[i].id})" class="fa-solid fa-pencil"></i>
                    <i onclick="removeTask(${todos[i].id})" class="fa-solid fa-trash red"></i>
            
                  </div>`;
    }
    if (todos[i].status === STATUSES.DONE) {
      doneTasks += `<div class="task">
                    <p>${todos[i].text}</p>
                   <i onclick="editTask(${todos[i].id})" class="fa-solid fa-pencil"></i>
                    <i onclick="removeTask(${todos[i].id})" class="fa-solid fa-trash red"></i>
                  </div>`;
    }
    if (todos[i].status === STATUSES.BLOCKED) {
      blockedTasks += `<div class="task">
                    <p>${todos[i].text}</p>
                    <i onclick="editTask(${todos[i].id})" class="fa-solid fa-pencil"></i>
                    <i onclick="removeTask(${todos[i].id})" class="fa-solid fa-trash red"></i>
                  </div>`;
    }
  }

  todoTasksContainer.innerHTML = todoTasks;
  inProgressTasksContainer.innerHTML = inProgessTasks;
  doneTasksContainer.innerHTML = doneTasks;
  blockedTasksContainer.innerHTML = blockedTasks;
  inputElement.value = "";
  selectElement.value = "";
  taskId = 0;
  isCreatingTask = false;
}

renderTodoApp();

addTaskButton.addEventListener("click", addTask);
submitButton.addEventListener("click", submit);
function addTask() {
  isCreatingTask = true;
  dialogContainer.classList.add("flex");
}

function submit() {
  if (isCreatingTask) {
    todos.push({
      text: inputElement.value,
      status: selectElement.value,
      id: randomIntFromInterval(),
    });
  } else {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === taskId) {
        todos[i].text = inputElement.value;
        todos[i].status = selectElement.value;
      }
    }
  }

  renderTodoApp();
  dialogContainer.classList.remove("flex");
}

function removeTask(id) {
  let filteredTodo = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id !== id) {
      filteredTodo.push(todos[i]);
    }
  }
  todos = filteredTodo;
  renderTodoApp();
}

function editTask(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      inputElement.value = todos[i].text;
      selectElement.value = todos[i].status;
    }
  }
  taskId = id;
  dialogContainer.classList.add("flex");
}

function randomIntFromInterval() {
  return Math.floor(Math.random() * 1000);
}
