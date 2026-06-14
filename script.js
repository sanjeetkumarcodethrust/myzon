document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            title: "Premium V8 Synthetic Motor Oil",
            description: "Advanced full synthetic motor oil designed to keep your engine running like new by providing exceptional wear protection, cleaning power and overall performance.",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1610484770281-9b76c8dbb510?auto=format&fit=crop&w=600&q=80",
            category: "automotive",
            isNew: true
        },
        {
            id: 2,
            title: "Carbon Fiber Steering Wheel Cover",
            description: "High-quality sport-grip steering wheel cover. Enhances the interior of your vehicle while providing better control and comfort during your drive.",
            price: 29.50,
            image: "https://images.unsplash.com/photo-1590362891991-f7004f2d5ee1?auto=format&fit=crop&w=600&q=80",
            category: "automotive",
            isNew: false
        },
        {
            id: 3,
            title: "Ultra-Bright LED Headlight Bulbs",
            description: "Super bright LED headlight conversion kit. 6000K cool white light, 300% brighter than standard halogen bulbs for safer night driving.",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=600&q=80",
            category: "automotive",
            isNew: true
        }
    ];

    const cartItems = [];
    
    const productList = document.getElementById('product-list');
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cart-total-price');

    // Toggle cart dropdown visibility
    cartIcon.addEventListener('click', () => {
        cartDropdown.classList.toggle('active');
    });

    // Close cart dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!cartIcon.contains(event.target) && !cartDropdown.contains(event.target)) {
            cartDropdown.classList.remove('active');
        }
    });

    function renderProducts() {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            const newBadge = product.isNew ? `<span class="new-badge">New Arrival</span>` : '';
            
            card.innerHTML = `
                <div class="product-img-container">
                    ${newBadge}
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            `;
            productList.appendChild(card);
        });
    }

    function updateCartUI() {
        cartCountElement.textContent = cartItems.length;
        
        let total = 0;
        cartItemsContainer.innerHTML = '';
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        } else {
            cartItems.forEach(item => {
                total += item.price;
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }
        
        cartTotalPrice.textContent = '$' + total.toFixed(2);
    }

    // Expose to global scope for inline onclick handler
    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cartItems.push(product);
            updateCartUI();
            
            // Add a small animation effect
            cartIcon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 200);
            
            // Show cart dropdown briefly to confirm addition
            cartDropdown.classList.add('active');
            setTimeout(() => {
                cartDropdown.classList.remove('active');
            }, 2000);
        }
    };

    renderProducts();
});
