var CART_KEY = 'jewelry_cart';
var WISHLIST_KEY = 'jewelry_wishlist';


<<<<<<< HEAD
// Helper to get from LocalStorage (robust)
function getStorage(key) {
    try {
        var raw = localStorage.getItem(key);
        if (!raw) return [];
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
        // If stored value is a single object (legacy), wrap it
        if (parsed && typeof parsed === 'object') return [parsed];
        // If stored value is a number or unexpected type, reset to empty
        return [];
    } catch (e) {
        console.warn('getStorage parse error for', key, e);
        return [];
    }
=======
// Helper to get from LocalStorage
function getStorage(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
>>>>>>> a02e9116a605f5a1dce6ed2ed19e349fdc1066be
}

// Helper to save to LocalStorage
function saveStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    updateNavbarCounts();
}

// Update Heart and Bag counts in Navbar
// Update standard counts (desktop and mobile)
function updateNavbarCounts() {
<<<<<<< HEAD
    const cart = getStorage(CART_KEY) || [];
    const wishlist = getStorage(WISHLIST_KEY) || [];

    const safeCart = Array.isArray(cart) ? cart : [];
    const totalQty = safeCart.reduce((acc, item) => acc + (Number(item && item.qty) || 1), 0);

    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = `(${totalQty})`;
    });

    const safeWishlist = Array.isArray(wishlist) ? wishlist : [];
    document.querySelectorAll('.wishlist-count').forEach(el => {
        el.textContent = `(${safeWishlist.length})`;
    });
=======
    const cart = getStorage(CART_KEY);
    const wishlist = getStorage(WISHLIST_KEY);

    document.querySelectorAll('.cart-count').forEach(el => {
        const totalQty = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
        el.textContent = `(${totalQty})`;
    });
>>>>>>> a02e9116a605f5a1dce6ed2ed19e349fdc1066be
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
<<<<<<< HEAD
    if (!product || !product.id) {
        console.warn('addToCart called with invalid product:', product);
        showToast('Unable to add item to bag.');
        return;
    }

    let cart = getStorage(CART_KEY);
    if (!Array.isArray(cart)) cart = [];

    // Standardize price as number
    const price = typeof product.price === 'string' ? parseFloat(product.price.replace(/[^\d.]/g, '')) : (Number(product.price) || 0);

    const existing = cart.find(item =>
        item.id === product.id &&
        item.color === product.color &&
        item.size === product.size
    );

    if (existing) {
        existing.qty = Number(existing.qty || 1) + Number(qty || 1);
    } else {
        const newItem = Object.assign({}, product, {
            qty: Number(qty || 1),
            price: price
        });
        cart.push(newItem);
    }

    saveStorage(CART_KEY, cart);
    showToast(`"${product.name || 'Item'}" added to bag!`);
=======
    let cart = getStorage(CART_KEY);
    const existing = cart.find(item => item.id === product.id && item.color === product.color && item.size === product.size);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...product, qty });
    }

    saveStorage(CART_KEY, cart);
    showToast(`"${product.name}" added to bag!`);
>>>>>>> a02e9116a605f5a1dce6ed2ed19e349fdc1066be

    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
}

<<<<<<< HEAD
/**
 * Extracts product data from an element's data attributes.
 * @param {HTMLElement} el 
 * @returns {Object}
 */
function getProductData(el) {
    return {
        id: el.getAttribute('data-id'),
        name: el.getAttribute('data-name'),
        price: el.getAttribute('data-price'),
        img: el.getAttribute('data-img'),
        color: el.getAttribute('data-color') || 'Default',
        size: el.getAttribute('data-size') || 'Unique'
    };
}

/**
 * Initializes all "Add to Cart" buttons that have the .js-add-to-cart class.
 * This removes the need for inline onclick handlers.
 */
function initAddToCartButtons() {
    document.querySelectorAll('.js-add-to-cart').forEach(btn => {
        // Prevent duplicate listeners
        if (btn._hasCartListener) return;
        btn._hasCartListener = true;

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const product = getProductData(this);
            // Check if there's a quantity input nearby or specified
            let qty = 1;
            const qtyTarget = this.getAttribute('data-qty-id');
            if (qtyTarget) {
                const qtyEl = document.getElementById(qtyTarget);
                if (qtyEl) {
                    qty = parseInt(qtyEl.value || qtyEl.textContent) || 1;
                }
            } else {
                // Look for common qty span in siblings (for trending section)
                const qtySpan = this.parentElement.querySelector('span');
                if (qtySpan && qtySpan.previousElementSibling && qtySpan.previousElementSibling.textContent === '-') {
                    qty = parseInt(qtySpan.textContent) || 1;
                }
            }

            // Allow dynamic size/color from page state if attributes are missing
            if (this.getAttribute('data-use-page-state') === 'true') {
                const sizeEl = document.getElementById('sizeVal');
                if (sizeEl) product.size = sizeEl.textContent;
                // Add color detection if needed
            }

            addToCart(product, qty);
        });
    });
}

=======
>>>>>>> a02e9116a605f5a1dce6ed2ed19e349fdc1066be
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
<<<<<<< HEAD
// Normalize stored values (remove legacy/fake values) and init counts
function normalizeStorage() {
    try {
        // If stored as a plain number or string like "(3)" or "3", clear it
        var cartRaw = localStorage.getItem(CART_KEY);
        if (cartRaw && !cartRaw.trim().startsWith('[')) {
            console.warn('Normalizing CART_KEY from unexpected format:', cartRaw);
            localStorage.removeItem(CART_KEY);
        }
        var wishlistRaw = localStorage.getItem(WISHLIST_KEY);
        if (wishlistRaw && !wishlistRaw.trim().startsWith('[')) {
            console.warn('Normalizing WISHLIST_KEY from unexpected format:', wishlistRaw);
            localStorage.removeItem(WISHLIST_KEY);
        }
    } catch (e) {
        console.warn('normalizeStorage error', e);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    normalizeStorage();
    // debug log current storage
    try {
        console.info('Cart:', localStorage.getItem(CART_KEY));
        console.info('Wishlist:', localStorage.getItem(WISHLIST_KEY));
    } catch (e) { /* ignore */ }
    updateNavbarCounts();
    initAddToCartButtons();
});
=======
document.addEventListener('DOMContentLoaded', updateNavbarCounts);
>>>>>>> a02e9116a605f5a1dce6ed2ed19e349fdc1066be

// Sync counts across tabs
window.addEventListener('storage', (e) => {
    if (e.key === CART_KEY || e.key === WISHLIST_KEY) {
        updateNavbarCounts();
    }
});

<<<<<<< HEAD
/**
 * Global function to handle quantity changes for product details and product cards.
 * @param {number} delta - The amount to change (e.g., 1 or -1)
 * @param {string|HTMLElement} target - Optional ID of the input/span or the element itself.
 */
function changeQty(delta, target = 'qty') {
    let el;
    if (typeof target === 'string') {
        el = document.getElementById(target);
    } else {
        el = target;
    }

    if (!el) return;

    // Handle both input elements and text elements (like spans in product cards)
    if (el.tagName === 'INPUT') {
        let val = parseInt(el.value) || 1;
        val = Math.max(1, val + delta);
        el.value = val;
    } else {
        let val = parseInt(el.textContent) || 1;
        val = Math.max(1, val + delta);
        el.textContent = val;
    }
}
=======
>>>>>>> a02e9116a605f5a1dce6ed2ed19e349fdc1066be
