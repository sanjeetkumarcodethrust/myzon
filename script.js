document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            title: "Premium V8 Synthetic Motor Oil",
            description: "Advanced full synthetic motor oil designed to keep your engine running like new by providing exceptional wear protection, cleaning power and overall performance.",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1610484770281-9b76c8dbb510?auto=format&fit=crop&w=600&q=80",
            category: "automotive"
        },
        {
            id: 2,
            title: "Carbon Fiber Steering Wheel Cover",
            description: "High-quality sport-grip steering wheel cover. Enhances the interior of your vehicle while providing better control and comfort during your drive.",
            price: 29.50,
            image: "https://images.unsplash.com/photo-1590362891991-f7004f2d5ee1?auto=format&fit=crop&w=600&q=80",
            category: "automotive"
        },
        {
            id: 3,
            title: "Ultra-Bright LED Headlight Bulbs",
            description: "Super bright LED headlight conversion kit. 6000K cool white light, 300% brighter than standard halogen bulbs for safer night driving.",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=600&q=80",
            category: "automotive"
        }
    ];

    const productList = document.getElementById('product-list');
    let cartCount = 0;
    const cartCountElement = document.getElementById('cart-count');

    function renderProducts() {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-img-container">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <button class="add-to-cart-btn" onclick="addToCart()">Add to Cart</button>
                    </div>
                </div>
            `;
            productList.appendChild(card);
        });
    }

    // Expose to global scope for inline onclick handler
    window.addToCart = function() {
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Add a small animation effect
        const cartElement = document.querySelector('.cart');
        cartElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cartElement.style.transform = 'scale(1)';
        }, 200);
    };

    renderProducts();
});
