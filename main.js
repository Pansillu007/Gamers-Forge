// Add item to cart (called on button click)
function addToCart(productName, price, quantityId) {
  const quantity = parseInt(document.getElementById(quantityId).value);
  if (quantity > 0) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ name: productName, price: price, quantity: quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${productName} added to cart.`);
  } else {
    alert("Please enter a valid quantity.");
  }
}

// Load cart items on the cart page
document.addEventListener("DOMContentLoaded", function () {
  const cartTableBody = document.querySelector("#cart-table tbody");
  const totalPriceEl = document.getElementById("total-price");

  if (!cartTableBody || !totalPriceEl) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");

    const itemCell = document.createElement("td");
    itemCell.textContent = item.name;

    const quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;

    const priceCell = document.createElement("td");
    priceCell.textContent = `$${item.price}`;

    const totalCell = document.createElement("td");
    const itemTotal = item.quantity * item.price;
    total += itemTotal;
    totalCell.textContent = `$${itemTotal.toFixed(2)}`;

    const removeCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeFromCart(index);
    removeCell.appendChild(removeButton);

    row.appendChild(itemCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(totalCell);
    row.appendChild(removeCell);

    cartTableBody.appendChild(row);
  });

  totalPriceEl.textContent = total.toFixed(2);
});

// Remove individual item from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // remove item by index
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// Clear all cart items
function clearCart() {
  if (confirm("Are you sure you want to empty your cart?")) {
    localStorage.removeItem("cart");
    location.reload();
  }
}

// Add to favourites
function addToFavourites(productName) {
  alert(productName + " has been added to your favourites!");

  let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  if (!favourites.includes(productName)) {
    favourites.push(productName);
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }
}

// ✅ Updated Pay Now function
function payNow() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Calculate delivery date (3–5 days)
  const today = new Date();
  const randomDays = Math.floor(Math.random() * 3) + 3;
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + randomDays);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = deliveryDate.toLocaleDateString(undefined, options);

  // Clear cart from storage
  localStorage.removeItem("cart");

  // Clear cart table visually
  const cartTableBody = document.querySelector("#cart-table tbody");
  if (cartTableBody) cartTableBody.innerHTML = "";

  const totalPriceEl = document.getElementById("total-price");
  if (totalPriceEl) totalPriceEl.textContent = "0.00";

  // Show confirmation message
  const messageDiv = document.getElementById("confirmation-message");
  if (messageDiv) {
    messageDiv.textContent = `Thank you for your purchase! Your items will be delivered by ${formattedDate}.`;
  } else {
    alert(`Thank you for your purchase! Your items will be delivered by ${formattedDate}.`);
  }
}

// Payment form submit handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('payment-form');
  const thankYouMessage = document.getElementById('thank-you-message');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const today = new Date();
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + 5);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = deliveryDate.toLocaleDateString(undefined, options);

      thankYouMessage.textContent = `Thank you for your purchase! Your order will be delivered by ${formattedDate}.`;
      form.reset();
    });
  }
});

// Apply favourites to table
function applyFavourites() {
  const tableBody = document.getElementById("favourites-list");
  const countDisplay = document.getElementById("favourites-count");

  tableBody.innerHTML = "";

  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  if (favourites.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 3;
    cell.textContent = "No favourites selected.";
    row.appendChild(cell);
    tableBody.appendChild(row);
    if (countDisplay) countDisplay.textContent = "0";
    return;
  }

  favourites.forEach((item, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = item;

    const priceCell = document.createElement("td");
    priceCell.textContent = "$99.99"; // Placeholder price

    const actionCell = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => removeFromFavourites(index);
    actionCell.appendChild(removeBtn);

    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });

  if (countDisplay) countDisplay.textContent = favourites.length;
}

// Remove item from favourites
function removeFromFavourites(index) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites.splice(index, 1);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  applyFavourites(); // Refresh table
}


// Hamburger menu toggle
function toggleMenu() {
  const menu = document.getElementById("navMenu").querySelector("ul");
  menu.classList.toggle("active");
}

// Contact form validation
function validateContactForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return false;
  }

  alert("Message sent! Thank you.");
  return true;
}

// Product search
function searchItems() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".product");

  let found = false;

  products.forEach(product => {
    const name = product.getAttribute("data-name").toLowerCase();
    if (name.includes(input)) {
      product.style.display = "block";
      found = true;
    } else {
      product.style.display = "none";
    }
  });

  const noResults = document.getElementById("noResults");
  if (!found && input !== "") {
    if (!noResults) {
      const message = document.createElement("p");
      message.id = "noResults";
      message.textContent = "No products found.";
      message.style.textAlign = "center";
      document.querySelector(".product-list").appendChild(message);
    }
  } else if (noResults) {
    noResults.remove();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCheckoutTable();

  const form = document.getElementById("payment-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const address = document.getElementById("address").value.trim();
      const card = document.getElementById("card").value.trim();

      if (!name || !address || !card) {
        alert("Please fill out all fields.");
        return;
      }

      // Clear cart after successful "payment"
      localStorage.removeItem("cart");

      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3 + Math.floor(Math.random() * 3));
      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      const formattedDate = deliveryDate.toLocaleDateString(undefined, options);

      document.getElementById("thank-you-message").textContent =
        `Thank you for your purchase, ${name}! Your order will be delivered by ${formattedDate}.`;

      document.getElementById("checkout-table").querySelector("tbody").innerHTML = "";
      document.getElementById("total-price").textContent = "0.00";

      form.reset();
    });
  }
});

function loadCheckoutTable() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const tbody = document.querySelector("#checkout-table tbody");
  const totalPriceEl = document.getElementById("total-price");
  let total = 0;

  cart.forEach(item => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;

    const quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;

    const priceCell = document.createElement("td");
    priceCell.textContent = `$${item.price}`;

    const totalCell = document.createElement("td");
    const itemTotal = item.quantity * item.price;
    total += itemTotal;
    totalCell.textContent = `$${itemTotal.toFixed(2)}`;

    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(totalCell);

    tbody.appendChild(row);
  });

  totalPriceEl.textContent = total.toFixed(2);
}
