const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskText = document.getElementById("taskText");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");

// Add Task
addBtn.addEventListener("click", () => {
  const title = taskText.value.trim();
  const date = taskDate.value;
  const time = taskTime.value;

  if (title === "") {
    alert("Please enter a task");
    return;
  }

  addTaskToList(title, date, time);
  clearInputs();
});

// Add task to UI
function addTaskToList(title, date, time) {
  const li = document.createElement("li");
  li.className = "task-item";

  li.innerHTML = `
    <div class="task-top">
      <input type="checkbox" class="check-btn">
      <span class="task-title">${title}</span>

      <div class="task-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    </div>

    <small>${date ? date : ""} ${time ? time : ""}</small>
  `;

  // Complete / Uncomplete
  li.querySelector(".check-btn").addEventListener("change", (e) => {
    li.classList.toggle("completed");
  });

  // Delete Task
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
  });

  // Edit Task
  li.querySelector(".edit-btn").addEventListener("click", () => {
    const newText = prompt("Edit task:", title);
    if (newText !== null && newText.trim() !== "") {
      li.querySelector(".task-title").textContent = newText;
    }
  });

  taskList.appendChild(li);
}

// Clear input fields after adding
function clearInputs() {
  taskText.value = "";
  taskDate.value = "";
  taskTime.value = "";
}
