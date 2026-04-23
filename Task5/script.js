// DARK MODE
function toggleDarkMode(){
    document.body.classList.toggle("dark");
}

// PRODUCTS
let products = [
    {
        name:"iPhone 14",
        price:80000,
        image:"https://via.placeholder.com/300",
        features:"A15 Chip, 12MP Camera"
    },
    {
        name:"Samsung S23",
        price:70000,
        image:"https://via.placeholder.com/300",
        features:"Snapdragon, AMOLED"
    },
    {
        name:"Dell XPS",
        price:90000,
        image:"https://via.placeholder.com/300",
        features:"Intel i7, 16GB RAM"
    }
];

let cart = [];

// SHOW PRODUCTS
function displayProducts(){
    let box = document.getElementById("productList");

    products.forEach((p,i)=>{
        box.innerHTML += `
        <div class="product-card" onclick="openModal(${i})">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
        </div>`;
    });
}

// MODAL
function openModal(i){
    let p = products[i];
    document.getElementById("modal").style.display="block";

    document.getElementById("modalContent").innerHTML = `
        <h2>${p.name}</h2>
        <img src="${p.image}" width="200">
        <p>${p.features}</p>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
        <button onclick="closeModal()">Close</button>
    `;
}

function closeModal(){
    document.getElementById("modal").style.display="none";
}

// CART
function addToCart(i){
    cart.push(products[i]);
    updateCart();
    closeModal();
}

function updateCart(){
    document.getElementById("cartCount").innerText = cart.length;

    let list = document.getElementById("cartItems");
    let total = 0;

    list.innerHTML = "";

    cart.forEach((item,index)=>{
        total += item.price;

        list.innerHTML += `
        <li>
            ${item.name} - ₹${item.price}
            <button onclick="removeItem(${index})">❌</button>
        </li>`;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

function removeItem(i){
    cart.splice(i,1);
    updateCart();
}

function toggleCart(){
    document.getElementById("cartSection").classList.toggle("hidden");
}

displayProducts();