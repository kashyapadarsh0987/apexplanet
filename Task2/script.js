// LOAD TASKS FROM STORAGE
window.onload = function() {
    loadTasks();
};

// FORM VALIDATION
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let msg = document.getElementById("formMsg");

    if (name === "" || email === "" || message === "") {
        msg.style.color = "red";
        msg.innerText = "All fields are required!";
    } else {
        msg.style.color = "green";
        msg.innerText = "Submitted Successfully!";
    }
});

// ADD TASK
function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") return;

    let task = {
        text: taskText,
        completed: false
    };

    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    loadTasks();
}

// GET TASKS
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// LOAD TASKS
function loadTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let tasks = getTasks();

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span onclick="toggleTask(${index})" class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>
            <button onclick="deleteTask(${index})">X</button>
        `;

        list.appendChild(li);
    });
}

// DELETE TASK
function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// TOGGLE COMPLETE
function toggleTask(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}