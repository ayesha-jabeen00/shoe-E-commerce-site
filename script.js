// Toggle navigation menu
function toggleMenu() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('active');
}
// Toggle dropdown menu
 function toggleDropdown() {
  const menu = document.getElementById("dropdownMenu");
  const caret = document.getElementById("caret");
  const isOpen = menu.style.display === "block";

  menu.style.display = isOpen ? "none" : "block";
  caret.className = isOpen ? "fas fa-caret-up" : "fas fa-caret-down";
}

// Hide dropdown when clicked outside
document.addEventListener("click", function(e) {
  const toggle = document.querySelector(".dropdown-toggle");
  const menu = document.getElementById("dropdownMenu");
  const caret = document.getElementById("caret");

  if (!toggle.contains(e.target) && !menu.contains(e.target)) {
    menu.style.display = "none";
    caret.className = "fas fa-caret-up";
  }
});

// Toggle search box
function toggleSearch() {
  const searchBox = document.getElementById('searchBox');
  searchBox.classList.toggle('show');
}

// Redirect to account page
function goToAccount() {
  window.location.href = "account.html";
}

// Redirect to homepage
function goHome() {
  window.location.href = "index.html";
}

// ✅ Redirect to product detail page
function goToProductPage() {
  window.location.href = "product-details.html";
}
// carousel funtionality
const track = document.getElementById('track');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;
const totalSlides = slides.length;

function moveToSlide(slide) {
  if (track) {
    track.style.transform = `translateX(-${slide * 100}%)`;
  }
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[slide]) dots[slide].classList.add('active');
  currentSlide = slide;
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  moveToSlide(currentSlide);
}, 5000);

// ✅ Toast Notification (used for cart & favorites)
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast show";
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// ✅ Add to Cart
function addToCart(event, product) {
  event.stopPropagation();
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.find(item => item.id === product.id);
  if (!exists) {
    cart.push({ ...product, quantity: 1 }); // Add quantity and spread properties
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast("Added to Cart");
  } else {
    showToast("Already in Cart");
  }

  updateCartCount();
}

// ✅ Update Cart Count
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartCount) {
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? "inline-block" : "none";
  }
}

// ✅ Toggle Favorites
function toggleFavorite(icon, product) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const exists = favorites.find(item => item.id === product.id);

  if (!exists) {
    favorites.push(product);
    icon.classList.add("active");
    showToast("Added to Favorites");
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavCount();
  } else {
    showToast("Already in Favorites");
  }
}

// ✅ Update Favorites Count
function updateFavCount() {
  const favCount = document.getElementById('favCount');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favCount) {
    favCount.innerText = favorites.length;
    favCount.style.display = favorites.length > 0 ? 'inline-block' : 'none';
  }
}

// ✅ Cart Page Logic 
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateFavCount();

  const cartContainer = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('subtotal-amount');
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  if (cartContainer && subtotalEl) {
    function updateCartUI() {
      cartContainer.innerHTML = '';
      let subtotal = 0;

      cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-details">
            <h4>${item.brand || 'Brand'}</h4>
            <p>${item.name || item.title}</p>
            <div class="cart-price">$${item.price.toFixed(2)}</div>
            <div class="quantity-box">
              <button onclick="updateQty(${index}, -1)">-</button>
              <input type="text" value="${item.quantity}" readonly>
              <button onclick="updateQty(${index}, 1)">+</button>
            </div>
          </div>
          <button class="remove-btn" onclick="removeItem(${index})"><i class="fas fa-trash"></i></button>
        `;
        cartContainer.appendChild(itemEl);
      });

      subtotalEl.textContent = `$${subtotal.toFixed(2)} USD`;
      updateCartCount();
    }

    // Make functions globally accessible
    window.updateQty = function (index, change) {
      cartItems[index].quantity += change;
      if (cartItems[index].quantity < 1) cartItems[index].quantity = 1;
      localStorage.setItem('cart', JSON.stringify(cartItems));
      updateCartUI();
    };

    window.removeItem = function (index) {
      cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      updateCartUI();
    };

    updateCartUI();
  }
});



function viewProduct(product) {
  const formatted = {
    id: product.id || "",
    img: product.img || product.image || "",
    imageBack: product.imageBack || "",
    name: product.name || product.title || "No Title",
    price: product.price || 0,
    description: product.description || "No description available"
  };
  localStorage.setItem("selectedProduct", JSON.stringify(formatted));
  location.href = "product.html";
}


// features

  const cards = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.2
  });

  cards.forEach(card => observer.observe(card));

// testimonial

let currentIndex = 0;

function showTestimonial(index) {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  testimonials.forEach((t, i) => t.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
  currentIndex = index;
}

// Auto-slide every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % document.querySelectorAll('.testimonial').length;
  showTestimonial(currentIndex);
}, 5000);

// Show the first testimonial on page load
showTestimonial(0);


// blog
function scrollBlog(direction) {
  const container = document.getElementById('blogCarousel');
  const scrollAmount = 280;
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

function showForm(type) {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');

  if (type === 'login') {
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
  } else if (type === 'signup') {
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
    loginTab.classList.remove('active');
    signupTab.classList.add('active');
  }
}

function goHome() {
  window.location.href = "index.html"; // change this to your actual home page
}





 