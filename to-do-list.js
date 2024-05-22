// Load tasks from local storage on page load
window.onload = function() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
      addTaskToList(task.text, task.dueDate, task.dueTime);
    });
  }
  
  function addTask() {
    var input = document.getElementById("taskInput");
    var task = input.value;
    var dueDate = document.getElementById("dueDate").value;
    var dueTime = document.getElementById("dueTime").value;
    if (task === '') {
      alert("Please enter a task!");
      return;
    }
    addTaskToList(task, dueDate, dueTime);
    input.value = '';
    document.getElementById("dueDate").value = '';
    document.getElementById("dueTime").value = '';
  }
  
  function addTaskToList(taskText, dueDate, dueTime) {
    var ul = document.getElementById("taskList");
    var li = document.createElement("li");
    var span = document.createElement("span");
    span.textContent = taskText;
    li.appendChild(span);
    if (dueDate !== '' && dueTime !== '') {
      var deadlineSpan = document.createElement("span");
      deadlineSpan.textContent = ` | Due: ${dueDate} ${dueTime}`;
      li.appendChild(deadlineSpan);
    }
    ul.appendChild(li);
  
    // Add click event listener to mark task as completed
    li.addEventListener("click", function() {
      li.classList.toggle("completed");
    });
  
    // Add delete button
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X";
    li.appendChild(deleteButton);
  
    // Add click event listener to delete task
    deleteButton.addEventListener("click", function() {
      li.remove();
      updateTaskCount();
      saveTasksToLocalStorage();
    });
  
    // Update task count
    updateTaskCount();
  
    // Save tasks to local storage
    saveTasksToLocalStorage();
  }
  
  function clearAll() {
    var ul = document.getElementById("taskList");
    ul.innerHTML = '';
    updateTaskCount();
    localStorage.clear();
  }
  
  function updateTaskCount() {
    var taskCount = document.getElementById("taskCount");
    taskCount.textContent = document.querySelectorAll("#taskList li").length;
  }
  
  function saveTasksToLocalStorage() {
    var tasks = [];
    document.querySelectorAll("#taskList li").forEach(function(task) {
      var taskText = task.querySelector("span").textContent;
      var dueDate = '';
      var dueTime = '';
      var deadlineSpan = task.querySelector("span:nth-child(2)");
      if (deadlineSpan) {
        var deadline = deadlineSpan.textContent.split(' | Due: ');
        dueDate = deadline[1].split(' ')[0];
        dueTime = deadline[1].split(' ')[1];
      }
      tasks.push({text: taskText, dueDate: dueDate, dueTime: dueTime});
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
