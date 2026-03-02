let taskInp = document.getElementById("task");
const inpBtn = document.getElementById("btn");
const tasksContainer = document.querySelector('.afficher');

const allBtn = document.querySelector('.container button:nth-child(1)');
const completedBtn = document.querySelector('.container button:nth-child(2)');
const pendingBtn = document.querySelector('.container button:nth-child(3)');


let tasks = [];
let currentFilter = 'all';

function renderTasks() {
    tasksContainer.innerHTML = '';
    
    
    let filteredTasks = tasks;
    if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed === true);
    } else if (currentFilter === 'pending') {
        filteredTasks = tasks.filter(task => task.completed === false);
    }
    
    filteredTasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.style.backgroundColor = task.completed ? "#90EE90" : "#f9f9f9";
        taskDiv.style.padding = "10px 15px";
        taskDiv.style.margin = "5px 0";
        taskDiv.style.borderRadius = "5px";
        taskDiv.style.border = "1px solid #ccc";
        taskDiv.style.display = "flex";
        taskDiv.style.alignItems = "center";
        taskDiv.style.justifyContent = "space-between";
        taskDiv.style.width = "100%";
        
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.style.textDecoration = task.completed ? "line-through" : "none";
        taskText.style.flex = "1";
        
        const buttonsDiv = document.createElement("div");
        
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done" ;
        doneBtn.style.backgroundColor = "#4CAF50";
        doneBtn.style.color = "white";
        doneBtn.style.border = "none";
        doneBtn.style.padding = "5px 10px";
        doneBtn.style.borderRadius = "3px";
        doneBtn.style.marginRight = "5px";
        doneBtn.style.cursor = "pointer";
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.backgroundColor = "#f44336";
        deleteBtn.style.color = "white";
        deleteBtn.style.border = "none";
        deleteBtn.style.padding = "5px 10px";
        deleteBtn.style.borderRadius = "3px";
        deleteBtn.style.cursor = "pointer";
        
        doneBtn.addEventListener('click', function() {
            toggleComplete(task.text);
        });
        
        deleteBtn.addEventListener('click', function() {
            deleteTask(task.text);
        });
        
        buttonsDiv.appendChild(doneBtn);
        buttonsDiv.appendChild(deleteBtn);
        taskDiv.appendChild(taskText);
        taskDiv.appendChild(buttonsDiv);
        tasksContainer.appendChild(taskDiv);
        
    });
}

function addTask() {
    let taskText = taskInp.value.trim();
    if (taskText === "") {
        alert("Please enter a task");
        return;
    }
    
    tasks.push({
        text: taskText,
        completed: false
    });
    
    taskInp.value = "";
    renderTasks();
}

function toggleComplete(taskText) {
    const task = tasks.find(t => t.text === taskText);
    if (task) {
        task.completed = !task.completed;
    }
    renderTasks();
}

function deleteTask(taskText) {
    tasks = tasks.filter(t => t.text !== taskText);
    renderTasks();
}

function showAll() {
    currentFilter = 'all';
    allBtn.style.backgroundColor = "red";
    completedBtn.style.backgroundColor = "green";
    pendingBtn.style.backgroundColor = "yellow";
    renderTasks();
}

function showCompleted() {
    currentFilter = 'completed';
    allBtn.style.backgroundColor = "#f0f0f0";
    completedBtn.style.backgroundColor = "green";
    pendingBtn.style.backgroundColor = "#f0f0f0";
    renderTasks();
}

function showPending() {
    currentFilter = 'pending';
    allBtn.style.backgroundColor = "#f0f0f0";
    completedBtn.style.backgroundColor = "#f0f0f0";
    pendingBtn.style.backgroundColor = "yellow";
    renderTasks();
}

inpBtn.addEventListener("click", addTask);
taskInp.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

allBtn.addEventListener("click", showAll);
completedBtn.addEventListener("click", showCompleted);
pendingBtn.addEventListener("click", showPending);

showAll();