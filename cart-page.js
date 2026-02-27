function renderCart() {
    const cart = getStorage(CART_KEY);
    const container = document.getElementById('cart-items-list');
    const cartContainer = document.getElementById('cart-container');
    const emptyMsg = document.getElementById('cart-empty');

    if (!container) return;

    if (cart.length === 0) {
        cartContainer.classList.add('hidden');
        emptyMsg.classList.remove('hidden');
        updateSummary(0);
        return;
    }

    cartContainer.classList.remove('hidden');
    emptyMsg.classList.add('hidden');
    container.innerHTML = '';

    let grandTotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = (item.price || 0) * (item.qty || 1);
        grandTotal += itemTotal;

        const row = document.createElement('div');
        row.className = 'py-8 flex flex-col md:grid md:grid-cols-12 gap-4 items-center group';
        row.innerHTML = `
            <div class="md:col-span-6 flex items-center gap-6 w-full">
                <div class="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 p-2 border border-gray-100">
                    <img src="${item.img}" class="w-full h-full object-contain hover:scale-110 transition-transform">
                </div>
                <div>
                    <h3 class="font-bold text-gray-900 group-hover:text-amber-800 transition-colors">${item.name}</h3>
                    <div class="flex gap-4 mt-1 text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                        ${item.color ? `<span>Color: <span class="text-gray-600">${item.color}</span></span>` : ''}
                        ${item.size ? `<span>Size: <span class="text-gray-600">${item.size}</span></span>` : ''}
                    </div>
                    <button onclick="removeCartItem(${index})" class="mt-3 text-[10px] uppercase tracking-widest font-bold text-red-500 hover:text-red-700 flex items-center gap-1">
                        <i class="ri-delete-bin-line"></i> Remove
                    </button>
                </div>
            </div>
            
            <div class="md:col-span-2 text-center text-sm font-semibold text-gray-600">
                Rs. ${(item.price || 0).toFixed(2)}
            </div>

            <div class="md:col-span-2 flex justify-center">
                <div class="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                    <button onclick="changeCartQty(${index}, -1)" class="px-3 py-1 hover:bg-gray-50 text-gray-400 font-bold transition-colors">-</button>
                    <span class="px-4 py-1 text-sm font-bold min-w-[40px] text-center">${item.qty}</span>
                    <button onclick="changeCartQty(${index}, 1)" class="px-3 py-1 hover:bg-gray-50 text-gray-400 font-bold transition-colors">+</button>
                </div>
            </div>

            <div class="md:col-span-2 text-right text-sm font-black text-amber-800">
                Rs. ${itemTotal.toFixed(2)}
            </div>
        `;
        container.appendChild(row);
    });

    updateSummary(grandTotal);
}

function changeCartQty(index, delta) {
    let cart = getStorage(CART_KEY);
    if (cart[index]) {
        cart[index].qty += delta;
        if (cart[index].qty < 1) cart[index].qty = 1;
        saveStorage(CART_KEY, cart);
        renderCart();
    }
}

function removeCartItem(index) {
    let cart = getStorage(CART_KEY);
    cart.splice(index, 1);
    saveStorage(CART_KEY, cart);
    renderCart();
}

function updateSummary(total) {
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    if (subtotalEl) subtotalEl.textContent = `Rs. ${total.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `Rs. ${total.toFixed(2)}`;
}

// Initial render
document.addEventListener('DOMContentLoaded', renderCart);

// Listen for cart updates
window.addEventListener('cartUpdated', renderCart);
