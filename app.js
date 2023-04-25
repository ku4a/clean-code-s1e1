let taskInput = document.querySelector(".input_text_new");
let addButton = document.querySelector(".button_add");
let incompleteTaskHolder = document.querySelector(".list_incomplete-tasks");
let completedTasksHolder = document.querySelector(".list_completed-tasks");

let createNewTaskElement = function (taskString) {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let deleteButtonImg = document.createElement("img");
  label.innerText = taskString;
  label.className = "label task";
  checkBox.className = "input input_checkbox";
  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "input input_text task";
  editButton.innerText = "Edit";
  editButton.className = "button button_edit";
  deleteButton.className = "button button_delete";
  deleteButtonImg.src = "./remove.svg";
  listItem.className = "item";
  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

let addTask = function () {
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

let editTask = function () {
  let listItem = this.parentNode;
  let editInput = listItem.querySelector(".input_text");
  let label = listItem.querySelector(".label");
  let editBtn = listItem.querySelector(".button_edit");
  let containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("editMode");
};

let deleteTask = function () {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
}

let taskCompleted = function () {
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

let taskIncomplete = function () {
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}
addButton.addEventListener("click", addTask);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector(".input_checkbox");
  let editButton = taskListItem.querySelector("button.button_edit");
  let deleteButton = taskListItem.querySelector("button.button_delete");
  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.onchange = checkBoxEventHandler;
}
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}