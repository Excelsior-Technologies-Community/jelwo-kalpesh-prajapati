var CART_KEY = 'jewelry_cart';
var WISHLIST_KEY = 'jewelry_wishlist';


// Helper to get from LocalStorage
function getStorage(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

// Helper to save to LocalStorage
function saveStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    updateNavbarCounts();
}

// Update Heart and Bag counts in Navbar
// Update standard counts (desktop and mobile)
function updateNavbarCounts() {
    const cart = getStorage(CART_KEY);
    const wishlist = getStorage(WISHLIST_KEY);

    document.querySelectorAll('.cart-count').forEach(el => {
        const totalQty = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
        el.textContent = `(${totalQty})`;
    });
}

// Toggle Wishlist
function toggleWishlist(product) {
    let wishlist = getStorage(WISHLIST_KEY);
    const index = wishlist.findIndex(item => item.id === product.id);

    if (index === -1) {
        wishlist.push(product);
        showToast(`"${product.name}" added to wishlist!`);
    } else {
        wishlist.splice(index, 1);
        showToast(`"${product.name}" removed from wishlist.`);
    }
    saveStorage(WISHLIST_KEY, wishlist);

    // Dispatch event for specialized pages (like wishlist.html) to re-render
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { wishlist } }));
}

// Add to Cart
function addToCart(product, qty = 1) {
    let cart = getStorage(CART_KEY);
    const existing = cart.find(item => item.id === product.id && item.color === product.color && item.size === product.size);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...product, qty });
    }

    saveStorage(CART_KEY, cart);
    showToast(`"${product.name}" added to bag!`);

    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
}

// Toast notification logic
function showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'app-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: #333;
            color: #fff;
            padding: 12px 24px;
            border-radius: 99px;
            font-size: 14px;
            z-index: 9999;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            opacity: 0;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    clearTimeout(toast._hide);
    toast._hide = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 3000);
}

// Initialize counts on load
document.addEventListener('DOMContentLoaded', updateNavbarCounts);

// Sync counts across tabs
window.addEventListener('storage', (e) => {
    if (e.key === CART_KEY || e.key === WISHLIST_KEY) {
        updateNavbarCounts();
    }
});

