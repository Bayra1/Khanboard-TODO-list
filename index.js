function generateId() {
    return `id-${Math.random()}`
}

let data = [];

function preparedCard(data) {
    return `
    <div class="within-card" id="${data.id}">
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
                    <button class="remove-edit" id="edit-Btn" onclick="editElement('')" ><i class="fa fa-edit"></i></button>
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
            todoCard.innerHTML += preparedCard(data[i])
        } else if (data[i].status === "In Progress") {
            counter = document.querySelector("#inProgress-counter");
            progressCard.innerHTML += preparedCard(data[i])
        } else if (data[i].status === "Stuck") {
            counter = document.querySelector("#stuck-counter");
            stuckCard.innerHTML += preparedCard(data[i])
        } else if (data[i].status === "Done") {
            counter = document.querySelector("#done-counter")
            doneCard.innerHTML += preparedCard(data[i])
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

function addTask() {

    let taskTitle = document.querySelector("#task-title").value;
    let taskDescription = document.querySelector("#task-description").value;
    let taskStatus = document.querySelector("#task-status").value;
    let taskPriority = document.querySelector("#task-priority").value;
    taskTitle.value = "";
    taskDescription.value = "";

    data.push({
        title: taskTitle,
        desc: taskDescription,
        status: taskStatus,
        priority: taskPriority,
        id: generateId(),
    })

    render(data)
    let warningText = document.querySelectorAll(".warning-text");
    if (taskTitle === "" && taskDescription === "") {
        for (let i = 0; i < warningText.length; i++) {
            warningText[i].style.display = "block";
            // alert('please fill your work title and list');
        }
        return;
    }
    closeModal();       
}

function counter() {
    document.querySelector("#todo-counter").textContent = document.querySelectorAll(".style-within-card").length;
    document.querySelector("#inProgress-counter").textContent = document.querySelectorAll(".within-card").length;
    document.querySelector("#stuck-counter").textContent = document.querySelectorAll(".within-card").length;
    document.querySelector("#done-counter").textContent = document.querySelectorAll(".within-card").length;
};

function removeTask(id) {
    let element = document.getElementById(id);
    if (element) {
        element.remove();
        data = data.filter(function (i) {
            return i.id !== id;
        });
    }
    counter()
};

let edit = document.querySelector("#edit-Btn");
edit.addEventListener("click", function editElement() {
    console.log('test');
    openModal();

})