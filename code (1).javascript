// Sample products (in a real app, fetch from a server)
const products = [
    { id: 1, name: 'Product 1', price: 10.99, image: 'https://via.placeholder.com/250' },
    { id: 2, name: 'Product 2', price: 15.49, image: 'https://via.placeholder.com/250' },
    { id: 3, name: 'Product 3', price: 20.00, image: 'https://via.placeholder.com/250' },
];

let cart = [];
let cartTotal = 0;

// Render products
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Add to cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    cartTotal += product.price;
    updateCart();
}

// Update cart display
function updateCart() {
    document.getElementById('cart-count').textContent = cart.length;
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(itemDiv);
    });
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
    document.getElementById('cart').style.display = cart.length ? 'block' : 'none';
}

// Remove from cart
function removeFromCart(index) {
    cartTotal -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

// Show checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
    document.getElementById('checkout').style.display = 'block';
});

// Handle checkout form
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order placed! (In a real app, process payment here)');
    cart = [];
    cartTotal = 0;
    updateCart();
    document.getElementById('checkout').style.display = 'none';
});

// Initialize
renderProducts();
