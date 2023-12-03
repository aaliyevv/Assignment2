document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (product) {
        displayProductDetails(product);
    }
});

function displayProductDetails(product) {
    const container = document.getElementById('product-detail-container');

    container.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.thumbnail}" alt="${product.title}" />
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <!-- Add more product details as needed -->
    `;
}