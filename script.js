// let guidesData = [];

// const guidesGrid = document.getElementById('guidesGrid');
// const modalOverlay = document.getElementById('globalModal');
// const modalTitle = document.getElementById('modalTitle');
// const modalBodyDiv = document.getElementById('modalBodyContent');
// const closeModalBtn = document.getElementById('closeModalBtn');

// function renderStars(ratingVal) {
//     const num = parseFloat(ratingVal);
//     const full = Math.floor(num);
//     const half = (num - full) >= 0.5;
//     let starHtml = '';
//     for (let i = 0; i < full; i++) starHtml += '<i class="fas fa-star"></i>';
//     if (half) starHtml += '<i class="fas fa-star-half-alt"></i>';
//     let empty = 5 - full - (half ? 1 : 0);
//     for (let i = 0; i < empty; i++) starHtml += '<i class="far fa-star"></i>';
//     return starHtml;
// }

// function getImageWithFallback(imgPath, name) {
//     const encoded = encodeURIComponent(name);
//     const fallback = `https://ui-avatars.com/api/?background=e6c9a8&color=5a3a1f&bold=true&size=120&name=${encoded}&length=2`;
//     return `<img src="${imgPath}" alt="${name}" onerror="this.onerror=null; this.src='${fallback}';">`;
// }

// function getHourlyRate(guide) {
//     return (parseFloat(guide.price) / 3).toFixed(2);
// }

// let currentFiltered = [];
// const searchInput = document.getElementById('searchInput');
// const locationSelect = document.getElementById('locationSelect');
// const priceMinSlider = document.getElementById('priceMin');
// const priceMaxSlider = document.getElementById('priceMax');
// const minPriceLabel = document.getElementById('minPriceLabel');
// const maxPriceLabel = document.getElementById('maxPriceLabel');
// const ratingFilter = document.getElementById('ratingFilter');
// const ratingValueSpan = document.getElementById('ratingValue');
// const verifiedToggle = document.getElementById('verifiedToggle');
// const resetBtn = document.getElementById('resetFiltersBtn');
// let activeCategory = 'all';

// function getCategory(priceFor3) {
//     const hourly = priceFor3 / 3;
//     if (hourly < 7) return 'budget';
//     if (hourly <= 8.5) return 'standard';
//     return 'luxury';
// }

// function filterGuides() {
//     const searchTerm = searchInput.value.toLowerCase();
//     const selectedLocation = locationSelect.value;
//     let minPrice = parseFloat(priceMinSlider.value);
//     let maxPrice = parseFloat(priceMaxSlider.value);
//     if (minPrice > maxPrice) { [minPrice, maxPrice] = [maxPrice, minPrice]; }
//     const minRating = parseFloat(ratingFilter.value);
//     const verifiedOnly = verifiedToggle.checked;
//     const filtered = guidesData.filter(guide => {
//         const hourly = parseFloat(getHourlyRate(guide));
//         const haystack = (guide.name + ' ' + guide.hobbies.join(' ') + ' ' + guide.location).toLowerCase();
//         if (searchTerm && !haystack.includes(searchTerm)) return false;
//         if (selectedLocation && guide.location !== selectedLocation) return false;
//         if (hourly < minPrice || hourly > maxPrice) return false;
//         if (parseFloat(guide.evaluation) < minRating) return false;
//         if (verifiedOnly && !guide.verified) return false;
//         if (activeCategory !== 'all') {
//             const cat = getCategory(parseFloat(guide.price));
//             if (cat !== activeCategory) return false;
//         }
//         return true;
//     });
//     currentFiltered = filtered;
//     renderCards(currentFiltered);
// }

// function renderCards(guidesArray) {
//     if (!guidesGrid) return;
//     if (!guidesArray.length) {
//         guidesGrid.innerHTML = '<div class="no-results"><i class="fas fa-compass"></i> No guides match your filters.</div>';
//         return;
//     }
//     guidesGrid.innerHTML = '';
//     guidesArray.forEach(guide => {
//         const hourly = getHourlyRate(guide);
//         const previewHobbies = guide.hobbies.slice(0,3);
//         const hobbyTags = previewHobbies.map(h => `<span class="hobby-tag">${h.substring(0,32)}${h.length>32?'…':''}</span>`).join('');
//         const langList = guide.languages.split(',').map(l=>l.trim());
//         const langBadges = langList.map(l=>`<span class="lang">${l}</span>`).join('');
//         const starsHtml = renderStars(guide.evaluation);
//         const verifiedBadge = guide.verified ? `<div class="verified-tag"><i class="fas fa-check-circle"></i> Verified</div>` : '';
//         const card = document.createElement('div');
//         card.className = 'guide-card';
//         card.innerHTML = `
//             <div class="card-img">${getImageWithFallback(guide.image, guide.name)}${verifiedBadge}</div>
//             <div class="card-content">
//                 <div class="guide-name">${guide.name}</div>
//                 <div class="guide-degree">🎓 ${guide.degree}</div>
//                 <div class="hobbies-preview">${hobbyTags}</div>
//                 <div class="lang-icons">${langBadges}</div>
//                 <div class="rating"><div class="stars">${starsHtml}</div><span style="font-size:0.75rem;">(${guide.evaluation})</span></div>
//                 <div class="price">$${hourly} <small>/ hour</small></div>
//                 <div class="card-buttons">
//                     <a href="profile.html?id=${guide.id}" class="btn btn-profile"><i class="fas fa-user-circle"></i> Profile</a>
//                     <button class="btn btn-booking" data-id="${guide.id}"><i class="fas fa-calendar-alt"></i> Book Now</button>
//                 </div>
//             </div>
//         `;
//         guidesGrid.appendChild(card);
//     });
//     document.querySelectorAll('.btn-booking').forEach(btn => btn.addEventListener('click', () => {
//         const id = parseInt(btn.dataset.id);
//         const guide = guidesData.find(g=>g.id===id);
//         if(guide) openBookingModal(guide);
//     }));
// }

// function closeModal() { modalOverlay.classList.remove('active'); }
// function openModal(title, html) { modalTitle.innerText = title; modalBodyDiv.innerHTML = html; modalOverlay.classList.add('active'); }

// let pendingBooking = null;

// function openBookingModal(guide) {
//     const hourly = parseFloat(getHourlyRate(guide));
//     const content = `
//         <div style="text-align:center;">
//             <i class="fas fa-landmark" style="font-size:2.5rem; color:#cb7b3c;"></i>
//             <h4>Book ${guide.name}</h4>
//             <p><strong>$${hourly} USD / hour</strong></p>
//             <p>Languages: ${guide.languages}</p>
//         </div>
//         <div class="booking-form">
//             <input type="text" id="bookingName" placeholder="Full name" required>
//             <input type="email" id="bookingEmail" placeholder="Email address" required>
//             <input type="text" id="bookingDate" placeholder="Preferred date (e.g., May 25, 2026)">
//             <div class="hours-selector">
//                 <label>Number of hours:</label>
//                 <input type="number" id="bookingHours" min="1" max="8" value="1" step="1">
//                 <span id="totalPriceDisplay" style="font-weight:bold;">$${hourly}</span>
//             </div>
//             <textarea id="bookingNote" rows="2" placeholder="Special requests or interests..."></textarea>
//             <label>Country of residence</label>
//             <select id="bookingCountry" required>
//                 <option value="">Select your country</option>
//                 <option>United States</option><option>United Kingdom</option><option>Canada</option>
//                 <option>Germany</option><option>France</option><option>Egypt</option><option>UAE</option>
//                 <option>Saudi Arabia</option><option>India</option><option>Australia</option><option>Other</option>
//             </select>
//             <label>Payment method</label>
//             <div class="payment-methods" id="paymentMethods">
//                 <div class="payment-option selected" data-payment="Card">💳 Credit/Debit Card</div>
//                 <div class="payment-option" data-payment="Cash">💵 Cash (on meeting)</div>
//             </div>
//             <input type="hidden" id="selectedPaymentMethod" value="Card">
//             <button id="proceedToPaymentBtn" class="confirm-booking" data-id="${guide.id}"><i class="fas fa-credit-card"></i> Proceed to Payment</button>
//             <p style="font-size:0.7rem; text-align:center; margin-top:10px;">You will enter payment details in the next step.</p>
//         </div>
//     `;
//     openModal(`📅 Book ${guide.name}`, content);
    
//     setTimeout(() => {
//         const hoursInput = document.getElementById('bookingHours');
//         const totalSpan = document.getElementById('totalPriceDisplay');
//         function updateTotal() {
//             const hrs = parseInt(hoursInput.value) || 1;
//             const total = (hourly * hrs).toFixed(2);
//             totalSpan.innerText = `$${total}`;
//         }
//         hoursInput.addEventListener('input', updateTotal);
//         updateTotal();
        
//         const paymentDivs = document.querySelectorAll('.payment-option');
//         paymentDivs.forEach(div => {
//             div.addEventListener('click', () => {
//                 paymentDivs.forEach(d => d.classList.remove('selected'));
//                 div.classList.add('selected');
//                 document.getElementById('selectedPaymentMethod').value = div.getAttribute('data-payment');
//             });
//         });
        
//         const proceedBtn = document.getElementById('proceedToPaymentBtn');
//         if (proceedBtn) {
//             proceedBtn.addEventListener('click', () => {
//                 const name = document.getElementById('bookingName')?.value.trim();
//                 const email = document.getElementById('bookingEmail')?.value.trim();
//                 const date = document.getElementById('bookingDate')?.value || 'not specified';
//                 const hours = document.getElementById('bookingHours')?.value || '1';
//                 const total = (hourly * parseInt(hours)).toFixed(2);
//                 const note = document.getElementById('bookingNote')?.value || '';
//                 const country = document.getElementById('bookingCountry')?.value || '';
//                 const payment = document.getElementById('selectedPaymentMethod')?.value || 'Card';
//                 if (!name || !email) {
//                     alert("Please fill in your name and email.");
//                     return;
//                 }
//                 if (!country) { alert("Please select your country."); return; }
                
//                 pendingBooking = {
//                     guide: guidesData.find(g => g.id === parseInt(proceedBtn.dataset.id)),
//                     name, email, date, hours, total, note, country, payment, hourly
//                 };
//                 closeModal();
//                 openPaymentModal();
//             });
//         }
//     }, 100);
// }

// function openPaymentModal() {
//     if (!pendingBooking) return;
//     const { guide, name, email, date, hours, total, note, country, payment, hourly } = pendingBooking;
    
//     let paymentFormHtml = '';
//     if (payment === 'Card') {
//         paymentFormHtml = `
//             <h4 style="text-align:center;">💳 Enter Card Details</h4>
//             <div class="payment-form-group">
//                 <label>Card Number</label>
//                 <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
//             </div>
//             <div style="display:flex; gap:10px;">
//                 <div class="payment-form-group" style="flex:1;">
//                     <label>Expiry (MM/YY)</label>
//                     <input type="text" id="expiry" placeholder="MM/YY">
//                 </div>
//                 <div class="payment-form-group" style="flex:1;">
//                     <label>CVV</label>
//                     <input type="text" id="cvv" placeholder="123" maxlength="4">
//                 </div>
//             </div>
//             <div class="payment-form-group">
//                 <label>Cardholder Name</label>
//                 <input type="text" id="cardholderName" placeholder="${name}">
//             </div>
//             <button id="finalConfirmBtn" class="confirm-booking">Pay $${total} & Confirm</button>
//         `;
//     } else {
//         paymentFormHtml = `
//             <div style="text-align:center;">
//                 <i class="fas fa-money-bill-wave" style="font-size:3rem; color:#cb7b3c;"></i>
//                 <h4>Cash Payment on Meeting</h4>
//                 <p>You will pay <strong>$${total}</strong> in cash directly to ${guide.name} at the start of the tour.</p>
//                 <p>Please confirm your booking to receive a confirmation email.</p>
//                 <button id="finalConfirmBtn" class="confirm-booking">Confirm Cash Booking</button>
//             </div>
//         `;
//     }
    
//     const content = `
//         <div style="text-align:center; margin-bottom:15px;">
//             <i class="fas fa-lock" style="color:#2e7d32;"></i>
//             <h3>Secure Payment</h3>
//             <p>Guide: ${guide.name} | Total: $${total} (${hours} hours)</p>
//         </div>
//         ${paymentFormHtml}
//         <p style="font-size:0.7rem; text-align:center; margin-top:10px;">🔒 Demo mode – no real transaction</p>
//     `;
    
//     openModal(`🔐 Payment for ${guide.name}`, content);
    
//     setTimeout(() => {
//         const finalBtn = document.getElementById('finalConfirmBtn');
//         if (finalBtn) {
//             finalBtn.addEventListener('click', () => {
//                 if (payment === 'Card') {
//                     const cardNum = document.getElementById('cardNumber')?.value.trim();
//                     const expiry = document.getElementById('expiry')?.value.trim();
//                     const cvv = document.getElementById('cvv')?.value.trim();
//                     if (!cardNum || !expiry || !cvv) {
//                         alert("Please fill in all card details.");
//                         return;
//                     }
//                     if (cardNum.replace(/\s/g, '').length < 13) {
//                         alert("Invalid card number.");
//                         return;
//                     }
//                     alert(`✅ Payment of $${total} processed successfully via card ending in ${cardNum.slice(-4)}.`);
//                 } else {
//                     alert(`✅ Cash booking confirmed. You will pay $${total} to the guide upon meeting.`);
//                 }
                
//                 const adminEmail = "rentafriend940@gmail.com"; // CHANGE TO MANAGER'S EMAIL
//                 const subject = `New Booking: ${guide.name} - ${name} (${payment} payment)`;
//                 const body = `Dear Manager,\n\nA new booking has been confirmed with payment.\n\nGuide: ${guide.name}\nCustomer Name: ${name}\nCustomer Email: ${email}\nPreferred Date: ${date}\nCountry: ${country}\nHours: ${hours}\nTotal Amount: $${total}\nPayment Method: ${payment}\nSpecial Requests: ${note}\nPayment Status: Confirmed\n\nPlease contact the customer to finalize arrangements.\n\nBest regards,\nLuxor Local Guides System`;
                
//                 window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
//                 alert(`📧 An email window has been opened to send booking details to the manager.\n\nPlease send it to complete the process.\n\nThank you for choosing Luxor Local Guides!`);
//                 closeModal();
//                 pendingBooking = null;
//             });
//         }
//     }, 100);
// }

// async function loadData() {
//     try {
//         const response = await fetch('guides.json');
//         if (!response.ok) throw new Error('guides.json not found');
//         guidesData = await response.json();
//         const hourlyRates = guidesData.map(g => parseFloat(g.price)/3);
//         const maxHourly = Math.max(...hourlyRates, 10);
//         priceMinSlider.max = maxHourly + 2;
//         priceMaxSlider.max = maxHourly + 2;
//         priceMaxSlider.value = maxHourly + 2;
//         maxPriceLabel.innerText = `$${maxHourly+2}`;
//         const locs = [...new Set(guidesData.map(g=>g.location))];
//         locationSelect.innerHTML = '<option value="">All locations</option>' + locs.map(l=>`<option value="${l}">${l}</option>`).join('');
//         filterGuides();
        
//         const urlParams = new URLSearchParams(window.location.search);
//         const bookId = urlParams.get('book');
//         if (bookId) {
//             const guide = guidesData.find(g => g.id === parseInt(bookId));
//             if (guide) setTimeout(() => openBookingModal(guide), 500);
//         }
//     } catch (err) {
//         console.error(err);
//         guidesGrid.innerHTML = '<p class="no-results">⚠️ Error loading data. Make sure guides.json exists.</p>';
//     }
// }

// function updatePriceLabels() {
//     let min = parseFloat(priceMinSlider.value);
//     let max = parseFloat(priceMaxSlider.value);
//     if (min > max) { [min, max] = [max, min]; priceMinSlider.value = min; priceMaxSlider.value = max; }
//     minPriceLabel.innerText = `$${min.toFixed(1)}`;
//     maxPriceLabel.innerText = `$${max.toFixed(1)}`;
//     filterGuides();
// }
// priceMinSlider.addEventListener('input', updatePriceLabels);
// priceMaxSlider.addEventListener('input', updatePriceLabels);
// searchInput.addEventListener('input', filterGuides);
// locationSelect.addEventListener('change', filterGuides);
// ratingFilter.addEventListener('input', () => { ratingValueSpan.innerText = ratingFilter.value; filterGuides(); });
// verifiedToggle.addEventListener('change', filterGuides);
// resetBtn.addEventListener('click', () => {
//     searchInput.value = '';
//     locationSelect.value = '';
//     priceMinSlider.value = '0';
//     priceMaxSlider.value = priceMaxSlider.max;
//     updatePriceLabels();
//     ratingFilter.value = '4.5';
//     ratingValueSpan.innerText = '4.5';
//     verifiedToggle.checked = false;
//     activeCategory = 'all';
//     document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
//     document.querySelector('.category-btn[data-cat="all"]').classList.add('active');
//     filterGuides();
// });
// document.querySelectorAll('.category-btn').forEach(btn => {
//     btn.addEventListener('click', () => {
//         document.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('active'));
//         btn.classList.add('active');
//         activeCategory = btn.getAttribute('data-cat');
//         filterGuides();
//     });
// });
// if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
// modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

// loadData();
let guidesData = [];

const guidesGrid = document.getElementById('guidesGrid');
const modalOverlay = document.getElementById('globalModal');
const modalTitle = document.getElementById('modalTitle');
const modalBodyDiv = document.getElementById('modalBodyContent');
const closeModalBtn = document.getElementById('closeModalBtn');

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

function getImageWithFallback(imgPath, name) {
    const encoded = encodeURIComponent(name);
    const fallback = `https://ui-avatars.com/api/?background=e6c9a8&color=5a3a1f&bold=true&size=120&name=${encoded}&length=2`;
    return `<img src="${imgPath}" alt="${name}" onerror="this.onerror=null; this.src='${fallback}';">`;
}

function getHourlyRate(guide) {
    return (parseFloat(guide.price) / 3).toFixed(2);
}

let currentFiltered = [];
const searchInput = document.getElementById('searchInput');
const locationSelect = document.getElementById('locationSelect');
const priceMinSlider = document.getElementById('priceMin');
const priceMaxSlider = document.getElementById('priceMax');
const minPriceLabel = document.getElementById('minPriceLabel');
const maxPriceLabel = document.getElementById('maxPriceLabel');
const ratingFilter = document.getElementById('ratingFilter');
const ratingValueSpan = document.getElementById('ratingValue');
const verifiedToggle = document.getElementById('verifiedToggle');
const resetBtn = document.getElementById('resetFiltersBtn');
let activeCategory = 'all';

function getCategory(priceFor3) {
    const hourly = priceFor3 / 3;
    if (hourly < 7) return 'budget';
    if (hourly <= 8.5) return 'standard';
    return 'luxury';
}

function filterGuides() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedLocation = locationSelect.value;
    let minPrice = parseFloat(priceMinSlider.value);
    let maxPrice = parseFloat(priceMaxSlider.value);
    if (minPrice > maxPrice) { [minPrice, maxPrice] = [maxPrice, minPrice]; }
    const minRating = parseFloat(ratingFilter.value);
    const verifiedOnly = verifiedToggle.checked;
    const filtered = guidesData.filter(guide => {
        const hourly = parseFloat(getHourlyRate(guide));
        const haystack = (guide.name + ' ' + guide.hobbies.join(' ') + ' ' + guide.location).toLowerCase();
        if (searchTerm && !haystack.includes(searchTerm)) return false;
        if (selectedLocation && guide.location !== selectedLocation) return false;
        if (hourly < minPrice || hourly > maxPrice) return false;
        if (parseFloat(guide.evaluation) < minRating) return false;
        if (verifiedOnly && !guide.verified) return false;
        if (activeCategory !== 'all') {
            const cat = getCategory(parseFloat(guide.price));
            if (cat !== activeCategory) return false;
        }
        return true;
    });
    currentFiltered = filtered;
    renderCards(currentFiltered);
}

function renderCards(guidesArray) {
    if (!guidesGrid) return;
    if (!guidesArray.length) {
        guidesGrid.innerHTML = '<div class="no-results"><i class="fas fa-compass"></i> No guides match your filters.</div>';
        return;
    }
    guidesGrid.innerHTML = '';
    guidesArray.forEach(guide => {
        const hourly = getHourlyRate(guide);
        const previewHobbies = guide.hobbies.slice(0,3);
        const hobbyTags = previewHobbies.map(h => `<span class="hobby-tag">${h.substring(0,32)}${h.length>32?'…':''}</span>`).join('');
        const langList = guide.languages.split(',').map(l=>l.trim());
        const langBadges = langList.map(l=>`<span class="lang">${l}</span>`).join('');
        const starsHtml = renderStars(guide.evaluation);
        const verifiedBadge = guide.verified ? `<div class="verified-tag"><i class="fas fa-check-circle"></i> Verified</div>` : '';
        const card = document.createElement('div');
        card.className = 'guide-card';
        card.innerHTML = `
            <div class="card-img">${getImageWithFallback(guide.image, guide.name)}${verifiedBadge}</div>
            <div class="card-content">
                <div class="guide-name">${guide.name}</div>
                <div class="guide-degree">🎓 ${guide.degree}</div>
                <div class="hobbies-preview">${hobbyTags}</div>
                <div class="lang-icons">${langBadges}</div>
                <div class="rating"><div class="stars">${starsHtml}</div><span style="font-size:0.75rem;">(${guide.evaluation})</span></div>
                <div class="price">$${hourly} <small>/ hour</small></div>
                <div class="card-buttons">
                    <a href="profile.html?id=${guide.id}" class="btn btn-profile"><i class="fas fa-user-circle"></i> Profile</a>
                    <button class="btn btn-booking" data-id="${guide.id}"><i class="fas fa-calendar-alt"></i> Book Now</button>
                    <!-- 🆕 زر الاتجاهات -->
                    <button class="btn btn-directions" data-id="${guide.id}"><i class="fas fa-map-marker-alt"></i> Directions</button>
                </div>
            </div>
        `;
        guidesGrid.appendChild(card);
    });
    document.querySelectorAll('.btn-booking').forEach(btn => btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const guide = guidesData.find(g=>g.id===id);
        if(guide) openBookingModal(guide);
    }));
    // 🆕 ربط زر الاتجاهات
    document.querySelectorAll('.btn-directions').forEach(btn => btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const guide = guidesData.find(g=>g.id===id);
        if(guide) showDirectionsToGuide(guide);
    }));
}

function closeModal() { modalOverlay.classList.remove('active'); }
function openModal(title, html) { modalTitle.innerText = title; modalBodyDiv.innerHTML = html; modalOverlay.classList.add('active'); }

let pendingBooking = null;

// 🆕 دوال تحديد الموقع الجغرافي
async function getUserCoordinates() {
    // المحاولة أولاً عبر GPS
    if (navigator.geolocation) {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    timeout: 5000,
                    enableHighAccuracy: false
                });
            });
            return {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                source: 'gps'
            };
        } catch (e) {
            console.warn('Geolocation failed, trying IP...');
        }
    }
    // المحاولة عبر IP
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.latitude && data.longitude) {
            return { lat: data.latitude, lon: data.longitude, source: 'ip' };
        }
    } catch (e) {
        console.error('IP geolocation failed');
    }
    return null;
}

// 🆕 قاموس إحداثيات دقيق لكل موقع في ملف guides.json
const guideLocationCoords = {
    "Luxor - West Bank & Balloon areas": { lat: 25.726, lon: 32.600 },
    "Luxor - Karnak & East Bank": { lat: 25.719, lon: 32.657 },
    "Luxor - Nile Corniche & City Center": { lat: 25.696, lon: 32.644 },
    "Luxor - Valley of the Kings & West Bank": { lat: 25.740, lon: 32.601 },
    "Luxor - Theban Tombs & Community areas": { lat: 25.720, lon: 32.610 }
};

// قاموس احتياطي (قديم) للبحث الجزئي
const luxorLocations = {
    "east bank": { lat: 25.6872, lon: 32.6396 },
    "west bank": { lat: 25.7213, lon: 32.6107 },
    "karnak": { lat: 25.7188, lon: 32.6573 },
    "luxor temple": { lat: 25.6997, lon: 32.6393 },
    "valley of the kings": { lat: 25.7402, lon: 32.6014 },
    "habu temple": { lat: 25.7197, lon: 32.6005 },
    "dendera": { lat: 26.1410, lon: 32.6700 },
    "abydos": { lat: 26.1850, lon: 31.9190 },
    "city center": { lat: 25.6960, lon: 32.6440 }
};

function getGuideCoordinates(guide) {
    // إذا كان المرشد لديه lat/lon مضمّنة
    if (guide.lat !== undefined && guide.lon !== undefined) {
        return { lat: guide.lat, lon: guide.lon };
    }
    // استخدام الجدول الجديد (تطابق تام)
    const loc = guide.location.trim();
    if (guideLocationCoords[loc]) {
        return guideLocationCoords[loc];
    }
    // خطة احتياط: مطابقة جزئية
    const locLower = loc.toLowerCase();
    for (const [key, coords] of Object.entries(luxorLocations)) {
        if (locLower.includes(key) || key.includes(locLower)) {
            return coords;
        }
    }
    // إفتراضي: وسط مدينة الأقصر
    return { lat: 25.6950, lon: 32.6400 };
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
}

// 🆕 دوال Leaflet المجانية

// دالة مساعدة لإنشاء أيقونات مخصصة للمستخدم والمرشد
function createIcon(color) {
    return L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
}

// 🆕 دالة فتح نافذة الخريطة المجانية
async function showDirectionsToGuide(guide) {
    const userCoords = await getUserCoordinates();
    if (!userCoords) {
        alert('⚠️ Unable to get your current location. Please check your browser settings.');
        return;
    }
    const guideCoords = getGuideCoordinates(guide);
    const distance = calculateDistance(userCoords.lat, userCoords.lon, guideCoords.lat, guideCoords.lon);
    
    // بناء HTML النافذة
    const mapHtml = `
        <div style="text-align:center; margin-bottom:10px;">
            <strong>📍 ${guide.name}</strong> | Distance: ~${distance} km
        </div>
        <div id="leafletMap" style="width:100%; height:400px; border-radius:8px;"></div>
        <div style="margin-top:10px; display:flex; gap:10px; justify-content:center;">
            <button id="openGoogleMapsBtn" style="padding:8px 14px; background:#4285F4; color:#fff; border:none; border-radius:6px; cursor:pointer;">
                <i class="fas fa-external-link-alt"></i> Open in Google Maps
            </button>
        </div>
    `;
    
    openModal(`🗺️ Directions to ${guide.name}`, mapHtml);
    
    // انتظر حتى يظهر عنصر الخريطة
    setTimeout(async () => {
        const mapDiv = document.getElementById('leafletMap');
        if (!mapDiv) return;
        
        // إنشاء خريطة Leaflet
        const map = L.map(mapDiv).setView([userCoords.lat, userCoords.lon], 13);
        
        // إضافة طبقة OpenStreetMap (مجانية)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // علامة المستخدم (أزرق)
        const userMarker = L.marker([userCoords.lat, userCoords.lon], { icon: createIcon('blue') })
            .addTo(map)
            .bindPopup('Your location');
        
        // علامة المرشد (أحمر)
        const guideMarker = L.marker([guideCoords.lat, guideCoords.lon], { icon: createIcon('red') })
            .addTo(map)
            .bindPopup(guide.name);
        
        // تكبير الخريطة لتظهر العلامتان
        const group = L.featureGroup([userMarker, guideMarker]);
        map.fitBounds(group.getBounds().pad(0.1));
        
        // طلب المسار من OSRM (مجاني)
        try {
            const response = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${userCoords.lon},${userCoords.lat};${guideCoords.lon},${guideCoords.lat}?overview=full&geometries=geojson`
            );
            const data = await response.json();
            if (data.code === 'Ok' && data.routes.length > 0) {
                const route = data.routes[0].geometry;
                // رسم المسار على الخريطة
                L.geoJSON(route, {
                    style: { color: '#4285F4', weight: 5, opacity: 0.8 }
                }).addTo(map);
            } else {
                // إذا فشل المسار، ارسم خطاً مستقيماً
                L.polyline(
                    [[userCoords.lat, userCoords.lon], [guideCoords.lat, guideCoords.lon]],
                    { color: 'gray', weight: 3, dashArray: '5, 5' }
                ).addTo(map);
            }
        } catch (e) {
            // OSRM فشل، ارسم خطاً مستقيماً احتياطياً
            L.polyline(
                [[userCoords.lat, userCoords.lon], [guideCoords.lat, guideCoords.lon]],
                { color: 'gray', weight: 3, dashArray: '5, 5' }
            ).addTo(map);
        }
        
        // زر فتح في خرائط جوجل
        document.getElementById('openGoogleMapsBtn')?.addEventListener('click', () => {
            const origin = `${userCoords.lat},${userCoords.lon}`;
            const destination = `${guideCoords.lat},${guideCoords.lon}`;
            window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`, '_blank');
        });
        
    }, 200);
}
// دوال الدولة (سابقاً)
async function getUserCountry() {
    if (!navigator.geolocation) {
        console.log("Geolocation not supported by browser.");
        return null;
    }
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 5000,
                enableHighAccuracy: false
            });
        });
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`);
        const data = await response.json();
        return data.address?.country || null;
    } catch (error) {
        console.warn("Geolocation failed or denied:", error);
        return null;
    }
}

async function getUserCountryByIP() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.country_name || null;
    } catch (e) {
        return null;
    }
}

async function getUserCountrySmart() {
    const gpsCountry = await getUserCountry();
    if (gpsCountry) return gpsCountry;
    return await getUserCountryByIP();
}

function openBookingModal(guide) {
    const hourly = parseFloat(getHourlyRate(guide));
    const content = `
        <div style="text-align:center;">
            <i class="fas fa-landmark" style="font-size:2.5rem; color:#cb7b3c;"></i>
            <h4>Book ${guide.name}</h4>
            <p><strong>$${hourly} USD / hour</strong></p>
            <p>Languages: ${guide.languages}</p>
        </div>
        <div class="booking-form">
            <input type="text" id="bookingName" placeholder="Full name" required>
            <input type="email" id="bookingEmail" placeholder="Email address" required>
            <input type="text" id="bookingDate" placeholder="Preferred date (e.g., May 25, 2026)">
            <div class="hours-selector">
                <label>Number of hours:</label>
                <input type="number" id="bookingHours" min="1" max="8" value="1" step="1">
                <span id="totalPriceDisplay" style="font-weight:bold;">$${hourly}</span>
            </div>
            <textarea id="bookingNote" rows="2" placeholder="Special requests or interests..."></textarea>
            <label>Country of residence</label>
            <select id="bookingCountry" required>
                <option value="">Select your country</option>
                <option>United States</option><option>United Kingdom</option><option>Canada</option>
                <option>Germany</option><option>France</option><option>Egypt</option><option>UAE</option>
                <option>Saudi Arabia</option><option>India</option><option>Australia</option><option>Other</option>
            </select>
            <label>Payment method</label>
            <div class="payment-methods" id="paymentMethods">
                <div class="payment-option selected" data-payment="Card">💳 Credit/Debit Card</div>
                <div class="payment-option" data-payment="Cash">💵 Cash (on meeting)</div>
            </div>
            <input type="hidden" id="selectedPaymentMethod" value="Card">
            <button id="proceedToPaymentBtn" class="confirm-booking" data-id="${guide.id}"><i class="fas fa-credit-card"></i> Proceed to Payment</button>
            <p style="font-size:0.7rem; text-align:center; margin-top:10px;">You will enter payment details in the next step.</p>
        </div>
    `;
    openModal(`📅 Book ${guide.name}`, content);
    
    setTimeout(async () => {
        const hoursInput = document.getElementById('bookingHours');
        const totalSpan = document.getElementById('totalPriceDisplay');
        function updateTotal() {
            const hrs = parseInt(hoursInput.value) || 1;
            const total = (hourly * hrs).toFixed(2);
            totalSpan.innerText = `$${total}`;
        }
        hoursInput.addEventListener('input', updateTotal);
        updateTotal();
        
        const paymentDivs = document.querySelectorAll('.payment-option');
        paymentDivs.forEach(div => {
            div.addEventListener('click', () => {
                paymentDivs.forEach(d => d.classList.remove('selected'));
                div.classList.add('selected');
                document.getElementById('selectedPaymentMethod').value = div.getAttribute('data-payment');
            });
        });

        const countrySelect = document.getElementById('bookingCountry');
        if (countrySelect) {
            const detectedCountry = await getUserCountrySmart();
            if (detectedCountry) {
                const options = Array.from(countrySelect.options);
                const matchedOption = options.find(opt =>
                    opt.value.toLowerCase() === detectedCountry.toLowerCase() ||
                    opt.value.toLowerCase().includes(detectedCountry.toLowerCase()) ||
                    detectedCountry.toLowerCase().includes(opt.value.toLowerCase())
                );
                if (matchedOption) {
                    countrySelect.value = matchedOption.value;
                }
            }
        }
        
        const proceedBtn = document.getElementById('proceedToPaymentBtn');
        if (proceedBtn) {
            proceedBtn.addEventListener('click', () => {
                const name = document.getElementById('bookingName')?.value.trim();
                const email = document.getElementById('bookingEmail')?.value.trim();
                const date = document.getElementById('bookingDate')?.value || 'not specified';
                const hours = document.getElementById('bookingHours')?.value || '1';
                const total = (hourly * parseInt(hours)).toFixed(2);
                const note = document.getElementById('bookingNote')?.value || '';
                const country = document.getElementById('bookingCountry')?.value || '';
                const payment = document.getElementById('selectedPaymentMethod')?.value || 'Card';
                if (!name || !email) {
                    alert("Please fill in your name and email.");
                    return;
                }
                if (!country) { alert("Please select your country."); return; }
                
                pendingBooking = {
                    guide: guidesData.find(g => g.id === parseInt(proceedBtn.dataset.id)),
                    name, email, date, hours, total, note, country, payment, hourly
                };
                closeModal();
                openPaymentModal();
            });
        }
    }, 100);
}

function openPaymentModal() {
    if (!pendingBooking) return;
    const { guide, name, email, date, hours, total, note, country, payment, hourly } = pendingBooking;
    
    let paymentFormHtml = '';
    if (payment === 'Card') {
        paymentFormHtml = `
            <h4 style="text-align:center;">💳 Enter Card Details</h4>
            <div class="payment-form-group">
                <label>Card Number</label>
                <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
            </div>
            <div style="display:flex; gap:10px;">
                <div class="payment-form-group" style="flex:1;">
                    <label>Expiry (MM/YY)</label>
                    <input type="text" id="expiry" placeholder="MM/YY">
                </div>
                <div class="payment-form-group" style="flex:1;">
                    <label>CVV</label>
                    <input type="text" id="cvv" placeholder="123" maxlength="4">
                </div>
            </div>
            <div class="payment-form-group">
                <label>Cardholder Name</label>
                <input type="text" id="cardholderName" placeholder="${name}">
            </div>
            <button id="finalConfirmBtn" class="confirm-booking">Pay $${total} & Confirm</button>
        `;
    } else {
        paymentFormHtml = `
            <div style="text-align:center;">
                <i class="fas fa-money-bill-wave" style="font-size:3rem; color:#cb7b3c;"></i>
                <h4>Cash Payment on Meeting</h4>
                <p>You will pay <strong>$${total}</strong> in cash directly to ${guide.name} at the start of the tour.</p>
                <p>Please confirm your booking to receive a confirmation email.</p>
                <button id="finalConfirmBtn" class="confirm-booking">Confirm Cash Booking</button>
            </div>
        `;
    }
    
    const content = `
        <div style="text-align:center; margin-bottom:15px;">
            <i class="fas fa-lock" style="color:#2e7d32;"></i>
            <h3>Secure Payment</h3>
            <p>Guide: ${guide.name} | Total: $${total} (${hours} hours)</p>
        </div>
        ${paymentFormHtml}
        <p style="font-size:0.7rem; text-align:center; margin-top:10px;">🔒 Demo mode – no real transaction</p>
    `;
    
    openModal(`🔐 Payment for ${guide.name}`, content);
    
    setTimeout(() => {
        const finalBtn = document.getElementById('finalConfirmBtn');
        if (finalBtn) {
            finalBtn.addEventListener('click', () => {
                if (payment === 'Card') {
                    const cardNum = document.getElementById('cardNumber')?.value.trim();
                    const expiry = document.getElementById('expiry')?.value.trim();
                    const cvv = document.getElementById('cvv')?.value.trim();
                    if (!cardNum || !expiry || !cvv) {
                        alert("Please fill in all card details.");
                        return;
                    }
                    if (cardNum.replace(/\s/g, '').length < 13) {
                        alert("Invalid card number.");
                        return;
                    }
                    alert(`✅ Payment of $${total} processed successfully via card ending in ${cardNum.slice(-4)}.`);
                } else {
                    alert(`✅ Cash booking confirmed. You will pay $${total} to the guide upon meeting.`);
                }
                
                const adminEmail = "rentafriend940@gmail.com";
                const subject = `New Booking: ${guide.name} - ${name} (${payment} payment)`;
                const body = `Dear Manager,\n\nA new booking has been confirmed with payment.\n\nGuide: ${guide.name}\nCustomer Name: ${name}\nCustomer Email: ${email}\nPreferred Date: ${date}\nCountry: ${country}\nHours: ${hours}\nTotal Amount: $${total}\nPayment Method: ${payment}\nSpecial Requests: ${note}\nPayment Status: Confirmed\n\nPlease contact the customer to finalize arrangements.\n\nBest regards,\nLuxor Local Guides System`;
                
                window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                alert(`📧 An email window has been opened to send booking details to the manager.\n\nPlease send it to complete the process.\n\nThank you for choosing Luxor Local Guides!`);
                closeModal();
                pendingBooking = null;
            });
        }
    }, 100);
}

async function loadData() {
    try {
        const response = await fetch('guides.json');
        if (!response.ok) throw new Error('guides.json not found');
        guidesData = await response.json();
        const hourlyRates = guidesData.map(g => parseFloat(g.price)/3);
        const maxHourly = Math.max(...hourlyRates, 10);
        priceMinSlider.max = maxHourly + 2;
        priceMaxSlider.max = maxHourly + 2;
        priceMaxSlider.value = maxHourly + 2;
        maxPriceLabel.innerText = `$${maxHourly+2}`;
        const locs = [...new Set(guidesData.map(g=>g.location))];
        locationSelect.innerHTML = '<option value="">All locations</option>' + locs.map(l=>`<option value="${l}">${l}</option>`).join('');
        filterGuides();
        
        const urlParams = new URLSearchParams(window.location.search);
        const bookId = urlParams.get('book');
        if (bookId) {
            const guide = guidesData.find(g => g.id === parseInt(bookId));
            if (guide) setTimeout(() => openBookingModal(guide), 500);
        }
    } catch (err) {
        console.error(err);
        guidesGrid.innerHTML = '<p class="no-results">⚠️ Error loading data. Make sure guides.json exists.</p>';
    }
}

function updatePriceLabels() {
    let min = parseFloat(priceMinSlider.value);
    let max = parseFloat(priceMaxSlider.value);
    if (min > max) { [min, max] = [max, min]; priceMinSlider.value = min; priceMaxSlider.value = max; }
    minPriceLabel.innerText = `$${min.toFixed(1)}`;
    maxPriceLabel.innerText = `$${max.toFixed(1)}`;
    filterGuides();
}
priceMinSlider.addEventListener('input', updatePriceLabels);
priceMaxSlider.addEventListener('input', updatePriceLabels);
searchInput.addEventListener('input', filterGuides);
locationSelect.addEventListener('change', filterGuides);
ratingFilter.addEventListener('input', () => { ratingValueSpan.innerText = ratingFilter.value; filterGuides(); });
verifiedToggle.addEventListener('change', filterGuides);
resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    locationSelect.value = '';
    priceMinSlider.value = '0';
    priceMaxSlider.value = priceMaxSlider.max;
    updatePriceLabels();
    ratingFilter.value = '4.5';
    ratingValueSpan.innerText = '4.5';
    verifiedToggle.checked = false;
    activeCategory = 'all';
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.category-btn[data-cat="all"]').classList.add('active');
    filterGuides();
});
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-cat');
        filterGuides();
    });
});
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

loadData();