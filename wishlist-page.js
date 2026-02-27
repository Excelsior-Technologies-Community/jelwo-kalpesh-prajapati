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
                Add to Cart
            </button>
        </div>
    `;

  return card;
}

// Listen for wishlist updates from cart-wishlist.js
window.addEventListener('wishlistUpdated', renderWishlist);

// Initial render
document.addEventListener('DOMContentLoaded', renderWishlist);