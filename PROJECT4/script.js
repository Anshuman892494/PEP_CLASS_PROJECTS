function addTaskFun() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn" onclick="this.parentElement.remove()">Delete</button>
    `;

    taskList.appendChild(li);

    taskInput.value = '';
}