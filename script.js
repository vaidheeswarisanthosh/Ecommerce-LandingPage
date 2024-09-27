// Fetch products from the Fake Store API
async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    displayProducts(products);
}

// Display the products in a card format
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear the product list

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;
        productCard.addEventListener('click', () => openModal(product));
        productList.appendChild(productCard);
    });
}

// Open modal with product details
function openModal(product) {
    
    
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('productModal').style.display = 'block';
}

// Close modal
document.getElementById('closeModal').onclick = function() {
    document.getElementById('productModal').style.display = 'none';
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Load products on page load
fetchProducts();
