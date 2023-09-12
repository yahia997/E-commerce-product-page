// Select all elements
var menuBtn = document.querySelector(".menu-btn"),
    menu = document.querySelector("nav ul"),
    closeMenuBtn = document.querySelector(".close-menu-btn"),
    cartBtn = document.querySelector(".cart-btn"),
    cart = document.querySelector(".cart"),
    minusBtn = document.getElementById("minus"),
    plusBtn = document.getElementById("plus"),
    val = document.getElementById("val"),
    addToCart = document.getElementById("add-to-cart"),
    cartItems = document.getElementById("items"),
    cartNum = document.querySelector(".cart-num"),
    delBtn = document.querySelector(".del"),
    gallery = document.getElementById("gallery-content");

// product object
let product = JSON.parse(localStorage.getItem("product")) ||
{
    name: "Fall Limited Edition Sneakers",
    count: 1,
    price: 125.00,
    seleted: false
}

let cartItemElem = function (name, price, count) {
    return `
    <div class="item">
    <img src="./images/image-product-1-thumbnail.jpg" width="45px"/>
    <p>${name} <br> $${price} × ${count} <strong>$${price * count}</strong></p>
    <button class="del" onclick="del()">
    <img src="./images/icon-delete.svg" alt="delete"/>
    </button>
    </div>`
}

if (product.seleted) {
    // update the cart
    cartItems.innerHTML = cartItemElem(product.name, product.price, product.count);
    cartNum.textContent = product.count;
} else {
    cartItems.innerHTML = "<p class='empty'>Your cart is empty</p>";
}

// Open Menu
menuBtn.addEventListener("click", () => {
    menu.style.display = "flex";
});

// close the menu
closeMenuBtn.addEventListener("click", () => {
    menu.style.display = "none";
});

// open and close the cart
cartBtn.addEventListener("click", () => {
    if (getComputedStyle(cart).display === "none") {
        cart.style.display = "block";
    } else {
        cart.style.display = "none";
    }
});

// update the count of the product
val.textContent = product.count;
plusBtn.addEventListener("click", () => {
    val.textContent = ++product.count;
});
minusBtn.addEventListener("click", () => {
    if (product.count !== 1) {
        val.textContent = --product.count;
    }
});

// add to the cart
addToCart.addEventListener("click", () => {
    product.seleted = true;
    localStorage.setItem("product", JSON.stringify(product));

    // update the cart
    cartItems.innerHTML = cartItemElem(product.name, product.price, product.count);
    cartNum.textContent = product.count;
});

// delete the item
const del = () => {
    localStorage.removeItem("product");
    cartItems.innerHTML = "<p class='empty'>Your cart is empty</p>";
    product = {
        name: "Fall Limited Edition Sneakers",
        count: val.textContent || 1,
        price: 125.00,
        seleted: false
    }
    cartNum.textContent = "";
};


// close the gallery 
document.getElementById("gallery-close").addEventListener("click", () => {
    gallery.style.display = 'none';
    document.querySelector(".gallery-content + span").style.display = 'none';
});

//open the gallery 
var homeShowedImg = document.getElementById("gallery");
homeShowedImg.addEventListener("click", () => {
    gallery.style.display = 'flex';
    document.querySelector(".gallery-content + span").style.display = 'block';    
});

// update thumbnail active style function
function active(elem, arrOfElems) {
    // remove old styles
    arrOfElems.forEach((elem) => {
        elem.classList.remove("active-img");
    });
    // add new style on active element
    elem.classList.add("active-img");
}

var thumbnailsArr = document.querySelectorAll("#thumbnails img");
thumbnailsArr.forEach((elem, index) => {
    elem.addEventListener("click", () => {
        i = index + 1;
        showedImg.src = `./images/image-product-${i}.jpg`;

        // update active style
        active(elem, thumbnailsArr);
    });
});

// next and previous img
var showedImg = document.getElementById("showed");
let i = 1;

document.getElementById("next").addEventListener("click", () => {
    i === 4 ? i = 1 : i++;
    showedImg.src = `./images/image-product-${i}.jpg`;

    // update active style
    active(thumbnailsArr[i - 1], thumbnailsArr);
});

document.getElementById("previous").addEventListener("click", () => {
    i === 1 ? i = 4 : i--;
    showedImg.src = `./images/image-product-${i}.jpg`;

    // update active style
    active(thumbnailsArr[i - 1], thumbnailsArr);
});

// change img for big screens
var thumbnailsArr2 = document.querySelectorAll("#thumbnails-1 img");
thumbnailsArr2.forEach((elem, index) => {
    elem.addEventListener("click", () => {
        i = index + 1;
        homeShowedImg.src = `./images/image-product-${i}.jpg`;

        // update active style
        active(elem, thumbnailsArr2);
    });
});


// // next and previous img for mobile

document.getElementById("next-1").addEventListener("click", () => {
    i === 4 ? i = 1 : i++;
    homeShowedImg.src = `./images/image-product-${i}.jpg`;

    // update active style
    active(thumbnailsArr2[i - 1], thumbnailsArr2);
});

document.getElementById("previous-1").addEventListener("click", () => {
    i === 1 ? i = 4 : i--;
    homeShowedImg.src = `./images/image-product-${i}.jpg`;

    // update active style
    active(thumbnailsArr2[i - 1], thumbnailsArr2);
});
