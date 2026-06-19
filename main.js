/**
 * LuxorMate – Professional Frontend Script
 * يدعم الصفحة الرئيسية (index.html) وصفحة الحجز (booking.html)
 */
// عناصر التحكم
const isHomePage =
  window.location.pathname.includes("index.html") ||
  window.location.pathname.endsWith("index.html");
if (isHomePage) {
  const slides = document.querySelectorAll(".slide-img");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let autoSlideInterval;

  // دالة عرض الشريحة حسب الرقم
  function showSlide(index) {
    // إخفاء الكل وإزالة active
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // تفعيل الشريحة والنقطة المطلوبة
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentIndex = index;
  }

  // الانتقال للشريحة التالية (للتشغيل التلقائي)
  function nextSlide() {
    let next = (currentIndex + 1) % slides.length;
    showSlide(next);
  }

  // بدء التبديل التلقائي كل 4 ثوانٍ
  function startAutoSlide() {
    stopAutoSlide(); // إيقاف أي مؤقت سابق
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  // إيقاف التبديل التلقائي
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // التبديل اليدوي عند النقر على النقاط
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      showSlide(slideIndex);

      // إعادة تشغيل التبديل التلقائي بعد 4 ثوانٍ من آخر نقرة
      stopAutoSlide();
      startAutoSlide();
    });
  });

  // بدء التشغيل التلقائي عند تحميل الصفحة
  startAutoSlide();
}

function throttle(fn, delay) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}
function getNavbarMarkup() {
  const isHomePage =
    window.location.pathname.includes("index.html") ||
    window.location.pathname.endsWith("index.html");
  const isBookingPage =
    window.location.pathname.includes("booking.html") ||
    window.location.pathname.endsWith("index.html");
  const isServicesPage =
    window.location.pathname.includes("services.html") ||
    window.location.href.includes("index.html");
  const isStatsPage =
    window.location.pathname.includes("statics.html") ||
    window.location.href.includes("index.html");
  const isContactPage =
    window.location.pathname.includes("contact.html") ||
    window.location.href.includes("index.html");
  const isCompanionsPage =
    window.location.pathname.includes("companions.html") ||
    window.location.href.includes("index.html");
  const isProfilePage =
    window.location.pathname.includes("profile.html") ||
    window.location.href.includes("index.html");
  const ispoliciesPage =
    window.location.pathname.includes("policies.html") ||
    window.location.pathname.includes("policies.html");

  let prefix = "";
  let homeLink = "./index.html";
  let servicesLink = "./services.html";
  let statsLink = "./statics.html";
  let companionsLink = "./companions.html";
  let whyUsLink = "#why-us";
  let contactLink = "contact.html";
  let filterLink = "#filter";
  let policiesLink = "./pages/policies.html";
  let logoLink = "#";
  let file = "pages/";

  if (isHomePage) {
    prefix = "./";
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  } else if (isBookingPage) {
    prefix = "../";
    whyUsLink = `${prefix}index.html#why-us`;
    logoLink = `${prefix}index.html`;
    homeLink = `${prefix}index.html#Home`;
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  } else if (isServicesPage) {
    prefix = "../";
    whyUsLink = `${prefix}index.html#why-us`;
    logoLink = `${prefix}index.html`;
    homeLink = `${prefix}index.html#Home`;
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  } else if (isStatsPage) {
    prefix = "../";
    whyUsLink = `${prefix}index.html#why-us`;
    logoLink = `${prefix}index.html`;
    homeLink = `${prefix}index.html#Home`;
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  } else if (isContactPage) {
    prefix = "../";
    whyUsLink = `${prefix}index.html#why-us`;
    logoLink = `${prefix}index.html`;
    homeLink = `${prefix}index.html#Home`;
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  } else if (isCompanionsPage) {
    prefix = "../";
    whyUsLink = `${prefix}index.html#why-us`;
    logoLink = `${prefix}index.html`;
    homeLink = `${prefix}index.html#Home`;
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  } else if (isProfilePage) {
    prefix = "../";
    whyUsLink = `${prefix}index.html#why-us`;
    logoLink = `${prefix}index.html`;
    homeLink = `${prefix}index.html#Home`;
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  } else if (ispoliciesPage) {
    prefix = "../";
    whyUsLink = `${prefix}index.html#why-us`;
    logoLink = `${prefix}index.html`;
    homeLink = `${prefix}index.html#Home`;
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  }

  return `
  <nav class="navbar" id="navbar">
  <div class="container" id="navbarContainer">
  <div class="nav-container">
        <a href="${logoLink}" 
        lass="nav-logo">
          <span class="logo-icon">
            <img class="im-logo" src="${prefix}gallary/remove.photos-removed-background.png" alt="" />
          </span>
          <span class="name-logo">Rent A Local Friend</span>
        </a>
        <ul class="nav-links" id="navLinks">
          <li><a href="${homeLink}">Home</a></li>
          <li><a href="${servicesLink}">Services</a></li>
          <li><a href="${statsLink}">Statistics</a></li>
          <li><a href="${companionsLink}">Companions</a></li>
          <li><a href="${whyUsLink}">Why Us</a></li>
          <li><a href="${contactLink}">contact</a></li>
          <li><a href="${policiesLink}">policies</a></li>
          </ul>
          <button class="mobile-toggle" id="mobileToggle" aria-label="Menu">
          <span></span><span></span><span></span>
          </button>
          </div>
          </div>
          </nav>
          `;
}
// <li><button id="customLoginBtn" class="nav-login-btn">login</button></li>

function mountNavbar() {
  const navbarPlaceholder = document.getElementById("navbarPlaceholder");
  if (!navbarPlaceholder) return;
  navbarPlaceholder.innerHTML = getNavbarMarkup();
}

mountNavbar();

function getSiteMetric(key, defaultValue = 0) {
  const value = parseInt(localStorage.getItem(key), 10);
  return Number.isNaN(value) ? defaultValue : value;
}

function setSiteMetric(key, value) {
  localStorage.setItem(key, String(value));
}

function incrementSiteMetric(key, amount = 1) {
  setSiteMetric(key, getSiteMetric(key) + amount);
}

function initializeMetrics() {
  if (localStorage.getItem("siteVisits") === null) {
    setSiteMetric("siteVisits", 24);
    setSiteMetric("returningVisits", 18);
    setSiteMetric("serviceViews", 62);
    setSiteMetric("bookingStarts", 12);
    setSiteMetric("completedBookings", 9);
    setSiteMetric("statsViews", 5);
    setSiteMetric("homeViews", 20);
  }
}

function recordVisit() {
  const visits = getSiteMetric("siteVisits");
  if (visits > 0) {
    incrementSiteMetric("returningVisits");
  }
  incrementSiteMetric("siteVisits");
}

function recordAction(actionKey) {
  if (!actionKey) return;
  incrementSiteMetric(actionKey);
}

function getReturningRatio() {
  const visits = getSiteMetric("siteVisits");
  const returning = getSiteMetric("returningVisits");
  return visits > 0 ? Math.round((returning / visits) * 100) : 0;
}

function formatNumber(value) {
  return Number(value).toLocaleString("en-US");
}

function updateStatsPage() {
  if (
    !window.location.pathname.includes("statics.html") &&
    !window.location.href.includes("statics.html")
  )
    return;
  const guideCount = window.guidesData ? window.guidesData.length : 5;
  const monthlyBookings = getSiteMetric("completedBookings");
  const statsViews = getSiteMetric("statsViews");
  const serviceViews = getSiteMetric("serviceViews");
  const averageRating = window.guidesData
    ? (
        window.guidesData.reduce((sum, guide) => sum + guide.evaluation, 0) /
        window.guidesData.length
      ).toFixed(1)
    : "4.8";
  const returningVisitors = getReturningRatio();

  const activeGuidesEl = document.getElementById("activeGuidesCount");
  const monthlyBookingsEl = document.getElementById("monthlyBookingsCount");
  const averageRatingEl = document.getElementById("averageRatingValue");
  const returningVisitorsEl = document.getElementById(
    "returningVisitorsPercent",
  );
  const serviceViewsEl = document.getElementById("serviceViewsCount");
  const statsViewsEl = document.getElementById("statsViewsCount");

  if (activeGuidesEl) activeGuidesEl.textContent = formatNumber(guideCount);
  if (monthlyBookingsEl)
    monthlyBookingsEl.textContent = formatNumber(monthlyBookings);
  if (averageRatingEl) averageRatingEl.textContent = averageRating;
  if (returningVisitorsEl)
    returningVisitorsEl.textContent = `${returningVisitors}%`;
  if (serviceViewsEl) serviceViewsEl.textContent = formatNumber(serviceViews);
  if (statsViewsEl) statsViewsEl.textContent = formatNumber(statsViews);
}

function createLoadingOverlay() {
  const isHomePage =
    window.location.pathname.includes("index.html") ||
    window.location.pathname.endsWith("index.html");
  const prefix = isHomePage ? "./" : "../";

  const overlay = document.createElement("div");
  overlay.id = "loadingOverlay";
  overlay.innerHTML = `
    <div class="loading-spinner">
      <div class="pharaoh-mask"><span class="pharaoh-symbol">
      <img src="${prefix}gallary/remove.photos2.png" alt="" />
      </span></div>
      <p>Loading...</p>
    </div>
  `;
  document.body.appendChild(overlay);
}

function showLoadingScreen() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    overlay.classList.add("active");
  }
}

function hideLoadingScreen() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    overlay.classList.remove("active");
  }
}

initializeMetrics();
recordVisit();
createLoadingOverlay();

const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const mobileToggle = document.getElementById("mobileToggle");
const allNavLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

let isMenuOpen = false;
function openMenu() {
  isMenuOpen = true;
  navLinks?.classList.add("active");
  mobileToggle?.classList.add("active");
  mobileToggle?.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeMenu() {
  isMenuOpen = false;
  navLinks?.classList.remove("active");
  mobileToggle?.classList.remove("active");
  mobileToggle?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}
function toggleMenu() {
  isMenuOpen ? closeMenu() : openMenu();
}
mobileToggle?.addEventListener("click", toggleMenu);
allNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (isMenuOpen) closeMenu();
  });
});
document.addEventListener("click", (e) => {
  if (isMenuOpen && !navbar?.contains(e.target)) closeMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMenuOpen) closeMenu();
});

allNavLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href && href.includes("index1.html")) {
      recordAction("serviceViews");
    }
    if (href && href.includes("statics.html")) {
      recordAction("statsViews");
    }
    if (href && href.includes("#Home")) {
      recordAction("homeViews");
    }
    if (href && href.includes("#companions")) {
      recordAction("companionsViews");
    }

    if (href && href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight -
          10;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    } else if (href && !href.startsWith("#")) {
      e.preventDefault();
      showLoadingScreen();
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    }
  });
});

const heroButtons = document.querySelectorAll(".hero-buttons a");
heroButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const href = button.getAttribute("href");
    if (
      href &&
      (href.includes("index1.html") ||
        href.includes("#services") ||
        href.includes("#filter"))
    ) {
      recordAction("serviceViews");
    }
  });
});

function handleNavScroll() {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 20);
}
window.addEventListener("scroll", throttle(handleNavScroll, 100), {
  passive: true,
});

function updateActiveLink() {
  let currentSectionId = "";
  const scrollPos = window.scrollY + 150;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      currentSectionId = section.getAttribute("id");
    }
  });
  allNavLinks.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-link");
    }
  });
}
window.addEventListener("scroll", throttle(updateActiveLink, 150), {
  passive: true,
});
window.addEventListener("load", updateActiveLink);

const animatedElements = document.querySelectorAll(
  ".step-card, .service-card, .companion-card, .why-card, .cta-section, .hero-content, .hero-visual",
);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  animatedElements.forEach((el) => observer.observe(el));
} else {
  animatedElements.forEach((el) => el.classList.add("in-view"));
}

function animateCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((stat) => {
    const targetText = stat.textContent.trim();
    const match = targetText.match(/^(\d[\d,]*)(\+?%?)$/);
    if (!match) return;
    const numericTarget = parseInt(match[1].replace(/,/g, ""), 10);
    const suffix = match[2];
    let current = 0;
    const increment = Math.ceil(numericTarget / 30);
    const updateStat = () => {
      current += increment;
      if (current >= numericTarget) {
        stat.textContent = numericTarget.toLocaleString() + suffix;
        return;
      }
      stat.textContent = Math.floor(current).toLocaleString() + suffix;
      requestAnimationFrame(updateStat);
    };
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateStat();
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    statObserver.observe(stat);
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", animateCounters);
} else {
  animateCounters();
}
/**
 * Gallery Enhancements - JavaScript
 * يضيف دعم Focus States و Keyboard Navigation
 */

document.addEventListener("DOMContentLoaded", () => {
  // ===== Gallery Script Enhancement =====
  const galleryImages = document.querySelectorAll(".gallery-img");
  const galleryCards = document.querySelectorAll(".image-card");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");

  function buildImageCandidates(imgSrc) {
    const normalized = imgSrc.replace(/^\.\//, "");
    const pageDir = window.location.pathname.replace(/\/[^/]*$/, "/");
    const candidates = [
      imgSrc,
      `./${normalized}`,
      `../${normalized}`,
      `${pageDir}${normalized}`,
    ];

    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.length > 1) {
      candidates.push(
        window.location.origin + "/" + parts.join("/") + "/" + normalized,
      );
    }

    return candidates.filter(
      (value, index) => value && candidates.indexOf(value) === index,
    );
  }

  function attachImageFallback(img) {
    const src = img.getAttribute("src") || "";
    const candidates = buildImageCandidates(src);
    if (candidates.length <= 1) return;

    let currentIndex = 0;
    img.onerror = function () {
      currentIndex += 1;
      if (currentIndex < candidates.length) {
        img.src = candidates[currentIndex];
      } else {
        img.onerror = null;
      }
    };
    img.src = candidates[currentIndex];
  }

  galleryImages.forEach((img) => {
    attachImageFallback(img);
  });

  // جعل بطاقات الصور قابلة للتركيز (tabindex)
  galleryCards.forEach((card, index) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `صورة رقم ${index + 1}`);
  });

  // فتح Modal عند الضغط على الصورة أو الضغط على Enter/Space
  function openModal(imageSrc) {
    if (!modal || !modalImg) return;
    modal.style.display = "block";
    modal.classList.add("active");
    modalImg.src = imageSrc;
    if (closeBtn) closeBtn.focus(); // نقل الـ focus للزر X
    document.body.style.overflow = "hidden"; // منع التمرير
  }

  function closeModal() {
    modal.style.display = "none";
    modal.classList.remove("active");
    document.body.style.overflow = "auto"; // استعادة التمرير
  }

  // عند الضغط على الصورة (Click)
  galleryImages.forEach((img) => {
    img.addEventListener("click", function () {
      openModal(this.src);
    });
  });

  // عند الضغط على البطاقة بـ Enter أو Space
  galleryCards.forEach((card, index) => {
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const img = card.querySelector("img");
        if (img) {
          openModal(img.src);
        }
      }
    });
  });

  // إغلاق Modal عند الضغط على الزر X
  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeModal();
    });

    // دعم keyboard للزر X
    closeBtn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeModal();
      }
    });

    // إضافة tabindex للزر X
    closeBtn.setAttribute("tabindex", "0");
    closeBtn.setAttribute("role", "button");
    closeBtn.setAttribute("aria-label", "إغلاق الصورة");
  }

  // إغلاق Modal عند الضغط في أي مكان خارج الصورة
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // إغلاق Modal عند الضغط على زر ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.style.display === "block") {
      closeModal();
    }
  });

  // ===== Image Card Focus Management =====
  galleryCards.forEach((card) => {
    card.addEventListener("focus", function () {
      this.classList.add("focused");
    });

    card.addEventListener("blur", function () {
      this.classList.remove("focused");
    });
  });

  // دعم التنقل بين البطاقات باستخدام الأسهم (اختياري)
  let currentFocusIndex = 0;

  document.addEventListener("keydown", function (e) {
    if (document.activeElement === document.body) return;

    const focusedCard = document.activeElement;
    if (!focusedCard.classList.contains("image-card")) return;

    currentFocusIndex = Array.from(galleryCards).indexOf(focusedCard);

    let nextIndex = currentFocusIndex;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentFocusIndex + 1) % galleryCards.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex =
        (currentFocusIndex - 1 + galleryCards.length) % galleryCards.length;
    }

    if (nextIndex !== currentFocusIndex) {
      galleryCards[nextIndex].focus();
    }
  });

  console.log("✅ Gallery Enhancements Loaded Successfully");
});

// إخفاء loading screen عند التحميل الكامل وتحديث بيانات صفحة الإحصائيات
window.addEventListener("load", () => {
  updateStatsPage();
  hideLoadingScreen();
});

// const isBookingPage = window.location.pathname.includes('booking.html') || window.location.pathname.endsWith('booking.html')
const isBookingPage =
  window.location.pathname.includes("booking.html") ||
  window.location.pathname.endsWith("/booking/");

// footer
function getFooterMarkup() {
  const isHomePage =
    window.location.pathname.includes("index.html") ||
    window.location.pathname.endsWith("index.html");
  const isBookingPage =
    window.location.pathname.includes("booking.html") ||
    window.location.pathname.endsWith("index.html");
  const isServicesPage =
    window.location.pathname.includes("services.html") ||
    window.location.href.includes("index.html");
  const isStatsPage =
    window.location.pathname.includes("statics.html") ||
    window.location.href.includes("index.html");
  const isContactPage =
    window.location.pathname.includes("contact.html") ||
    window.location.href.includes("index.html");
  const isCompanionsPage =
    window.location.pathname.includes("companions.html") ||
    window.location.href.includes("index.html");
  const isProfilePage =
    window.location.pathname.includes("profile.html") ||
    window.location.href.includes("index.html");
  const ispoliciesPage =
    window.location.pathname.includes("policies.html") ||
    window.location.pathname.includes("policies.html");

  let prefix = "";
  let homeLink = "./index.html";
  let servicesLink = "./services.html";
  let statsLink = "./statics.html";
  let companionsLink = "./companions.html";
  let whyUsLink = "#why-us";
  let contactLink = "contact.html";
  let filterLink = "#filter";
  let policiesLink = "./pages/policies.html";
  let profileLink = "#profile";
  let logoLink = "#";
  let file = "pages/";

  if (isHomePage) {
    prefix = "./";
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  } else if (isBookingPage) {
    prefix = "../";
    whyUsLink = `${prefix}index.html#why-us`;
    logoLink = `${prefix}index.html`;
    homeLink = `${prefix}index.html#Home`;
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  } else if (isServicesPage) {
    prefix = "../";
    whyUsLink = `${prefix}index.html#why-us`;
    logoLink = `${prefix}index.html`;
    homeLink = `${prefix}index.html#Home`;
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  } else if (isStatsPage) {
    prefix = "../";
    whyUsLink = `${prefix}index.html#why-us`;
    logoLink = `${prefix}index.html`;
    homeLink = `${prefix}index.html#Home`;
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  } else if (isContactPage) {
    prefix = "../";
    whyUsLink = `${prefix}index.html#why-us`;
    logoLink = `${prefix}index.html`;
    homeLink = `${prefix}index.html#Home`;
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  } else if (isCompanionsPage) {
    prefix = "../";
    whyUsLink = `${prefix}index.html#why-us`;
    logoLink = `${prefix}index.html`;
    homeLink = `${prefix}index.html#Home`;
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  } else if (isProfilePage) {
    prefix = "../";
    whyUsLink = `${prefix}index.html#why-us`;
    logoLink = `${prefix}index.html`;
    homeLink = `${prefix}index.html#Home`;
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  } else if (ispoliciesPage) {
    prefix = "../";
    whyUsLink = `${prefix}index.html#why-us`;
    logoLink = `${prefix}index.html`;
    homeLink = `${prefix}index.html#Home`;
    servicesLink = `${prefix}${file}services.html`;
    statsLink = `${prefix}${file}statics.html`;
    companionsLink = `${prefix}${file}companions.html`;
    contactLink = `${prefix}${file}contact.html`;
    filterLink = `${prefix}${file}companions.html#filter`;
    policiesLink = `${prefix}${file}policies.html`;
  }

  return `
 <div class="shabe-up">
 <img src="${prefix}gallary/footer i (1).png" alt="" />
 </div>
<div class="container">
  <div class="footer-links">
    <div class="links">    
    <h2>menu</h2>
      <ul>
        <li><a href="${homeLink} ">Home</a></li>
        <li><a href="${servicesLink} ">Services</a></li>
        <li><a href="${statsLink}">Statistics</a></li>
        <li><a href="${companionsLink}">Companions</a></li>
        <li><a href="${policiesLink}">policies</a></li>
      </ul>
    </div>
    <div class="links">
          <h2>policies</h2>
          <ul>
            <li><a href="${policiesLink}">policies</a></li>
            <li><a href="${whyUsLink}">Why Us</a></li>
            <li><a href="${contactLink}">contact</a></li>
          </ul>
          </div>
    <div class="links">
      <h2>Follow Us</h2>
      <ul>
        <li>
        <a href="https://www.facebook.com/share/1CoRKkcnm3/" aria-label="Facebook" target="_blank">
        <i class="fab fa-facebook-f"></i> Facebook
        </a>
        </li>
      <li>
        <a href="https://www.instagram.com/__rent_a_local_friend_luxor?igsh=aWhlNDJvOXQ4cWg1" aria-label="Instagram" target="_blank">
        <i class="fab fa-instagram"></i> Instagram
        </a>
        </li>
        <li>
        <a href="https://www.tiktok.com/starrent.a.local.frie?_r=1&_t=zs-95uofixj8cr" aria-label="TikTok" target="_blank">
        <i class="fab fa-tiktok"></i> TikTok
        </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="footer-logo">
        <a href="${logoLink}" class="link-logo">
        <span class="logo-icon">
        <img class="img-logo" src="${prefix}gallary/remove.photos-removed-background.png" alt="" />
        </span>
        <span class="name-logo">Rent A Local Friend</span>
        </a>
  </div>
  <div class="copyright">
    <p>intellectual property rights reserved Rent A Local Friend @ 2026</p>
  </div>
  </div>
  <div class="shabe-down">
  <img src="${prefix}gallary/footer i (1).png" alt="" />
  </div>
  
  `;
}

function mountFooter() {
  const footerPlaceholder = document.getElementById("footerPlaceholder");
  if (!footerPlaceholder) return;
  footerPlaceholder.innerHTML = getFooterMarkup();
}
mountFooter();

// ============================================================
// نظام تقييم الصديق المحلي - JavaScript
// يدعم: تقييم بالنجوم، إضافة تعليقات، حذف التعليقات الخاصة خلال دقيقة
// التخزين المحلي (localStorage) يحافظ على البيانات بعد تحديث الصفحة
// ============================================================

// مفاتيح التخزين المحلي
const STORAGE_KEY = "localFriendRatings";
const REVIEWS_STORAGE_KEY = "localFriendReviewsList";
const SESSION_ID_KEY = "userSessionId";

// الحصول على معرف جلسة فريد للمستخدم (يستمر حتى إغلاق المتصفح)
let userSessionId = sessionStorage.getItem(SESSION_ID_KEY);
if (!userSessionId) {
  userSessionId =
    "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 8);
  sessionStorage.setItem(SESSION_ID_KEY, userSessionId);
}

// بيانات التقييمات الإجمالية
let ratingsData = {
  totalStars: 0, // مجموع النجوم
  count: 0, // عدد المراجعين
  userRating: 0, // تقييم المستخدم الحالي
};

// مصفوفة المراجعات
let reviewsArray = [];

// ========== دوال المراجعات الوهمية والتخزين ==========
// إنشاء مراجعات وهمية أولية (بدون معرف جلسة وتوقيت)
function initMockReviews() {
  return [
    {
      name: "Sarah James",
      rating: 5,
      comment:
        "Ahmed was an amazing guide! He made us feel like family. Highly recommend!",
      date: "2025-05-15",
      sessionId: null,
      timestamp: null,
    },
    {
      name: "Michael Chen",
      rating: 4,
      comment:
        "Very friendly and knowledgeable. Helped us navigate Luxor easily.",
      date: "2025-05-10",
      sessionId: null,
      timestamp: null,
    },
    {
      name: "Emma Watson",
      rating: 5,
      comment:
        "Best experience ever! Our local friend was kind, funny and professional.",
      date: "2025-05-05",
      sessionId: null,
      timestamp: null,
    },
    {
      name: "David Miller",
      rating: 3,
      comment: "Good but sometimes language barrier. Still helpful overall.",
      date: "2025-04-28",
      sessionId: null,
      timestamp: null,
    },
    {
      name: "Olivia Brown",
      rating: 5,
      comment: "Absolutely fantastic! Felt like traveling with a close friend.",
      date: "2025-04-20",
      sessionId: null,
      timestamp: null,
    },
  ];
}

// تحميل المراجعات من localStorage
function loadReviews() {
  const storedReviews = localStorage.getItem(REVIEWS_STORAGE_KEY);
  if (storedReviews) {
    try {
      reviewsArray = JSON.parse(storedReviews);
    } catch (e) {
      console.warn(e);
    }
  }
  if (!reviewsArray || reviewsArray.length === 0) {
    reviewsArray = initMockReviews();
    saveReviews();
  }
}

// حفظ المراجعات في localStorage
function saveReviews() {
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviewsArray));
}

// ========== دوال التقييمات العامة ==========
// مزامنة بيانات التقييمات (المتوسط والعدد) من مصفوفة المراجعات
function syncRatingsFromReviews() {
  let total = 0;
  for (let rev of reviewsArray) total += rev.rating;
  ratingsData.totalStars = total;
  ratingsData.count = reviewsArray.length;
  saveRatings();
  updateUI();
}

// تحميل بيانات التقييمات من localStorage
function loadRatings() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const data = JSON.parse(stored);
      ratingsData.totalStars = data.totalStars || 0;
      ratingsData.count = data.count || 0;
      ratingsData.userRating = data.userRating || 0;
    } catch (e) {
      console.warn(e);
    }
  } else {
    const mock = initMockReviews();
    let total = 0;
    for (let rev of mock) total += rev.rating;
    ratingsData.totalStars = total;
    ratingsData.count = mock.length;
    ratingsData.userRating = 0;
    saveRatings();
  }
  if (ratingsData.count === 0 && ratingsData.totalStars === 0) {
    ratingsData.totalStars = 0;
    ratingsData.count = 0;
  }
  updateUI();
}

// حفظ بيانات التقييمات
function saveRatings() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      totalStars: ratingsData.totalStars,
      count: ratingsData.count,
      userRating: ratingsData.userRating,
    }),
  );
}

// حساب متوسط التقييم
function getAverage() {
  if (ratingsData.count === 0) return 0;
  return ratingsData.totalStars / ratingsData.count;
}

// عرض النجوم الثابتة بناءً على المتوسط (يدعم نصف نجمة)
function updateStaticStars(average) {
  const container = document.getElementById("staticStarsPreview");
  if (!container) return;
  const fullStars = Math.floor(average);
  const hasHalf = average - fullStars >= 0.25;
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      html += '<i class="fas fa-star"></i>';
    } else if (i === fullStars + 1 && hasHalf) {
      html += '<i class="fas fa-star-half-alt"></i>';
    } else {
      html += '<i class="far fa-star"></i>';
    }
  }
  container.innerHTML = html;
}

// تحديث واجهة المستخدم بالكامل (المتوسط، النجوم، الرسائل)
function updateUI() {
  const avg = getAverage();
  document.getElementById("avgRating").innerText = avg.toFixed(1);
  const reviewCountSpan = document.getElementById("reviewCount");
  reviewCountSpan.innerText =
    ratingsData.count + (ratingsData.count === 1 ? " review" : " reviews");
  updateStaticStars(avg);

  // تحديث النجوم التفاعلية حسب تقييم المستخدم
  const stars = document.querySelectorAll(".star");
  const userRating = ratingsData.userRating;
  stars.forEach((star) => {
    const val = parseInt(star.getAttribute("data-value"));
    if (userRating >= val) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });

  // رسالة التغذية الراجعة حسب التقييم
  const feedbackDiv = document.getElementById("feedbackMsg");
  if (ratingsData.userRating > 0) {
    let msg = "";
    switch (ratingsData.userRating) {
      case 1:
        msg = "🙏 Thank you for rating ⭐. You can now write a comment.";
        break;
      case 2:
        msg = "📝 Thanks! We appreciate your feedback.";
        break;
      case 3:
        msg = "👍 Good rating! Tell us more in the comment.";
        break;
      case 4:
        msg = "😊 Great! Please share your experience.";
        break;
      case 5:
        msg = "🌟 Excellent! We would love to read your review.";
        break;
      default:
        msg = "Thank you for rating!";
    }
    feedbackDiv.innerHTML = `<span style="color:#2b6a5c;"><i class="fas fa-check-circle"></i> ${msg}</span>`;
  } else {
    feedbackDiv.innerHTML = `<span style="color:#7f8c8d;">⭐ Click on any star to rate your Local Friend ⭐</span>`;
  }

  // رسالة ترحيبية مخصصة في الأسفل
  const personalMsgBox = document.getElementById("personalMessage");
  if (ratingsData.userRating >= 4) {
    personalMsgBox.innerHTML =
      '<i class="fas fa-crown"></i> You are a fan of local experiences! Share your review. 🌟';
  } else if (ratingsData.userRating >= 1) {
    personalMsgBox.innerHTML =
      '<i class="fas fa-hands-helping"></i> Your feedback helps improve the service, write a comment!';
  } else {
    personalMsgBox.innerHTML =
      '<i class="fas fa-star-of-life"></i> Rate your Local Friend and leave a review today!';
  }
}

// ========== دوال التفاعل مع النجوم ==========
// تعيين تقييم المستخدم (عند النقر على نجمة)
function setUserRating(starValue) {
  const oldRating = ratingsData.userRating;
  if (oldRating === starValue && oldRating !== 0) {
    // إلغاء التقييم إذا نقر على نفس النجمة
    ratingsData.userRating = 0;
    saveRatings();
    updateUI();
    showTemporaryMessage(
      "🗑️ Your star rating has been removed. You can rate again.",
    );
    return;
  }
  ratingsData.userRating = starValue;
  saveRatings();
  updateUI();
  const starElement = document.querySelector(
    `.star[data-value="${starValue}"]`,
  );
  if (starElement) {
    starElement.classList.add("selected");
    setTimeout(() => starElement.classList.remove("selected"), 300);
  }
  showTemporaryMessage(
    `✅ You selected ${starValue} stars! Now write your comment and submit.`,
  );
}

// ========== دوال إضافة وحذف التعليقات ==========
// إضافة تعليق جديد للمستخدم
function submitReview() {
  const userName = document.getElementById("reviewerName").value;
  const userComment = document.getElementById("reviewComment").value;
  const currentRating = ratingsData.userRating;

  if (currentRating === 0) {
    alert("Please select a star rating before submitting.");
    return;
  }
  if (!userComment.trim()) {
    alert("Please write a comment before submitting.");
    return;
  }

  const newReview = {
    name: userName.trim() === "" ? "Guest" : userName.trim(),
    rating: currentRating,
    comment: userComment.trim(),
    date: new Date().toISOString().slice(0, 10),
    sessionId: userSessionId, // معرف المستخدم للتحكم بالحذف
    timestamp: Date.now(), // وقت الإضافة لحساب مدة الحذف
  };
  reviewsArray.unshift(newReview);
  saveReviews();
  syncRatingsFromReviews();

  // مسح الحقول
  document.getElementById("reviewComment").value = "";
  document.getElementById("reviewerName").value = "";

  showTemporaryMessage(
    "✨ Thank you! Your review has been added. You can delete it within 1 minute.",
  );

  const modal = document.getElementById("reviewsModal");
  if (modal.style.display === "flex") {
    displayReviewsInModal();
  }

  // تحديث أزرار الحذف بعد 60 ثانية (دقيقة واحدة)
  setTimeout(() => {
    if (modal.style.display === "flex") {
      displayReviewsInModal();
    }
  }, 60000);
}

// التحقق من صلاحية الحذف: هل التعليق للمستخدم الحالي ولم يمضِ أكثر من دقيقة؟
function canDeleteReview(review) {
  if (!review.sessionId) return false;
  if (review.sessionId !== userSessionId) return false;
  if (!review.timestamp) return false;
  const now = Date.now();
  const diffMs = now - review.timestamp;
  const diffMinutes = diffMs / (1000 * 60);
  return diffMinutes < 1;
}

// حذف تعليق معين
function deleteReview(index) {
  const review = reviewsArray[index];
  if (!canDeleteReview(review)) {
    alert("You can only delete your own reviews within 1 minute of posting.");
    return;
  }
  if (
    confirm(
      "Are you sure you want to delete your review? This action cannot be undone.",
    )
  ) {
    reviewsArray.splice(index, 1);
    saveReviews();
    syncRatingsFromReviews();
    const modal = document.getElementById("reviewsModal");
    if (modal.style.display === "flex") {
      displayReviewsInModal();
    }
    showTemporaryMessage("🗑️ Your review has been deleted.");
  }
}

// ========== دوال عرض المودال وقائمة المراجعات ==========
// عرض المراجعات داخل النافذة المنبثقة مع أزرار الحذف إن أمكن
function displayReviewsInModal() {
  const container = document.getElementById("reviewsList");
  if (!container) return;
  if (reviewsArray.length === 0) {
    container.innerHTML =
      "<p>No reviews yet. Be the first to leave a review!</p>";
    return;
  }
  let html = "";
  reviewsArray.forEach((rev, idx) => {
    let starsHtml = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rev.rating) starsHtml += '<i class="fas fa-star"></i>';
      else starsHtml += '<i class="far fa-star"></i>';
    }
    const showDelete = canDeleteReview(rev);
    html += `
            <div class="review-item">
                <div class="review-header">
                    <span class="review-name">${escapeHtml(rev.name)}</span>
                    <span class="review-stars">${starsHtml}</span>
                </div>
                <div class="review-comment">${escapeHtml(rev.comment)}</div>
                <div class="review-footer">
                    <span class="review-date">${rev.date}</span>
                    ${showDelete ? `<button class="delete-review" data-idx="${idx}"><i class="fas fa-trash-alt"></i> Delete (within 1 min)</button>` : ""}
                </div>
            </div>
        `;
  });
  container.innerHTML = html;

  // ربط أزرار الحذف بالأحداث
  document.querySelectorAll(".delete-review").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute("data-idx"));
      deleteReview(idx);
    });
  });
}

// عرض رسالة مؤقتة في منطقة التغذية الراجعة
function showTemporaryMessage(msg) {
  const feedbackDiv = document.getElementById("feedbackMsg");
  feedbackDiv.innerHTML = `<span style="color:#1f6e5c;"><i class="fas fa-smile-wink"></i> ${msg}</span>`;
  setTimeout(() => {
    updateUI();
  }, 2000);
}

// ========== دوال إعادة الضبط ==========
// إعادة ضبط جميع التقييمات والمراجعات إلى الوضع الافتراضي
function resetAllRatings() {
  if (
    confirm(
      "⚠️ Are you sure? All ratings and reviews will be reset to default. This cannot be undone.",
    )
  ) {
    reviewsArray = initMockReviews();
    saveReviews();
    syncRatingsFromReviews();
    ratingsData.userRating = 0;
    saveRatings();
    updateUI();
    showTemporaryMessage(
      "✨ Ratings and reviews have been reset to default ✨",
    );
  }
}

// ========== دوال مساعدة وأمان ==========
// تنقية النصوص لحماية من XSS
function escapeHtml(str) {
  return str.replace(/[&<>]/g, function (m) {
    if (m === "&") return "&amp;";
    if (m === "<") return "&lt;";
    if (m === ">") return "&gt;";
    return m;
  });
}

// ========== ربط الأحداث (Event Binding) ==========
function bindEvents() {
  // نجوم التقييم
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = parseInt(star.getAttribute("data-value"));
      setUserRating(value);
    });
  });

  // زر إعادة الضبط
  const resetBtn = document.getElementById("resetRatingsBtn");
  if (resetBtn) resetBtn.addEventListener("click", resetAllRatings);

  // زر إرسال التعليق
  const submitBtn = document.getElementById("submitReviewBtn");
  if (submitBtn) submitBtn.addEventListener("click", submitReview);

  // فتح وإغلاق مودال المراجعات - تم إضافة onclick مباشرة في HTML لضمان الإغلاق
  // لكننا نحتفظ بحدث الفتح والمغلاق الخارجي
  const reviewCountSpan = document.getElementById("reviewCount");
  const modal = document.getElementById("reviewsModal");

  reviewCountSpan.addEventListener("click", () => {
    displayReviewsInModal();
    modal.style.display = "flex";
  });

  // إغلاق المودال عند النقر خارج المحتوى
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

// ========== تهيئة الصفحة ==========
function init() {
  loadReviews();
  loadRatings();
  bindEvents();
}
if (isHomePage) {
  init();
} else {
  console.log("Ratings system is only initialized on the Home page.");
}
// social-icons.js

function getSocialIconsMarkup() {
  // ========== إعدادات الروابط ==========
  const SOCIAL_URLS = {
    facebook: "https://www.facebook.com/share/1CoRKkcnm3/",
    whatsapp: "https://wa.me/201096406581",
    instagram:
      "https://www.instagram.com/__rent_a_local_friend_luxor?igsh=aWhlNDJvOXQ4cWg1",
  };
  const NAMES = {
    facebook: "Facebook",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
  };
  // =====================================

  const platforms = ["facebook", "whatsapp", "instagram"];

  const itemsHTML = platforms
    .map((platform) => {
      const url = SOCIAL_URLS[platform];
      const name = NAMES[platform];
      let iconClass = "";
      if (platform === "facebook") iconClass = "fab fa-facebook-f";
      else if (platform === "whatsapp") iconClass = "fab fa-whatsapp";
      else if (platform === "instagram") iconClass = "fab fa-instagram";

      return `
      <li>
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="social-item ${platform}">
          <i class="${iconClass}"></i>
          <span class="social-name">${name}</span>
        </a>
      </li>
    `;
    })
    .join("");

  return `
    <ul class="social-icons-stack" style="display:flex;flex-direction:column;gap:16px;list-style:none;margin:0;padding:0;">
      ${itemsHTML}
    </ul>
  `;
}

function mountSocialIcons() {
  const root = document.getElementById("socialIconsRoot");
  if (!root) return console.warn("Social Icons Root element not found");

  root.innerHTML = getSocialIconsMarkup();

  // تأكيد الستايل الأساسي للعنصر الجذر
  root.style.position = "fixed";
  root.style.bottom = "25px";
  root.style.right = "25px";
  root.style.zIndex = "9999999"; // فوق أي مودال
  root.style.direction = "ltr";

  // إضافة الـ CSS الداينميك مرة واحدة
  if (!document.getElementById("social-icons-dynamic-styles")) {
    const style = document.createElement("style");
    style.id = "social-icons-dynamic-styles";
    style.textContent = `
      #socialIconsRoot .social-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 58px;
        height: 58px;
        background-color: #FFFBF2;
        border-radius: 50%;
        box-shadow: 0 6px 14px rgba(0,0,0,0.1), 0 0 0 2px rgba(212,175,55,0.25);
        transition: all 0.25s ease;
        text-decoration: none;
        cursor: pointer;
      }
      #socialIconsRoot .social-item i {
        font-size: 32px;
        color: #D4AF37;
        transition: all 0.25s ease;
      }
      #socialIconsRoot .social-name {
        position: absolute;
        right: calc(100% + 12px);
        top: 50%;
        transform: translateY(-50%) translateX(8px);
        background: #FEF3DF;
        color: #A67C2E;
        font-weight: bold;
        font-size: 0.85rem;
        padding: 5px 12px;
        border-radius: 40px;
        white-space: nowrap;
        font-family: 'Segoe UI', Tahoma, system-ui;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border: 1px solid #E6D2A4;
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
      }
      #socialIconsRoot .social-item:hover {
        background: #FFF9EF;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15), 0 0 0 3px rgba(212,175,55,0.4);
        transform: scale(1.02);
      }
      #socialIconsRoot .social-item:hover i {
        transform: scale(1.1);
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
      }
      #socialIconsRoot .social-item:hover .social-name {
        opacity: 1;
        visibility: visible;
        transform: translateY(-50%) translateX(0);
      }
      #socialIconsRoot .social-item.facebook:hover i { color: #1877F2; }
      #socialIconsRoot .social-item.whatsapp:hover i { color: #25D366; }
      #socialIconsRoot .social-item.instagram:hover i { color: #E4405F; }

      @media (max-width: 580px) {
        #socialIconsRoot { bottom: 18px !important; right: 18px !important; }
        #socialIconsRoot .social-item { width: 50px !important; height: 50px !important; }
        #socialIconsRoot .social-item i { font-size: 28px !important; }
        #socialIconsRoot .social-name { font-size: 0.7rem !important; padding: 4px 10px !important; right: calc(100% + 8px) !important; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Call the function (defined immediately like mountFooter)
mountSocialIcons();

// test
// ======================= EmailJS Configuration =======================
const EMAILJS_CONFIG = {
  PUBLIC_KEY: "U4ndY0BY0Rrok1c45",
  SERVICE_ID: "service_9x26f6h",
  TEMPLATE_ID: "template_pkx0j8f",
};

if (isHomePage) {
  let emailJSReady = false;
  if (
    EMAILJS_CONFIG.PUBLIC_KEY !== "YOUR_PUBLIC_KEY" &&
    EMAILJS_CONFIG.PUBLIC_KEY.length > 10
  ) {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    emailJSReady = true;
    console.log("✅ EmailJS ready for real sending");
  } else {
    console.warn(
      "⚠️ EmailJS is not set up. Simulation will be used (code appears in console only).",
    );
  }

  // دالة إرسال البريد الإلكتروني مع إظهار الكود عند الفشل
  async function sendVerificationEmail(email, name, code) {
    const msgDiv = document.getElementById("verifyMessage");
    if (emailJSReady) {
      try {
        const templateParams = {
          email: email,
          name: name,
          code: code,
          message: `Your verification code is: ${code}`,
        };
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
        );
        console.log(`✅ Code ${code} sent successfully to ${email}`);
        if (msgDiv) msgDiv.innerHTML = "";
        return true;
      } catch (err) {
        console.error("❌ Failed to send email:", err);
        if (msgDiv)
          msgDiv.innerHTML = `⚠️ Email failed. Your code is: <b>${code}</b> (shown for testing).`;
        return false;
      }
    } else {
      console.log(`📧 [Simulation] Code ${code} sent to ${email}`);
      if (msgDiv)
        msgDiv.innerHTML = `📧 [Simulation] Your code is: <b>${code}</b>`;
      setTimeout(() => {
        if (msgDiv && msgDiv.innerHTML.includes("Simulation"))
          msgDiv.innerHTML = "";
      }, 4000);
      return true;
    }
  }

  // ===================== نظام المصادقة =====================
  let currentUser = null;
  const STORAGE_USERS = "local_friend_users";
  const STORAGE_CURRENT = "local_friend_current";
  let pendingVerification = null;

  function loadUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_USERS) || "[]");
  }
  function saveUsers(users) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
  }
  function saveCurrentUser(user) {
    currentUser = user;
    if (user) localStorage.setItem(STORAGE_CURRENT, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_CURRENT);
    updateNavAuthUI();
  }
  function getStoredSession() {
    const stored = localStorage.getItem(STORAGE_CURRENT);
    if (stored) {
      currentUser = JSON.parse(stored);
      return currentUser;
    }
    return null;
  }
  function emailExistsAny(email) {
    return loadUsers().some((u) => u.email === email);
  }
  function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // طلب التحقق لحساب جديد (التسجيل)
  async function requestEmailVerification(name, email, password) {
    const code = generateCode();
    pendingVerification = { name, email, password, code };
    await sendVerificationEmail(email, name, code);
    document.getElementById("verifyEmailDisplay").innerText = email;
    document.getElementById("verifyModal").classList.add("active");
    for (let i = 1; i <= 6; i++)
      document.getElementById(`digit${i}`).value = "";
    document.getElementById("digit1").focus();
  }

  // إعادة إرسال كود التحقق لحساب موجود غير مفعّل (تسجيل الدخول)
  async function resendVerificationForLogin(email) {
    const users = loadUsers();
    const user = users.find((u) => u.email === email && u.verified !== true);
    if (!user) return false;

    const name = user.name || email.split("@")[0];
    const code = generateCode();
    pendingVerification = {
      name,
      email,
      password: null,
      code,
      existingUserId: user.id,
    };
    await sendVerificationEmail(email, name, code);
    document.getElementById("verifyEmailDisplay").innerText = email;
    document.getElementById("verifyModal").classList.add("active");
    for (let i = 1; i <= 6; i++)
      document.getElementById(`digit${i}`).value = "";
    document.getElementById("digit1").focus();
    return true;
  }

  function closeVerifyModal() {
    document.getElementById("verifyModal").classList.remove("active");
    pendingVerification = null;
  }

  // إكمال التحقق (للحسابات الجديدة أو تفعيل الحسابات الموجودة)
  async function completeVerification(enteredCode) {
    if (!pendingVerification) {
      closeVerifyModal();
      return false;
    }
    if (enteredCode !== pendingVerification.code) {
      document.getElementById("verifyMessage").innerHTML =
        "❌ Incorrect code. Please try again.";
      return false;
    }

    const users = loadUsers();

    // تفعيل حساب موجود (حالة استعادة التحقق)
    if (pendingVerification.existingUserId) {
      const user = users.find(
        (u) => u.id === pendingVerification.existingUserId,
      );
      if (user) {
        user.verified = true;
        saveUsers(users);
        const sessionUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          provider: user.provider,
          avatar: user.avatar,
        };
        saveCurrentUser(sessionUser);
        closeVerifyModal();
        showToastMsg("✅ Account verified! You are now logged in.");
        return true;
      }
    }

    // تسجيل مستخدم جديد
    if (emailExistsAny(pendingVerification.email)) {
      document.getElementById("verifyMessage").innerHTML =
        "❌ This email is already registered. Please log in.";
      setTimeout(() => closeVerifyModal(), 1500);
      return false;
    }

    const newUser = {
      id: Date.now(),
      name: pendingVerification.name,
      email: pendingVerification.email,
      password: btoa(pendingVerification.password),
      provider: "local",
      verified: true,
      avatar: pendingVerification.name.charAt(0).toUpperCase(),
    };
    users.push(newUser);
    saveUsers(users);
    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      provider: "local",
      avatar: newUser.avatar,
    };
    saveCurrentUser(sessionUser);
    closeVerifyModal();
    showToastMsg(`✅ Account verified successfully! Welcome ${newUser.name}`);
    return true;
  }

  async function resendCode() {
    if (pendingVerification) {
      const newCode = generateCode();
      pendingVerification.code = newCode;
      await sendVerificationEmail(
        pendingVerification.email,
        pendingVerification.name,
        newCode,
      );
      document.getElementById("verifyMessage").innerHTML =
        "✨ A new code has been sent to your email.";
    } else closeVerifyModal();
  }

  async function registerWithVerification(name, email, password) {
    if (emailExistsAny(email))
      return {
        success: false,
        error: "Email already registered. Please log in.",
      };
    if (password.length < 6)
      return {
        success: false,
        error: "Password must be at least 6 characters.",
      };
    await requestEmailVerification(name, email, password);
    return { success: true, pending: true };
  }

  // تسجيل الدخول: يتعامل مع الحسابات غير المفعلة بإعادة إرسال الكود
  function loginUser(email, password) {
    const users = loadUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      return { success: false, error: "No account found with this email." };
    }

    if (!user.verified) {
      resendVerificationForLogin(email);
      return {
        success: false,
        error: "Account not verified. A new code has been sent to your email.",
        pendingVerification: true,
      };
    }

    if (user.password !== btoa(password)) {
      return { success: false, error: "Incorrect password." };
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      provider: user.provider,
      avatar: user.avatar,
    };
    saveCurrentUser(sessionUser);
    return { success: true, user: sessionUser };
  }

  function mockGoogleLogin() {
    const mockEmail = prompt(
      "Google email (demo):",
      `user_${Date.now()}@gmail.com`,
    );
    if (!mockEmail) return;
    let displayName = prompt("Full name:", "Guest Traveler");
    if (!displayName) displayName = "Google User";
    let users = loadUsers();
    let existing = users.find((u) => u.email === mockEmail);
    if (existing && existing.verified) {
      const sessionUser = {
        id: existing.id,
        name: existing.name,
        email: existing.email,
        provider: "google",
        avatar: existing.avatar,
      };
      saveCurrentUser(sessionUser);
      showToastMsg("Logged in with Google");
      closeAuthModal();
    } else {
      if (existing && !existing.verified)
        users = users.filter((u) => u.email !== mockEmail);
      const newUser = {
        id: Date.now(),
        name: displayName,
        email: mockEmail,
        password: null,
        provider: "google",
        verified: true,
        avatar: displayName.charAt(0).toUpperCase(),
      };
      users.push(newUser);
      saveUsers(users);
      const sessionUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        provider: "google",
        avatar: newUser.avatar,
      };
      saveCurrentUser(sessionUser);
      showToastMsg("Google account created and automatically verified.");
      closeAuthModal();
    }
    updateNavAuthUI();
  }

  function logout() {
    saveCurrentUser(null);
    showToastMsg("Logged out");
    updateNavAuthUI();
  }
  function showToastMsg(msg) {
    const toast = document.getElementById("bookingToast");
    if (toast) {
      toast.textContent = msg;
      toast.style.opacity = "1";
      setTimeout(() => (toast.style.opacity = "0"), 2500);
    } else alert(msg);
  }

  const authModalEl = document.getElementById("authModal");
  function openAuthModal() {
    authModalEl.classList.add("active");
  }
  function closeAuthModal() {
    authModalEl.classList.remove("active");
    document.getElementById("loginError").innerText = "";
    document.getElementById("signupError").innerText = "";
  }

  function updateNavAuthUI() {
    const existingStatus = document.querySelector(".user-status");
    if (existingStatus) existingStatus.remove();
    if (currentUser) {
      const statusDiv = document.createElement("div");
      statusDiv.className = "user-status";
      statusDiv.innerHTML = `<div class="user-avatar">${currentUser.avatar}</div>
      <span style="color:var(--dark);">${currentUser.name.split(" ")[0]}</span>
      <button id="navLogoutBtn" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</button>`;
      const insertPoint = document.querySelector(".nav-container");
      if (insertPoint)
        insertPoint.insertAdjacentElement("afterbegin", statusDiv);
      document
        .getElementById("navLogoutBtn")
        ?.addEventListener("click", logout);
    } else {
      const guestBtn = document.createElement("div");
      guestBtn.className = "user-status";
      guestBtn.innerHTML = `<button id="showAuthBtn" style="background:var(--gold-light); border:none; border-radius:60px; padding:6px 16px; font-weight:bold; cursor:pointer;"><i class="fas fa-user-plus"></i> Login / Register</button>`;
      const target = document.querySelector(".nav-container");
      if (target) target.insertAdjacentElement("afterbegin", guestBtn);
      document
        .getElementById("showAuthBtn")
        ?.addEventListener("click", openAuthModal);
    }
  }

  const modalOverlay = document.getElementById("globalModal");
  function closeModal() {
    modalOverlay.classList.remove("active");
  }

  function interceptBookingClicks() {
    document.body.addEventListener("click", (e) => {
      let target = e.target.closest("button, a");
      if (!target) return;
      const isBooking =
        target.innerText.toLowerCase().includes("book") ||
        target.classList?.contains("book-btn");
      if (isBooking && !currentUser) {
        e.preventDefault();
        e.stopPropagation();
        showToastMsg("Please log in to book a local facility");
        openAuthModal();
      }
    });
  }

  function bindVerificationUI() {
    for (let i = 1; i <= 6; i++) {
      const inp = document.getElementById(`digit${i}`);
      inp.addEventListener("input", (e) => {
        if (e.target.value.length === 1 && i < 6)
          document.getElementById(`digit${i + 1}`).focus();
      });
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && e.target.value.length === 0 && i > 1)
          document.getElementById(`digit${i - 1}`).focus();
      });
    }
    document
      .getElementById("verifySubmitBtn")
      ?.addEventListener("click", () => {
        let code = "";
        for (let i = 1; i <= 6; i++)
          code += document.getElementById(`digit${i}`).value;
        if (code.length === 6) completeVerification(code);
        else
          document.getElementById("verifyMessage").innerHTML =
            "Please enter the 6-digit code.";
      });
    document
      .getElementById("resendCodeBtn")
      ?.addEventListener("click", resendCode);
    document
      .getElementById("cancelVerifyBtn")
      ?.addEventListener("click", () => {
        closeVerifyModal();
        pendingVerification = null;
      });
  }

  function initAuthEvents() {
    document
      .getElementById("doLoginBtn")
      ?.addEventListener("click", async () => {
        const email = document.getElementById("loginEmail").value.trim();
        const pwd = document.getElementById("loginPassword").value;
        if (!email || !pwd) {
          document.getElementById("loginError").innerText =
            "Email and password are required";
          return;
        }
        const res = loginUser(email, pwd);
        if (res.success) {
          closeAuthModal();
          showToastMsg(`Welcome ${res.user.name}`);
          updateNavAuthUI();
        } else if (res.pendingVerification) {
          closeAuthModal();
          showToastMsg("We sent a new code to your email. Please verify.");
        } else {
          document.getElementById("loginError").innerText = res.error;
        }
      });

    document
      .getElementById("doSignupBtn")
      ?.addEventListener("click", async () => {
        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const pwd = document.getElementById("signupPassword").value;
        if (!name || !email || !pwd) {
          document.getElementById("signupError").innerText =
            "All fields are required";
          return;
        }
        const res = await registerWithVerification(name, email, pwd);
        if (res.success && res.pending) {
          closeAuthModal();
        } else if (!res.success)
          document.getElementById("signupError").innerText = res.error;
      });

    document
      .getElementById("googleMockLogin")
      ?.addEventListener("click", () => mockGoogleLogin());
    document
      .getElementById("googleMockSignup")
      ?.addEventListener("click", () => mockGoogleLogin());
    document
      .getElementById("closeAuthModalBtn")
      ?.addEventListener("click", () => {
        closeAuthModal();
        if (modalOverlay) closeModal();
      });

    const tabs = document.querySelectorAll(".auth-tab");
    const loginDiv = document.getElementById("loginForm"),
      signupDiv = document.getElementById("signupForm");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const type = tab.dataset.tab;
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        if (type === "login") {
          loginDiv.classList.add("active-form");
          signupDiv.classList.remove("active-form");
        } else {
          signupDiv.classList.add("active-form");
          loginDiv.classList.remove("active-form");
        }
        document.getElementById("loginError").innerText = "";
        document.getElementById("signupError").innerText = "";
      });
    });

    window.addEventListener("click", (e) => {
      if (e.target === authModalEl) closeAuthModal();
    });
  }

  // ========== واجهة المستخدم المخصصة ==========
  function updateCustomAuthUI() {
    const userStatusContainer = document.getElementById("customUserStatus");
    const loginBtn = document.getElementById("customLoginBtn");

    if (!userStatusContainer || !loginBtn) return;

    if (currentUser) {
      loginBtn.style.display = "none";
      userStatusContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; background: #2a2a2a; padding: 5px 12px; border-radius: 60px;">
          <span style="color: #d4af37;">👋 ${currentUser.name.split(" ")[0]}</span>
          <button id="manualLogoutBtn" style="background: none; border: 1px solid #d4af37; color: #d4af37; border-radius: 60px; padding: 4px 12px; cursor: pointer;">Logout</button>
        </div>
      `;
      document
        .getElementById("manualLogoutBtn")
        ?.addEventListener("click", () => {
          logout();
          updateCustomAuthUI();
        });
    } else {
      loginBtn.style.display = "inline-block";
      userStatusContainer.innerHTML = "";
    }
  }

  const originalLogout = logout;
  logout = function () {
    originalLogout();
    updateCustomAuthUI();
  };

  const originalSaveCurrentUser = saveCurrentUser;
  saveCurrentUser = function (user) {
    originalSaveCurrentUser(user);
    updateCustomAuthUI();
  };

  document.getElementById("customLoginBtn")?.addEventListener("click", () => {
    openAuthModal();
  });

  document.addEventListener("DOMContentLoaded", () => {
    updateCustomAuthUI();
  });

  // بدء التشغيل
  getStoredSession();
  updateNavAuthUI();
  interceptBookingClicks();
  initAuthEvents();
  bindVerificationUI();

  setTimeout(() => {
    const cards = document.querySelectorAll(
      "#guidesIntro .guide-card, #guidesIntro .companion-card",
    );
  }, 500);
}
// test
(function () {
  // بيانات أعضاء الفريق – صور حقيقية بحجم أكبر
  const teamMembers = [
    {
      name: "Capturing client satisfaction after a memorable tour",
      image: "gallary/1.png",
    },
    {
      name: "Expert museum guidance for a rich cultural experience",
      image: "gallary/2.png",
    },
    {
      name: "Ensuring guest comfort and top service at every step",
      image: "gallary/3.png",
    },
    {
      name: "A proud client endorsement amidst Egypt's grand monuments",
      image: "gallary/4.png",
    },
    {
      name: "Unveiling the secrets of ancient Egypt through expert guidance",
      image: "gallary/5.png",
    },
  ];

  // عناصر DOM
  const track = document.getElementById("carouselTrack");
  const dotsContainer = document.getElementById("dotsContainer");
  const memberInfo = document.getElementById("memberInfo");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;
  const total = teamMembers.length;

  // بناء الكاروسيل – صورة كاملة
  function buildCarousel() {
    track.innerHTML = "";
    dotsContainer.innerHTML = "";

    teamMembers.forEach((member, index) => {
      const card = document.createElement("div");
      card.className = "carousel-card";
      card.innerHTML = `
                <div class="card-content">
                    <img src="${member.image}" alt="${member.name}" loading="lazy">
                </div>
            `;
      track.appendChild(card);

      const dot = document.createElement("button");
      dot.className = "dot" + (index === 0 ? " active" : "");
      dot.dataset.index = index;
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }
  // تحديث معلومات العضو
  function updateMemberInfo(index) {
    const member = teamMembers[index];
    memberInfo.innerHTML = `
            <h3>${member.name}</h3>
        `;
  }

  // الانتقال إلى شريحة
  function goToSlide(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    currentIndex = index;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    updateMemberInfo(currentIndex);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // ربط الأزرار
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // التنقل بالكيبورد
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    else if (e.key === "ArrowLeft") prevSlide();
  });

  // تشغيل الكاروسيل
  buildCarousel();
  goToSlide(0);
})();
// test
