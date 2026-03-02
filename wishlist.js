const WISHLIST_KEY = 'jewelry_wishlist';

const products = {
  'pearl-earrings': 'Simple Pearl Earrings',
  'diamond-ring': 'Chic Diamond Ring',
  'gemstone-jhumkas': 'Gemstone Jhumkas',
  'drop-gold-earrings': 'Drop Gold Earrings',
  'gold-ring': 'Gold Ring',
};

function getWishlist() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
}

function saveWishlist(wishlist) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

function updateWishlistButton(productId, isWishlisted) {
  const btn = document.getElementById('wishlist-btn-' + productId);
  if (!btn) return;
  const svg = btn.querySelector('svg');
  if (isWishlisted) {
    if (svg) svg.setAttribute('fill', 'white');
    btn.title = 'Remove from Wishlist';
  } else {
    if (svg) svg.setAttribute('fill', 'none');
    btn.title = 'Add to Wishlist';
  }
}

function showToast(message) {
  let toast = document.getElementById('wishlist-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'wishlist-toast';
    toast.style.cssText = [
      'position:fixed',
      'bottom:20px',
      'left:50%',
      'transform:translateX(-50%) translateY(60px)',
      'background:#333',
      'color:#fff',
      'padding:10px 20px',
      'border-radius:4px',
      'font-size:13px',
      'z-index:9999',
      'transition:transform 0.3s ease, opacity 0.3s ease',
      'opacity:0',
      'white-space:nowrap',
    ].join(';');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._hide);
  toast._hide = setTimeout(function () {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(60px)';
  }, 2500);
}

function toggleWishlist(productId) {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  if (index === -1) {
    wishlist.push(productId);
    saveWishlist(wishlist);
    updateWishlistButton(productId, true);
    showToast('"' + products[productId] + '" added to wishlist!');
  } else {
    wishlist.splice(index, 1);
    saveWishlist(wishlist);
    updateWishlistButton(productId, false);
    showToast('"' + products[productId] + '" removed from wishlist.');
  }
}

function initWishlist() {
  const wishlist = getWishlist();
  Object.keys(products).forEach(function (productId) {
    const btn = document.getElementById('wishlist-btn-' + productId);
    if (!btn) return;
    // Set initial state on page load
    updateWishlistButton(productId, wishlist.includes(productId));
    // Click handler
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleWishlist(productId);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWishlist);
} else {
  initWishlist();
}