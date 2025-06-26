// ========================================================================
// SHIQ E-COMMERCE APPLICATION - UNIFIED SYSTEM v3.1
// التطبيق الموحد للتسوق الإلكتروني - النظام المُحسن
// ========================================================================
// المطور: فريق SHIQ Development
// التاريخ: 2025-01-27
// الإصدار: 3.1.0 Professional Unified
// الوصف: النظام الموحد مع إزالة الازدواجية
// ========================================================================

// ===== 1. الإعدادات الموحدة =====
const SHIQ_CONFIG = {
    // معلومات التطبيق
    APP_NAME: 'SHIQ - شي ان العراق',
    APP_VERSION: '3.1.0',
    APP_URL: 'https://peacepanel.github.io/shein-baghdad/',
    
    // إعدادات Google Sheets API
    GOOGLE_API_KEY: 'AIzaSyATs-nWgTonTFEKCi_4F5lQ_Ao0vnJ5Xmk',
    
    // إعدادات النظام المتقدم
    WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbzc9ojokNkOcmtINeXR9ijzc5HCfq5Ljgcp_4WIpW5JLGSnJryRvnyZqH8EEwB7tbHk/exec',
    MAIN_SHEET_ID: '1ap6gkoczUsqvf0KMoxXroo2uP_wycDGxyg6r-UPFgBQ',
    
    // إعدادات التجارة الإلكترونية
    ECOMMERCE: {
        FREE_DELIVERY_THRESHOLD: 50000,
        DELIVERY_FEE: 5000,
        CURRENCY: 'د.ع',
        WHATSAPP_NUMBER: '9647862799748',
        PHONE_NUMBER: '07862799748'
    },
    
    // إعدادات التخزين
    STORAGE_KEYS: {
        CART_DATA: 'shiq_cart_v3',
        USER_DATA: 'shiq_user_data_v3',
        DEVICE_ID: 'shiq_device_id_v3',
        CATEGORY_IMAGES: 'shiq_category_images_v3',
        NOTIFICATIONS_STATUS: 'shiq_notifications_status_v3',
        ANALYTICS_DATA: 'shiq_analytics_v3'
    },
    
    // إعدادات الأداء
    PERFORMANCE: {
        IMAGE_CACHE_DURATION: 24 * 60 * 60 * 1000,
        API_TIMEOUT: 10000,
        RETRY_ATTEMPTS: 3
    },
    
    // إعدادات الإشعارات
    NOTIFICATIONS: {
        ENABLED: true,
        DEFAULT_ICON: './icons/icon-192x192.png',
        PERMISSION_TIMEOUT: 5000
    },
    
    // المحافظات العراقية
    GOVERNORATES: [
        'بغداد', 'البصرة', 'نينوى', 'أربيل', 'النجف', 'كربلاء',
        'بابل', 'الأنبار', 'ذي قار', 'القادسية', 'كركوك', 'واسط',
        'صلاح الدين', 'المثنى', 'ديالى', 'ميسان', 'دهوك', 'السليمانية'
    ],
    
    // فئات الاهتمامات
    INTERESTS: [
        'اكسسوارات نسائية', 'احذية وحقائب', 'ملابس نسائية', 'ملابس اطفال',
        'مستلزمات منزلية', 'مستلزمات موبايل', 'مكياج وعناية', 'مفروشات'
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

// ===== 3. نظام إدارة السلة المُحسن =====
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
        
        // تتبع إضافة المنتج للسلة
        if (window.analyticsManager) {
            window.analyticsManager.trackAddToCart(product.name, product.price, product.category);
        }
        
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
        return subtotal >= SHIQ_CONFIG.ECOMMERCE.FREE_DELIVERY_THRESHOLD ? 0 : SHIQ_CONFIG.ECOMMERCE.DELIVERY_FEE;
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
                version: SHIQ_CONFIG.APP_VERSION
            };
            localStorage.setItem(SHIQ_CONFIG.STORAGE_KEYS.CART_DATA, JSON.stringify(cartData));
        } catch (error) {
            console.error('خطأ في حفظ السلة:', error);
        }
    }
    
    loadFromStorage() {
        try {
            const cartData = localStorage.getItem(SHIQ_CONFIG.STORAGE_KEYS.CART_DATA);
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
                    <span style="font-size: 0.9em; opacity: 0.9;">${totalPrice.toLocaleString()} ${SHIQ_CONFIG.ECOMMERCE.CURRENCY}</span>
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

// ===== 4. نظام إدارة المستخدمين الموحد =====
class UserManager {
    constructor() {
        this.currentUser = null;
        this.deviceId = null;
        this.initialize();
    }
    
    async initialize() {
        this.deviceId = this.getOrCreateDeviceId();
        this.currentUser = this.loadUserData();
        
        if (this.currentUser) {
            this.updateLastActivity();
            this.showWelcomeBack();
            this.updateUI();
        }
        
        console.log('👤 نظام إدارة المستخدمين جاهز');
    }
    
    getOrCreateDeviceId() {
        let deviceId = localStorage.getItem(SHIQ_CONFIG.STORAGE_KEYS.DEVICE_ID);
        
        if (!deviceId) {
            deviceId = this.generateDeviceId();
            localStorage.setItem(SHIQ_CONFIG.STORAGE_KEYS.DEVICE_ID, deviceId);
        }
        
        return deviceId;
    }
    
    generateDeviceId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        const fingerprint = this.createFingerprint();
        return `SHIQ_DEVICE_${timestamp}_${fingerprint}_${random}`;
    }
    
    createFingerprint() {
        const data = [
            navigator.userAgent,
            navigator.language,
            screen.width,
            screen.height,
            new Date().getTimezoneOffset()
        ].join('|');
        
        return btoa(data).slice(0, 8);
    }
    
    loadUserData() {
        try {
            const userData = localStorage.getItem(SHIQ_CONFIG.STORAGE_KEYS.USER_DATA);
            if (userData) {
                const user = JSON.parse(userData);
                return this.validateUserData(user) ? user : null;
            }
        } catch (error) {
            console.error('خطأ في تحميل بيانات المستخدم:', error);
        }
        return null;
    }
    
    validateUserData(user) {
        const required = ['id', 'name', 'phone', 'governorate'];
        return required.every(field => user[field]);
    }
    
    async saveUserData(userData) {
        try {
            const user = {
                id: userData.id || this.generateUserId(),
                name: userData.name.trim(),
                phone: userData.phone.trim(),
                governorate: userData.governorate,
                address: userData.address?.trim() || '',
                gender: userData.gender || '',
                interests: Array.isArray(userData.interests) ? userData.interests : [],
                notificationsEnabled: userData.notificationsEnabled || false,
                registrationDate: userData.registrationDate || new Date().toISOString(),
                lastActive: new Date().toISOString(),
                version: SHIQ_CONFIG.APP_VERSION,
                deviceId: this.deviceId
            };
            
            if (!this.validateUserData(user)) {
                throw new Error('بيانات المستخدم غير مكتملة');
            }
            
            // حفظ محلياً
            localStorage.setItem(SHIQ_CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(user));
            this.currentUser = user;
            
            // إرسال للخادم
            const result = await this.sendToBackend('save_user', { userData: user });
            
            if (result.success) {
                console.log('✅ تم حفظ بيانات المستخدم');
                
                // تفعيل الإشعارات إذا طُلب ذلك
                if (user.notificationsEnabled && window.notificationManager) {
                    await window.notificationManager.subscribeUser(user);
                }
                
                // تتبع التسجيل
                if (window.analyticsManager) {
                    window.analyticsManager.trackUserRegistration(user);
                }
                
                this.updateUI();
                
                return { success: true, user: user };
            } else {
                throw new Error(result.error || 'فشل في حفظ البيانات');
            }
            
        } catch (error) {
            console.error('خطأ في حفظ بيانات المستخدم:', error);
            return { success: false, error: error.message };
        }
    }
    
    generateUserId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return `SHIQ_USER_${timestamp}_${random}`;
    }
    
    updateLastActivity() {
        if (this.currentUser) {
            this.currentUser.lastActive = new Date().toISOString();
            localStorage.setItem(SHIQ_CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(this.currentUser));
        }
    }
    
    showWelcomeBack() {
        if (this.currentUser) {
            const firstName = this.currentUser.name.split(' ')[0];
            const welcomeMessage = `أهلاً بعودتك ${firstName} من ${this.currentUser.governorate} 👋`;
            
            setTimeout(() => {
                this.showToast(welcomeMessage, 'success');
            }, 1000);
        }
    }
    
    updateUI() {
        const welcomeDiv = document.getElementById('userWelcome');
        const profileBtn = document.getElementById('userProfileBtn');
        
        if (this.currentUser && welcomeDiv) {
            const firstName = this.currentUser.name.split(' ')[0];
            welcomeDiv.innerHTML = `مرحباً ${firstName} من ${this.currentUser.governorate} 👋`;
            welcomeDiv.style.display = 'inline-block';
        }
        
        if (profileBtn) {
            profileBtn.classList.add('show');
        }
    }
    
    showRegistrationForm() {
        const modal = this.createRegistrationModal();
        document.body.appendChild(modal);
        modal.classList.add('show');
    }
    
    createRegistrationModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'unified-user-registration';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🙋‍♀️ مرحباً بك في شي ان العراق</h2>
                    <p>نحتاج بعض المعلومات لتحسين تجربة التسوق</p>
                    <button type="button" class="close-modal-btn" onclick="this.closest('.modal').remove()" style="position: absolute; top: 15px; left: 15px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">×</button>
                </div>
                
                <form id="unified-registration-form">
                    <div class="form-group">
                        <label for="userName">الاسم الكامل *</label>
                        <input type="text" id="userName" class="form-control" placeholder="مثال: أحمد محمد" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="userPhone">رقم الهاتف *</label>
                        <input type="tel" id="userPhone" class="form-control" placeholder="مثال: 07901234567" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="userGovernorate">المحافظة *</label>
                        <select id="userGovernorate" class="form-control" required>
                            <option value="">اختر المحافظة</option>
                            ${SHIQ_CONFIG.GOVERNORATES.map(gov => `<option value="${gov}">${gov}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="userAddress">العنوان التفصيلي *</label>
                        <textarea id="userAddress" class="form-control" rows="3" placeholder="مثال: حي الجامعة، شارع الكندي، بناية رقم 15" required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="userGender">الجنس</label>
                        <select id="userGender" class="form-control">
                            <option value="">اختياري</option>
                            <option value="female">أنثى</option>
                            <option value="male">ذكر</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>الاهتمامات (اختر ما يناسبك)</label>
                        <div class="interests-grid">
                            ${SHIQ_CONFIG.INTERESTS.map(interest => `
                                <label class="interest-item">
                                    <input type="checkbox" value="${interest}">
                                    <span>${interest}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="notification-permission">
                        <h4>🔔 هل تريد تلقي إشعارات العروض الخاصة؟</h4>
                        <p>ستصلك إشعارات بأحدث المنتجات والخصومات</p>
                        <div class="notification-buttons">
                            <button type="button" onclick="userManager.enableNotifications()" class="btn-notification-yes">
                                نعم، أريد الإشعارات
                            </button>
                            <button type="button" onclick="userManager.skipNotifications()" class="btn-notification-no">
                                ليس الآن
                            </button>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">
                        💾 حفظ البيانات والمتابعة
                    </button>
                </form>
            </div>
        `;
        
        // إضافة أنماط التصميم
        this.addModalStyles();
        
        // إضافة الأحداث
        const form = modal.querySelector('#unified-registration-form');
        form.addEventListener('submit', (e) => this.handleRegistrationSubmit(e));
        
        return modal;
    }
    
    addModalStyles() {
        if (document.querySelector('#unified-modal-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'unified-modal-styles';
        style.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 3000;
                backdrop-filter: blur(5px);
            }
            
            .modal.show {
                display: flex;
            }
            
            .modal-content {
                background: white;
                border-radius: 20px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                max-height: 85vh;
                overflow-y: auto;
                animation: modalSlideIn 0.3s ease;
                position: relative;
            }
            
            @keyframes modalSlideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .modal-header {
                text-align: center;
                margin-bottom: 25px;
            }
            
            .modal-header h2 {
                color: #8B5CF6;
                font-size: 1.8rem;
                margin-bottom: 10px;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: #374151;
            }
            
            .form-control {
                width: 100%;
                padding: 12px 15px;
                border: 2px solid #E5E7EB;
                border-radius: 10px;
                font-size: 1rem;
                transition: all 0.3s ease;
                font-family: inherit;
            }
            
            .form-control:focus {
                outline: none;
                border-color: #8B5CF6;
                box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
            }
            
            .interests-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 10px;
                margin-top: 10px;
            }
            
            .interest-item {
                display: flex;
                align-items: center;
                font-weight: normal;
                cursor: pointer;
                padding: 5px;
                border-radius: 5px;
                transition: background 0.2s;
            }
            
            .interest-item:hover {
                background: #f3f4f6;
            }
            
            .interest-item input {
                margin-left: 8px;
            }
            
            .notification-permission {
                background: linear-gradient(135deg, #10B981 0%, #059669 100%);
                color: white;
                padding: 20px;
                border-radius: 15px;
                margin: 20px 0;
                text-align: center;
            }
            
            .notification-buttons {
                display: flex;
                gap: 10px;
                justify-content: center;
                margin-top: 15px;
            }
            
            .btn-notification-yes {
                background: white;
                color: #10B981;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .btn-notification-no {
                background: transparent;
                color: white;
                border: 2px solid white;
                padding: 10px 20px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .btn {
                background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%);
                color: white;
                border: none;
                padding: 15px 25px;
                border-radius: 10px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                width: 100%;
                margin-top: 10px;
            }
            
            .btn:hover {
                background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%);
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    padding: 20px;
                }
                
                .interests-grid {
                    grid-template-columns: 1fr;
                }
                
                .notification-buttons {
                    flex-direction: column;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    async handleRegistrationSubmit(event) {
        event.preventDefault();
        
        // الحصول على القيم مباشرة من العناصر بدلاً من FormData
        const interests = Array.from(event.target.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.value);
        
        const userData = {
            name: document.getElementById('userName').value.trim(),
            phone: document.getElementById('userPhone').value.trim(),
            governorate: document.getElementById('userGovernorate').value,
            address: document.getElementById('userAddress').value.trim(),
            gender: document.getElementById('userGender').value,
            interests: interests,
            notificationsEnabled: this.notificationsRequested || false
        };
        
        // التحقق من البيانات
        if (!this.validateFormData(userData)) {
            return;
        }
        
        // حفظ البيانات
        const result = await this.saveUserData(userData);
        
        if (result.success) {
            this.closeRegistrationModal();
            this.showToast('🎉 مرحباً بك! تم تسجيلك بنجاح', 'success');
            
            // إرسال إشعار ترحيب إذا كانت الإشعارات مفعلة
            if (userData.notificationsEnabled && window.notificationManager) {
                setTimeout(() => {
                    window.notificationManager.sendWelcomeNotification(result.user);
                }, 2000);
            }
        } else {
            this.showToast('❌ ' + result.error, 'error');
        }
    }
    
    validateFormData(userData) {
        const name = (userData.name || '').trim();

        if (name.length === 0 || name.length > 40) {
            this.showToast('❌ يرجى إدخال اسم صحيح (حتى 40 حرفًا)', 'error');
            return false;
        }

        if (!userData.phone || !/^07[0-9]{9}$/.test(userData.phone)) {
            this.showToast('❌ رقم الهاتف غير صحيح. يجب أن يبدأ بـ 07 ويتكون من 11 رقم', 'error');
            return false;
        }

        if (!userData.governorate) {
            this.showToast('❌ يرجى اختيار المحافظة', 'error');
            return false;
        }

        if (!userData.address || userData.address.length < 10) {
            this.showToast('❌ يرجى إدخال عنوان تفصيلي', 'error');
            return false;
        }

        return true;
    }
    
    async enableNotifications() {
        this.notificationsRequested = true;
        if (window.notificationManager) {
            const result = await window.notificationManager.requestPermission();
            
            if (result) {
                this.showToast('✅ تم تفعيل الإشعارات بنجاح', 'success');
            } else {
                this.showToast('⚠️ لم يتم تفعيل الإشعارات', 'warning');
            }
        }
    }
    
    skipNotifications() {
        this.notificationsRequested = false;
        this.showToast('ℹ️ يمكنك تفعيل الإشعارات لاحقاً من الإعدادات', 'info');
    }
    
    closeRegistrationModal() {
        const modal = document.getElementById('unified-user-registration');
        if (modal) {
            modal.remove();
        }
    }
    
    showToast(message, type = 'info') {
        // استخدام نظام التنبيهات الموحد
        if (window.ui && window.ui.showToast) {
            window.ui.showToast(message, type);
            return;
        }
        
        // نظام تنبيهات مستقل
        const toast = document.createElement('div');
        const colors = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6'
        };
        
        toast.style.cssText = `
            position: fixed; top: 20px; right: 20px; background: ${colors[type]};
            color: white; padding: 15px 20px; border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 10001;
            font-weight: 600; max-width: 350px; font-family: 'Segoe UI', sans-serif;
        `;
        
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 4000);
    }
    
    async sendToBackend(action, data) {
        try {
            const payload = {
                action: action,
                ...data,
                timestamp: new Date().toISOString(),
                deviceId: this.deviceId
            };
            
            const response = await fetch(SHIQ_CONFIG.WEB_APP_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            return await response.json();
        } catch (error) {
            console.error('خطأ في الاتصال بالخادم:', error);
            return { success: false, error: error.message };
        }
    }
}

// ===== 5. نظام إدارة الصور المُحسن =====
class ImageManager {
    constructor() {
        this.cache = {};
        this.loadCache();
    }
    
    async getCategoryImage(categoryName, categoryConfig) {
        if (this.cache[categoryName] && this.isCacheValid(categoryName)) {
            return this.cache[categoryName].url;
        }
        
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
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${SHIQ_CONFIG.GOOGLE_API_KEY}`;
        
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
    
    async fetchWithRetry(url, retries = SHIQ_CONFIG.PERFORMANCE.RETRY_ATTEMPTS) {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, {
                    timeout: SHIQ_CONFIG.PERFORMANCE.API_TIMEOUT
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
                await this.delay(1000 * (i + 1));
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
        return colLetter.charCodeAt(0) - 65;
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
        return age < SHIQ_CONFIG.PERFORMANCE.IMAGE_CACHE_DURATION;
    }
    
    loadCache() {
        try {
            const cached = localStorage.getItem(SHIQ_CONFIG.STORAGE_KEYS.CATEGORY_IMAGES);
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
                version: SHIQ_CONFIG.APP_VERSION
            };
            localStorage.setItem(SHIQ_CONFIG.STORAGE_KEYS.CATEGORY_IMAGES, JSON.stringify(cacheData));
        } catch (error) {
            console.error('خطأ في حفظ كاش الصور:', error);
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ===== 6. واجهة المستخدم الموحدة =====
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
        
        const defaultImage = this.getDefaultCategoryImage();
        
        categoryDiv.innerHTML = `
            <img src="${defaultImage}" alt="${categoryName}" loading="lazy" onerror="this.src='${defaultImage}'">
            <div class="category-name">${config.icon} ${categoryName}</div>
        `;
        
        this.loadCategoryImageAsync(categoryName, config, categoryDiv);
        
        categoryDiv.onclick = () => {
            this.selectCategory(categoryName, config);
            if (window.analyticsManager) {
                window.analyticsManager.trackCategorySelection(categoryName);
            }
        };
        
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
                if (window.analyticsManager) {
                    window.analyticsManager.trackCategorySelection(categoryName);
                }
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
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.sheetId}/values/${range}?key=${SHIQ_CONFIG.GOOGLE_API_KEY}`;
        
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
                product.category = this.currentCategory; // إضافة الفئة للمنتج
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
                    ${parseInt(product.price || 0).toLocaleString()} ${SHIQ_CONFIG.ECOMMERCE.CURRENCY}
                </div>
                ${product.size ? `
                    <div class="product-size">
                        <span class="size-icon">📏</span>
                        المقاس: ${product.size}
                    </div>
                ` : ''}
                <button class="add-to-cart-btn ${isInCart ? 'selected' : ''}" 
                        data-product-code="${product.code}"
                        onclick="ui.addToCart('${product.code}', '${product.name}', '${product.price}', '${product.imageUrl}', '${product.size || ''}', '${product.category || ''}')">
                    ${isInCart ? '✅ في السلة' : '🛒 أضف للسلة'}
                </button>
            </div>
        `;
        
        return productDiv;
    }
    
    addToCart(code, name, price, imageUrl, size, category) {
        const success = this.cart.addItem({
            code, name, price, imageUrl, size, category
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
        
        // التحقق من وجود بيانات المستخدم
        if (window.userManager && !window.userManager.currentUser) {
            this.showToast('📝 يرجى تسجيل بياناتك أولاً لإكمال الطلب', 'info');
            setTimeout(() => {
                window.userManager.showRegistrationForm();
            }, 500);
            return;
        }
        
        this.createCartWindow();
    }
    
    createCartWindow() {
        const subtotal = this.cart.getTotalPrice();
        const deliveryFee = this.cart.getDeliveryFee();
        const total = this.cart.getFinalTotal();
        const user = window.userManager?.currentUser;
        
        let itemsHtml = '';
        this.cart.items.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            itemsHtml += `
                <div class="cart-item" style="display: flex; align-items: center; padding: 15px; border: 2px solid #e5e7eb; margin: 10px 0; border-radius: 15px; background: #f9fafb;">
                    <img src="${item.imageUrl}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px; margin-left: 15px;">
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 5px 0; color: #1f2937;">${item.name}</h4>
                        <p style="margin: 0; color: #ef4444; font-weight: bold;">${item.price.toLocaleString()} ${SHIQ_CONFIG.ECOMMERCE.CURRENCY} × ${item.quantity}</p>
                        <p style="margin: 5px 0 0 0; color: #059669; font-weight: bold;">المجموع: ${itemTotal.toLocaleString()} ${SHIQ_CONFIG.ECOMMERCE.CURRENCY}</p>
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
                <title>🛒 مراجعة السلة - ${SHIQ_CONFIG.APP_NAME}</title>
                <style>
                    body { font-family: 'Segoe UI', sans-serif; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); direction: rtl; margin: 0; min-height: 100vh; }
                    .container { background: white; border-radius: 20px; padding: 25px; max-width: 900px; margin: 0 auto; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
                    h1 { text-align: center; color: #1f2937; margin-bottom: 30px; font-size: 2rem; }
                    .user-info { background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%); color: white; padding: 15px; border-radius: 15px; margin-bottom: 20px; }
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
                    <h1>🛒 مراجعة السلة - ${SHIQ_CONFIG.APP_NAME}</h1>
                    
                    ${user ? `
                        <div class="user-info">
                            <h3>👤 معلومات العميل</h3>
                            <p><strong>الاسم:</strong> ${user.name}</p>
                            <p><strong>الهاتف:</strong> ${user.phone}</p>
                            <p><strong>المحافظة:</strong> ${user.governorate}</p>
                            <p><strong>العنوان:</strong> ${user.address}</p>
                        </div>
                    ` : ''}
                    
                    <div style="margin: 20px 0;">
                        <h3>📦 المنتجات المطلوبة (${this.cart.items.length} منتج)</h3>
                        ${itemsHtml}
                    </div>
                    
                    <div class="summary">
                        <h3 style="color: #8B5CF6; margin-bottom: 15px;">📊 ملخص الطلب</h3>
                        <div class="summary-row">
                            <span>المجموع الفرعي:</span>
                            <span>${subtotal.toLocaleString()} ${SHIQ_CONFIG.ECOMMERCE.CURRENCY}</span>
                        </div>
                        <div class="summary-row">
                            <span>رسوم التوصيل:</span>
                            <span>${deliveryFee === 0 ? 'مجاني 🎉' : deliveryFee.toLocaleString() + ' ' + SHIQ_CONFIG.ECOMMERCE.CURRENCY}</span>
                        </div>
                        ${deliveryFee === 0 
                            ? '<div class="free-delivery-note">🎉 تم تفعيل التوصيل المجاني!</div>' 
                            : `<div class="delivery-note">💡 أضف ${(SHIQ_CONFIG.ECOMMERCE.FREE_DELIVERY_THRESHOLD - subtotal).toLocaleString()} ${SHIQ_CONFIG.ECOMMERCE.CURRENCY} للحصول على توصيل مجاني!</div>`
                        }
                        <div class="summary-row total-row">
                            <span>المجموع الكلي:</span>
                            <span>${total.toLocaleString()} ${SHIQ_CONFIG.ECOMMERCE.CURRENCY}</span>
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
                        const whatsappUrl = 'https://api.whatsapp.com/send?phone=${SHIQ_CONFIG.ECOMMERCE.WHATSAPP_NUMBER}&text=' + encodeURIComponent(message);
                        window.open(whatsappUrl, '_blank');
                        window.close();
                    }
                    
                    function createWhatsAppMessage() {
                        let message = '🛍️ طلب جديد من ${SHIQ_CONFIG.APP_NAME}\\n\\n';
                        
                        ${user ? `
                            message += '👤 معلومات العميل:\\n';
                            message += '📛 الاسم: ${user.name}\\n';
                            message += '📞 الهاتف: ${user.phone}\\n';
                            message += '🏠 المحافظة: ${user.governorate}\\n';
                            message += '📍 العنوان: ${user.address}\\n\\n';
                        ` : ''}
                        
                        message += '📦 المنتجات المطلوبة:\\n';
                        
                        const items = ${JSON.stringify(this.cart.items)};
                        items.forEach((item, index) => {
                            message += '\\n' + (index + 1) + '. ' + item.name;
                            message += '\\n   💰 السعر: ' + item.price.toLocaleString() + ' ${SHIQ_CONFIG.ECOMMERCE.CURRENCY}';
                            message += '\\n   📦 الكمية: ' + item.quantity;
                            if (item.size) message += '\\n   📏 المقاس: ' + item.size;
                            message += '\\n   🖼️ رابط الصورة: ' + item.imageUrl;
                            message += '\\n   💵 المجموع الفرعي: ' + (item.price * item.quantity).toLocaleString() + ' ${SHIQ_CONFIG.ECOMMERCE.CURRENCY}';
                            message += '\\n';
                        });
                        
                        message += '\\n📊 ملخص الطلب:\\n';
                        message += '💰 المجموع الفرعي: ${subtotal.toLocaleString()} ${SHIQ_CONFIG.ECOMMERCE.CURRENCY}\\n';
                        message += '🚚 رسوم التوصيل: ${deliveryFee === 0 ? 'مجاني 🎉' : deliveryFee.toLocaleString() + ' ' + SHIQ_CONFIG.ECOMMERCE.CURRENCY}\\n';
                        message += '💵 المجموع الكلي: ${total.toLocaleString()} ${SHIQ_CONFIG.ECOMMERCE.CURRENCY}\\n\\n';
                        message += '📞 للتواصل: ${SHIQ_CONFIG.ECOMMERCE.PHONE_NUMBER}\\n';
                        message += '🌐 الموقع: ${SHIQ_CONFIG.APP_URL}';
                        
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
        
        // تتبع البحث
        if (window.analyticsManager && query) {
            window.analyticsManager.trackSearch(query, this.currentCategory);
        }
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
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiPvCfm43vuI88L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiPtin2YjYrdipINmB2YPYqTwvdGV4dD48L3N2Zz4=';
    }
    
    getDefaultProductImage() {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij7YtdmI2LHYqSDYrdin2YTZiNeKPC90ZXh0Pjwvc3ZnPg==';
    }
}

// ===== 7. نظام الإشعارات =====
class NotificationManager {
    constructor() {
        this.permission = Notification.permission;
        this.initialize();
    }
    
    async initialize() {
        if (this.permission === 'default') {
            setTimeout(() => {
                this.requestPermissionAutomatically();
            }, 3000);
        }
        
        console.log('🔔 نظام الإشعارات جاهز - الحالة:', this.permission);
    }
    
    async requestPermissionAutomatically() {
        try {
            const permission = await Notification.requestPermission();
            this.permission = permission;
            
            localStorage.setItem(SHIQ_CONFIG.STORAGE_KEYS.NOTIFICATIONS_STATUS, permission);
            
            if (permission === 'granted') {
                console.log('✅ تم تفعيل الإشعارات تلقائياً');
                setTimeout(() => {
                    this.showWelcomeNotification();
                }, 1000);
            }
            
            return permission === 'granted';
        } catch (error) {
            console.error('خطأ في طلب إذن الإشعارات:', error);
            return false;
        }
    }
    
    async requestPermission() {
        if (this.permission === 'granted') {
            return true;
        }
        
        try {
            const permission = await Notification.requestPermission();
            this.permission = permission;
            
            localStorage.setItem(SHIQ_CONFIG.STORAGE_KEYS.NOTIFICATIONS_STATUS, permission);
            
            return permission === 'granted';
        } catch (error) {
            console.error('خطأ في طلب الإذن:', error);
            return false;
        }
    }
    
    showWelcomeNotification() {
        this.showNotification('🎉 مرحباً بك في شي ان العراق!', {
            body: 'ستصلك أحدث العروض والمنتجات الجديدة',
            icon: SHIQ_CONFIG.NOTIFICATIONS.DEFAULT_ICON,
            tag: 'welcome-auto',
            requireInteraction: false
        });
    }
    
    async sendWelcomeNotification(userData) {
        const firstName = userData.name.split(' ')[0];
        
        this.showNotification(`🎉 مرحباً ${firstName}!`, {
            body: `أهلاً بك في شي ان العراق من ${userData.governorate}`,
            icon: SHIQ_CONFIG.NOTIFICATIONS.DEFAULT_ICON,
            tag: 'welcome-user',
            requireInteraction: false
        });
    }
    
    showNotification(title, options = {}) {
        if (this.permission !== 'granted') {
            console.warn('الإشعارات غير مفعلة');
            return;
        }
        
        const defaultOptions = {
            body: '',
            icon: SHIQ_CONFIG.NOTIFICATIONS.DEFAULT_ICON,
            badge: SHIQ_CONFIG.NOTIFICATIONS.DEFAULT_ICON,
            vibrate: [200, 100, 200],
            requireInteraction: false,
            silent: false,
            tag: 'shiq-notification',
            data: {
                timestamp: Date.now(),
                url: window.location.href
            }
        };
        
        const finalOptions = { ...defaultOptions, ...options };
        
        try {
            const notification = new Notification(title, finalOptions);
            
            notification.onclick = () => {
                window.focus();
                notification.close();
                
                if (window.analyticsManager) {
                    window.analyticsManager.trackNotificationClick(title, finalOptions.tag);
                }
            };
            
            setTimeout(() => {
                notification.close();
            }, 10000);
            
            return notification;
        } catch (error) {
            console.error('خطأ في إظهار الإشعار:', error);
        }
    }
    
    async subscribeUser(userData) {
        if (this.permission !== 'granted') {
            console.warn('الإشعارات غير مفعلة');
            return false;
        }
        
        try {
            const subscriptionData = {
                userId: userData.id,
                name: userData.name,
                phone: userData.phone,
                governorate: userData.governorate,
                interests: userData.interests,
                subscriptionType: 'general',
                notificationTiming: 'all_times',
                subscriptionDate: new Date().toISOString(),
                deviceId: window.userManager?.deviceId
            };
            
            const result = await this.sendToBackend('subscribe_user', { subscriptionData });
            
            if (result.success) {
                console.log('✅ تم اشتراك المستخدم في الإشعارات');
                return true;
            } else {
                console.error('فشل في اشتراك المستخدم:', result.error);
                return false;
            }
        } catch (error) {
            console.error('خطأ في اشتراك المستخدم:', error);
            return false;
        }
    }
    
    async sendToBackend(action, data) {
        try {
            const payload = {
                action: action,
                ...data,
                timestamp: new Date().toISOString()
            };
            
            const response = await fetch(SHIQ_CONFIG.WEB_APP_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            return await response.json();
        } catch (error) {
            console.error('خطأ في الاتصال بالخادم:', error);
            return { success: false, error: error.message };
        }
    }
}

// ===== 8. نظام التحليلات =====
class AnalyticsManager {
    constructor() {
        this.events = [];
        this.sessionId = this.generateSessionId();
        this.initialize();
    }
    
    initialize() {
        this.trackPageView();
        this.setupAutoTracking();
        console.log('📊 نظام التحليلات جاهز');
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    trackPageView() {
        this.trackEvent('page_view', {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        });
    }
    
    trackUserRegistration(userData) {
        this.trackEvent('user_registered', {
            userId: userData.id,
            governorate: userData.governorate,
            interests: userData.interests,
            notificationsEnabled: userData.notificationsEnabled,
            registrationMethod: 'manual'
        });
    }
    
    trackCategorySelection(categoryName) {
        this.trackEvent('category_selected', {
            categoryName: categoryName,
            timestamp: new Date().toISOString()
        });
    }
    
    trackProductView(productName, categoryName) {
        this.trackEvent('product_viewed', {
            productName: productName,
            categoryName: categoryName,
            timestamp: new Date().toISOString()
        });
    }
    
    trackAddToCart(productName, price, categoryName) {
        this.trackEvent('add_to_cart', {
            productName: productName,
            price: price,
            categoryName: categoryName,
            timestamp: new Date().toISOString()
        });
    }
    
    trackOrderCreated(orderData) {
        this.trackEvent('order_created', {
            orderId: orderData.orderId,
            totalAmount: orderData.total,
            itemsCount: orderData.products?.length || 0,
            governorate: orderData.governorate,
            timestamp: new Date().toISOString()
        });
    }
    
    trackNotificationClick(title, tag) {
        this.trackEvent('notification_clicked', {
            title: title,
            tag: tag,
            timestamp: new Date().toISOString()
        });
    }
    
    trackSearch(query, category) {
        this.trackEvent('search_performed', {
            query: query,
            category: category,
            timestamp: new Date().toISOString()
        });
    }
    
    trackEvent(eventType, eventData) {
        const event = {
            id: 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            sessionId: this.sessionId,
            eventType: eventType,
            eventData: eventData,
            userId: window.userManager?.currentUser?.id || null,
            deviceId: window.userManager?.deviceId,
            timestamp: new Date().toISOString(),
            url: window.location.href
        };
        
        this.events.push(event);
        this.sendEventToBackend(event);
        this.saveEventsLocally();
        
        console.log('📈 تم تتبع الحدث:', eventType, eventData);
    }
    
    async sendEventToBackend(event) {
        try {
            await fetch(SHIQ_CONFIG.WEB_APP_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'track_event',
                    eventData: event
                })
            });
        } catch (error) {
            console.warn('لم يتم إرسال الحدث للخادم:', error);
        }
    }
    
    saveEventsLocally() {
        try {
            if (this.events.length > 100) {
                this.events = this.events.slice(-100);
            }
            
            localStorage.setItem(SHIQ_CONFIG.STORAGE_KEYS.ANALYTICS_DATA, JSON.stringify({
                events: this.events,
                sessionId: this.sessionId,
                lastUpdated: new Date().toISOString()
            }));
        } catch (error) {
            console.warn('لم يتم حفظ الأحداث محلياً:', error);
        }
    }
    
    setupAutoTracking() {
        window.addEventListener('error', (e) => {
            this.trackEvent('javascript_error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno
            });
        });
        
        window.addEventListener('online', () => {
            this.trackEvent('network_status', { status: 'online' });
        });
        
        window.addEventListener('offline', () => {
            this.trackEvent('network_status', { status: 'offline' });
        });
        
        window.addEventListener('beforeunload', () => {
            this.trackEvent('page_unload', {
                sessionDuration: Date.now() - this.sessionStart,
                eventsCount: this.events.length
            });
        });
        
        this.sessionStart = Date.now();
    }
}

// ===== 9. نظام إدارة الأحداث =====
class EventManager {
    constructor() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                ui.closeEnlargedImage();
            }
        });
        
        const searchBox = document.getElementById('searchBox');
        if (searchBox) {
            searchBox.addEventListener('input', () => ui.searchProducts());
        }
        
        window.addEventListener('online', () => {
            ui.showToast('🌐 تم استعادة الاتصال بالإنترنت', 'success');
        });
        
        window.addEventListener('offline', () => {
            ui.showToast('📡 انقطع الاتصال بالإنترنت', 'warning');
        });
        
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

// ===== 10. تهيئة التطبيق الموحد =====
let cart, imageManager, ui, eventManager, userManager, notificationManager, analyticsManager;

document.addEventListener('DOMContentLoaded', async function() {
    console.log(`🚀 ${SHIQ_CONFIG.APP_NAME} v${SHIQ_CONFIG.APP_VERSION} - بدء التحميل...`);
    
    try {
        // تهيئة المكونات بالترتيب الصحيح
        cart = new ShoppingCart();
        imageManager = new ImageManager();
        ui = new UIManager(cart, imageManager);
        eventManager = new EventManager();
        userManager = new UserManager();
        notificationManager = new NotificationManager();
        analyticsManager = new AnalyticsManager();
        
        // انتظار التهيئة الكاملة
        await userManager.initialize();
        await notificationManager.initialize();
        
        // عرض الواجهة
        ui.createCategoryNavigation();
        await ui.renderCategories();
        
        // إخفاء صندوق البحث في البداية
        if (ui.searchBox) {
            ui.searchBox.style.display = 'none';
        }
        
        // إضافة للنافذة العامة للوصول إليها من HTML
        window.ui = ui;
        window.cart = cart;
        window.userManager = userManager;
        window.notificationManager = notificationManager;
        window.analyticsManager = analyticsManager;
        
        // إضافة دوال للتوافق العكسي
        window.openCart = () => ui.openCart();
        window.enlargeImage = (src) => ui.enlargeImage(src);
        window.closeEnlargedImage = () => ui.closeEnlargedImage();
        window.addToCart = (code, name, price, imageUrl, size = '', category = '') => ui.addToCart(code, name, price, imageUrl, size, category);
        window.searchProduct = () => ui.searchProducts();
        window.showUserProfile = () => showUserProfile();
        window.closeUserProfile = () => closeUserProfile();
        
        console.log(`✅ ${SHIQ_CONFIG.APP_NAME} v${SHIQ_CONFIG.APP_VERSION} - جاهز للاستخدام!`);
        
        // تتبع بدء الجلسة
        analyticsManager.trackEvent('session_started', {
            userType: userManager.currentUser ? 'registered' : 'anonymous',
            deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
        });
        
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

// ===== 11. دوال مساعدة =====
function showUserProfile() {
    if (!userManager.currentUser) {
        userManager.showRegistrationForm();
        return;
    }
    
    const modal = createUserProfileModal();
    document.body.appendChild(modal);
    modal.classList.add('show');
}

function createUserProfileModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'unified-user-profile';
    
    const user = userManager.currentUser;
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>👤 الملف الشخصي</h2>
                <button onclick="closeUserProfile()" style="position: absolute; top: 15px; left: 15px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
            </div>
            
            <div class="profile-sections">
                <div class="profile-section">
                    <h3>📋 المعلومات الأساسية</h3>
                    <p><strong>الاسم:</strong> ${user.name}</p>
                    <p><strong>الهاتف:</strong> ${user.phone}</p>
                    <p><strong>المحافظة:</strong> ${user.governorate}</p>
                    <p><strong>العنوان:</strong> ${user.address}</p>
                    <p><strong>الجنس:</strong> ${user.gender || 'غير محدد'}</p>
                </div>
                
                <div class="profile-section">
                    <h3>🎯 الاهتمامات</h3>
                    <div class="interests-display">
                        ${user.interests && user.interests.length > 0 
                            ? user.interests.map(interest => `<span class="interest-badge">${interest}</span>`).join('')
                            : '<p>لا توجد اهتمامات محددة</p>'
                        }
                    </div>
                </div>
                
                <div class="profile-section">
                    <h3>🔔 الإشعارات</h3>
                    <p>حالة الإشعارات: ${user.notificationsEnabled ? '✅ مفعلة' : '❌ غير مفعلة'}</p>
                    <p>إذن المتصفح: ${Notification.permission === 'granted' ? '✅ مسموح' : '❌ غير مسموح'}</p>
                </div>
                
                <div class="profile-section">
                    <h3>📊 إحصائيات الحساب</h3>
                    <p><strong>تاريخ التسجيل:</strong> ${new Date(user.registrationDate).toLocaleDateString('ar-IQ')}</p>
                    <p><strong>آخر نشاط:</strong> ${new Date(user.lastActive).toLocaleDateString('ar-IQ')}</p>
                    <p><strong>معرف العميل:</strong> ${user.id}</p>
                    <p><strong>معرف الجهاز:</strong> ${userManager.deviceId}</p>
                </div>
            </div>
            
            <div class="profile-actions">
                <button class="btn btn-primary" onclick="editUserProfile()">📝 تعديل البيانات</button>
                <button class="btn btn-secondary" onclick="closeUserProfile()">إغلاق</button>
            </div>
        </div>
    `;
    
    return modal;
}

function closeUserProfile() {
    const modal = document.getElementById('unified-user-profile');
    if (modal) {
        modal.remove();
    }
}

function editUserProfile() {
    closeUserProfile();
    userManager.showRegistrationForm();
    
    // ملء النموذج بالبيانات الحالية
    setTimeout(() => {
        const user = userManager.currentUser;
        if (user) {
            // ملء الحقول مباشرة بالقيم
            const userNameField = document.getElementById('userName');
            const userPhoneField = document.getElementById('userPhone');
            const userGovernorateField = document.getElementById('userGovernorate');
            const userAddressField = document.getElementById('userAddress');
            const userGenderField = document.getElementById('userGender');
            
            if (userNameField) userNameField.value = user.name;
            if (userPhoneField) userPhoneField.value = user.phone;
            if (userGovernorateField) userGovernorateField.value = user.governorate;
            if (userAddressField) userAddressField.value = user.address;
            if (userGenderField) userGenderField.value = user.gender || '';
            
            // الاهتمامات
            if (user.interests && Array.isArray(user.interests)) {
                user.interests.forEach(interest => {
                    const checkbox = document.querySelector(`input[type="checkbox"][value="${interest}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            }
        }
    }, 100);
}

// ===== 12. CSS المحسن =====
if (!document.querySelector('#unified-animations')) {
    const style = document.createElement('style');
    style.id = 'unified-animations';
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
        
        .profile-sections {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .profile-section {
            padding: 15px;
            background: #f9fafb;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
        }
        
        .profile-section h3 {
            color: #8B5CF6;
            margin-bottom: 10px;
        }
        
        .interests-display {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .interest-badge {
            background: #8B5CF6;
            color: white;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.9rem;
        }
        
        .profile-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 20px;
        }
        
        @media (max-width: 768px) {
            .profile-actions {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(style);
}

console.log('📦 تم تحميل النظام الموحد بنجاح - Unified System Ready!');
