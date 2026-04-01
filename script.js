// ==================== CONFIGURATION ====================
// Ensure this matches the port where your Flask backend is running
const API_BASE_URL = 'http://localhost:5000';

// ==================== DOM ELEMENTS ====================
const ordersContainer = document.getElementById('orders-container');
const createOrderForm = document.getElementById('create-order-form');
const orderInput = document.getElementById('order-content');

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
});

// ==================== ORDER MANAGEMENT FUNCTIONS ====================

// 1. Load all orders from the API
async function loadOrders() {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Clear previous content (including loading message)
        ordersContainer.innerHTML = '';
        
        if (data.orders.length === 0) {
            ordersContainer.innerHTML = '<p class="no-orders">No orders yet. Add one above!</p>';
            return;
        }
        
        // Render each order as a card
        data.orders.forEach(order => {
            renderOrderCard(order);
        });
        
    } catch (error) {
        console.error('Failed to load orders:', error);
        ordersContainer.innerHTML = '<p class="error-message">Failed to load orders. Make sure the backend is running and CORS is enabled.</p>';
    }
}

// 2. Create a new order
async function createOrder(content) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create order');
        }
        
        const newOrder = await response.json();
        loadOrders(); // Refresh the list
        return newOrder;
        
    } catch (error) {
        console.error('Failed to create order:', error);
        alert(`Error: ${error.message}`);
        throw error;
    }
}

// 3. Update an existing order
async function updateOrder(id, content) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update order');
        }
        
        loadOrders(); // Refresh the list
        
    } catch (error) {
        console.error('Failed to update order:', error);
        alert(`Error: ${error.message}`);
        throw error;
    }
}

// 4. Delete an order
async function deleteOrder(id) {
    const confirmed = confirm('Are you sure you want to delete this order?');
    if (!confirmed) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete order');
        }
        
        loadOrders(); // Refresh the list
        
    } catch (error) {
        console.error('Failed to delete order:', error);
        alert(`Error: ${error.message}`);
        throw error;
    }
}

// ==================== RENDERING FUNCTIONS ====================

// Create HTML for a single order card
function renderOrderCard(order) {
    const card = document.createElement('article');
    card.className = 'order-card';
    card.dataset.id = order.id; // Store ID for event delegation
    
    // Format the date nicely
    const date = new Date(order.created);
    const formattedDate = date.toLocaleString();
    
    card.innerHTML = `
        <div class="order-header">
            <span>#${order.id}</span>
            <span>${formattedDate}</span>
        </div>
        <div class="order-content">${escapeHtml(order.content)}</div>
        <div class="card-actions">
            <button class="btn-edit" data-id="${order.id}">Edit</button>
            <button class="btn-delete" data-id="${order.id}">Delete</button>
        </div>
    `;
    
    ordersContainer.appendChild(card);
}

// Helper function to prevent XSS attacks
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== EVENT LISTENERS ====================

// Handle form submission (Create new order)
createOrderForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent page reload
    
    const content = orderInput.value.trim();
    
    if (!content) {
        alert('Please enter an order');
        return;
    }
    
    try {
        await createOrder(content);
        orderInput.value = ''; // Clear the input
    } catch (error) {
        console.error('Form submission failed:', error);
    }
});

// Event Delegation: Handle clicks on Edit and Delete buttons
ordersContainer.addEventListener('click', async (event) => {
    const target = event.target;
    
    // Handle Edit button click
    if (target.classList.contains('btn-edit')) {
        const card = target.closest('.order-card');
        const id = parseInt(card.dataset.id);
        const contentElement = card.querySelector('.order-content');
        const currentContent = contentElement.textContent;
        
        const newContent = prompt('Update order:', currentContent);
        
        if (newContent === null) return; // User cancelled
        if (!newContent.trim()) {
            alert('Order content cannot be empty');
            return;
        }
        if (newContent.length > 100) {
            alert('Order content must be 100 characters or less');
            return;
        }
        
        try {
            await updateOrder(id, newContent.trim());
        } catch (error) {
            console.error('Edit failed:', error);
        }
    }
    
    // Handle Delete button click
    if (target.classList.contains('btn-delete')) {
        const card = target.closest('.order-card');
        const id = parseInt(card.dataset.id);
        
        await deleteOrder(id);
    }
});