// Retrieve tasks and nextId from localStorage
let nextId = JSON.parse(localStorage.getItem("nextId"));
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return Math.floor(Math.random()*1000000)

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
      .addClass('card task-card draggable my-3')
      .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.taskTitle);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.taskDescription);
    const cardDueDate = $('<p>').addClass('card-text').text(task.taskDueDate);
    const cardDeleteBtn = $('<button>')
      .addClass('btn btn-danger delete')
      .text('Delete')
      .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);
    
    if (task.taskDueDate && task.status !== 'done') {
      const now = dayjs();
      const taskDueDate = dayjs(task.taskDueDate, 'DD/MM/YYYY');

      if (now.isSame(taskDueDate, 'day')) {
        taskCard.addClass('bg-warning text-white');
      } else if (now.isAfter(taskDueDate)) {
        taskCard.addClass('bg-danger text-white');
        cardDeleteBtn.addClass('border-light');
      }
    }
  

    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);
  

    return taskCard;
  }
  

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    document.getElementById("todo-cards").innerHTML = "";
    $("#todo-cards").empty();
    $("#in-progress-cards").empty();
    $("#done-cards").empty();
    for (let i = 0; i < taskList.length; i++) {
        let taskCard = createTaskCard(taskList[i])
        if (taskList[i].status === "to-do") {
            $("#todo-cards").append(taskCard);
        }
        else if (taskList[i].status === "in-progress") {
            
            $("#in-progress-cards").append(taskCard);
        }
        else if (taskList[i].status === "done") {

            $("#done-cards").append(taskCard);
        }
    }
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,

        helper: function (e) {

          const original = $(e.target).hasClass('ui-draggable')
            ? $(e.target)
            : $(e.target).closest('.ui-draggable');

          return original.clone().css({
            width: original.outerWidth(),
          });
        },
      });
    }

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const taskId = $(this).attr('data-task-id');
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks.forEach((task) => {
      if (task.id == taskId) {
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTaskList();
    location.reload();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  

    const taskId = ui.draggable[0].dataset.taskId;
    console.log(taskId);

    const newStatus = event.target.id;
    console.log(newStatus);
    for (let task of taskList) {

      if (task.id == taskId) {
        task.status = newStatus;
        console.log(newStatus);
      }
    }

    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
  }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    
    renderTaskList();
    document.getElementById("save-changes").addEventListener('click', function(){
        let taskTitle = document.getElementById("taskTitleInput").value;
        let taskDueDate = document.getElementById("taskDueDateInput").value;
        let taskDescription = document.getElementById("taskDescriptionInput").value;
        let randomId = generateTaskId();
        let newTask = {taskTitle, taskDueDate, taskDescription, status:"to-do", id: randomId};
        taskList.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        renderTaskList();
})
$('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });

  $( function() {
    $( "#taskDueDateInput" ).datepicker();
  } );
});

