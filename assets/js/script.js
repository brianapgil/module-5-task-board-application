// Retrieve tasks and nextId from localStorage
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return Math.floor(Math.random()*1000000)

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let card = document.createElement("div");
    let titleEl = document.createElement("h3");
    titleEl.innerText = task.taskTitle;
    card.appendChild(titleEl);
    let descriptionEl = document.createElement("p");
    descriptionEl.innerText = task.taskDescription;
    card.appendChild(descriptionEl);
    let dueDateEl = document.createElement("p");
    dueDateEl.innerText = task.taskDueDate;
    card.appendChild(dueDateEl);
    return card;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    document.getElementById("todo-cards").innerHTML = "";
    for (let i = 0; i < taskList.length; i++) {
        let taskCard = createTaskCard(taskList[i])
        if (taskList[i].status === "to-do") {
            document.getElementById("todo-cards").appendChild(taskCard)
        }
    }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    document.getElementById("save-changes").addEventListener('click', function(){
        let taskTitle = document.getElementById("taskTitleInput").value;
        let taskDueDate = document.getElementById("taskDueDateInput").value;
        let taskDescription = document.getElementById("taskDescriptionInput").value;
        let randomId = generateTaskId();
        let newTask = {taskTitle, taskDueDate, taskDescription, status:"to-do", randomId};
        let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        renderTaskList();
})
});
