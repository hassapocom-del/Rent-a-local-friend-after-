/**
 * Gallery Enhancements - JavaScript
 * يضيف دعم Focus States و Keyboard Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== Gallery Script Enhancement =====
    const galleryImages = document.querySelectorAll('.gallery-img');
    const galleryCards = document.querySelectorAll('.image-card');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close');

    // جعل بطاقات الصور قابلة للتركيز (tabindex)
    galleryCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `صورة رقم ${index + 1}`);
    });

    // فتح Modal عند الضغط على الصورة أو الضغط على Enter/Space
    function openModal(imageSrc) {
        if (!modal || !modalImg) return;
        modal.style.display = "block";
        modal.classList.add('active');
        modalImg.src = imageSrc;
        if (closeBtn) closeBtn.focus(); // نقل الـ focus للزر X
        document.body.style.overflow = 'hidden'; // منع التمرير
    }

    function closeModal() {
        modal.style.display = "none";
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // استعادة التمرير
    }

    // عند الضغط على الصورة (Click)
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            openModal(this.src);
        });
    });

    // عند الضغط على البطاقة بـ Enter أو Space
    galleryCards.forEach((card, index) => {
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const img = card.querySelector('img');
                if (img) {
                    openModal(img.src);
                }
            }
        });
    });

    // إغلاق Modal عند الضغط على الزر X
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal();
        });

        // دعم keyboard للزر X
        closeBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeModal();
            }
        });

        // إضافة tabindex للزر X
        closeBtn.setAttribute('tabindex', '0');
        closeBtn.setAttribute('role', 'button');
        closeBtn.setAttribute('aria-label', 'إغلاق الصورة');
    }

    // إغلاق Modal عند الضغط في أي مكان خارج الصورة
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // إغلاق Modal عند الضغط على زر ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && modal && modal.style.display === "block") {
            closeModal();
        }
    });

    // ===== Image Card Focus Management =====
    galleryCards.forEach(card => {
        card.addEventListener('focus', function() {
            this.classList.add('focused');
        });

        card.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });

    // دعم التنقل بين البطاقات باستخدام الأسهم (اختياري)
    let currentFocusIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (document.activeElement === document.body) return;

        const focusedCard = document.activeElement;
        if (!focusedCard.classList.contains('image-card')) return;

        currentFocusIndex = Array.from(galleryCards).indexOf(focusedCard);

        let nextIndex = currentFocusIndex;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            nextIndex = (currentFocusIndex + 1) % galleryCards.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            nextIndex = (currentFocusIndex - 1 + galleryCards.length) % galleryCards.length;
        }

        if (nextIndex !== currentFocusIndex) {
            galleryCards[nextIndex].focus();
        }
    });

    console.log('✅ Gallery Enhancements Loaded Successfully');
});

/*تنسيق صفحة البروفايل للاصدقاء */
// Global variables
let guidesData = [];

// DOM elements
const guidesGrid = document.getElementById('guidesGrid');
const modalOverlay = document.getElementById('globalModal');
const modalTitle = document.getElementById('modalTitle');
const modalBodyDiv = document.getElementById('modalBodyContent');
const closeModalBtn = document.getElementById('closeModalBtn');

// Helper: render star rating
function renderStars(ratingVal) {
    const num = parseFloat(ratingVal);
    const full = Math.floor(num);
    const half = (num - full) >= 0.5;
    let starHtml = '';
    for (let i = 0; i < full; i++) starHtml += '<i class="fas fa-star"></i>';
    if (half) starHtml += '<i class="fas fa-star-half-alt"></i>';
    let empty = 5 - full - (half ? 1 : 0);
    for (let i = 0; i < empty; i++) starHtml += '<i class="far fa-star"></i>';
    return starHtml;
}

// Image fallback
function getImageWithFallback(imgPath, name) {
    const encoded = encodeURIComponent(name);
    const fallbackUrl = `https://ui-avatars.com/api/?background=e6c9a8&color=5a3a1f&bold=true&size=120&name=${encoded}&length=2&fontsize=0.55`;
    return `<img src="${imgPath}" alt="${name}" onerror="this.onerror=null; this.src='${fallbackUrl}';">`;
}

// Render all cards
function renderCards() {
    if (!guidesGrid) return;
    guidesGrid.innerHTML = '';
    guidesData.forEach(guide => {
        const previewHobbies = guide.hobbies.slice(0, 3);
        const hobbyTags = previewHobbies.map(h => `<span class="hobby-tag">${h.substring(0, 32)}${h.length > 32 ? '…' : ''}</span>`).join('');
        const langList = guide.languages.split(',').map(l => l.trim());
        const langBadges = langList.map(l => `<span class="lang">${l}</span>`).join('');
        const starsHtml = renderStars(guide.evaluation);
        const priceValue = parseFloat(guide.price);
        const verifiedBadge = guide.verified ? `<div class="verified-tag"><i class="fas fa-check-circle"></i> Verified</div>` : '';

        const card = document.createElement('div');
        card.className = 'guide-card';
        card.innerHTML = `
            <div class="card-img">
                ${getImageWithFallback(guide.image, guide.name)}
                ${verifiedBadge}
            </div>
            <div class="card-content">
                <div class="guide-name">${guide.name}</div>
                <div class="guide-degree">🎓 ${guide.degree}</div>
                <div class="hobbies-preview">${hobbyTags}</div>
                <div class="lang-icons">${langBadges}</div>
                <div class="rating">
                    <div class="stars">${starsHtml}</div>
                    <span style="font-size:0.75rem;">(${guide.evaluation})</span>
                </div>
                <div class="price">$${priceValue} <small>/ ${guide.priceDuration}</small></div>
                <div class="card-buttons">
                    <button class="btn btn-profile" data-id="${guide.id}"><i class="fas fa-user-circle"></i> Profile</button>
                    <button class="btn btn-booking" data-id="${guide.id}"><i class="fas fa-calendar-alt"></i> Book Now</button>
                </div>
            </div>
        `;
        guidesGrid.appendChild(card);
    });

    // Attach event listeners
    document.querySelectorAll('.btn-profile').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            const guide = guidesData.find(g => g.id === id);
            if (guide) openProfileModal(guide);
        });
    });
    document.querySelectorAll('.btn-booking').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            const guide = guidesData.find(g => g.id === id);
            if (guide) openBookingModal(guide);
        });
    });
}

// Modal controls
function closeModal() {
    modalOverlay.classList.remove('active');
}

function openModal(title, contentHtml) {
    modalTitle.innerText = title;
    modalBodyDiv.innerHTML = contentHtml;
    modalOverlay.classList.add('active');
}

// Profile modal
function openProfileModal(guide) {
    const allHobbiesHtml = guide.hobbies.map(h => `<span class="hobby-tag" style="background:#f3e8dd;">${h}</span>`).join('');
    const langArr = guide.languages.split(',').map(l => l.trim());
    const langSpans = langArr.map(l => `<span class="lang" style="background:#e5d5c2;">${l}</span>`).join('');
    const starsBig = renderStars(guide.evaluation);
    const imageHtml = `
        <div style="text-align:center;">
            <img src="${guide.image}" alt="${guide.name}" class="profile-img-lg" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?background=e6c9a8&color=5a3a1f&bold=true&size=120&name=${encodeURIComponent(guide.name)}&length=2';">
        </div>
    `;
    const content = `
        ${imageHtml}
        <div class="detail-row">
            <span class="detail-label"><i class="fas fa-user-graduate"></i> Full name</span>
            <span><strong>${guide.name}</strong></span>
        </div>
        <div class="detail-row">
            <span class="detail-label"><i class="fas fa-graduation-cap"></i> Education</span>
            <span>${guide.degree}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label"><i class="fas fa-map-marker-alt"></i> Location</span>
            <span>${guide.location}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label"><i class="fas fa-language"></i> Languages</span>
            <div class="hobbies-full">${langSpans}</div>
        </div>
        <div class="detail-row">
            <span class="detail-label"><i class="fas fa-heart"></i> Hobbies & Passions</span>
            <div class="hobbies-full" style="gap: 8px; flex-wrap:wrap;">${allHobbiesHtml}</div>
        </div>
        <div class="detail-row">
            <span class="detail-label"><i class="fas fa-star"></i> Rating</span>
            <div class="stars" style="margin-left: 5px;">${starsBig}</div> <span>(${guide.evaluation}/5)</span>
        </div>
        <div class="detail-row">
            <span class="detail-label"><i class="fas fa-tags"></i> Price</span>
            <span><strong>$${parseFloat(guide.price)} USD</strong> per ${guide.priceDuration}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label"><i class="fas fa-shield-alt"></i> Verification</span>
            <span>✅ Verified local guide & tourism graduate</span>
        </div>
        <button class="btn-booking" style="width:100%; margin-top: 16px; padding: 12px; background:#c46626; border:none; border-radius:50px; color:white; font-weight:bold;" onclick="(function(){ closeModal(); setTimeout(()=> openBookingModalById(${guide.id}), 120); })();"><i class="fas fa-calendar-check"></i> Book this guide</button>
    `;
    openModal(`👤 ${guide.name} · Local Expert`, content);
}

// Booking modal
function openBookingModal(guide) {
    const content = `
        <div style="text-align:center; margin-bottom: 10px;">
            <i class="fas fa-landmark" style="font-size: 2.5rem; color:#cb7b3c;"></i>
            <h4 style="margin: 8px 0;">Request a tour with ${guide.name}</h4>
            <p><i class="fas fa-clock"></i> <strong>$${parseFloat(guide.price)} USD</strong> per ${guide.priceDuration} (flexible duration)</p>
            <p><i class="fas fa-globe"></i> Languages: ${guide.languages}</p>
        </div>
        <div class="booking-form">
            <input type="text" id="bookingName" placeholder="Full name" value="Traveler">
            <input type="email" id="bookingEmail" placeholder="Email address" value="hello@example.com">
            <input type="text" id="bookingDate" placeholder="Preferred date (e.g., May 20, 2026)">
            <textarea id="bookingNote" rows="2" placeholder="Tell your interests: cultural tour, photography, hidden gems, etc..."></textarea>
            <button id="confirmBookingBtn" class="confirm-booking" data-id="${guide.id}"><i class="fas fa-paper-plane"></i> Confirm booking request</button>
        </div>
    `;
    openModal(`📅 Booking · ${guide.name}`, content);
    setTimeout(() => {
        const confirmBtn = document.getElementById('confirmBookingBtn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', (e) => {
                const gId = parseInt(confirmBtn.getAttribute('data-id'));
                const selectedGuide = guidesData.find(g => g.id === gId);
                const nameField = document.getElementById('bookingName')?.value || 'Guest';
                const emailField = document.getElementById('bookingEmail')?.value || 'no-email';
                const dateField = document.getElementById('bookingDate')?.value || 'not specified';
                const noteField = document.getElementById('bookingNote')?.value || 'no special requests';
                if (selectedGuide) {
                    alert(`✨ Booking request sent to ${selectedGuide.name}!\n\nName: ${nameField}\nEmail: ${emailField}\nDate: ${dateField}\nMessage: ${noteField}\n\nThe guide will contact you within 24 hours.`);
                    closeModal();
                } else {
                    alert("Unable to process, please try again.");
                }
            });
        }
    }, 80);
}

// Global helper for booking from profile
window.openBookingModalById = function(guideId) {
    const guide = guidesData.find(g => g.id === guideId);
    if (guide) openBookingModal(guide);
};

// Load JSON data and initialize
async function loadData() {
    try {
        const response = await fetch('guides.json');
        if (!response.ok) throw new Error('Failed to load guides.json');
        guidesData = await response.json();
        renderCards();
    } catch (error) {
        console.error(error);
        guidesGrid.innerHTML = '<p style="text-align:center;color:red;">⚠️ Error loading guide data. Please ensure guides.json exists.</p>';
    }
}

// Event listeners
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

// Start
loadData();
