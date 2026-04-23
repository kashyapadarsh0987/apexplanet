let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        list.innerHTML += `
        <li class="${task.completed ? 'completed' : ''}">
            <span onclick="toggleTask(${index})">${task.text}</span>
            <button onclick="deleteTask(${index})">❌</button>
        </li>`;
    });
}

function addTask() {
    let input = document.getElementById("taskInput");

    if(input.value.trim() === "") return;

    tasks.push({text: input.value, completed: false});
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    showTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

showTasks();


// ---------------- PRODUCT PRO ----------------
let products = [
    {name: "iPhone 14", category: "mobile"},
    {name: "Samsung S23", category: "mobile"},
    {name: "Dell XPS", category: "laptop"},
    {name: "HP Pavilion", category: "laptop"}
];

let filteredProducts = [...products];

function displayProducts() {
    let container = document.getElementById("productList");
    container.innerHTML = "";

    filteredProducts.forEach(p => {
        container.innerHTML += `
        <div class="product-card">
            <h3>${p.name}</h3>
            <p>${p.category}</p>
        </div>`;
    });
}

function filterProducts(category) {
    if(category === "all") {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }
    displayProducts();
}

function searchProduct() {
    let value = document.getElementById("search").value.toLowerCase();

    filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(value)
    );

    displayProducts();
}

displayProducts();