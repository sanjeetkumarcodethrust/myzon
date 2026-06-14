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

    function renderProducts() {
        productList.innerHTML = '';
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
                        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            productList.appendChild(card);
        });

        // Add event listeners robustly using dataset
        const btns = document.querySelectorAll('.add-to-cart-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                addToCart(id);
            });
        });
    }

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

    renderProducts();
});
