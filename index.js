function generateId() {
  return `id-${Math.random()}`;
}

let data = [];
let isEdit = false;
let editId = null;
function preparedCard(data) {
  return `
    <div class="within-card" draggable="true" id="${data.id}" data-id="${data.id}">
    <div class="style-within-card">
    <div style="display: flex; gap: 15px;">
    <button class="done-button"><i class="fa fa-check"></i></button>
    <div id="information">
    <h4>${data.title}</h4>
    <p>${data.desc}</p>
    <div id="card-priority">${data.priority}</div>
    </div>
    </div>
    <div id="actions">
    <div>
    <button class="remove-edit" id="delete-Btn" onclick="removeTask('${data.id}')"><i class="fa fa-trash"></i></button>
    </div>
    <div>
    <button class="remove-edit" id="edit-Btn" onclick="editItem('${data.id}')" ><i class="fa fa-edit"></i></button>
    </div>
    </div>
    </div>
    </div>
    `;
}

function render(data) {
  let counter;
  let todoCard = document.querySelector("#cardWrapper-todo");
  let progressCard = document.querySelector("#cardWrapper-inProgress");
  let stuckCard = document.querySelector("#cardWrapper-stuck");
  let doneCard = document.querySelector("#cardWrapper-done");

  todoCard.innerHTML = "";
  progressCard.innerHTML = "";
  stuckCard.innerHTML = "";
  doneCard.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    if (data[i].status === "To do") {
      counter = document.querySelector("#todo-counter");
      todoCard.innerHTML += preparedCard(data[i]);
    } else if (data[i].status === "In Progress") {
      counter = document.querySelector("#inProgress-counter");
      progressCard.innerHTML += preparedCard(data[i]);
    } else if (data[i].status === "Stuck") {
      counter = document.querySelector("#stuck-counter");
      stuckCard.innerHTML += preparedCard(data[i]);
    } else if (data[i].status === "Done") {
      counter = document.querySelector("#done-counter");
      doneCard.innerHTML += preparedCard(data[i]);
    }
  }
}

function openModal() {
  let model = document.getElementById("model");
  model.style.display = "flex";
}

function closeModal() {
  let model = document.getElementById("model");
  model.style.display = "none";
}

function addTask(isEdit) {
  if (!isEdit) {
    let taskTitle = document.querySelector("#task-title").value;
    let taskDescription = document.querySelector("#task-description").value;
    let taskStatus = document.querySelector("#task-status").value;
    let taskPriority = document.querySelector("#task-priority").value;

    data.push({
      title: taskTitle,
      desc: taskDescription,
      status: taskStatus,
      priority: taskPriority,
      id: generateId(),
    });

    document.querySelector("#task-title").value = "";
    document.querySelector("#task-description").value = "";

    render(data);
    let warningText = document.querySelectorAll(".warning-text");
    if (taskTitle === "" && taskDescription === "") {
      for (let i = 0; i < warningText.length; i++) {
        warningText[i].style.display = "block";
        // alert('please fill your work title and list');
      }
      return;
    }
  } else {
    updateItem();
  }
  closeModal();
  counter();
}

function counter() {
  document.querySelector("#todo-counter").textContent =
    countTaskByStatus("To do");
  document.querySelector("#inProgress-counter").textContent =
    countTaskByStatus("In Progress");
  document.querySelector("#stuck-counter").textContent =
    countTaskByStatus("Stuck");
  document.querySelector("#done-counter").textContent =
    countTaskByStatus("Done");
}

function countTaskByStatus(status) {
  return data.filter((task) => task.status === status).length;
}
// function countTasksByStatus(status) {
// return data.filter(function(task) {
// return task.status === status;
// }).length;
// }
function Updatecounter() {
  document.querySelector("#todo-counter").textContent =
    countTaskByStatus("To do");
  document.querySelector("#inProgress-counter").textContent =
    countTaskByStatus("In Progress");
  document.querySelector("#stuck-counter").textContent =
    countTaskByStatus("Stuck");
  document.querySelector("#done-counter").textContent =
    countTaskByStatus("Done");
}

function removeTask(id) {
  let element = document.getElementById(id);
  if (element) {
    element.remove();
    data = data.filter((i) => {
      return i.id !== id;
    });
  }
  Updatecounter();
}
// edit cards
function editItem(id) {
  let item = document.getElementById(id);
  let editData = data.filter((element) => element.id === id)[0];

  if (item) {
    openModal();
    let taskTitle = document.querySelector("#task-title");
    let taskDescription = document.querySelector("#task-description");
    let taskPriority = document.querySelector("#task-priority");
    let taskStatus = document.querySelector("#task-status");
    taskTitle.value = editData.title;
    taskDescription.value = editData.desc;
    taskPriority.value = editData.priority;
    taskStatus.value = editData.status;
    taskTitle.focus();
    isEdit = true;
    editId = id;
  }
}

function updateItem() {
  data = data.map((el) => {
    if (el.id === editId) {
      el.title = document.querySelector("#task-title").value;
      el.desc = document.querySelector("#task-description").value;
      el.priority = document.querySelector("#task-priority").value;
      el.priority = document.querySelector("#task-status").value;
    }
    return el;
  });

  render(data);
  closeModal();
  isEdit = false;
  editId = null;
}

document.querySelector("#add-task").onclick = () => {
  addTask(isEdit);
};
// drag and drop
let cardWrappers = [
  document.querySelector("#cardWrapper-todo"),
  document.querySelector("#cardWrapper-inProgress"),
  document.querySelector("#cardWrapper-stuck"),
  document.querySelector("#cardWrapper-done"),
];

let todoCard = document.querySelector("#cardWrapper-todo");
let progressCard = document.querySelector("#cardWrapper-inProgress");
let stuckCard = document.querySelector("#cardWrapper-stuck");
let doneCard = document.querySelector("#cardWrapper-done");

let allboards = document.querySelectorAll(".box-board");
let draggedItem = null;

cardWrappers.forEach((cardWrapper) => {
  cardWrapper.addEventListener("dragstart", (event) => {
    // console.log(draggedItem);
    draggedItem = event.target;
    event.dataTransfer.setData("text", event.target.getAttribute("data-id"));
  });
  cardWrapper.addEventListener("dragend", () => {
    draggedItem = null;
  });
});

allboards.forEach((board) => {
  board.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  board.addEventListener("dragenter", (event) => {
    event.preventDefault();
    if (draggedItem) {
      if (draggedItem !== event.currentTarget) {
        let id = draggedItem.getAttribute("data-id");
        console.log(id);
        event.currentTarget
          .querySelector(".all-cards")
          .appendChild(draggedItem);
        if (status === "To do") {
          todoCard.querySelector(".all-cards").appendChild(draggedItem);
        } else if (status === "In Progress") {
          progressCard.querySelector(".all-cards").appendChild(draggedItem);
        } else if (draggedItem === "Stuck") {
          stuckCard.querySelector(".all-cards").appendChild(draggedItem);
        } else if (status === "Done") {
          doneCard.querySelector(".all-cards").appendChild(draggedItem);
          console.log(todoCard);
        }
      }
    }
    counter();
  });
  board.addEventListener("dragleave", () => {});
  board.addEventListener("drop", (event) => {
    event.preventDefault();
  });
  Updatecounter();
});

//// Push Function into Done Section

let pushBtn = document.querySelector(".done-button");
function push() {
  pushBtn.addEventListener("click", function () {
    let withinCardId = document.querySelector(".within-card");
    let doneCard = document.querySelector("#cardWrapper-done");
    doneCard.push(withinCardId);
  });
}
