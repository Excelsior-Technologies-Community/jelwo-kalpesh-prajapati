<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6748542d44031f4cf9c19a9dd73465b82c4c46aa
/**
 * wishlist-page.js (Robust Version)
 * Handles rendering and interactions on the dedicated wishlist.html page.
 */

// Fallback for global variables from cart-wishlist.js
if (typeof WISHLIST_KEY === 'undefined') {
  window.WISHLIST_KEY = 'jewelry_wishlist';
}
if (typeof getStorage === 'undefined') {
  window.getStorage = function (key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {
      console.error("Error accessing localStorage", e);
      return [];
    }
  };
}

const WISHLIST_CONTAINER_ID = 'wishlist-container';
const WISHLIST_EMPTY_ID = 'wishlist-empty';

/**
 * Renders the wishlist items from local storage.
 */
function renderWishlist() {
  console.log("Rendering wishlist...");
  try {
    const wishlist = getStorage(WISHLIST_KEY);
    const container = document.getElementById(WISHLIST_CONTAINER_ID);
    const emptyMsg = document.getElementById(WISHLIST_EMPTY_ID);

    if (!container) {
      console.warn("Wishlist container not found: " + WISHLIST_CONTAINER_ID);
      return;
    }

    if (wishlist.length === 0) {
      container.innerHTML = '';
      if (emptyMsg) emptyMsg.classList.remove('hidden');
      return;
    }

    if (emptyMsg) emptyMsg.classList.add('hidden');
    container.innerHTML = '';

    wishlist.forEach((product) => {
      // Basic validation of product object
      if (!product || !product.id) return;

      const card = createWishlistCard(product);
      container.appendChild(card);
    });

    // Initialize the new "Add to Cart" buttons
    if (typeof initAddToCartButtons === 'function') {
      initAddToCartButtons();
    }

    console.log("Successfully rendered " + wishlist.length + " items.");
  } catch (err) {
    console.error("Critical error during wishlist render:", err);
  }
}

/**
 * Creates the HTML element for a wishlist product card.
 * @param {Object} product 
 * @returns {HTMLElement}
 */
function createWishlistCard(product) {
  const div = document.createElement('div');
  div.className = 'group relative border border-gray-100 bg-white text-center transition-all hover:shadow-lg';

  // Defensive price formatting
  let priceValue = "0.00";
  try {
    if (typeof product.price === 'number') {
      priceValue = product.price.toFixed(2);
    } else if (typeof product.price === 'string') {
      priceValue = product.price;
    }
  } catch (e) {
    console.warn("Price formatting failed for item: " + product.id);
  }

  // Escape single quotes in name to prevent breaking onclick
  const safeName = (product.name || 'Product').replace(/'/g, "\\'");
  const safeImg = product.img || '';
  const safeId = product.id || '';

  div.innerHTML = `
        <div class="relative aspect-square overflow-hidden bg-[#f9f9f9] p-8">
            <img src="${safeImg}" alt="${safeName}" class="mx-auto h-full object-contain transition-transform duration-500 group-hover:scale-110">
            
            <button onclick="removeItemFromWishlist('${safeId}')" 
                class="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-400 hover:text-red-500 transition-colors">
                <i class="ri-close-line text-lg"></i>
            </button>
        </div>

        <div class="p-6">
            <h3 class="font-bold text-gray-800 mb-2">${safeName}</h3>
            <p class="text-[#a77f66] font-bold mb-4">Rs. ${priceValue}</p>
            
            <button 
                data-id="${safeId}" 
                data-name="${safeName}" 
                data-price="${priceValue}" 
                data-img="${safeImg}"
                class="js-add-to-cart w-full bg-gray-800 text-white py-3 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-[#a77f66] transition-colors">
<<<<<<< HEAD
=======
=======
// This script renders the wishlist page using data from cart-wishlist.js

function renderWishlist() {
  const wishlist = getStorage(WISHLIST_KEY);
  const container = document.getElementById('wishlist-container');
  const emptyMsg = document.getElementById('wishlist-empty');

  if (!container) return;

  container.innerHTML = '';

  if (wishlist.length === 0) {
    container.classList.add('hidden');
    if (emptyMsg) emptyMsg.classList.remove('hidden');
    return;
  }

  container.classList.remove('hidden');
  if (emptyMsg) emptyMsg.classList.add('hidden');

  wishlist.forEach(product => {
    const card = createWishlistCard(product);
    container.appendChild(card);
  });
}

function createWishlistCard(product) {
  const card = document.createElement('div');
  card.className = 'group relative border border-gray-100 bg-white text-center transition-all hover:shadow-lg';

  // Format price if it's a number
  const priceDisplay = typeof product.price === 'number' ? `Rs. ${product.price.toFixed(2)}` : product.price;

  card.innerHTML = `
        <div class="relative aspect-square overflow-hidden bg-[#f9f9f9] p-8">
            <img src="${product.img}" alt="${product.name}" class="mx-auto h-full object-contain">

            <!-- Remove button -->
            <button
                onclick="toggleWishlist({id: '${product.id}', name: '${product.name.replace(/'/g, "\\'")}'})"
                class="absolute right-2 top-2 z-20 w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors"
                title="Remove from Wishlist">
                <i class="ri-close-line"></i>
            </button>

            <!-- Hover overlay -->
            <div class="absolute inset-0 z-10 flex items-center justify-center gap-3 bg-[#bb9d89] opacity-0 transition-opacity duration-300 group-hover:opacity-90">
                <button onclick="addToCart({id: '${product.id}', name: '${product.name.replace(/'/g, "\\'")}', price: ${product.price}, img: '${product.img}'})" class="flex h-10 w-10 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#bb9d89] transition-colors">
                    <i class="ri-shopping-bag-line"></i>
                </button>
            </div>
        </div>

        <div class="p-4 h-32 flex flex-col justify-center">
            <h3 class="font-bold text-gray-800">${product.name}</h3>
            <p class="mt-2 text-[#b58e58] font-bold">${priceDisplay}</p>
            <button onclick="addToCart({id: '${product.id}', name: '${product.name.replace(/'/g, "\\'")}', price: ${product.price}, img: '${product.img}'})" 
                class="mt-3 border-b border-[#bb9d89] text-[#bb9d89] font-bold text-xs uppercase tracking-[0.2em] pb-1 self-center hover:opacity-75 transition-opacity">
>>>>>>> a02e9116a605f5a1dce6ed2ed19e349fdc1066be
>>>>>>> 6748542d44031f4cf9c19a9dd73465b82c4c46aa
                Add to Cart
            </button>
        </div>
    `;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6748542d44031f4cf9c19a9dd73465b82c4c46aa
  return div;
}

/**
 * Removes an item from the wishlist.
 * @param {string} productId 
 */
function removeItemFromWishlist(productId) {
  try {
    let wishlist = getStorage(WISHLIST_KEY);
    const updatedWishlist = wishlist.filter(item => item.id !== productId);

    if (typeof saveStorage === 'function') {
      saveStorage(WISHLIST_KEY, updatedWishlist);
    } else {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
      if (typeof updateNavbarCounts === 'function') updateNavbarCounts();
    }

    // Re-render
    renderWishlist();

    if (typeof showToast === 'function') {
      showToast("Item removed from wishlist.");
    }
  } catch (err) {
    console.error("Error removing item from wishlist:", err);
  }
}

// Initial render logic: Try to run immediately if DOM is already ready, or wait for event
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderWishlist);
} else {
  renderWishlist();
}

// Listen for updates from other scripts
window.addEventListener('wishlistUpdated', renderWishlist);
window.addEventListener('storage', (e) => {
  if (e.key === WISHLIST_KEY) renderWishlist();
<<<<<<< HEAD
});
=======
});
=======

  return card;
}

// Listen for wishlist updates from cart-wishlist.js
window.addEventListener('wishlistUpdated', renderWishlist);

// Initial render
document.addEventListener('DOMContentLoaded', renderWishlist);
>>>>>>> a02e9116a605f5a1dce6ed2ed19e349fdc1066be
>>>>>>> 6748542d44031f4cf9c19a9dd73465b82c4c46aa
