// ────────────── Global variables ──────────────
let guidesData = []; // will hold all guides
let currentGuide = null; // the guide currently displayed

const modalOverlay = document.getElementById("globalModal");
const modalTitle = document.getElementById("modalTitle");
const modalBodyDiv = document.getElementById("modalBodyContent");
const closeModalBtn = document.getElementById("closeModalBtn");

// ────────────── Helper functions (once) ──────────────
function renderStars(ratingVal) {
  const num = parseFloat(ratingVal);
  const full = Math.floor(num);
  const half = num - full >= 0.5;
  let starHtml = "";
  for (let i = 0; i < full; i++) starHtml += '<i class="fas fa-star"></i>';
  if (half) starHtml += '<i class="fas fa-star-half-alt"></i>';
  let empty = 5 - full - (half ? 1 : 0);
  for (let i = 0; i < empty; i++) starHtml += '<i class="far fa-star"></i>';
  return starHtml;
}

function getImageWithFallback(imgPath, name) {
  const encoded = encodeURIComponent(name);
  const fallback = `https://ui-avatars.com/api/?background=e6c9a8&color=5a3a1f&bold=true&size=150&name=${encoded}&length=2`;
  return `<img src="${imgPath}" alt="${name}" onerror="this.onerror=null; this.src='${fallback}';">`;
}

function getHourlyRate(guide) {
  return (parseFloat(guide.price) / 3).toFixed(2);
}

// ────────────── Modal management ──────────────
function closeModal() {
  modalOverlay.classList.remove("active");
}
function openModal(title, html) {
  modalTitle.innerText = title;
  modalBodyDiv.innerHTML = html;
  modalOverlay.classList.add("active");
}

if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

// ────────────── Booking logic ──────────────
let pendingBooking = null;

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
            <input type="text" id="bookingName" placeholder="Full Name" required>
            <input type="email" id="bookingEmail" placeholder="Email Address" required>
            <input type="text" id="bookingDate" placeholder="Preferred Date (e.g. May 25, 2026)">
            <div class="hours-selector">
                <label>Number of Hours:</label>
                <input type="number" id="bookingHours" min="1" max="8" value="1" step="1">
                <span id="totalPriceDisplay" style="font-weight:bold;">$${hourly}</span>
            </div>
            <textarea id="bookingNote" rows="2" placeholder="Special requests or interests..."></textarea>
            <label>Country of Residence</label>
            <select id="bookingCountry" required>
                <option value="">Select your country</option>
                <option>United States</option><option>United Kingdom</option><option>Canada</option>
                <option>Germany</option><option>France</option><option>Egypt</option><option>UAE</option>
                <option>Saudi Arabia</option><option>India</option><option>Australia</option><option>Other</option>
            </select>
            <label>Payment Method</label>
            <div class="payment-methods" id="paymentMethods">
                <div class="payment-option selected" data-payment="Card">💳 Credit Card</div>
                <div class="payment-option" data-payment="Cash">💵 Cash (on meet)</div>
            </div>
            <input type="hidden" id="selectedPaymentMethod" value="Card">
            <button id="proceedToPaymentBtn" class="confirm-booking" data-id="${guide.id}"><i class="fas fa-credit-card"></i> Proceed to Payment</button>
            <p style="font-size:0.7rem; text-align:center; margin-top:10px;">You will enter payment details in the next step.</p>
        </div>
    `;
  openModal(`📅 Book ${guide.name}`, content);

  setTimeout(() => {
    const hoursInput = document.getElementById("bookingHours");
    const totalSpan = document.getElementById("totalPriceDisplay");
    function updateTotal() {
      const hrs = parseInt(hoursInput.value) || 1;
      const total = (hourly * hrs).toFixed(2);
      totalSpan.innerText = `$${total}`;
    }
    hoursInput.addEventListener("input", updateTotal);
    updateTotal();

    const paymentDivs = document.querySelectorAll(".payment-option");
    paymentDivs.forEach((div) => {
      div.addEventListener("click", () => {
        paymentDivs.forEach((d) => d.classList.remove("selected"));
        div.classList.add("selected");
        document.getElementById("selectedPaymentMethod").value =
          div.getAttribute("data-payment");
      });
    });

    const proceedBtn = document.getElementById("proceedToPaymentBtn");
    if (proceedBtn) {
      proceedBtn.addEventListener("click", () => {
        const name = document.getElementById("bookingName")?.value.trim();
        const email = document.getElementById("bookingEmail")?.value.trim();
        const date =
          document.getElementById("bookingDate")?.value || "Not specified";
        const hours = document.getElementById("bookingHours")?.value || "1";
        const total = (hourly * parseInt(hours)).toFixed(2);
        const note = document.getElementById("bookingNote")?.value || "";
        const country = document.getElementById("bookingCountry")?.value || "";
        const payment =
          document.getElementById("selectedPaymentMethod")?.value || "Card";
        if (!name || !email) {
          alert("Please enter your name and email.");
          return;
        }
        if (!country) {
          alert("Please select your country.");
          return;
        }

        pendingBooking = {
          guide: guide,
          name,
          email,
          date,
          hours,
          total,
          note,
          country,
          payment,
          hourly,
        };
        closeModal();
        openPaymentModal();
      });
    }
  }, 100);
}

function openPaymentModal() {
  if (!pendingBooking) return;
  const {
    guide,
    name,
    email,
    date,
    hours,
    total,
    note,
    country,
    payment,
    hourly,
  } = pendingBooking;

  let paymentFormHtml = "";
  if (payment === "Card") {
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
                <h4>Cash Payment on Meet</h4>
                <p>You will pay <strong>$${total}</strong> cash to ${guide.name} at the start of the tour.</p>
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
    const finalBtn = document.getElementById("finalConfirmBtn");
    if (finalBtn) {
      finalBtn.addEventListener("click", () => {
        if (payment === "Card") {
          const cardNum = document.getElementById("cardNumber")?.value.trim();
          const expiry = document.getElementById("expiry")?.value.trim();
          const cvv = document.getElementById("cvv")?.value.trim();
          if (!cardNum || !expiry || !cvv) {
            alert("Please enter all card details.");
            return;
          }
          if (cardNum.replace(/\s/g, "").length < 13) {
            alert("Invalid card number.");
            return;
          }
          alert(
            `✅ Payment of ${total}$ successful via card ending in ${cardNum.slice(-4)}.`,
          );
        } else {
          alert(`✅ Cash booking confirmed. You will pay ${total}$ to the guide on meet.`);
        }

        const adminEmail = "rentafriend940@gmail.com"; // Put the real admin email here
        const subject = `New Booking: ${guide.name} - ${name} (${payment} payment)`;
        const body = `Dear Admin,\n\nA new booking with payment has been confirmed.\n\nGuide: ${guide.name}\nCustomer Name: ${name}\nEmail: ${email}\nPreferred Date: ${date}\nCountry: ${country}\nNumber of Hours: ${hours}\nTotal Amount: $${total}\nPayment Method: ${payment}\nSpecial Requests: ${note}\nPayment Status: Confirmed\n\nPlease contact the client to arrange details.\n\nBest regards,\nLuxor Local Guides System`;

        window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        alert(
          `📧 A mail window has been opened to send booking details to the admin.\n\nPlease send it to complete the process.\n\nThank you for choosing Luxor Local Guides!`,
        );
        closeModal();
        pendingBooking = null;
      });
    }
  }, 100);
}

// ────────────── Profile loading ──────────────
async function loadProfile() {
  const params = new URLSearchParams(window.location.search);
  const guideId = parseInt(params.get("id"));
  const container = document.getElementById("profileContainer");

  if (!guideId) {
    container.innerHTML =
      '<p style="text-align:center;padding:2rem;">Guide not found.</p>';
    return;
  }

  try {
    const res = await fetch("guides.json");
    const guides = await res.json();
    guidesData = guides; // store globally
    const guide = guides.find((g) => g.id === guideId);
    if (!guide) throw new Error("Guide not found");

    currentGuide = guide; // store current guide

    const hourly = getHourlyRate(guide);
    const starsHtml = renderStars(guide.evaluation);
    const langList = guide.languages.split(",").map((l) => l.trim());
    const langSpans = langList
      .map(
        (l) =>
          `<span class="lang" style="background:#e5d5c2; padding:4px 12px;">${l}</span>`,
      )
      .join(" ");
    const allHobbies = guide.hobbies
      .map(
        (h) =>
          `<span class="hobby-tag" style="background:#f3e8dd;">${h}</span>`,
      )
      .join("");

    document.getElementById("profileHeader").innerHTML = `
            ${getImageWithFallback(guide.image, guide.name)}
            <h1>${guide.name}</h1>
            <div class="verified-tag" style="position: static; display: inline-flex; width: fit-content; margin: 0 auto;">✓ Verified Guide</div>
        `;
    document.getElementById("profileContent").innerHTML = `
            <div class="detail-row"><span class="detail-label">Education</span><span>${guide.degree}</span></div>
            <div class="detail-row"><span class="detail-label">Location</span><span>${guide.location}</span></div>
            <div class="detail-row"><span class="detail-label">Languages</span><div>${langSpans}</div></div>
            <div class="detail-row"><span class="detail-label">Hobbies & Passions</span><div style="display:flex;flex-wrap:wrap;gap:8px;">${allHobbies}</div></div>
            <div class="detail-row"><span class="detail-label">Rating</span><div class="stars" style="display:inline-block;">${starsHtml}</div> (${guide.evaluation}/5)</div>
            <div class="detail-row"><span class="detail-label">Price</span><strong>$${hourly} USD per hour</strong> (original ${guide.priceDuration} tour: $${guide.price})</div>
            <button class="book-now-btn" data-id="${guide.id}"><i class="fas fa-calendar-alt"></i> Book this guide</button>
        `;

    // Attach booking button event
    const bookBtn = document.querySelector(".book-now-btn");
    if (bookBtn) {
      bookBtn.addEventListener("click", () => openBookingModal(currentGuide));
    }
  } catch (err) {
    container.innerHTML =
      '<p style="text-align:center;padding:2rem;">Error loading guide data.</p>';
    console.error(err);
  }
}

// Start everything
loadProfile();