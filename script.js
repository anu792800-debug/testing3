// --- Core Data and Elements ---
const products = [
    { id: 1, name: "Premium Laptop", price: 1200.00 },
    { id: 2, name: "Wireless Headphones", price: 150.00 },
    { id: 3, name: "Ergonomic Mouse", price: 45.00 },
    { id: 4, name: "4K Monitor", price: 450.00 }
];

const loginSection = document.getElementById('login-section');
const shoppingContent = document.getElementById('shopping-content'); // New container for products/cart
const userStatusElement = document.getElementById('user-status');
const loginForm = document.getElementById('login-form');
const authMessageElement = document.getElementById('auth-message');
const productsContainer = document.getElementById('products-container');
let cart = []; // Array to hold cart items

// --- Persistence and Utility Functions (Simplified for this example) ---

const saveCart = () => localStorage.setItem('shoppingCart', JSON.stringify(cart));
const loadCart = () => {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) { cart = JSON.parse(savedCart); }
};
const updateCartUI = () => {
    // [Your existing cart rendering logic goes here]
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    saveCart();
};

const renderProducts = () => {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });
};

// --- AUTHENTICATION VISIBILITY LOGIC (Crucial for page switching) ---

const updateAuthUI = () => {
    // Check local storage for persistent session
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (isAuthenticated) {
        // STATE 1: LOGGED IN (Show Shopping Page)
        loginSection.classList.add('hidden');
        shoppingContent.classList.remove('hidden');
        userStatusElement.innerHTML = `<button id="logout-btn">Log Out</button>`;
        authMessageElement.textContent = ''; // Clear message

    } else {
        // STATE 2: LOGGED OUT (Show Login Page)
        loginSection.classList.remove('hidden');
        shoppingContent.classList.add('hidden');
        userStatusElement.innerHTML = `<button id="login-toggle-btn">Log In</button>`;
    }
};

const handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    
    // ⚠️ DEMO LOGIN: Since there is no backend, any non-empty fields work 
    if (email && password) {
        authMessageElement.textContent = 'Login successful! Redirecting...';
        
        // Set persistent status
        localStorage.setItem('isAuthenticated', 'true');
        
        // ⭐ Send GA4 Login Event (Optional, but good practice)
        if (typeof gtag === 'function') {
            gtag('event', 'login', { 'method': 'email_password' });
        }
        
    } else {
        authMessageElement.textContent = 'Login failed. Please enter both email and password.';
    }
    
    // Update the UI after a short delay to allow the user to read the message
    setTimeout(updateAuthUI, 500); 
};

const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    updateAuthUI(); // Switch back to login page
};

// --- Event Listeners Setup ---

const setupAuthListeners = () => {
    loginForm.addEventListener('submit', handleLogin);
    
    // Listener for the Log Out button in the header
    userStatusElement.addEventListener('click', (e) => {
        if (e.target.id === 'logout-btn') {
            handleLogout();
        } 
        // Note: The login-toggle-btn in the header is not needed since the main content is hidden.
    });
};


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderProducts();
    updateCartUI(); // Initial check determines which page to show
    setupAuthListeners();
    // [Ensure your existing cart event listeners are set up here]
});
