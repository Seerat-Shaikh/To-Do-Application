
document.addEventListener('DOMContentLoaded', () => {
    // Assigning all constants
    const addTask = document.getElementById('add-task');
    const taskContainer = document.getElementById('task-container');
    const inputTask = document.getElementById('task-input');
    const completedFilter = document.getElementById('completed');
    const clearCompletedButton = document.querySelector('.clear');
    const itemsNo = document.querySelector('.items-no');
    const dragAndDropFooter = document.getElementById('footer');
    const sunMoonToggle = document.getElementById('sun-moon-toggle');
    const body = document.querySelector('body');
  
    // Initializing empty list
    let tasks = [];
  
    // Adding a task on clicking
    addTask.addEventListener('click', () => {
      let task = document.createElement('div');
      task.classList.add('task');
      updateItemsNo();
  
      // Adding circles in each task
      let circle = document.createElement('div');
      circle.classList.add('circle');
      circle.onclick = toggleTaskStatus;
      let circleIcon = document.createElement('i');
      circleIcon.classList.add('fas', 'fa-circle');
      circle.appendChild(circleIcon);
      task.appendChild(circle);
  
      // Creating a list item
      let li = document.createElement('li');
      li.innerText = `${inputTask.value}`;
      task.appendChild(li);
  
      // Activating check button
      let checkButton = document.createElement('button');
      checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
      checkButton.classList.add('checkTask');
      checkButton.style.display = 'none';
      task.appendChild(checkButton);
  
      // Activating delete button
      let deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteButton.classList.add('deleteTask');
      deleteButton.style.display = 'none';
      task.appendChild(deleteButton);
  
      if (inputTask.value === '') {
        alert('Please enter a task');
      } else {
        taskContainer.classList.remove('hidden');
        taskContainer.appendChild(task);
        circle.style.display = 'flex';
      }
  
      // updating current epmty list with input value
      inputTask.value = '';

  
      // Toggling task status on clicking circle
      function toggleTaskStatus() {
        task.classList.toggle('completed');
        if (task.classList.contains('completed')) {
          checkButton.style.display = 'block';
          deleteButton.style.display = 'block';
        } else {
          checkButton.style.display = 'none';
          deleteButton.style.display = 'none';
        }
        updateItemsNo();
      }
  
      // Updating items count
      function updateItemsNo() {
        const incompleteTasks = tasks.filter((task) => !task.classList.contains('completed'));
        const count = incompleteTasks.length;
        itemsNo.innerText = `${count} ${count === 1 ? 'item' : 'items'} left`;
  
        incompleteTasks.forEach((task, index) => {
          task.dataset.taskId = index + 1;
        });
      }
  
      li.addEventListener('click', (event) => {
        event.stopPropagation();
      });
  
      // Styling check button
      checkButton.addEventListener('click', (event) => {
        checkButton.parentElement.style.textDecoration = 'line-through';
        task.classList.toggle('completed');
        event.stopPropagation();
      });
  
      // Removing task by clicking delete button
      deleteButton.addEventListener('click', (event) => {
        let target = event.target;
        let task = deleteButton.parentElement;
        taskContainer.removeChild(task);
  
        if (taskContainer.childElementCount === 0) {
          taskContainer.classList.add('hidden');
        }
  
        event.stopPropagation();
      });
  
      tasks.push(task);
    });

  
    // Filtering completed tasks
    completedFilter.addEventListener('click', () => {
      completedFilter.classList.add('active');
      document.getElementById('active').classList.remove('active');
      document.getElementById('all').classList.remove('active');
  
      tasks.forEach((task) => {
        if (task.classList.contains('completed')) {
          task.style.display = 'flex';
        } else {
          task.style.display = 'none';
        }
      });
    });
  
    // Clearing completed tasks
    clearCompletedButton.addEventListener('click', () => {
      const completedTasks = Array.from(taskContainer.getElementsByClassName('completed'));
  
      completedTasks.forEach((task) => {
        taskContainer.removeChild(task);
      });
  
      tasks = tasks.filter((task) => !completedTasks.includes(task));
  
      if (taskContainer.childElementCount === 0) {
        taskContainer.classList.add('hidden');
      }
  
      updateItemsNo();
    });
  
    // Drag and drop
    dragAndDropFooter.addEventListener('click', () => {
      const draggableTasks = document.querySelectorAll('.task');
  
      draggableTasks.forEach((task) => {
        task.draggable = true;
        task.addEventListener('dragstart', handleDragStart);
        task.addEventListener('dragover', handleDragOver);
        task.addEventListener('drop', handleDrop);
        task.addEventListener('dragend', handleDragEnd);
      });
    });
  
    function handleDragStart(event) {
      event.target.classList.add('dragging');
    }
  
    function handleDragOver(event) {
      event.preventDefault();
    }
  
    function handleDrop(event) {
      event.preventDefault();
      const draggedTask = document.querySelector('.dragging');
      const dropZoneTask = event.currentTarget;
  
      if (draggedTask !== dropZoneTask) {
        const draggedIndex = Array.from(taskContainer.children).indexOf(draggedTask);
        const dropZoneIndex = Array.from(taskContainer.children).indexOf(dropZoneTask);
  
        if (draggedIndex < dropZoneIndex) {
          taskContainer.insertBefore(draggedTask, dropZoneTask.nextSibling);
        } else {
          taskContainer.insertBefore(draggedTask, dropZoneTask);
        }
  
        tasks.splice(dropZoneIndex, 0, tasks.splice(draggedIndex, 1)[0]);
      }
    }
  
    function handleDragEnd(event) {
      event.target.classList.remove('dragging');
      updateItemsNo();
    }
  
    
    // All filter
    const allFilter = document.getElementById('all');
    allFilter.addEventListener('click', () => {
      completedFilter.classList.remove('active');
      activeFilter.classList.remove('active');
      allFilter.classList.add('active');
  
      tasks.forEach((task) => {
        task.style.display = 'flex';
      });
    });


    //Changing Drak mode to light mode
    sunMoonToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (sunMoonToggle.classList.contains('sun')) {
          sunMoonToggle.src = 'moon.svg';
          sunMoonToggle.alt = 'Moon';
          sunMoonToggle.classList.remove('sun');
        } else {
          sunMoonToggle.src = 'sun.svg';
          sunMoonToggle.alt = 'Sun';
          sunMoonToggle.classList.add('sun');
        }
    });

 
    //Active
    document.getElementById('active').addEventListener('click', () => {
        completedFilter.classList.remove('active');
        document.getElementById('active').classList.add('active');
        document.getElementById('all').classList.remove('active');
        tasks.forEach((task) => {
          if (task.classList.contains('completed')) {
            task.style.display = 'none';
          } else {
            task.style.display = 'flex';
          }
        });
    });
  
});
  
  


  

    
    
  
  
  
  


   