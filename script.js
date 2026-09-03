// Base de Produtos
const products = [
  { id: 1, name: "Smartphone Galaxy S23", category: "smartphones", price: 3499, rating: "⭐⭐⭐⭐⭐", promo: true, img: "https://picsum.photos/id/160/300/200" },
  { id: 2, name: "iPhone 14 Pro", category: "smartphones", price: 5999, rating: "⭐⭐⭐⭐⭐", promo: false, img: "https://picsum.photos/id/81/300/200" },
  { id: 3, name: "Notebook Dell XPS", category: "notebooks", price: 7200, rating: "⭐⭐⭐⭐☆", promo: true, img: "https://picsum.photos/id/0/300/200" },
  { id: 4, name: "MacBook Air M2", category: "notebooks", price: 8499, rating: "⭐⭐⭐⭐⭐", promo: false, img: "https://picsum.photos/id/180/300/200" },
  { id: 5, name: "Fone Bluetooth JBL", category: "acessorios", price: 299, rating: "⭐⭐⭐⭐☆", promo: true, img: "https://picsum.photos/id/367/300/200" },
  { id: 6, name: "Smartwatch Amazfit", category: "acessorios", price: 450, rating: "⭐⭐⭐☆☆", promo: false, img: "https://picsum.photos/id/175/300/200" },
  { id: 7, name: "Mouse Gamer RGB", category: "acessorios", price: 150, rating: "⭐⭐⭐⭐⭐", promo: true, img: "https://picsum.photos/id/1060/300/200" },
  { id: 8, name: "Teclado Mecânico", category: "acessorios", price: 350, rating: "⭐⭐⭐⭐☆", promo: false, img: "https://picsum.photos/id/366/300/200" },
  { id: 9, name: "Smartphone Xiaomi 13", category: "smartphones", price: 2800, rating: "⭐⭐⭐⭐☆", promo: false, img: "https://picsum.photos/id/305/300/200" },
  { id: 10, name: "Notebook Lenovo Legion", category: "notebooks", price: 6100, rating: "⭐⭐⭐⭐⭐", promo: true, img: "https://picsum.photos/id/48/300/200" },
  { id: 11, name: "Carregador Por Indução", category: "acessorios", price: 120, rating: "⭐⭐⭐☆☆", promo: false, img: "https://picsum.photos/id/201/300/200" },
  { id: 12, name: "Monitor Gamer 144Hz", category: "acessorios", price: 1299, rating: "⭐⭐⭐⭐⭐", promo: true, img: "https://picsum.photos/id/250/300/200" }
];

let cart = [];
let favorites = [];

// Renderização dos Produtos
const productsContainer = document.getElementById("products-container");

function renderProducts(items) {
  productsContainer.innerHTML = items.map(p => `
    <article class="product-card">
      ${p.promo ? '<span class="badge-promo">PROMO</span>' : ''}
      <button class="fav-btn" onclick="toggleFav(${p.id})">${favorites.includes(p.id) ? '❤️' : '🤍'}</button>
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="stars">${p.rating}</div>
      <p class="price">R$ ${p.price.toFixed(2)}</p>
      <button class="btn btn-primary" onclick="addToCart(${p.id})">Adicionar ao Carrinho</button>
    </article>
  `).join('');
}

// Carrinho
function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCart();
  showToast("Produto adicionado ao carrinho! 🛒");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Seu carrinho está vazio.</p>';
    cartTotal.textContent = "0.00";
    return;
  }

  cartItemsContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <span>${item.name} - R$ ${item.price.toFixed(2)}</span>
      <button class="btn-remove" onclick="removeFromCart(${index})">Remover</button>
    </div>
  `).join('');

  const total = cart.reduce((acc, curr) => acc + curr.price, 0);
  cartTotal.textContent = total.toFixed(2);
}

// Favoritos
function toggleFav(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
  } else {
    favorites.push(id);
  }
  renderProducts(products);
}

// Toast
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// Filtros e Pesquisa
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".btn-filter");

function filterProducts() {
  const query = searchInput.value.toLowerCase();
  const activeCategory = document.querySelector(".btn-filter.active").dataset.category;

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(query);
    const matchesCat = activeCategory === "todos" || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  renderProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterProducts();
  });
});

// Modo Escuro
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Menu Responsivo
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Checkout Simulado
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Redirecionando para a finalização do pedido...");
});

// Inicialização
renderProducts(products);
