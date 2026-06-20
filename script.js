/* ==========================================
   MAYA COLLECTION INTERACTIVE COMPONENT SCRIPTS
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Loader Animation removal
    const loader = document.getElementById("page-loader");
    if (loader) {
        window.addEventListener("load", () => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        });
    }

    // 2. Custom Cursor tracking with delayed ease
    const cursor = document.getElementById("custom-cursor");
    if (cursor) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });

        // Hover expansions for active items
        const clickables = document.querySelectorAll("a, button, .product-card, .gallery-item-card");
        clickables.forEach(elem => {
            elem.addEventListener("mouseenter", () => {
                cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
                cursor.style.backgroundColor = "rgba(212, 175, 55, 0.15)";
            });
            elem.addEventListener("mouseleave", () => {
                cursor.style.transform = "translate(-50%, -50%) scale(1)";
                cursor.style.backgroundColor = "transparent";
            });
        });
    }

    // 3. Dark/Light Mode Theme Toggle state management
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            themeBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }

    // 4. Sticky Header with shadow implementation
    const navbar = document.getElementById("navbar");
    const backToTop = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    // 5. Responsive Mobile Menu toggling
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // 6. Intersection Observer based Stat Counter Animation
    const stats = document.querySelectorAll(".stat-number");
    if (stats.length > 0) {
        const observerOptions = { threshold: 0.5 };
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute("data-target"));
                    let count = 0;
                    const duration = 2000;
                    const increment = Math.ceil(target / (duration / 20));
                    
                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            entry.target.innerText = count;
                            setTimeout(updateCount, 20);
                        } else {
                            entry.target.innerText = target;
                        }
                    };
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        stats.forEach(stat => statsObserver.observe(stat));
    }

    // ==================================================
    // 7. PRODUCT CATALOG STATE ENGINE & RENDERER (16 items)
    // ==================================================
    const productsData = [
        {
            id: 1,
            name: "Classic Deep Maroon Sharara Suit",
            price: 5999,
            category: "Ethnic",
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
            description: "A rich georgette deep crimson base finished with heavy metallic dori work panels."
        },
        {
            id: 2,
            name: "Premium Ivory Organza Gharara",
            price: 8499,
            category: "Premium",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
            description: "Handcrafted pure silk thread motifs highlighting multi-layered traditional gharara falls."
        },
        {
            id: 3,
            name: "Minimalist Pastel Salwar Suit",
            price: 2999,
            category: "Daily",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
            description: "Soft breathable linen with exquisite hand-stitched borders."
        },
        {
            id: 4,
            name: "Silk Anarkali & Floral Dupatta Flatlay Set",
            price: 7200,
            category: "Premium",
            image: "https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&w=600&q=80",
            description: "Curated styling setup including a fine cream silk outfit, organza dupatta and matching pink details."
        },
        {
            id: 5,
            name: "Blossom Pink Festive Kurti",
            price: 2499,
            category: "Daily",
            image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
            description: "Lightweight premium rayon daily kurti detailed with soft lace patterns."
        },
        {
            id: 6,
            name: "Royal Golden Zari Silk Suit",
            price: 9499,
            category: "Premium",
            image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
            description: "Heavy Banarasi weaves featuring complex zari embroidery detailing for bridal festive occasions."
        },
        {
            id: 7,
            name: "Sunset Peach Palazzo Set",
            price: 3499,
            category: "Daily",
            image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&w=600&q=80",
            description: "Casual flowy cotton linen coordinates for tropical daily styling."
        },
        {
            id: 8,
            name: "Teal Green Velvet Party Lehenga",
            price: 11999,
            category: "Party",
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
            description: "Plush velvet heavy flare outfit lined with sparkling gold-embroidered edges."
        },
        {
            id: 9,
            name: "Sage Floral Georgette Maxi",
            price: 3200,
            category: "Daily",
            image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=600&q=80",
            description: "Relaxed fit floral printed modern cut perfect for weekend events."
        },
        {
            id: 10,
            name: "Gold Thread Embroidered Kurti",
            price: 1999,
            category: "Daily",
            image: "https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&w=600&q=80",
            description: "Premium breathable daily fabric designed with rich ethnic motif styling."
        },
        {
            id: 11,
            name: "Silver Lurex Party Dress",
            price: 6499,
            category: "Party",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
            description: "Light catching structured silhouette with stylish sheer sleeve details."
        },
        {
            id: 12,
            name: "Royal Blue Silk Kurti Set",
            price: 4800,
            category: "Ethnic",
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
            description: "Lustrous raw silk matching trousers and top detailing delicate hand embroideries."
        },
        {
            id: 13,
            name: "Crimson Silk Traditional Saree",
            price: 12500,
            category: "Premium",
            image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
            description: "Authentic Kanjeevaram wedding classic saree featuring pure copper zari work."
        },
        {
            id: 14,
            name: "Lavender Breeze Linen Set",
            price: 2899,
            category: "Daily",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
            description: "Cool airy pastel linen designed specifically for active day wear comfort."
        },
        {
            id: 15,
            name: "Emerald Green Chanderi Suit",
            price: 5200,
            category: "Ethnic",
            image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
            description: "A classic breathable weave featuring self-fabric motifs and matching dupatta."
        },
        {
            id: 16,
            name: "Charcoal Night Shimmer Gown",
            price: 7999,
            category: "Party",
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
            description: "Elegantly sculpted deep charcoal floor dress with delicate silver thread lines."
        }
    ];

    const catalogGrid = document.getElementById("catalog-grid");
    if (catalogGrid) {
        let currentFilter = "all";
        let searchQuery = "";
        let currentSort = "featured";

        const renderProducts = () => {
            catalogGrid.innerHTML = "";
            
            // Apply filtering logic
            let filtered = productsData.filter(item => {
                const matchesCat = currentFilter === "all" || item.category === currentFilter;
                const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      item.description.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCat && matchesSearch;
            });

            // Apply sorting logic
            if (currentSort === "price-low") {
                filtered.sort((a, b) => a.price - b.price);
            } else if (currentSort === "price-high") {
                filtered.sort((a, b) => b.price - a.price);
            }

            if (filtered.length === 0) {
                catalogGrid.innerHTML = `<div class="text-center" style="grid-column: 1/-1; padding: 4rem 0;">No matching styles found. Try general keywords.</div>`;
                return;
            }

            filtered.forEach(item => {
                const card = document.createElement("div");
                card.className = "product-card";
                card.innerHTML = `
                    <div class="product-image-container">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                        <div class="quickview-btn" data-id="${item.id}">Quick View</div>
                        <div class="wishlist-btn"><i class="fa-regular fa-heart"></i></div>
                    </div>
                    <div class="product-info-box">
                        <span class="product-tag">${item.category} Wear</span>
                        <h3>${item.name}</h3>
                        <p class="product-price">₹${item.price.toLocaleString('en-IN')}</p>
                    </div>
                `;
                catalogGrid.appendChild(card);
            });

            // Re-attach quick view triggers
            document.querySelectorAll(".quickview-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const id = parseInt(e.target.getAttribute("data-id"));
                    openQuickView(id);
                });
            });
        };

        // Event hooks for Search & Filter inputs
        const searchInput = document.getElementById("catalog-search");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                searchQuery = e.target.value;
                renderProducts();
            });
        }

        const filterBtns = document.querySelectorAll("#filter-buttons .filter-btn");
        filterBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                filterBtns.forEach(b => b.classList.remove("active"));
                e.target.classList.add("active");
                currentFilter = e.target.getAttribute("data-filter");
                renderProducts();
            });
        });

        const sortSelect = document.getElementById("sort-select");
        if (sortSelect) {
            sortSelect.addEventListener("change", (e) => {
                currentSort = e.target.value;
                renderProducts();
            });
        }

        // Initialize display
        renderProducts();
    }

    // 8. Quick View Lightbox Logic
    const quickviewModal = document.getElementById("quickview-modal");
    const modalClose = document.getElementById("modal-close");

    const openQuickView = (id) => {
        const item = productsData.find(p => p.id === id);
        if (!item || !quickviewModal) return;

        document.getElementById("modal-img-element").src = item.image;
        document.getElementById("modal-title").innerText = item.name;
        document.getElementById("modal-price").innerText = "₹" + item.price.toLocaleString('en-IN');
        document.getElementById("modal-tag").innerText = item.category + " Wear";
        document.getElementById("modal-description").innerText = item.description;

        // Populate dynamic WhatsApp query line
        const whatsappBtn = document.getElementById("modal-whatsapp-enquire");
        if (whatsappBtn) {
            const message = encodeURIComponent(`Hi Maya Collection, I am interested in enquiring about: ${item.name} (Code: MAYA-${item.id}) priced at ₹${item.price}. Please share availability and sizing options.`);
            whatsappBtn.href = `https://wa.me/917022223381?text=${message}`;
        }

        quickviewModal.classList.add("active");
    };

    if (modalClose) {
        modalClose.addEventListener("click", () => {
            quickviewModal.classList.remove("active");
        });
    }

    // 9. General Visual Gallery category filters & Lightbox
    const galleryItems = document.querySelectorAll(".gallery-item-card");
    const galNavButtons = document.querySelectorAll(".gal-nav-btn");
    
    if (galleryItems.length > 0 && galNavButtons.length > 0) {
        galNavButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                galNavButtons.forEach(b => b.classList.remove("active"));
                e.target.classList.add("active");
                
                const cat = e.target.getAttribute("data-gcat");
                galleryItems.forEach(item => {
                    if (cat === "all" || item.getAttribute("data-category") === cat) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });
    }

    const galleryLightbox = document.getElementById("gallery-lightbox");
    const galleryLightboxImg = document.getElementById("gallery-lightbox-img");
    const galleryLightboxClose = document.getElementById("gallery-lightbox-close");

    if (galleryItems.length > 0 && galleryLightbox) {
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                const imgSrc = item.querySelector("img").src;
                galleryLightboxImg.src = imgSrc;
                galleryLightbox.classList.add("active");
            });
        });

        galleryLightboxClose.addEventListener("click", () => {
            galleryLightbox.classList.remove("active");
        });
