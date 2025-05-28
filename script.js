const productContainer = document.querySelector(".product-container");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
let allProducts = [];

// Toggle hamburger menu on mobile
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Fetch and display product data
const getData = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    allProducts = await res.json();
    printProducts(allProducts);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Render product cards
const printProducts = (products = []) => {
  // Sort by price (low to high)
  const sortedProducts = products.sort((a, b) => a.price - b.price);

  productContainer.innerHTML = "";

  if (sortedProducts.length === 0) {
    const notFoundMsg = document.createElement("h2");
    notFoundMsg.className = "result-not-found";
    notFoundMsg.textContent = "Result not found";
    productContainer.appendChild(notFoundMsg);
    return;
  }

  sortedProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h4>₹ ${product.price}</h4>
      <h5>${product.title}</h5>
      <h5>Rating: ${product.rating?.rate ?? "N/A"}</h5>
    `;

    productContainer.appendChild(card);
  });
};

// Filter product based on user input
const filterData = () => {
  const input = document.getElementById("search_data").value.toLowerCase();

  const filtered = allProducts.filter((product) => {
    const titleMatch = product.title.toLowerCase().includes(input);
    const categoryMatch = product.category.toLowerCase().includes(input);
    const priceMatch = !isNaN(input) && product.price >= parseFloat(input);

    return titleMatch || categoryMatch || priceMatch;
  });

  printProducts(filtered);
};

getData();
