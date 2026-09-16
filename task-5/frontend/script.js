const API_URL = "http://localhost:5000/api/products";

const productsContainer =
  document.getElementById("products-container");

const loading =
  document.getElementById("loading");

const error =
  document.getElementById("error");

const productCount =
  document.getElementById("product-count");


/*
  Fetch products from our REST API
*/
async function fetchProducts() {

  // Show loading
  loading.classList.remove("hidden");
  error.classList.add("hidden");
  productsContainer.innerHTML = "";

  try {

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const result = await response.json();

    console.log("API Response:", result);

    const products = result.data;

    productCount.textContent =
      `${products.length} Products`;

    displayProducts(products);

  } catch (err) {

    console.error("API Error:", err);

    error.classList.remove("hidden");

    productCount.textContent =
      "Unable to load products";

  } finally {

    loading.classList.add("hidden");

  }
}


/*
  Display products on the page
*/
function displayProducts(products) {

  if (!products || products.length === 0) {

    productsContainer.innerHTML = `
      <div class="error">
        <h3>No products available</h3>
        <p>There are currently no products to display.</p>
      </div>
    `;

    return;
  }


  productsContainer.innerHTML =
    products.map(product => {

      return `
        <article class="product-card">

          <div class="product-image-wrapper">

            <img
              class="product-image"
              src="${product.image}"
              alt="${product.name}"
              loading="lazy"
            />

          </div>


          <div class="product-info">

            <span class="product-category">
              ${product.category}
            </span>

            <h3 class="product-name">
              ${product.name}
            </h3>

            <p class="product-description">
              ${product.description}
            </p>


            <div class="product-bottom">

              <span class="product-price">
                ₹${Number(product.price).toLocaleString("en-IN")}
              </span>

              <button
                class="buy-btn"
                onclick="handleBuy('${product.name}')"
              >
                Add to Cart
              </button>

            </div>

          </div>

        </article>
      `;

    }).join("");
}


/*
  Temporary button interaction
*/
function handleBuy(productName) {

  alert(`${productName} added to cart!`);

}


/*
  Fetch products when page loads
*/
fetchProducts();
