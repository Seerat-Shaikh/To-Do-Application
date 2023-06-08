// Assigning constants
const addtaskcontainer = document.getElementById("add-task-container");
const addTask = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
const inputTask = document.getElementById("input-task");
const remainingItems = document.getElementsByClassName("remaining")[0];
const lightmode = document.getElementsByClassName("lightmode")[0];

/* DRAG & DROP */
let draggedTask = null;

// Function called when drag starts
function dragStart(event) {
  draggedTask = event.target;
  event.dataTransfer.setData("text/plain", event.target.innerHTML);
}

// Function called when drag over
function dragOver(event) {
  event.preventDefault();
}

// Function called when drop happens
function drop(event) {
  event.preventDefault();
  if (draggedTask) {
    const dropTarget = event.target;
    const taskContainer = document.getElementById("task-container");
    const tasks = Array.from(taskContainer.getElementsByClassName("task"));
    const dropIndex = tasks.indexOf(dropTarget);

    // Reorder the tasks
    if (dropIndex == tasks.length - 1) {
      taskContainer.removeChild(draggedTask);
      taskContainer.appendChild(draggedTask);
    } else if (dropIndex !== -1) {
      taskContainer.removeChild(draggedTask);
      taskContainer.insertBefore(draggedTask, tasks[dropIndex]);
    }

    draggedTask = null;
  }
}

taskContainer.addEventListener("dragover", dragOver);
taskContainer.addEventListener("drop", drop);

// ITEMS COUNT 
let iteminfo = document.createElement("div");
iteminfo.classList.add("iteminfo");
let itemno = document.createElement("p");
iteminfo.appendChild(itemno);
let count = 0;

// ALL BUTTON
let all = document.createElement("button");
all.innerHTML = "All";
all.classList.add("itembtns");
iteminfo.appendChild(all);

// ACTIVE BUTTON
let activebtn = document.createElement("button");
activebtn.innerHTML = "Active";
activebtn.classList.add("itembtns");
iteminfo.appendChild(activebtn);

// COMPLETED BUTTON
let completed = document.createElement("button");
completed.innerHTML = "Completed";
completed.classList.add("itembtns");
completed.classList.add("completed");
iteminfo.appendChild(completed);

// CLAR COMPLETED BUTTON
let clearcmp = document.createElement("button");
clearcmp.innerHTML = "Clear Completed";
clearcmp.classList.add("itembtns");
iteminfo.appendChild(clearcmp);

// ADIDNG NEW TODO
addTask.addEventListener("click", function () {
  let task = document.createElement("div");
  task.classList.add("task");
  task.draggable = true;
  task.addEventListener("dragstart", dragStart);

//c CHECK BUTTON
  let checkButton = document.createElement("button");
  checkButton.innerHTML =
    '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
  checkButton.classList.add("deleteTask");
  task.appendChild(checkButton);

  let li = document.createElement("li");
  li.innerText = `${inputTask.value}`;
  li.classList.add("draggables");
  li.setAttribute("draggable", "true");
  task.appendChild(li);

  if (inputTask.value === "") {
    alert("Please Enter a Task");
  } else {
    iteminfo.classList.add("iteminfo");
    count++;
    itemno.innerText = `${count} item left`;
    taskContainer.appendChild(task);
    remainingItems.appendChild(iteminfo);
  }

  inputTask.value = "";

// when checked
  let checked = false;
  function toggle() {
    checked = !checked;
  }

  function ischecked() {
    if (checkButton.parentElement.classList.contains("checked")) {
      checkButton.parentElement.classList.remove("checked");
    } else {
      checkButton.parentElement.classList.add("checked");
    }
  }

  checkButton.addEventListener("click", function () {
    ischecked();
    toggle();
    if (checked == true) {
      count--;
    } else {
      count++;
    }
    itemno.innerText = `${count} item left`;
  });

//Active button 

  activebtn.addEventListener("click", function () {
    let taskElementsArray = document.getElementsByClassName("task");
    Array.prototype.forEach.call(taskElementsArray, function (element) {
      if (element.classList.contains("checked")) {
        element.classList.add("hide");
      } else {
        element.classList.remove("hide");
      }
    });
  });

 // dEleting all checked todos
  clearcmp.addEventListener("click", function () {
    let taskElementsArray = document.getElementsByClassName("task");
    // each task with line-through text decoration gets removed
    Array.prototype.forEach.call(taskElementsArray, function (element) {
      if (element.classList.contains("checked")) {
        element.remove();
      }
    });
  });

// showing completed task
  completed.addEventListener("click", function () {
    let taskElementsArray = document.getElementsByClassName("task");
    Array.prototype.forEach.call(taskElementsArray, function (element) {
      if (!element.classList.contains("checked")) {
        element.classList.add("hide");
      }
    });
  });

  // All filter
  all.addEventListener("click", function () {
    let taskElementsArray = document.getElementsByClassName("task");
    Array.prototype.forEach.call(taskElementsArray, function (element) {
      if (element.classList.contains("hide")) {
        element.classList.remove("hide");
      }
    });
  });

});

//Changing Darkk mode to light mode
let isLightMode = false;
const lightModeButton = document.querySelector('.lightmode');
const sunIcon = lightModeButton.querySelector('.fa-sun-o');
const moonIcon = lightModeButton.querySelector('.fa-moon-o');

lightModeButton.addEventListener("click", function () {
  if (!isLightMode) {
    document.body.style.backgroundImage =
      "url('bkg\ img.jpg'), url('white2.jpg')";

    isLightMode = true;
    addtaskcontainer.style.backgroundColor = "white";
    inputTask.style.backgroundColor = "white";
    inputTask.style.color = "black";
    sunIcon.classList.add('fa-moon-o');
    sunIcon.classList.remove('fa-sun-o');
    moonIcon.style.color = "black";
  } else {
    document.body.style.backgroundImage =
      "url('bkg\ img.jpg'), url('black.jpg')";

    isLightMode = false;
    addtaskcontainer.style.backgroundColor = "rgb(37, 35, 35)";
    inputTask.style.backgroundColor = "rgb(37, 35, 35)";
    inputTask.style.color = "white";
    sunIcon.classList.add('fa-sun-o');
    sunIcon.classList.remove('fa-moon-o');
    moonIcon.style.color = "white";
  }
});


  


  

    
    
  
  
  
  


   
