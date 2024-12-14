const STATUSES = {
  TODO: "todo",
  INPROGRESS: "inProgress",
  DONE: "done",
  BLOCKED: "blocked",
};

class KanbanBoard {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.initElements();
    this.initEventListeners();
    this.renderTasks();
  }

  initElements() {
    this.todoContainer = document.getElementById("todo_tasks_container");
    this.inProgressContainer = document.getElementById(
      "inprogress_tasks_container"
    );
    this.doneContainer = document.getElementById("done_tasks_container");
    this.blockedContainer = document.getElementById("blocked_tasks_container");

    this.addTaskButton = document.getElementById("add_task_button");
    this.submitButton = document.getElementById("submit_button");
    this.dialogContainer = document.querySelector(".dialog_container");
    this.inputElement = document.getElementById("input_element");
    this.selectElement = document.getElementById("select_status");
  }

  initEventListeners() {
    this.addTaskButton.addEventListener("click", () => this.openDialog());
    this.submitButton.addEventListener("click", () => this.submitTask());
    this.dialogContainer.addEventListener("click", (e) => {
      if (e.target === this.dialogContainer) this.closeDialog();
    });
  }

  openDialog(task = null) {
    if (task) {
      this.inputElement.value = task.text;
      this.selectElement.value = task.status;
      this.currentTask = task;
    } else {
      this.currentTask = null;
      this.inputElement.value = "";
      this.selectElement.value = STATUSES.TODO;
    }
    this.dialogContainer.style.display = "flex";
  }

  closeDialog() {
    this.dialogContainer.style.display = "none";
  }

  submitTask() {
    const text = this.inputElement.value.trim();
    const status = this.selectElement.value;

    if (!text) {
      alert("Task cannot be empty!");
      return;
    }

    if (this.currentTask) {
      // Edit existing task
      this.currentTask.text = text;
      this.currentTask.status = status;
    } else {
      // Add new task
      const newTask = {
        id: Date.now(),
        text,
        status,
      };
      this.todos.push(newTask);
    }

    this.saveTodos();
    this.renderTasks();
    this.closeDialog();
  }

  renderTasks() {
    const containers = {
      [STATUSES.TODO]: this.todoContainer,
      [STATUSES.INPROGRESS]: this.inProgressContainer,
      [STATUSES.DONE]: this.doneContainer,
      [STATUSES.BLOCKED]: this.blockedContainer,
    };

    // Clear all containers
    Object.values(containers).forEach(
      (container) => (container.innerHTML = "")
    );

    this.todos.forEach((task) => {
      const taskElement = this.createTaskElement(task);
      containers[task.status].appendChild(taskElement);
    });
  }

  createTaskElement(task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.innerHTML = `
            <p>${task.text}</p>
            <div class="task-actions">
                <i onclick="board.editTask(${task.id})" class="fa-solid fa-pencil"></i>
                <i onclick="board.deleteTask(${task.id})" class="fa-solid fa-trash red"></i>
            </div>
        `;
    return taskDiv;
  }

  editTask(id) {
    const task = this.todos.find((t) => t.id === id);
    if (task) this.openDialog(task);
  }

  deleteTask(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveTodos();
    this.renderTasks();
  }

  saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}

const board = new KanbanBoard();
