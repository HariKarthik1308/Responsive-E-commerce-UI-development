const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {

    try {

        const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`
        );

        const product = await response.json();

        document.getElementById("productDetails").innerHTML = `
            <div class="product-details">

                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>

                <div class="product-info-detail">

                    <h2>${product.title}</h2>

                    <p class="detail-price">
                        $${product.price}
                    </p>

                    <p>${product.description}</p>

                    <button class="detail-btn" onclick="addToCart()">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

    } catch(error) {

        document.getElementById("productDetails").innerHTML =
            "<h2>Failed to load product.</h2>";

        console.error(error);
    }
}

function addToCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(productId);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added To Cart!");
}

loadProduct();