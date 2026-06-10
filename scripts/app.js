const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

const productGrid = document.getElementById("productGrid");
const cartCount = document.querySelector(".cart-count");

let cartItems = 0;

// Loading message
productGrid.innerHTML = "<h2>Loading products...</h2>";

async function loadProducts() {
    try {
        // Check cache first
        const cachedProducts = localStorage.getItem("products");

        if (cachedProducts) {
            displayProducts(JSON.parse(cachedProducts));
            return;
        }

        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        // Save to cache
        localStorage.setItem("products", JSON.stringify(products));

        displayProducts(products);

    } catch (error) {
        productGrid.innerHTML = `
            <h2 style="color:red;">
                Unable to load products. Please try again later.
            </h2>
        `;
        console.error(error);
    }
}

function displayProducts(products) {
    productGrid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}"
                 alt="${product.title}"
                 loading="lazy">

            <div class="product-info">
                <h3>${product.title}</h3>

                <p class="product-price">
                    $${product.price}
                </p>

                <p style="font-size:14px; margin-bottom:10px;">
                    ${product.description.substring(0, 80)}...
                </p>

                <button class="add-cart-btn">
                    Add to Cart
                </button>
            </div>
        `;

        const button = card.querySelector(".add-cart-btn");

        button.addEventListener("click", () => {
            cartItems++;
            cartCount.textContent = cartItems;
        });

        productGrid.appendChild(card);
    });
}

loadProducts();