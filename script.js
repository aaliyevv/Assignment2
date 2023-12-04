class ProductDisplay {
    constructor(apiURL) {
        this.apiURL = apiURL;
        this.products = [];
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => this.fetchProducts());
    }

    async fetchProducts() {
        try {
            const response = await fetch(this.apiURL);
            this.handleResponse(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.products = data.products;
        this.displayProducts(this.products);
    }

    displayProducts(products) {
        const container = document.getElementById('products-container');
        container.innerHTML = '';
        products.forEach(product => container.appendChild(this.createProductElement(product)));
    }

    createProductElement(product) {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = this.getProductHTML(product);
        productElement.addEventListener('click', () => this.openProductDetail(product));
        return productElement;
    }

    getProductHTML(product) {
        return `
            <div class="product-image">
                <img src="${product.thumbnail}" alt="${product.title}" />
            </div>
            <div class="product-info">
                <h2>${product.title}</h2>
                <p>Price: $${product.price}</p>
                <p>Discount: ${product.discountPercentage}%</p>
                <p>Category: ${product.category}</p>
                <p>Stock: ${product.stock}</p>
            </div>
        `;
    }

    openProductDetail(product) {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = 'product-detail.html'; 
    }

    searchProducts() {
        const searchInput = document.getElementById('search-input');
        const keyword = searchInput.value.toLowerCase();
        const filteredProducts = this.products.filter(product => 
            product.title.toLowerCase().includes(keyword) ||
            product.description.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword)
        );
        this.displayProducts(filteredProducts);
    }
}

const productDisplay = new ProductDisplay('https://dummyjson.com/products');