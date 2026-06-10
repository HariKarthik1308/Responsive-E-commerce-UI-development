const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

const productGrid = document.getElementById("productGrid");
const cartCount = document.querySelector(".cart-count");

let cartItems = 0;

async function loadProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();

        products.forEach(product => {
            const card = document.createElement("div");

            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}" loading="lazy">

                <div class="product-info">
                    <h3>${product.title}</h3>

                    <p class="product-price">
                        $${product.price}
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

    } catch (error) {
        console.error("Failed to load products:", error);
    }
}

loadProducts();