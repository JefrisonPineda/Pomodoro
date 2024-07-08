const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector('#time #taskName');

renderTime();
renderTasks();

form.addEventListener("submit", e => {
    e.preventDefault();
    if (itTask.value !== "") {
        createTask(itTask.value);
        itTask.value = ""; 
        renderTasks();
    }
});

function createTask(value) {
    const newTask = {
        id: Date.now().toString(36),
        title: value,  // Añadir la propiedad 'title'
        completed: false 
    };

    tasks.unshift(newTask);
}

function renderTasks() {
    const html = tasks.map(task => {
        return `
            <div class="task">
                <div class="completed">${task.completed ? `<span class="done">Done</span>` : `<button class="start-button" data-id="${task.id}">Start</button>`}</div>
                <div class="title">${task.title}</div>
            </div>
        `;
    }).join('');  // Usar join aquí en lugar de después

    const tasksContainer = document.querySelector('#tasks');
    tasksContainer.innerHTML = html;

    const tasksButtons = document.querySelectorAll('.task .start-button');

    tasksButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (!timer) {
                const id = button.getAttribute('data-id');
                starButtonHandler(id);
                button.textContent = 'In progress...';                        
            }
        });
    });
}   

function starButtonHandler(id) {
    time = 5;
    current = id;
    const taskIndex = tasks.findIndex(task => task.id === id);

    taskName.textContent = tasks[taskIndex].title;
    renderTime();
    timer = setInterval(() => {
        timeHandler();
    }, 1000);
}

function timeHandler() {
    time--;
    renderTime();

    if (time === 0) {
        clearInterval(timer);
        timer = null;
        const taskIndex = tasks.findIndex(task => task.id === current);
        tasks[taskIndex].completed = true;
        current = null;
        taskName.textContent = "";                  
        renderTasks();
        renderTime();
        startBreak();
    }
} 

function startBreak() {
    time = 3;
    taskName.textContent = 'Break';
    renderTime();
    timerBreak = setInterval(() => {
        timerBreakHandler(); // Corregir el nombre de la función
    }, 1000);
}

function timerBreakHandler() { // Corregir el nombre de la función
    time--; 
    renderTime();

    if (time === 0) {
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        taskName.textContent = "";
        renderTasks();
    }
}

function renderTime() {
    const timeDiv = document.querySelector("#time #value");
    if (timeDiv) { 
        const minutes = parseInt(time / 60);
        const seconds = parseInt(time % 60);
        timeDiv.textContent = `${minutes < 10 ? '0' : ""}${minutes}:${seconds < 10 ? '0' : ""}${seconds}`;
    }
}

function markCompleted(id) {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks[taskIndex].completed = true;
}

//** 32:56 */










