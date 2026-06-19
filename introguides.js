let guidesData = [];

const guidesGrid = document.getElementById('guidesIntro');
const modalOverlay = document.getElementById('globalModal');
const modalTitle = document.getElementById('modalTitle');
const modalBodyDiv = document.getElementById('modalBodyContent');
const closeModalBtn = document.getElementById('closeModalBtn');

// ---------- Helper Functions (unchanged) ----------
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

// ---------- Display Cards (same as before) ----------
function renderCards(guidesArray) {
    if (!guidesGrid) return;
    if (!guidesArray.length) {
        guidesGrid.innerHTML = '<div class="no-results"><i class="fas fa-compass"></i> No guides to display.</div>';
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
                    <a href="pages/profile.html?id=${guide.id}" class="btn btn-profile"><i class="fas fa-user-circle"></i> Profile</a>
                    <button class="btn btn-booking" data-id="${guide.id}"><i class="fas fa-calendar-alt"></i> Book Now</button>
                </div>
            </div>
        `;
        guidesGrid.appendChild(card);
    });

    // Attach booking buttons after creation
    document.querySelectorAll('.btn-booking').forEach(btn => btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const guide = guidesData.find(g=>g.id===id);
        if(guide) openBookingModal(guide);
    }));
}

// ---------- Shared Modal ----------
function closeModal() { modalOverlay.classList.remove('active'); }
function openModal(title, html) { modalTitle.innerText = title; modalBodyDiv.innerHTML = html; modalOverlay.classList.add('active'); }

let pendingBooking = null;

// ---------- Booking & Payment Functions (no change) ----------
function openBookingModal(guide) {
    const hourly = parseFloat(getHourlyRate(guide));
    const content = `
        <div style="text-align:center;">
            <i class="fas fa-landmark" style="font-size:2.5rem; color:#cb7b3c;"></i>
            <h4>Booking ${guide.name}</h4>
            <p><strong>$${hourly} USD / hour</strong></p>
            <p>Languages: ${guide.languages}</p>
        </div>
        <div class="booking-form">
            <input type="text" id="bookingName" placeholder="Full Name" required>
            <input type="email" id="bookingEmail" placeholder="Email" required>
            <input type="text" id="bookingDate" placeholder="Preferred Date (e.g., May 25, 2026)">
            <div class="hours-selector">
                <label>Number of hours:</label>
                <input type="number" id="bookingHours" min="1" max="8" value="1" step="1">
                <span id="totalPriceDisplay" style="font-weight:bold;">$${hourly}</span>
            </div>
            <textarea id="bookingNote" rows="2" placeholder="Special requests or interests..."></textarea>
            <label>Country of residence</label>
            <select id="bookingCountry" required>
                <option value="">Choose your country</option>
                <option>United States</option><option>United Kingdom</option><option>Canada</option>
                <option>Germany</option><option>France</option><option>Egypt</option><option>UAE</option>
                <option>Saudi Arabia</option><option>India</option><option>Australia</option><option>Other</option>
            </select>
            <label>Payment Method</label>
            <div class="payment-methods" id="paymentMethods">
                <div class="payment-option selected" data-payment="Card">💳 Credit Card</div>
                <div class="payment-option" data-payment="Cash">💵 Cash (on meeting)</div>
            </div>
            <input type="hidden" id="selectedPaymentMethod" value="Card">
            <button id="proceedToPaymentBtn" class="confirm-booking" data-id="${guide.id}"><i class="fas fa-credit-card"></i> Proceed to Payment</button>
            <p style="font-size:0.7rem; text-align:center; margin-top:10px;">You will enter payment details in the next step.</p>
        </div>
    `;
    openModal(`📅 Booking ${guide.name}`, content);

    setTimeout(() => {
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

        const proceedBtn = document.getElementById('proceedToPaymentBtn');
        if (proceedBtn) {
            proceedBtn.addEventListener('click', () => {
                const name = document.getElementById('bookingName')?.value.trim();
                const email = document.getElementById('bookingEmail')?.value.trim();
                const date = document.getElementById('bookingDate')?.value || 'Not specified';
                const hours = document.getElementById('bookingHours')?.value || '1';
                const total = (hourly * parseInt(hours)).toFixed(2);
                const note = document.getElementById('bookingNote')?.value || '';
                const country = document.getElementById('bookingCountry')?.value || '';
                const payment = document.getElementById('selectedPaymentMethod')?.value || 'Card';
                if (!name || !email) {
                    alert("Please enter your name and email.");
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
            <h4 style="text-align:center;">💳 Card Details</h4>
            <div class="payment-form-group">
                <label>Card Number</label>
                <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
            </div>
            <div style="display:flex; gap:10px;">
                <div class="payment-form-group" style="flex:1;">
                    <label>Expiry Date (MM/YY)</label>
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
            <button id="finalConfirmBtn" class="confirm-booking">Pay $${total} and Confirm</button>
        `;
    } else {
        paymentFormHtml = `
            <div style="text-align:center;">
                <i class="fas fa-money-bill-wave" style="font-size:3rem; color:#cb7b3c;"></i>
                <h4>Cash Payment on Meeting</h4>
                <p>You will pay <strong>$${total}</strong> in cash to ${guide.name} at the start of the tour.</p>
                <p>Please confirm the booking to receive a confirmation email.</p>
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
                        alert("Please enter all card details.");
                        return;
                    }
                    if (cardNum.replace(/\s/g, '').length < 13) {
                        alert("Invalid card number.");
                        return;
                    }
                    alert(`✅ Payment of ${total}$ successful via card ending in ${cardNum.slice(-4)}.`);
                } else {
                    alert(`✅ Cash booking confirmed. You will pay ${total}$ to the guide upon meeting.`);
                }

                const adminEmail = "rentafriend940@gmail.com"; // Put the real admin email
                const subject = `New Booking: ${guide.name} - ${name} (${payment} payment)`;
                const body = `Dear Administrator,\n\nA new booking has been confirmed with payment.\n\nGuide: ${guide.name}\nClient Name: ${name}\nEmail: ${email}\nPreferred Date: ${date}\nCountry: ${country}\nNumber of Hours: ${hours}\nTotal Amount: $${total}\nPayment Method: ${payment}\nSpecial Requests: ${note}\nPayment Status: Confirmed\n\nPlease contact the client to arrange details.\n\nBest regards,\nLuxor Local Guides System`;

                window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                alert(`📧 Email window opened to send booking details to the admin.\n\nPlease send it to complete the process.\n\nThank you for choosing Luxor Local Guides!`);
                closeModal();
                pendingBooking = null;
            });
        }
    }, 100);
}

// ---------- Load Data and Display (no filtering) ----------
async function loadData() {
    try {
        const response = await fetch('Introguides.json');  // Ensure the file exists
        if (!response.ok) throw new Error('Introguides.json not found');
        guidesData = await response.json();
        renderCards(guidesData); // Display all guides directly
    } catch (err) {
        console.error(err);
        guidesGrid.innerHTML = '<p class="no-results">⚠️ Error loading data. Make sure Introguides.json exists.</p>';
    }
}

// ---------- Attach Modal Events ----------
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

// Start loading
loadData();