// Product Data
const allProducts = [
    {
        id: "pearl-earrings",
        name: "Simple Pearl earrings",
        price: 15.00,
        originalPrice: 35.00,
        discount: 57,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-21.jpg?v=1741607520&width=300",
        material: "Gold",
        inStock: true
    },
    {
        id: "diamond-ring-chic",
        name: "Chic diamond ring",
        price: 22.00,
        originalPrice: 40.00,
        discount: 45,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-56.jpg?v=1741670785&width=300",
        material: "Gold",
        inStock: true
    },
    {
        id: "gemstone-jhumkas",
        name: "Gemstone jhumkas",
        price: 18.00,
        originalPrice: 38.00,
        discount: 52,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-46.jpg?v=1741668328&width=300",
        material: "Gold",
        inStock: false
    },
    {
        id: "drop-gold-earrings",
        name: "Drop gold earrings",
        price: 14.00,
        originalPrice: 28.00,
        discount: 50,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-41.jpg?v=1741667580&width=300",
        material: "Gold",
        inStock: true
    },
    {
        id: "pearl-earrings",
        name: "Simple Pearl earrings",
        price: 15.00,
        originalPrice: 35.00,
        discount: 57,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-21.jpg?v=1741607520&width=300",
        material: "Gold",
        inStock: true
    },
    {
        id: "silver-crescent-necklace",
        name: "Silver Crescent Necklace",
        price: 32.00,
        originalPrice: 55.00,
        discount: 42,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-50.jpg?v=1741669420&width=300",
        material: "Silver",
        inStock: true
    },
    {
        id: "silver-hoop-earrings",
        name: "Silver Hoop Earrings",
        price: 12.00,
        originalPrice: 20.00,
        discount: 40,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-01.jpg?v=1741167520&width=300",
        material: "Silver",
        inStock: false
    },
    {
        id: "platinum-diamond-studs",
        name: "Platinum Diamond Studs",
        price: 85.00,
        originalPrice: 120.00,
        discount: 29,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-15.jpg?v=1741307520&width=300",
        material: "Platinum",
        inStock: true
    },
    {
        id: "rose-gold-leaf-ring",
        name: "Rose Gold Leaf Ring",
        price: 28.00,
        originalPrice: 45.00,
        discount: 38,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-35.jpg?v=1741507520&width=300",
        material: "Rose Gold",
        inStock: true
    },
    {
        id: "silver-bangle-set",
        name: "Silver Bangle Set",
        price: 45.00,
        originalPrice: 70.00,
        discount: 36,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-55.jpg?v=1741670520&width=300",
        material: "Silver",
        inStock: true
    },
    {
        id: "gold-chain-necklace",
        name: "Gold Chain Necklace",
        price: 60.00,
        originalPrice: 90.00,
        discount: 33,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-10.jpg?v=1741207520&width=300",
        material: "Gold",
        inStock: false
    },
    {
        id: "gold-ring-classic",
        name: "Gold ring",
        price: 14.00,
        originalPrice: 44.00,
        discount: 68,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-26.jpg?v=1742444221&width=352",
        material: "Gold",
        inStock: true
    },
    {
        id: "jhumka-new",
        name: "Jhumkha",
        price: 15.00,
        originalPrice: 20.00,
        discount: 25,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-51.jpg?v=1742445540&width=352",
        material: "Gold",
        inStock: true
    },
    {
        id: "diamond-necklace-luxury",
        name: "Diamond Necklace",
        price: 45.00,
        originalPrice: 85.00,
        discount: 47,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-30.jpg?v=1741550520&width=300",
        material: "Silver",
        inStock: true
    },
    {
        id: "emerald-set",
        name: "Diamond Pearl Set",
        price: 55.00,
        originalPrice: 110.00,
        discount: 50,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-54.jpg?v=1741670520&width=300",
        material: "Platinum",
        inStock: false
    },
    {
        id: "gold-bracelets-elegant",
        name: "Gold Bracelets",
        price: 30.00,
        originalPrice: 50.00,
        discount: 40,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-51.jpg?v=1741670520&width=300",
        material: "Gold",
        inStock: true
    },
    {
        id: "luxury-gemstone-item",
        name: "Luxury Gemstone",
        price: 99.00,
        originalPrice: 150.00,
        discount: 34,
        img: "https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-15.jpg?v=1741307520&width=300",
        material: "Platinum",
        inStock: true
    }
];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const noResults = document.getElementById('no-results');
const productCount = document.getElementById('product-count');
const materialFilters = document.querySelectorAll('.material-filter');
const availabilityFilters = document.querySelectorAll('.availability-filter');
const priceMinInput = document.getElementById('price-min');
const priceMaxInput = document.getElementById('price-max');
const applyPriceBtn = document.getElementById('apply-price');
const sortFilter = document.getElementById('sort-filter');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(allProducts);
    setupEventListeners();
});

function setupEventListeners() {
    // Material filters
    materialFilters.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Availability filters
    availabilityFilters.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Price filter button
    applyPriceBtn.addEventListener('click', applyFilters);

    // Sort filter
    sortFilter.addEventListener('change', applyFilters);
}

function applyFilters() {
    // 1. Material Filter
    const selectedMaterials = Array.from(materialFilters)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    // 2. Availability Filter
    const selectedAvailability = Array.from(availabilityFilters)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    // 3. Price Filter
    const minPrice = parseFloat(priceMinInput.value) || 0;
    const maxPrice = parseFloat(priceMaxInput.value) || Infinity;

    // Filter Logic
    let filtered = allProducts.filter(product => {
        const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);

        // Check availability
        let matchesAvailability = true;
        if (selectedAvailability.length > 0 && selectedAvailability.length < 2) {
            if (selectedAvailability.includes('in-stock')) {
                matchesAvailability = product.inStock;
            } else if (selectedAvailability.includes('out-of-stock')) {
                matchesAvailability = !product.inStock;
            }
        }

        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        return matchesMaterial && matchesAvailability && matchesPrice;
    });

    // 4. Sort Filter
    const sortValue = sortFilter.value;
    if (sortValue === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'featured') {
        // Featured could be original order or some other logic
    }

    renderProducts(filtered);
}

function renderProducts(products) {
    productGrid.innerHTML = '';

    if (products.length === 0) {
        productGrid.classList.add('hidden');
        noResults.classList.remove('hidden');
        productCount.textContent = '0';
        return;
    }

    productGrid.classList.remove('hidden');
    noResults.classList.add('hidden');
    productCount.textContent = products.length;

    products.forEach(product => {
        const card = createProductCard(product);
        productGrid.appendChild(card);
    });

    // Re-initialize Add to Cart and Wishlist listeners
    if (window.initAddToCartButtons) {
        window.initAddToCartButtons();
    }
}

function createProductCard(product) {
    const div = document.createElement('div');
    div.className = 'group text-center';
    div.innerHTML = `
        <div class="relative bg-white border border-gray-100 p-8 aspect-square flex items-center justify-center overflow-hidden mb-6">
            <img src="${product.img}" alt="${product.name}" class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110">
            ${product.discount ? `<span class="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">${product.discount}% OFF</span>` : ''}
            
            <!-- Floating Actions -->
            <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <button onclick="toggleWishlist({id: '${product.id}', name: '${product.name}', price: ${product.price}, img: '${product.img}'})" class="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-amber-700 hover:scale-110 transition-all">
                    <i class="ri-heart-line"></i>
                </button>
                <button class="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-amber-700 hover:scale-110 transition-all">
                    <i class="ri-eye-line"></i>
                </button>
            </div>
            ${!product.inStock ? `<div class="absolute inset-0 bg-white/60 flex items-center justify-center">
                <span class="bg-gray-900 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm">Sold Out</span>
            </div>` : ''}
        </div>
        <div class="space-y-2">
            <p class="text-[11px] text-gray-400 uppercase tracking-widest">${product.material}</p>
            <h4 class="text-sm font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">${product.name}</h4>
            <div class="flex items-center justify-center space-x-2">
                <span class="text-sm font-bold ${!product.inStock ? 'text-gray-400' : 'text-amber-800'}">Rs. ${product.price.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="text-xs text-gray-400 line-through">Rs. ${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <div class="pt-4 px-4">
                <button 
                    ${!product.inStock ? 'disabled' : ''}
                    data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-img="${product.img}"
                    class="${!product.inStock ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'hover:bg-gray-900 hover:text-white js-add-to-cart'} w-full border border-gray-900 text-gray-900 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm"
                >
                    ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `;
    return div;
}

function resetFilters() {
    materialFilters.forEach(cb => cb.checked = false);
    availabilityFilters.forEach(cb => cb.checked = false);
    priceMinInput.value = '';
    priceMaxInput.value = '';
    sortFilter.value = 'featured';
    renderProducts(allProducts);
}
