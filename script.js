document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            title: "Premium V8 Synthetic Motor Oil",
            description: "Advanced full synthetic motor oil designed to keep your engine running like new by providing exceptional wear protection, cleaning power and overall performance.",
            explanation: "Formulated with anti-wear additives and detergents that provide optimal sludge protection and prevent deposits. Ideal for high-performance and turbocharged engines operating in extreme temperatures.",
            ingredients: ["Synthetic base oils", "Anti-wear additives", "Detergents", "Dispersants", "Friction modifiers", "Viscosity index improvers"],
            price: 49.99,
            image: "https://images.unsplash.com/photo-1610484770281-9b76c8dbb510?auto=format&fit=crop&w=600&q=80",
            category: "automotive",
            isNew: true
        },
        {
            id: 2,
            title: "Carbon Fiber Steering Wheel Cover",
            description: "High-quality sport-grip steering wheel cover. Enhances the interior of your vehicle while providing better control and comfort during your drive.",
            explanation: "Designed to universally fit steering wheels from 14.5 to 15.25 inches. It features a breathable, anti-slip surface and protects your original steering wheel from wear and tear.",
            ingredients: ["Polyurethane carbon fiber pattern", "Heavy-duty rubber inner ring", "Breathable mesh fabric accents", "Nylon stitching"],
            price: 29.50,
            image: "https://images.unsplash.com/photo-1590362891991-f7004f2d5ee1?auto=format&fit=crop&w=600&q=80",
            category: "automotive",
            isNew: false
        },
        {
            id: 3,
            title: "Ultra-Bright LED Headlight Bulbs",
            description: "Super bright LED headlight conversion kit. 6000K cool white light, 300% brighter than standard halogen bulbs for safer night driving.",
            explanation: "Features an aviation aluminum body with a high-speed turbo cooling fan that dissipates heat up to twice as fast as standard bulbs, ensuring a lifespan of over 50,000 hours.",
            ingredients: ["CSP LED chips", "Aviation aluminum 6063 body", "Copper core board", "High-speed cooling fan (12,000 RPM)"],
            price: 89.99,
            image: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=600&q=80",
            category: "automotive",
            isNew: true
        },
        {
            id: 4,
            title: "Sonic Pulse Electric Toothbrush",
            description: "Advanced sonic technology provides 40,000 micro-brushes per minute for a powerful dynamic cleaning action. Keeps your teeth and gums healthy.",
            explanation: "Comes with 5 brushing modes (Clean, White, Polish, Massage, Sensitive) and a smart timer that pauses every 30 seconds to remind you to change brushing areas. Waterproof IPX7 design.",
            ingredients: ["Food-grade ABS plastic handle", "DuPont nylon bristles", "Lithium-ion battery", "Copper wire motor assembly"],
            price: 79.99,
            image: "assets/premium_toothbrush_1781708835758.png",
            category: "beauty and home",
            isNew: true
        },
        {
            id: 5,
            title: "Organic Mint Whitening Toothpaste",
            description: "Premium fluoride-free toothpaste formulated with natural ingredients and pure mint extract for a refreshing, brilliant smile every morning.",
            explanation: "Utilizes hydrated silica for gentle stain removal without scratching enamel, while essential oils provide lasting fresh breath and help soothe gums naturally.",
            ingredients: ["Vegetable Glycerin", "Hydrated Silica", "Purified Water", "Organic Peppermint Oil", "Baking Soda", "Tea Tree Oil", "Xylitol"],
            price: 12.50,
            image: "assets/premium_toothpaste_1781708851671.png",
            category: "beauty and home",
            isNew: true
        },
        {
            id: 6,
            title: "Luxury Egyptian Cotton Bath Towels",
            description: "Experience spa-like comfort at home with our ultra-soft, highly absorbent 100% Egyptian cotton towel set. Durable and elegant.",
            explanation: "Woven with long-staple cotton fibers that make them exceptionally plush, durable, and highly absorbent. These towels will get softer with every wash.",
            ingredients: ["100% Long-staple Egyptian Cotton", "Eco-friendly fabric dyes"],
            price: 45.00,
            image: "assets/luxury_bath_towels_1781708867588.png",
            category: "beauty and home",
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

    // Toggle cart dropdown visibility safely
    cartIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        cartDropdown.classList.toggle('active');
    });

    // Close cart dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!cartDropdown.contains(event.target) && !event.target.closest('.add-to-cart-btn')) {
            cartDropdown.classList.remove('active');
        }
    });

    function renderProducts(itemsToRender = products) {
        productList.innerHTML = '';
        if (itemsToRender.length === 0) {
            productList.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); font-size: 1.2rem; margin-top: 2rem;">No products found matching your search.</p>';
            return;
        }
        itemsToRender.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.cursor = 'pointer'; // Make it clear the card is clickable
            
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
                        <div class="product-footer-actions">
                            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            
            // Add click listener to the entire card
            card.addEventListener('click', (e) => {
                // Ignore if the click was on the Add to Cart button
                if (!e.target.closest('.add-to-cart-btn')) {
                    openProductModal(product.id);
                }
            });

            productList.appendChild(card);
        });

        // Add event listeners robustly using dataset
        const cartBtns = document.querySelectorAll('.add-to-cart-btn');
        cartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                addToCart(id);
            });
        });
    }

    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.close-modal');

    function openProductModal(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        let ingredientsHtml = '';
        if (product.ingredients && product.ingredients.length > 0) {
            ingredientsHtml = `
                <div class="modal-section">
                    <h4>Ingredients / Materials</h4>
                    <ul>
                        ${product.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        let explanationHtml = '';
        if (product.explanation) {
            explanationHtml = `
                <div class="modal-section">
                    <h4>Detailed Explanation</h4>
                    <p>${product.explanation}</p>
                </div>
            `;
        }

        modalBody.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.image}" alt="${product.title}" class="modal-product-img" style="margin-top: 1rem;">
            <p style="font-size: 1.1rem; color: var(--text-secondary);">${product.description}</p>
            ${explanationHtml}
            ${ingredientsHtml}
            <div style="margin-top: 2rem; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart-btn" data-id="${product.id}" style="padding: 0.8rem 1.5rem;">Add to Cart</button>
            </div>
        `;

        const modalAddToCartBtn = modalBody.querySelector('.add-to-cart-btn');
        modalAddToCartBtn.addEventListener('click', () => {
            addToCart(product.id);
            modal.classList.remove('active');
        });

        modal.classList.add('active');
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });

    function updateCartUI() {
        cartCountElement.textContent = cartItems.length;
        
        let total = 0;
        cartItemsContainer.innerHTML = '';
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        } else {
            cartItems.forEach((item, index) => {
                total += item.price;
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                
                // Show if it's a new arrival in the cart itself!
                const badgeHtml = item.isNew ? '<span style="color:var(--accent); font-size:0.7rem; font-weight:bold; margin-left:5px;">(New Arrival)</span>' : '';
                
                itemEl.innerHTML = `
                    <div class="cart-item-info" style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                        <div>
                            <h4 style="margin-bottom:0.2rem; font-size:0.9rem;">${item.title} ${badgeHtml}</h4>
                            <p style="color:var(--accent); margin:0; font-size:0.8rem;">$${item.price.toFixed(2)}</p>
                        </div>
                        <button class="remove-item-btn" data-index="${index}" style="background:rgba(239, 68, 68, 0.2); border:none; color:#ef4444; padding: 4px 8px; border-radius: 4px; cursor:pointer; font-weight:bold;">X</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemEl);
            });

            // Add remove logic so they can manage the cart
            document.querySelectorAll('.remove-item-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = parseInt(e.currentTarget.getAttribute('data-index'));
                    cartItems.splice(idx, 1);
                    updateCartUI();
                });
            });
        }
        
        cartTotalPrice.textContent = '$' + total.toFixed(2);
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cartItems.push(product);
            updateCartUI();
            
            // Animation for cart icon
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 200);

            // Visual Toast Notification to confirm addition!
            showToast(`Added ${product.title} to cart!`);
        }
    }

    function showToast(msg) {
        let toast = document.getElementById('cart-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cart-toast';
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.right = '20px';
            toast.style.background = 'var(--primary-color)';
            toast.style.color = '#fff';
            toast.style.padding = '12px 24px';
            toast.style.borderRadius = '8px';
            toast.style.boxShadow = '0 5px 15px rgba(0,0,0,0.5)';
            toast.style.zIndex = '9999';
            toast.style.transition = 'opacity 0.3s ease';
            toast.style.fontWeight = '600';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 300);
        }, 3000);
    }

    // Search Functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(p => 
                p.title.toLowerCase().includes(searchTerm) || 
                p.description.toLowerCase().includes(searchTerm) ||
                p.category.toLowerCase().includes(searchTerm)
            );
            renderProducts(filteredProducts);
        });
    }

    renderProducts();
});
