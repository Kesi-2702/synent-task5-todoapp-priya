// DOM Target Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Internal Data State Array Engine (Pulls from localStorage if it exists)
let tasksArray = JSON.parse(localStorage.getItem('savedTasks')) || [];

// Initial Startup Render Engine Execution
window.addEventListener('DOMContentLoaded', renderTasks);

function renderTasks() {
    todoList.innerHTML = '';
    tasksArray.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span onclick="toggleComplete(${index})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// Add New Tasks Logic
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cleanText = todoInput.value.trim();
    if (!cleanText) return;

    tasksArray.push({ text: cleanText, completed: false });
    updateStorageAndSync();
    todoInput.value = '';
});

// Flip Task Complete Boolean Logic State
window.toggleComplete = function(index) {
    tasksArray[index].completed = !tasksArray[index].completed;
    updateStorageAndSync();
}

// Remove Task Elements Logic
window.deleteTask = function(index) {
    tasksArray.splice(index, 1);
    updateStorageAndSync();
}

// Synchronize Storage with App DOM Pipeline Engine
function updateStorageAndSync() {
    localStorage.setItem('savedTasks', JSON.stringify(tasksArray));
    renderTasks();
}