let cart = [];


/* КОРЗИНА */

function addToCart(name, price) {

    let item = cart.find(function(x) {
        return x.name === name;
    });

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}


function updateCart() {

    let box = document.getElementById("cartItems");

    box.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(function(item, index) {

        total += item.price * item.quantity;
        count += item.quantity;

        let div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML =
            "<div>" +
            "<b>" + item.name + "</b>" +
            "<p>" + item.price + " сомони</p>" +
            "</div>" +

            "<div class='quantity'>" +

            "<button onclick='changeQuantity(" +
            index + ", -1)'>−</button>" +

            "<span>" + item.quantity + "</span>" +

            "<button onclick='changeQuantity(" +
            index + ", 1)'>+</button>" +

            "</div>";

        box.appendChild(div);
    });

    document.getElementById("cartCount").textContent = count;
    document.getElementById("totalPrice").textContent = total;
}


function changeQuantity(index, number) {

    cart[index].quantity += number;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


function showCart() {

    document
        .getElementById("cartWindow")
        .classList.add("show");

    updateCart();
}


function closeCart() {

    document
        .getElementById("cartWindow")
        .classList.remove("show");
}


/* ТОВАР */

function showProduct(name, text, price) {

    document.getElementById("productTitle").textContent = name;

    document.getElementById("productText").textContent = text;

    document.getElementById("productPrice").textContent = price;

    document
        .getElementById("productWindow")
        .classList.add("show");
}


function closeProduct() {

    document
        .getElementById("productWindow")
        .classList.remove("show");
}


/* ИЗБРАННОЕ */

function toggleFavorite(button) {

    button.classList.toggle("active");

    if (button.classList.contains("active")) {
        button.textContent = "♥";
    } else {
        button.textContent = "♡";
    }
}


/* ПОИСК */

function searchProducts() {

    let text = document
        .getElementById("search")
        .value
        .toLowerCase();

    document
        .querySelectorAll(".product")
        .forEach(function(product) {

            let name = product.dataset.name.toLowerCase();

            if (name.includes(text)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
}


/* КАТЕГОРИИ */

function filterProducts(category) {

    document
        .querySelectorAll(".product")
        .forEach(function(product) {

            if (
                category === "all" ||
                product.dataset.category === category
            ) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
}


/* ТЁМНАЯ ТЕМА */

function toggleTheme() {

    document.body.classList.toggle("dark");
}


/* МЕНЮ */

function toggleMenu() {

    document
        .getElementById("menu")
        .classList.toggle("show");
}


/* ПРОФИЛЬ */

function showProfile() {

    document
        .getElementById("profileWindow")
        .classList.add("show");
}


function closeProfile() {

    document
        .getElementById("profileWindow")
        .classList.remove("show");
}


/* ОФОРМЛЕНИЕ */

function openCheckout() {

    if (cart.length === 0) {
        alert("Корзина пустая!");
        return;
    }

    closeCart();

    document
        .getElementById("checkoutWindow")
        .classList.add("show");
}


function closeCheckout() {
    document
        .getElementById("checkoutWindow")
        .classList.remove("show");
}


function finishOrder() {

    let name = document
        .getElementById("customerName")
        .value;

    if (name === "") {
        alert("Введите имя!");
        return;
    }

    alert(
        "Спасибо, " +
        name +
        "! Заказ оформлен 🎉"
    );

    cart = [];

    updateCart();

    closeCheckout();
}