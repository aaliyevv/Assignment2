class ProductDisplay {
    constructor(apiURL) {
        this.apiURL = apiURL;
        this.products = [];
        this.init();
        this.currentPage = 1;
        this.productsPerPage = 10;
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
        this.populateCategoryDropdown();
    }

    populateCategoryDropdown() {
        const categories = new Set(this.products.map(product => product.category));
        const select = document.getElementById('category-select');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });
    }

    filterByCategory() {
        const selectedCategory = document.getElementById('category-select').value;
        const filteredProducts = this.products.filter(product =>
            selectedCategory === 'all' || product.category === selectedCategory
        );
        this.displayProducts(filteredProducts);
    }

    displayProducts(products) {
        const container = document.getElementById('products-container');
        container.innerHTML = '';

        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = products.slice(startIndex, endIndex);

        productsToShow.forEach(product => container.appendChild(this.createProductElement(product)));

        this.createPaginationControls(products.length);
    }

    createPaginationControls(totalProducts) {
        const paginationContainer = document.getElementById('pagination-container');
        paginationContainer.innerHTML = '';

        const totalPages = Math.ceil(totalProducts / this.productsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.onclick = () => {
                this.currentPage = i;
                this.displayProducts(this.products);
            };
            paginationContainer.appendChild(pageButton);
        }}

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