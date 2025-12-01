// --- New Authentication Variables and Elements ---
let isAuthenticated = false;
const loginSection = document.getElementById('login-section');
const loginForm = document.getElementById('login-form');
const userStatusElement = document.getElementById('user-status');
const authMessageElement = document.getElementById('auth-message');
const productsContainer = document.getElementById('products-container');


// --- Authentication Functions ---

const updateAuthUI = () => {
    if (isAuthenticated) {
        userStatusElement.innerHTML = `Welcome, User! <button id="logout-btn">Log Out</button>`;
        loginSection.classList.add('hidden');
        productsContainer.classList.remove('hidden'); 
    } else {
        userStatusElement.innerHTML = `<button id="login-toggle-btn">Log In</button>`;
        loginSection.classList.remove('hidden');
        productsContainer.classList.add('hidden'); // Hide products until logged in (optional)
    }
};

const handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    
    // In a REAL application, you would send this email/password to a backend server.
    // For this demo, we'll use a simple check and simulate success:

    if (email && password) {
        // SIMULATE SUCCESSFUL LOGIN
        isAuthenticated = true;
        authMessageElement.textContent = 'Login successful!';
        
        // ⭐ Optional: Send a custom GA4 event for successful login
        if (typeof gtag === 'function') {
            gtag('event', 'login_success', {
                'method': 'email_password'
            });
        }
        
        // Save status locally (not secure, but persists the demo state)
        localStorage.setItem('isAuthenticated', 'true');
        
    } else {
        authMessageElement.textContent = 'Please enter both email and password.';
    }
    updateAuthUI();
};

const handleLogout = () => {
    isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    updateAuthUI();
    authMessageElement.textContent = 'You have been logged out.';
};

// --- Update Initialization and Event Listeners ---

const initAuth = () => {
    // Check local storage for persistent session
    if (localStorage.getItem('isAuthenticated') === 'true') {
        isAuthenticated = true;
    }
    updateAuthUI();
};

// Add event listener setup to your existing setupEventListeners function
const setupAuthListeners = () => {
    loginForm.addEventListener('submit', handleLogin);
    
    // Toggle login/logout button functionality
    userStatusElement.addEventListener('click', (e) => {
        if (e.target.id === 'logout-btn') {
            handleLogout();
        } else if (e.target.id === 'login-toggle-btn') {
            loginSection.classList.remove('hidden');
            productsContainer.classList.add('hidden');
        }
    });
};

// --- IMPORTANT: Call these new functions ---
document.addEventListener('DOMContentLoaded', () => {
    // ... (Your existing loadCart, renderProducts, updateCartUI calls) ...
    initAuth();
    setupAuthListeners();
});
