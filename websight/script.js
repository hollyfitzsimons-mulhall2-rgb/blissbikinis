let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
localStorage.setItem("cart", JSON.stringify(cart));
}

function formatPrice(price) {
return "€" + Number(price).toFixed(2);
}

function updateCart() {
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

if (!cartItems || !cartTotal) return;

cartItems.innerHTML = "";
let total = 0;

if (cart.length === 0) {
cartItems.innerHTML = "<li>Your cart is empty.</li>";
} else {
for (let i = 0; i < cart.length; i++) {
const item = cart[i];
total += Number(item.price);

const li = document.createElement("li");
li.innerHTML = `
<div class="cart-item-info">
<div class="cart-item-name">${item.name}</div>
<div class="cart-item-size">Size: ${item.size}</div>
<div class="cart-item-price">${formatPrice(item.price)}</div>
</div>
<button type="button" class="remove-btn" onclick="removeFromCart(${i})">Remove</button>
`;
cartItems.appendChild(li);
}
}

cartTotal.textContent = "Total: " + formatPrice(total);

if (cartCount) {
cartCount.textContent = cart.length;
}
}

function addToCart(name, price, selectId) {
const sizeSelect = document.getElementById(selectId);
const message = document.getElementById("cart-message");

if (!sizeSelect) {
alert("Size selector not found.");
return;
}

if (sizeSelect.value === "") {
alert("Please select a size first.");
return;
}

cart.push({
name: name,
price: Number(price),
size: sizeSelect.value
});

saveCart();
updateCart();

if (message) {
message.textContent = "Added to cart!";
message.style.display = "block";

setTimeout(function () {
message.style.display = "none";
}, 2000);
}

sizeSelect.value = "";
}

function removeFromCart(index) {
cart.splice(index, 1);
saveCart();
updateCart();
}

function clearCart() {
cart = [];
saveCart();
updateCart();
}

function openCart() {
const popup = document.getElementById("cart-popup");
if (!popup) return;
updateCart();
popup.style.display = "flex";
}

function closeCart() {
const popup = document.getElementById("cart-popup");
if (!popup) return;
popup.style.display = "none";
}

function loadWeather() {
const weatherText = document.getElementById("weather");
if (!weatherText) return;

fetch("https://api.open-meteo.com/v1/forecast?latitude=53.3498&longitude=-6.2603&current=temperature_2m&timezone=auto")
.then(function(response) {
return response.json();
})
.then(function(data) {
let temp = data.current.temperature_2m;
weatherText.textContent = "Current temperature in Dublin: " + temp + "°C";
})
.catch(function() {
weatherText.textContent = "Weather could not be loaded.";
});
}

document.addEventListener("DOMContentLoaded", function () {
const banner = document.querySelector(".top-banner");

if (banner) {
banner.style.opacity = "0";
setTimeout(function () {
banner.style.transition = "opacity 0.6s ease";
banner.style.opacity = "1";
}, 200);
}

updateCart();
loadWeather();

const popup = document.getElementById("cart-popup");
if (popup) {
popup.addEventListener("click", function (event) {
if (event.target === popup) {
closeCart();
}
});
}

const form = document.getElementById("contact-form");

if (form) {
form.addEventListener("submit", function(e) {
e.preventDefault();

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const collection = document.getElementById("collection").value;
const size = document.getElementById("size").value;
const message = document.getElementById("message").value.trim();
const formMessage = document.getElementById("form-message");

if (name === "" || email === "" || phone === "" || collection === "" || size === "" || message === "") {
formMessage.textContent = "Please fill in all fields.";
return;
}

if (!email.includes("@") || !email.includes(".")) {
formMessage.textContent = "Please enter a valid email.";
return;
}

if (message.length < 10) {
formMessage.textContent = "Message must be at least 10 characters.";
return;
}

formMessage.textContent = "Form submitted successfully!";
form.reset();
});
}
});