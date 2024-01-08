var taskInput = document.querySelector(".new-task__input");
var addButton = document.querySelector(".new-task__button");
var incompleteTaskHolder = document.querySelector(".section__list_incomplete-tasks");
var completedTasksHolder = document.querySelector(".section__list_completed-tasks");


//New task list item
var createNewTaskElement = function(taskString) {

  var listItem = document.createElement("li");
  var checkBox = document.createElement("input"); //input (checkbox)
  var label = document.createElement("label");
  var editInput = document.createElement("input"); //input (text)
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = 'section__label';

  listItem.className = "section__list-item";

  checkBox.type = "checkbox";
  checkBox.className = "section__input_checkbox";
  editInput.type = "text";
  editInput.className = "section__input_text";

  editButton.innerText = "Edit";
  editButton.className = "button section__button_edit";

  deleteButton.className = "button section__button_delete";
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = "button__img";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function() {

  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task.
var editTask = function() {

  var listItem = this.parentNode;

  var editInput = listItem.querySelector('.section__input_text');
  var label = listItem.querySelector(".section__label");
  var editBtn = listItem.querySelector(".section__button_edit");
  var containsClass = listItem.classList.contains("section__list-item_edit-mode");
  
  if(containsClass) {
      label.innerText = editInput.value;
      editBtn.innerText = "Edit";
  }else {
      editInput.value = label.innerText;
      editBtn.innerText = "Save";
  }
  listItem.classList.toggle("section__list-item_edit-mode");
}

//Delete task.
var deleteTask = function() {

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function() {

  var listItem = this.parentNode;

  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {

  var listItem = this.parentNode;

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);


var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {

  var checkBox = taskListItem.querySelector(".section__input_checkbox");
  var editButton = taskListItem.querySelector(".section__button_edit");
  var deleteButton = taskListItem.querySelector(".section__button_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
