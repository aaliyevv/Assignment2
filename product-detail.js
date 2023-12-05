document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (product) {
        displayProductDetails(product);
    }
});

function displayProductDetails(product) {
    const container = document.getElementById('product-detail-container');

    
    container.innerHTML = '';

    
    const htmlContent = `
        <h2>${product.title}</h2>
        <img src="${product.thumbnail}" alt="${product.title}" />
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <p>Discount: ${product.discountPercentage}%</p>
        <p>Rating: ${product.rating}</p>
        <p>Stock: ${product.stock}</p>
        <p>Brand: ${product.brand}</p>
        <p>Category: ${product.category}</p>
        <div id="product-images">
        <h3>Gallery</h3>
        ${product.images.map(image => `<img src="${image}" alt="${product.title}" class="product-image" />`).join('')}
        </div>
    `;

    container.innerHTML = htmlContent;
}