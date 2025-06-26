// ========================================================================
// SHIQ E-COMMERCE APPLICATION - UNIFIED SYSTEM v3.1
// التطبيق الموحد للتسوق الإلكتروني - النظام المتكامل
// ========================================================================
// المطور: فريق SHIQ Development
// التاريخ: 2025-01-27
// الإصدار: 3.1.0 Unified Professional
// الوصف: النظام الموحد للمنتجات والسلة والتسجيل
// ========================================================================

// ===== 1. الإعدادات الأساسية والثوابت =====
const CORE_CONFIG = {
    // معلومات التطبيق الأساسية
    APP_NAME: 'SHIQ - شي ان العراق',
    APP_VERSION: '3.1.0',
    APP_URL: 'https://peacepanel.github.io/shein-baghdad/',
    
    // إعدادات Google Sheets API
    GOOGLE_API_KEY: 'AIzaSyATs-nWgTonTFEKCi_4F5lQ_Ao0vnJ5Xmk',
    
    // إعدادات التجارة الإلكترونية
    ECOMMERCE: {
        FREE_DELIVERY_THRESHOLD: 50000, // التوصيل المجاني
        DELIVERY_FEE: 5000,             // رسوم التوصيل
        CURRENCY: 'د.ع',               // العملة
        WHATSAPP_NUMBER: '9647862799748', // رقم الواتساب
        PHONE_NUMBER: '07862799748'      // رقم الهاتف
    },
    
    // إعدادات التخزين المحلي
    STORAGE_KEYS: {
        CART_DATA: 'shiq_cart_v3',
        CATEGORY_IMAGES: 'shiq_category_images_v3',
        USER_DATA: 'shiq_current_user_v3'
    },
    
    // إعدادات الأداء
    PERFORMANCE: {
        IMAGE_CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 ساعة
        API_TIMEOUT: 10000,                         // 10 ثواني
        RETRY_ATTEMPTS: 3                           // محاولات إعادة
    },
    
    // المحافظات العراقية
    GOVERNORATES: [
        'بغداد', 'البصرة', 'نينوى', 'أربيل', 'النجف', 'كربلاء',
        'بابل', 'الأنبار', 'ذي قار', 'القادسية', 'كركوك', 'واسط',
        'صلاح الدين', 'المثنى', 'ديالى', 'ميسان', 'دهوك', 'السليمانية'
    ]
};

// ===== 2. تكوين الفئات والمنتجات =====
const PRODUCT_CATEGORIES = {
    'اكسسوارات نسائية': {
        id: 'women_accessories',
        sheetId: '1Tf1B4HqO5lnwxP8oSqzRMwmvegnIDJam-DMhQc8s5S8',
        sheets: ['تراجي', 'ساعات', 'سوار', 'كلادة', 'محابس', 'قراصات', 'اكسسوار جسم', 'شفقات', 'احزمة', 'مداليات', 'نضارات', 'مهفات'],
        columns: { image: 'F', price: 'I', code: 'A' },
        icon: '💍',
        searchable: true
    },
    'احذية وحقائب متنوعة': {
        id: 'shoes_bags',
        sheetId: '1saUoR7Z7xYI-WCUZNTs3YRZ6jEdnM6S03M15tgw-QiQ',
        sheets: ['جزدان', 'حقائب', 'سلبر نسائي', 'احذية نسائي', 'اكسسوارات اطفال', 'احذية اطفال'],
        columns: { image: 'F', price: 'I', code: 'A', size: 'G' },
        icon: '👠',
        searchable: true,
        searchPlaceholder: '🔍 ابحث بالمقاس أو نوع الحذاء...'
    },
    'ربطات وشالات': {
        id: 'scarves_ties',
        sheetId: '17mlV_BaJFQZoz-Cof1wJG6e-2X1QCRs9usoIWXmQGI8',
        sheets: ['جواريب', 'اكمام كفوف', 'شالات', 'شال كتف', 'سكارف', 'بروشات', 'ياخه'],
        columns: { image: 'F', price: 'I', code: 'A' },
        icon: '🧣',
        searchable: false
    },
    'شيكلام': {
        id: 'beauty_cosmetics',
        sheetId: '1K08r0X7XQ6ZUkUYjR8QI_91X1hX6v7K8e6181Vuz4os',
        sheets: ['اظافر', 'صبغ اظافر', 'شعر', 'فرش', 'مكياج', 'وشم', 'حقائب مكياج', 'منوع'],
        columns: { image: 'F', price: 'I', code: 'A' },
        icon: '💄',
        searchable: false
    },
    'منزلية': {
        id: 'home_items',
        sheetId: '1aLXBPsxTixs28wFi55P9ZRNU2RhqzFfjxg8Cbp4m8Rw',
        sheets: ['منوع', 'ديكورات', 'ادوات منزلية'],
        columns: { image: 'F', price: 'I', code: 'A', size: 'J' },
        icon: '🏠',
        searchable: false
    },
    'مفروشات': {
        id: 'furnishings',
        sheetId: '1s1WVVjA--0BqHfzE-ANm5pq43xkRD1vaDyNeGUAXFLk',
        sheets: ['شراشف', 'ستائر', 'ارضيات', 'وجه كوشات', 'مناشف', 'تلبيسه لحاف', 'اغطية', 'مقاعد تلبيس', 'اخرى'],
        columns: { image: 'F', price: 'I', code: 'A', size: 'J' },
        icon: '🛏️',
        searchable: false
    },
    'اطفالي صيفي': {
        id: 'kids_summer',
        sheetId: '1Rhbilfz7VaHTR-qCxdjNK_5zk52kdglYd-ADK2Mn2po',
        sheets: ['3 - 0 M', '6 - 3 M', '9 - 6 M', '12 - 9 M', '18 - 12 M', '24 - 18 M', '1 Y', '2 Y', '3 Y', '4 Y', '5 Y', '6 Y', '7 Y', '8 Y', '9 Y', '10 Y', '11 Y', '12 Y', '13 Y', '14 Y'],
        columns: { image: 'F', price: 'H', code: 'A', size: 'I' },
        icon: '👶',
        searchable: false
    },
    'اطفالي شتائي': {
        id: 'kids_winter',
        sheetId: '1JAI7pfkQiPAL-6H6DBjryPHGAPoRacY3TTajEJHy8HQ',
        sheets: ['3 - 0 M', '6 - 3 M', '9 - 6 M', '12 - 9 M', '18 - 12 M', '24 - 18 M', '1 Y', '2 Y', '3 Y', '4 Y', '5 Y', '6 Y', '7 Y', '8 Y', '9 Y', '10 Y', '11 Y', '12 Y', '13 Y', '14 Y'],
        columns: { image: 'F', price: 'H', code: 'A', size: 'I' },
        icon: '🧥',
        searchable: false
    },
    'نسائي شتائي': {
        id: 'women_winter',
        sheetId: '1cXt49H5Wy1jGB0jrutp8JviLq3qSHo7VQuCoBclDRAI',
        sheets: ['5XL', '4XL', '3XL', '2XL', '1XL', '0XL', 'XL', 'L', 'M', 'S', 'XS', 'one size'],
        columns: { image: 'F', price: 'H', code: 'A', size: 'D' },
        icon: '🧥',
        searchable: false
    },
    'نسائي صيفي': {
        id: 'women_summer',
        sheetId: '1POUe8K4EadYctDbTr1hnpKJ_r6slAVaX6VWyfbGYBFE',
        sheets: ['5XL', '4XL', '3XL', '2XL', '1XL', '0XL', 'XL', 'L', 'M', 'S', 'XS', 'one size'],
        columns: { image: 'F', price: 'H', code: 'A', size: 'D' },
        icon: '👗',
        searchable: false
    },
    'مستلزمات موبايل': {
        id: 'mobile_accessories',
        sheetId: '1xMFXIY4EjjbEnGVK-8m_Q8G9Ng-2NJ93kPkdpfVQuGk',
        sheets: ['كفرات موبايل', 'ملحقات اخرى'],
        columns: { image: 'F', price: 'I', code: 'A', size: 'G' },
        icon: '📱',
        searchable: true,
        searchPlaceholder: '🔍 ابحث بنوع الموبايل أو الاكسسوار...'
    }
};

// ===== 3. نظام إدارة السلة =====
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
    }
    
    addItem(product) {
        const existingIndex = this.items.findIndex(item => item.code === product.code);
        if (existingIndex !== -1) {
            this.items[existingIndex].quantity += 1;
            this.items[existingIndex].lastUpdated = new Date().toISOString();
        } else {
            this.items.push({
                id: this.generateItemId(),
                code: product.code,
                name: product.name,
                price: parseFloat(product.price) || 0,
                imageUrl: product.imageUrl,
                size: product.size || null,
                quantity: 1,
                addedAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            });
        }
        this.saveToStorage();
        this.updateUI();
        return true;
    }
    
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveToStorage();
        this.updateUI();
    }
    
    updateQuantity(itemId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(itemId);
            return;
        }
        
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
            item.lastUpdated = new Date().toISOString();
            this.saveToStorage();
            this.updateUI();
        }
    }
    
    clear() {
        this.items = [];
        this.saveToStorage();
        this.updateUI();
    }
    
    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    getDeliveryFee() {
        const subtotal = this.getTotalPrice();
        return subtotal >= CORE_CONFIG.ECOMMERCE.FREE_DELIVERY_THRESHOLD ? 0 : CORE_CONFIG.ECOMMERCE.DELIVERY_FEE;
    }
    
    getFinalTotal() {
        return this.getTotalPrice() + this.getDeliveryFee();
    }
    
    generateItemId() {
        return 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    saveToStorage() {
        try {
            const cartData = {
                items: this.items,
                lastUpdated: new Date().toISOString(),
                version: CORE_CONFIG.APP_VERSION
            };
            localStorage.setItem(CORE_CONFIG.STORAGE_KEYS.CART_DATA, JSON.stringify(cartData));
        } catch (error) {
            console.error('خطأ في حفظ السلة:', error);
        }
    }
    
    loadFromStorage() {
        try {
            const cartData = localStorage.getItem(CORE_CONFIG.STORAGE_KEYS.CART_DATA);
            if (cartData) {
                const parsed = JSON.parse(cartData);
                this.items = parsed.items || [];
            }
        } catch (error) {
            console.error('خطأ في تحميل السلة:', error);
            this.items = [];
        }
    }
    
    updateUI() {
        this.updateCartButton();
        this.updateProductButtons();
    }
    
    updateCartButton() {
        const cartButton = document.querySelector('.cart-button');
        if (cartButton) {
            const totalItems = this.getTotalItems();
            const totalPrice = this.getTotalPrice();
            
            if (totalItems > 0) {
                cartButton.innerHTML = `
                    <span>🛒</span>
                    <span>السلة (${totalItems})</span>
                    <span style="font-size: 0.9em; opacity: 0.9;">${totalPrice.toLocaleString()} ${CORE_CONFIG.ECOMMERCE.CURRENCY}</span>
                `;
                cartButton.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            } else {
                cartButton.innerHTML = `
                    <span>🛒</span>
                    <span>السلة فارغة</span>
                `;
                cartButton.style.background = 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)';
            }
        }
    }
    
    updateProductButtons() {
        const buttons = document.querySelectorAll('.add-to-cart-btn');
        buttons.forEach(btn => {
            const productCode = btn.getAttribute('data-product-code');
            const isInCart = this.items.some(item => item.code === productCode);
            
            if (isInCart) {
                btn.classList.add('selected');
                btn.innerHTML = '✅ في السلة';
            } else {
                btn.classList.remove('selected');
                btn.innerHTML = '🛒 أضف للسلة';
            }
        });
    }
}

// ===== 4. نظام إدارة الصور =====
class ImageManager {
    constructor() {
        this.cache = {};
        this.loadCache();
    }
    
    async getCategoryImage(categoryName, categoryConfig) {
        // التحقق من الكاش أولاً
        if (this.cache[categoryName] && this.isCacheValid(categoryName)) {
            return this.cache[categoryName].url;
        }
        
        // البحث في أوراق العمل
        for (const sheetName of categoryConfig.sheets) {
            try {
                const imageUrl = await this.searchImageInSheet(categoryConfig.sheetId, sheetName, categoryConfig.columns);
                if (imageUrl) {
                    this.setCacheItem(categoryName, imageUrl);
                    return imageUrl;
                }
            } catch (error) {
                console.warn(`خطأ في البحث في ورقة ${sheetName}:`, error);
                continue;
            }
        }
        
        return null;
    }
    
    async searchImageInSheet(sheetId, sheetName, columns) {
        const range = `${sheetName}!${columns.image}2:${columns.price}20`;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${CORE_CONFIG.GOOGLE_API_KEY}`;
        
        const response = await this.fetchWithRetry(url);
        const data = await response.json();
        
        if (data.values && data.values.length > 0) {
            for (const row of data.values) {
                const imageUrl = row[0];
                const price = this.getPriceFromRow(row, columns);
                
                if (imageUrl && price && this.isValidImageUrl(imageUrl)) {
                    return this.convertToDirectLink(imageUrl);
                }
            }
        }
        
        return null;
    }
    
    async fetchWithRetry(url, retries = CORE_CONFIG.PERFORMANCE.RETRY_ATTEMPTS) {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, {
                    timeout: CORE_CONFIG.PERFORMANCE.API_TIMEOUT
                });
                
                if (response.ok) {
                    return response;
                }
                
                if (i === retries - 1) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                if (i === retries - 1) {
                    throw error;
                }
                await this.delay(1000 * (i + 1)); // تأخير متزايد
            }
        }
    }
    
    getPriceFromRow(row, columns) {
        const imageColIndex = this.getColumnIndex(columns.image);
        const priceColIndex = this.getColumnIndex(columns.price);
        const relativePriceIndex = priceColIndex - imageColIndex;
        return row[relativePriceIndex];
    }
    
    getColumnIndex(colLetter) {
        return colLetter.charCodeAt(0) - 65; // A=0, B=1, etc.
    }
    
    isValidImageUrl(url) {
        if (!url || typeof url !== 'string') return false;
        if (!url.toLowerCase().includes('http')) return false;
        
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        const hasImageExtension = imageExtensions.some(ext => url.toLowerCase().includes(ext));
        const isGoogleDrive = url.includes('drive.google.com') || url.includes('googleusercontent.com');
        
        return hasImageExtension || isGoogleDrive;
    }
    
    convertToDirectLink(url) {
        if (url.includes('drive.google.com/file/d/')) {
            const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (fileIdMatch && fileIdMatch[1]) {
                return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
            }
        }
        return url;
    }
    
    setCacheItem(key, url) {
        this.cache[key] = {
            url: url,
            timestamp: Date.now()
        };
        this.saveCache();
    }
    
    isCacheValid(key) {
        const item = this.cache[key];
        if (!item) return false;
        
        const age = Date.now() - item.timestamp;
        return age < CORE_CONFIG.PERFORMANCE.IMAGE_CACHE_DURATION;
    }
    
    loadCache() {
        try {
            const cached = localStorage.getItem(CORE_CONFIG.STORAGE_KEYS.CATEGORY_IMAGES);
            if (cached) {
                const parsed = JSON.parse(cached);
                this.cache = parsed.images || {};
            }
        } catch (error) {
            console.error('خطأ في تحميل كاش الصور:', error);
            this.cache = {};
        }
    }
    
    saveCache() {
        try {
            const cacheData = {
                images: this.cache,
                timestamp: Date.now(),
                version: CORE_CONFIG.APP_VERSION
            };
            localStorage.setItem(CORE_CONFIG.STORAGE_KEYS.CATEGORY_IMAGES, JSON.stringify(cacheData));
        } catch (error) {
            console.error('خطأ في حفظ كاش الصور:', error);
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ===== 5. واجهة المستخدم الأساسية =====
class UIManager {
    constructor(cart, imageManager) {
        this.cart = cart;
        this.imageManager = imageManager;
        this.currentCategory = '';
        this.currentSheet = '';
        this.initializeElements();
    }
    
    initializeElements() {
        this.categoryContainer = document.getElementById('categoryContainer');
        this.categoryNav = document.getElementById('category-nav');
        this.workbookContainer = document.getElementById('workbook-container');
        this.productContainer = document.getElementById('product-container');
        this.searchBox = document.getElementById('searchBox');
        this.overlay = document.getElementById('overlay');
    }
    
    async renderCategories() {
        if (!this.categoryContainer) return;
        
        this.categoryContainer.innerHTML = '';
        
        for (const [categoryName, config] of Object.entries(PRODUCT_CATEGORIES)) {
            const categoryElement = await this.createCategoryElement(categoryName, config);
            this.categoryContainer.appendChild(categoryElement);
        }
    }
    
    async createCategoryElement(categoryName, config) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        
        // صورة افتراضية
        const defaultImage = this.getDefaultCategoryImage();
        
        categoryDiv.innerHTML = `
            <img src="${defaultImage}" alt="${categoryName}" loading="lazy" onerror="this.src='${defaultImage}'">
            <div class="category-name">${config.icon} ${categoryName}</div>
        `;
        
        // تحميل الصورة الحقيقية في الخلفية
        this.loadCategoryImageAsync(categoryName, config, categoryDiv);
        
        categoryDiv.onclick = () => this.selectCategory(categoryName, config);
        
        return categoryDiv;
    }
    
    async loadCategoryImageAsync(categoryName, config, element) {
        try {
            const imageUrl = await this.imageManager.getCategoryImage(categoryName, config);
            if (imageUrl) {
                const imgElement = element.querySelector('img');
                if (imgElement) {
                    imgElement.src = imageUrl;
                }
            }
        } catch (error) {
            console.warn(`لا يمكن تحميل صورة الفئة ${categoryName}:`, error);
        }
    }
    
    createCategoryNavigation() {
        if (!this.categoryNav) return;
        
        this.categoryNav.innerHTML = '';
        
        Object.entries(PRODUCT_CATEGORIES).forEach(([categoryName, config]) => {
            const navBtn = document.createElement('button');
            navBtn.className = 'nav-category-btn';
            navBtn.textContent = `${config.icon} ${categoryName}`;
            navBtn.onclick = () => {
                this.setActiveNavButton(navBtn);
                this.selectCategory(categoryName, config);
            };
            this.categoryNav.appendChild(navBtn);
        });
    }
    
    setActiveNavButton(activeBtn) {
        document.querySelectorAll('.nav-category-btn').forEach(btn => 
            btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
    
    selectCategory(categoryName, config) {
        this.currentCategory = categoryName;
        this.showWorkbooks(config);
        this.setupSearch(config);
        this.clearProducts();
    }
    
    showWorkbooks(config) {
        if (!this.workbookContainer) return;
        
        this.workbookContainer.innerHTML = '';
        
        config.sheets.forEach(sheetName => {
            const workbookBtn = document.createElement('button');
            workbookBtn.className = 'workbook-button';
            workbookBtn.textContent = sheetName;
            workbookBtn.onclick = () => this.loadProducts(config, sheetName);
            this.workbookContainer.appendChild(workbookBtn);
        });
        
        this.workbookContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    setupSearch(config) {
        if (!this.searchBox) return;
        
        if (config.searchable) {
            this.searchBox.style.display = 'block';
            this.searchBox.placeholder = config.searchPlaceholder || '🔍 ابحث في المنتجات...';
            this.searchBox.value = '';
        } else {
            this.searchBox.style.display = 'none';
        }
    }
    
    async loadProducts(config, sheetName) {
        this.currentSheet = sheetName;
        this.showLoadingState();
        
        try {
            const products = await this.fetchProducts(config, sheetName);
            this.renderProducts(products, config);
        } catch (error) {
            this.showErrorState(error.message);
            console.error('خطأ في تحميل المنتجات:', error);
        }
    }
    
    async fetchProducts(config, sheetName) {
        const range = `${sheetName}!A1:O`;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.sheetId}/values/${range}?key=${CORE_CONFIG.GOOGLE_API_KEY}`;
        
        const response = await this.imageManager.fetchWithRetry(url);
        const data = await response.json();
        
        if (!data.values || data.values.length < 2) {
            throw new Error('لا توجد منتجات في هذا القسم');
        }
        
        return data.values.slice(1).filter(row => row[0] && row[this.imageManager.getColumnIndex(config.columns.image)]);
    }
    
    renderProducts(products, config) {
        if (!this.productContainer) return;
        
        this.productContainer.innerHTML = '';
        
        if (products.length === 0) {
            this.showEmptyState();
            return;
        }
        
        products.forEach(productRow => {
            const product = this.parseProductData(productRow, config);
            if (product) {
                const productElement = this.createProductElement(product);
                this.productContainer.appendChild(productElement);
            }
        });
        
        this.productContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    parseProductData(row, config) {
        const cols = config.columns;
        
        return {
            code: row[this.imageManager.getColumnIndex(cols.code)] || '',
            name: row[0] || '',
            price: row[this.imageManager.getColumnIndex(cols.price)] || '',
            imageUrl: row[this.imageManager.getColumnIndex(cols.image)] || '',
            size: cols.size ? row[this.imageManager.getColumnIndex(cols.size)] : null
        };
    }
    
    createProductElement(product) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        
        const defaultProductImage = this.getDefaultProductImage();
        const isInCart = this.cart.items.some(item => item.code === product.code);
        
        productDiv.innerHTML = `
            <img src="${product.imageUrl || defaultProductImage}" 
                 alt="${product.name}" 
                 onclick="ui.enlargeImage('${product.imageUrl}')"
                 onerror="this.src='${defaultProductImage}'" 
                 loading="lazy">
            <div class="product-info">
                <div class="product-code">${product.name}</div>
                <div class="product-price">
                    <span class="price-icon">💰</span>
                    ${parseInt(product.price || 0).toLocaleString()} ${CORE_CONFIG.ECOMMERCE.CURRENCY}
                </div>
                ${product.size ? `
                    <div class="product-size">
                        <span class="size-icon">📏</span>
                        المقاس: ${product.size}
                    </div>
                ` : ''}
                <button class="add-to-cart-btn ${isInCart ? 'selected' : ''}" 
                        data-product-code="${product.code}"
                        onclick="ui.addToCart('${product.code}', '${product.name}', '${product.price}', '${product.imageUrl}', '${product.size || ''}')">
                    ${isInCart ? '✅ في السلة' : '🛒 أضف للسلة'}
                </button>
            </div>
        `;
        
        return productDiv;
    }
    
    addToCart(code, name, price, imageUrl, size) {
        const success = this.cart.addItem({
            code, name, price, imageUrl, size
        });
        
        if (success) {
            this.showToast(`✅ تم إضافة "${name}" للسلة`, 'success');
        }
    }
    
    openCart() {
        if (this.cart.getTotalItems() === 0) {
            this.showToast('🛒 السلة فارغة! أضف بعض المنتجات أولاً', 'warning');
            return;
        }
        
        // التحقق من تسجيل المستخدم باستخدام النظام الموحد
        if (!window.currentUser) {
            this.showToast('📝 يرجى تسجيل بياناتك أولاً لإكمال الطلب', 'info');
            setTimeout(() => {
                showUserRegistration();
            }, 500);
            return;
        }
        
        this.createCartWindow();
    }
    
    createCartWindow() {
        const subtotal = this.cart.getTotalPrice();
        const deliveryFee = this.cart.getDeliveryFee();
        const total = this.cart.getFinalTotal();
        
        let itemsHtml = '';
        this.cart.items.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            itemsHtml += `
                <div class="cart-item" style="display: flex; align-items: center; padding: 15px; border: 2px solid #e5e7eb; margin: 10px 0; border-radius: 15px; background: #f9fafb;">
                    <img src="${item.imageUrl}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px; margin-left: 15px;">
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 5px 0; color: #1f2937;">${item.name}</h4>
                        <p style="margin: 0; color: #ef4444; font-weight: bold;">${item.price.toLocaleString()} ${CORE_CONFIG.ECOMMERCE.CURRENCY} × ${item.quantity}</p>
                        <p style="margin: 5px 0 0 0; color: #059669; font-weight: bold;">المجموع: ${itemTotal.toLocaleString()} ${CORE_CONFIG.ECOMMERCE.CURRENCY}</p>
                        ${item.size ? `<p style="margin: 2px 0; color: #6b7280;">المقاس: ${item.size}</p>` : ''}
                    </div>
                    <div style="text-align: center;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <button onclick="window.opener.cart.updateQuantity('${item.id}', ${item.quantity - 1}); window.close(); window.opener.ui.openCart();" 
                                    style="width: 30px; height: 30px; border: none; background: #ef4444; color: white; border-radius: 50%; cursor: pointer;">-</button>
                            <span style="font-weight: bold; min-width: 20px; text-align: center;">${item.quantity}</span>
                            <button onclick="window.opener.cart.updateQuantity('${item.id}', ${item.quantity + 1}); window.close(); window.opener.ui.openCart();" 
                                    style="width: 30px; height: 30px; border: none; background: #10b981; color: white; border-radius: 50%; cursor: pointer;">+</button>
                        </div>
                        <button onclick="window.opener.cart.removeItem('${item.id}'); window.close(); window.opener.ui.openCart();" 
                                style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 10px; cursor: pointer;">🗑️ حذف</button>
                    </div>
                </div>
            `;
        });
        
        const cartWindow = window.open('', '_blank', 'width=800,height=700,scrollbars=yes');
        cartWindow.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>🛒 مراجعة السلة - ${CORE_CONFIG.APP_NAME}</title>
                <style>
                    body { font-family: 'Segoe UI', sans-serif; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); direction: rtl; margin: 0; min-height: 100vh; }
                    .container { background: white; border-radius: 20px; padding: 25px; max-width: 900px; margin: 0 auto; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
                    h1 { text-align: center; color: #1f2937; margin-bottom: 30px; font-size: 2rem; }
                    .summary { background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%); padding: 20px; border-radius: 15px; margin: 20px 0; border: 2px solid #8B5CF6; }
                    .summary-row { display: flex; justify-content: space-between; margin: 10px 0; font-size: 1.1rem; }
                    .total-row { font-weight: bold; font-size: 1.3rem; color: #1f2937; border-top: 2px solid #8B5CF6; padding-top: 10px; margin-top: 15px; }
                    .btn-primary { display: block; width: 100%; text-align: center; padding: 20px; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: white; text-decoration: none; border-radius: 50px; margin: 25px 0; font-size: 1.2rem; font-weight: 700; border: none; cursor: pointer; }
                    .btn-secondary { background: #6b7280; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; margin: 0 5px; }
                    .delivery-note { background: #fef3c7; border: 2px solid #f59e0b; color: #92400e; padding: 10px; border-radius: 10px; margin: 10px 0; text-align: center; }
                    .free-delivery-note { background: #d1fae5; border: 2px solid #10b981; color: #047857; padding: 10px; border-radius: 10px; margin: 10px 0; text-align: center; }
                </style>
            </head>
            
            <body>
                <div class="container">
                    <h1>🛒 مراجعة السلة - ${CORE_CONFIG.APP_NAME}</h1>
                    
                    <div style="margin: 20px 0;">
                        <h3>📦 المنتجات المطلوبة (${this.cart.items.length} منتج)</h3>
                        ${itemsHtml}
                    </div>
                    
                    <div class="summary">
                        <h3 style="color: #8B5CF6; margin-bottom: 15px;">📊 ملخص الطلب</h3>
                        <div class="summary-row">
                            <span>المجموع الفرعي:</span>
                            <span>${subtotal.toLocaleString()} ${CORE_CONFIG.ECOMMERCE.CURRENCY}</span>
                        </div>
                        <div class="summary-row">
                            <span>رسوم التوصيل:</span>
                            <span>${deliveryFee === 0 ? 'مجاني 🎉' : deliveryFee.toLocaleString() + ' ' + CORE_CONFIG.ECOMMERCE.CURRENCY}</span>
                        </div>
                        ${deliveryFee === 0 
                            ? '<div class="free-delivery-note">🎉 تم تفعيل التوصيل المجاني!</div>' 
                            : `<div class="delivery-note">💡 أضف ${(CORE_CONFIG.ECOMMERCE.FREE_DELIVERY_THRESHOLD - subtotal).toLocaleString()} ${CORE_CONFIG.ECOMMERCE.CURRENCY} للحصول على توصيل مجاني!</div>`
                        }
                        <div class="summary-row total-row">
                            <span>المجموع الكلي:</span>
                            <span>${total.toLocaleString()} ${CORE_CONFIG.ECOMMERCE.CURRENCY}</span>
                        </div>
                    </div>
                    
                    <button class="btn-primary" onclick="sendToWhatsApp()">
                        📱 إرسال الطلب عبر واتساب
                    </button>
                    
                    <div style="text-align: center; margin-top: 20px;">
                        <button class="btn-secondary" onclick="window.opener.cart.clear(); window.close();">🧹 تفريغ السلة</button>
                        <button class="btn-secondary" onclick="window.close();">❌ إغلاق</button>
                    </div>
                </div>
                
                <script>
                    function sendToWhatsApp() {
                        const message = createWhatsAppMessage();
                        const whatsappUrl = 'https://api.whatsapp.com/send?phone=${CORE_CONFIG.ECOMMERCE.WHATSAPP_NUMBER}&text=' + encodeURIComponent(message);
                        window.open(whatsappUrl, '_blank');
                        window.close();
                    }
                    
                    function createWhatsAppMessage() {
                        let message = '🛍️ طلب جديد من ${CORE_CONFIG.APP_NAME}\\n\\n';
                        
                        // معلومات العميل من النظام الموحد
                        const customer = window.opener.currentUser;
                        if (customer) {
                            message += '👤 معلومات العميل:\\n';
                            message += '📛 الاسم: ' + customer.name + '\\n';
                            message += '📞 الهاتف: ' + customer.phone + '\\n';
                            message += '🏠 المحافظة: ' + customer.governorate + '\\n';
                            message += '📍 العنوان: ' + customer.address + '\\n\\n';
                        }
                        
                        message += '📦 المنتجات المطلوبة:\\n';
                        
                        const items = ${JSON.stringify(this.cart.items)};
                        items.forEach((item, index) => {
                            message += '\\n' + (index + 1) + '. ' + item.name;
                            message += '\\n   💰 السعر: ' + item.price.toLocaleString() + ' ${CORE_CONFIG.ECOMMERCE.CURRENCY}';
                            message += '\\n   📦 الكمية: ' + item.quantity;
                            if (item.size) message += '\\n   📏 المقاس: ' + item.size;
                            message += '\\n   🖼️ رابط الصورة: ' + item.imageUrl;
                            message += '\\n   💵 المجموع الفرعي: ' + (item.price * item.quantity).toLocaleString() + ' ${CORE_CONFIG.ECOMMERCE.CURRENCY}';
                            message += '\\n';
                        });
                        
                        message += '\\n📊 ملخص الطلب:\\n';
                        message += '💰 المجموع الفرعي: ${subtotal.toLocaleString()} ${CORE_CONFIG.ECOMMERCE.CURRENCY}\\n';
                        message += '🚚 رسوم التوصيل: ${deliveryFee === 0 ? 'مجاني 🎉' : deliveryFee.toLocaleString() + ' ' + CORE_CONFIG.ECOMMERCE.CURRENCY}\\n';
                        message += '💵 المجموع الكلي: ${total.toLocaleString()} ${CORE_CONFIG.ECOMMERCE.CURRENCY}\\n\\n';
                        message += '📞 للتواصل: ${CORE_CONFIG.ECOMMERCE.PHONE_NUMBER}\\n';
                        message += '🌐 الموقع: ${CORE_CONFIG.APP_URL}';
                        
                        return message;
                    }
                </script>
            </body>
            </html>
        `);
    }
    
    enlargeImage(src) {
        if (!this.overlay || !src) return;
        
        const enlargedImage = document.getElementById('enlargedImage');
        if (enlargedImage) {
            enlargedImage.src = src;
            this.overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeEnlargedImage() {
        if (this.overlay) {
            this.overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    searchProducts() {
        if (!this.searchBox || !this.productContainer) return;
        
        const query = this.searchBox.value.toLowerCase().trim();
        const products = this.productContainer.querySelectorAll('.product');
        
        products.forEach(product => {
            const text = product.textContent.toLowerCase();
            product.style.display = text.includes(query) ? 'block' : 'none';
        });
    }
    
    showLoadingState() {
        if (this.productContainer) {
            this.productContainer.innerHTML = '<div class="loading">جار التحميل...</div>';
        }
    }
    
    showErrorState(message) {
        if (this.productContainer) {
            this.productContainer.innerHTML = `<div class="default-message">❌ خطأ: ${message}</div>`;
        }
    }
    
    showEmptyState() {
        if (this.productContainer) {
            this.productContainer.innerHTML = '<div class="default-message">لا توجد منتجات في هذا القسم حالياً 😔</div>';
        }
    }
    
    clearProducts() {
        if (this.productContainer) {
            this.productContainer.innerHTML = '<div class="default-message">اختر قسماً من الأقسام أعلاه لعرض المنتجات 👆</div>';
        }
    }
    
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        const colors = {
            success: 'linear-gradient(135deg, #10B981, #059669)',
            error: 'linear-gradient(135deg, #EF4444, #DC2626)',
            warning: 'linear-gradient(135deg, #F59E0B, #D97706)',
            info: 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
        };
        
        toast.style.cssText = `
            position: fixed; top: 20px; right: 20px; background: ${colors[type]};
            color: white; padding: 15px 20px; border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 10000;
            font-weight: 600; animation: slideInRight 0.3s ease;
            max-width: 350px; font-family: 'Segoe UI', sans-serif;
        `;
        
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    getDefaultCategoryImage() {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiPvCfm43vuI88L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiPtin2YjYsdipINmB2YPYqTwvdGV4dD48L3N2Zz4=';
    }
    
    getDefaultProductImage() {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij7YtdmI2LHYqSDYrdin2YTZiNeKPC90ZXh0Pjwvc3ZnPg==';
    }
}

// ===== 6. نظام الأحداث =====
class EventManager {
    constructor() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // إغلاق الصورة المكبرة
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                ui.closeEnlargedImage();
            }
        });
        
        // البحث في المنتجات
        const searchBox = document.getElementById('searchBox');
        if (searchBox) {
            searchBox.addEventListener('input', () => ui.searchProducts());
        }
        
        // أحداث الشبكة
        window.addEventListener('online', () => {
            ui.showToast('🌐 تم استعادة الاتصال بالإنترنت', 'success');
        });
        
        window.addEventListener('offline', () => {
            ui.showToast('📡 انقطع الاتصال بالإنترنت', 'warning');
        });
        
        // النقر على الأوفرلاي
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    ui.closeEnlargedImage();
                }
            });
        }
    }
}

// ===== 7. نظام التسجيل الموحد المُبسط =====

// متغيرات النظام الموحد
let currentUser = null;
let notificationsRequested = false;

// تحميل بيانات المستخدم المحفوظة
function loadCurrentUser() {
    try {
        const userData = localStorage.getItem(CORE_CONFIG.STORAGE_KEYS.USER_DATA);
        if (userData) {
            currentUser = JSON.parse(userData);
            updateUserInterface(currentUser);
            
            const firstName = currentUser.name.split(' ')[0];
            setTimeout(() => {
                ui.showToast(`أهلاً بعودتك ${firstName} من ${currentUser.governorate} 👋`, 'success');
            }, 2000);
            
            console.log('👤 تم تحميل المستخدم:', currentUser.name);
        }
    } catch (error) {
        console.error('خطأ في تحميل المستخدم:', error);
        currentUser = null;
    }
}

// تحديث واجهة المستخدم
function updateUserInterface(user) {
    // تحديث رسالة الترحيب
    const welcomeDiv = document.getElementById('userWelcome');
    if (welcomeDiv && user) {
        const firstName = user.name.split(' ')[0];
        welcomeDiv.innerHTML = `مرحباً ${firstName} من ${user.governorate} 👋`;
        welcomeDiv.style.display = 'block';
    }
    
    // إظهار زر الملف الشخصي
    const profileBtn = document.getElementById('userProfileBtn');
    if (profileBtn) {
        profileBtn.style.display = 'flex';
    }
}

// إعداد نظام التسجيل
function setupUserRegistrationSystem() {
    const form = document.getElementById('userRegistrationForm');
    
    if (form && !form.hasAttribute('data-unified-handler')) {
        form.setAttribute('data-unified-handler', 'true');
        form.addEventListener('submit', handleUserRegistration);
        console.log('✅ تم إعداد نظام التسجيل الموحد');
    }
}

// معالجة نموذج التسجيل
async function handleUserRegistration(event) {
    event.preventDefault();
    
    console.log('🎯 بدء التسجيل الموحد...');
    
    // جمع البيانات من النموذج
    const formData = new FormData(event.target);
    const interests = Array.from(event.target.querySelectorAll('input[name="userInterests"]:checked'))
        .map(cb => cb.value);
    
    const userData = {
        name: formData.get('userName'),
        phone: formData.get('userPhone'),
        governorate: formData.get('userGovernorate'),
        address: formData.get('userAddress'),
        gender: formData.get('userGender') || '',
        interests: interests,
        notificationsEnabled: notificationsRequested
    };
    
    console.log('📊 البيانات المُجمعة:', userData);
    
    // التحقق من البيانات
    if (!validateUserData(userData)) {
        return;
    }
    
    console.log('✅ البيانات صحيحة، جاري الحفظ...');
    
    // حفظ البيانات
    const result = saveUserData(userData);
    
    if (result.success) {
        closeUserRegistrationModal();
        ui.showToast('🎉 مرحباً بك! تم تسجيلك بنجاح', 'success');
        updateUserInterface(result.user);
        
        // إرسال إشعار ترحيب
        if (userData.notificationsEnabled) {
            setTimeout(() => {
                sendWelcomeNotification(result.user);
            }, 2000);
        }
    } else {
        ui.showToast('❌ ' + result.error, 'error');
    }
}

// التحقق من صحة البيانات
function validateUserData(userData) {
    const name = (userData.name || '').trim();
    
    // التحقق من الاسم
    if (!name || name.length === 0) {
        ui.showToast('❌ يرجى إدخال الاسم', 'error');
        return false;
    }
    
    if (name.length < 2) {
        ui.showToast('❌ الاسم قصير جداً (حرفين على الأقل)', 'error');
        return false;
    }
    
    if (name.length > 40) {
        ui.showToast('❌ الاسم طويل جداً (40 حرف كحد أقصى)', 'error');
        return false;
    }
    
    // التحقق من الأحرف الصالحة (عربية/إنجليزية/مسافات/واصلات/نقاط)
    const nameRegex = /^[\u0600-\u06FF\u0750-\u077Fa-zA-Z\s\-\.]+$/;
    if (!nameRegex.test(name)) {
        ui.showToast('❌ الاسم يجب أن يحتوي على أحرف عربية أو إنجليزية فقط', 'error');
        return false;
    }
    
    // التحقق من رقم الهاتف العراقي
    const phone = (userData.phone || '').trim();
    if (!phone || !/^07[0-9]{9}$/.test(phone)) {
        ui.showToast('❌ رقم الهاتف غير صحيح. يجب أن يبدأ بـ 07 ويتكون من 11 رقم', 'error');
        return false;
    }
    
    // التحقق من المحافظة
    if (!userData.governorate || userData.governorate.trim() === '') {
        ui.showToast('❌ يرجى اختيار المحافظة', 'error');
        return false;
    }
    
    // التحقق من العنوان
    const address = (userData.address || '').trim();
    if (!address || address.length < 10) {
        ui.showToast('❌ يرجى إدخال عنوان تفصيلي (10 أحرف على الأقل)', 'error');
        return false;
    }
    
    if (address.length > 200) {
        ui.showToast('❌ العنوان طويل جداً (200 حرف كحد أقصى)', 'error');
        return false;
    }
    
    console.log('✅ تم التحقق من البيانات بنجاح');
    return true;
}

// حفظ بيانات المستخدم
function saveUserData(userData) {
    try {
        const user = {
            id: generateUserId(),
            name: userData.name.trim(),
            phone: userData.phone.trim(),
            governorate: userData.governorate,
            address: userData.address.trim(),
            gender: userData.gender,
            interests: userData.interests,
            notificationsEnabled: userData.notificationsEnabled,
            registrationDate: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            version: CORE_CONFIG.APP_VERSION
        };
        
        // حفظ محلياً
        localStorage.setItem(CORE_CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(user));
        currentUser = user;
        
        console.log('💾 تم حفظ المستخدم:', user);
        
        return { success: true, user: user };
        
    } catch (error) {
        console.error('خطأ في الحفظ:', error);
        return { success: false, error: 'فشل في حفظ البيانات' };
    }
}

// توليد معرف مستخدم فريد
function generateUserId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `SHIQ_USER_${timestamp}_${random}`;
}

// إدارة الإشعارات
function enableNotifications() {
    notificationsRequested = true;
    
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                ui.showToast('✅ تم تفعيل الإشعارات بنجاح', 'success');
            } else {
                ui.showToast('⚠️ لم يتم تفعيل الإشعارات', 'warning');
            }
        });
    } else {
        ui.showToast('⚠️ المتصفح لا يدعم الإشعارات', 'warning');
    }
}

function skipNotifications() {
    notificationsRequested = false;
    ui.showToast('ℹ️ يمكنك تفعيل الإشعارات لاحقاً', 'info');
}

// إرسال إشعار ترحيب
function sendWelcomeNotification(user) {
    if (Notification.permission === 'granted') {
        const firstName = user.name.split(' ')[0];
        
        const notification = new Notification(`🎉 مرحباً ${firstName}!`, {
            body: `أهلاً بك في شي ان العراق من ${user.governorate}`,
            icon: './icons/icon-192x192.png'
        });
        
        setTimeout(() => notification.close(), 5000);
    }
}

// إدارة النوافذ المنبثقة
function showUserRegistration() {
    if (currentUser) {
        ui.showToast('أنت مسجل بالفعل!', 'info');
        return;
    }
    
    const modal = document.getElementById('userRegistrationModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeUserRegistrationModal() {
    const modal = document.getElementById('userRegistrationModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ===== 8. تهيئة التطبيق =====
let cart, imageManager, ui, eventManager;

document.addEventListener('DOMContentLoaded', async function() {
    console.log(`🚀 ${CORE_CONFIG.APP_NAME} v${CORE_CONFIG.APP_VERSION} - بدء التحميل...`);
    
    try {
        // تهيئة المكونات الأساسية
        cart = new ShoppingCart();
        imageManager = new ImageManager();
        ui = new UIManager(cart, imageManager);
        eventManager = new EventManager();
        
        // تهيئة نظام التسجيل الموحد
        setTimeout(() => {
            setupUserRegistrationSystem();
            loadCurrentUser();
        }, 1000);
        
        // عرض الواجهة
        ui.createCategoryNavigation();
        await ui.renderCategories();
        
        // إخفاء صندوق البحث في البداية
        if (ui.searchBox) {
            ui.searchBox.style.display = 'none';
        }
        
        console.log(`✅ ${CORE_CONFIG.APP_NAME} v${CORE_CONFIG.APP_VERSION} - جاهز للاستخدام!`);
        
        // إضافة دوال للنافذة العامة للوصول إليها من HTML
        window.ui = ui;
        window.cart = cart;
        window.currentUser = currentUser;
        window.showUserRegistration = showUserRegistration;
        window.enableNotifications = enableNotifications;
        window.skipNotifications = skipNotifications;
        
    } catch (error) {
        console.error('❌ خطأ في تهيئة التطبيق:', error);
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; color: #ef4444;">
                <h2>❌ خطأ في تحميل التطبيق</h2>
                <p>${error.message}</p>
                <button onclick="location.reload()" style="padding: 10px 20px; background: #8B5CF6; color: white; border: none; border-radius: 10px; cursor: pointer;">🔄 إعادة المحاولة</button>
            </div>
        `;
    }
});

// ===== 9. دوال مساعدة للاستخدام العام =====
function openCart() {
    ui.openCart();
}

function enlargeImage(src) {
    ui.enlargeImage(src);
}

function closeEnlargedImage() {
    ui.closeEnlargedImage();
}

function addToCart(code, name, price, imageUrl, size = '') {
    ui.addToCart(code, name, price, imageUrl, size);
}

function searchProduct() {
    ui.searchProducts();
}

function openUserProfile() {
    if (!currentUser) {
        showUserRegistration();
        return;
    }
    ui.showToast('🎉 الملف الشخصي قيد التطوير!', 'info');
}

// ===== 10. CSS Animations =====
if (!document.querySelector('#core-animations')) {
    const style = document.createElement('style');
    style.id = 'core-animations';
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .loading::after {
            content: '';
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 20px auto;
            display: block;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

console.log('📦 تم تحميل النظام الموحد بنجاح - Unified System Ready!');

// ===== نهاية الملف =====
