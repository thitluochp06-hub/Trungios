// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Mobile menu toggle
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.getElementById("navMenu");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-links a");
const platformTabs = document.querySelectorAll(".platform-tabs a");

if (mobileMenu && navMenu) {
  mobileMenu.addEventListener("click", function () {
    navMenu.classList.toggle("open");
    mobileMenu.classList.toggle("active");

    // Toggle high z-index on navbar when menu is open
    if (navMenu.classList.contains("open")) {
      document.body.style.overflow = "hidden";
      navbar.classList.add("menu-open");

      // Debug: Log menu state
      console.log("🍔 Menu opened:", {
        menuClasses: navMenu.className,
        menuZIndex: window.getComputedStyle(navMenu).zIndex,
        menuPosition: window.getComputedStyle(navMenu).position,
        menuOpacity: window.getComputedStyle(navMenu).opacity,
        menuVisibility: window.getComputedStyle(navMenu).visibility,
      });
    } else {
      document.body.style.overflow = "";
      navbar.classList.remove("menu-open");
      console.log("🍔 Menu closed");
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
      mobileMenu.classList.remove("active");
      navbar.classList.remove("menu-open");
      document.body.style.overflow = "";
    });
  });

  // Click backdrop to close menu
  navMenu.addEventListener("click", function (e) {
    // Close if clicking the backdrop (not the nav-links)
    if (e.target === navMenu) {
      navMenu.classList.remove("open");
      mobileMenu.classList.remove("active");
      navbar.classList.remove("menu-open");
      document.body.style.overflow = "";
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      navMenu.classList.remove("open");
      mobileMenu.classList.remove("active");
      navbar.classList.remove("menu-open");
      document.body.style.overflow = "";
    }
  });
}

if (navLinks.length) {
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

if (platformTabs.length) {
  platformTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      platformTabs.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

// Contact form handling
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector(".btn-primary");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Đang gửi...";
  submitBtn.disabled = true;

  setTimeout(() => {
    alert("Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.");
    contactForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

// Không sử dụng hiệu ứng typing để tránh mất thẻ HTML highlight
window.addEventListener("load", function () {
  const heroTitle = document.querySelector(".hero-content h1");
  // Giữ nguyên nội dung HTML có tag span.highlight
  heroTitle.style.opacity = "0";
  setTimeout(() => {
    heroTitle.style.transition = "opacity 1s ease";
    heroTitle.style.opacity = "1";
  }, 300);
});

// Removed: CSS :hover handles card animations now (better performance)

// Touch-friendly interactions for mobile (using CSS classes for better performance)
if ("ontouchstart" in window) {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("touchstart", function () {
      this.classList.add("is-pressed");
    });

    card.addEventListener("touchend", function () {
      this.classList.remove("is-pressed");
    });
  });

  // Improve button touch feedback
  document.querySelectorAll(".btn, .social-links a").forEach((btn) => {
    btn.addEventListener("touchstart", function () {
      this.classList.add("is-pressed");
    });

    btn.addEventListener("touchend", function () {
      this.classList.remove("is-pressed");
    });
  });
}

// Add loading animation
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// Expertise expand/collapse functionality
document.addEventListener("DOMContentLoaded", function () {
  const expandBtn = document.getElementById("expandBtn");
  const expertiseDetails = document.getElementById("expertiseDetails");

  if (expandBtn && expertiseDetails) {
    expandBtn.addEventListener("click", function () {
      const isExpanded = expertiseDetails.classList.contains("expanded");

      if (isExpanded) {
        // Collapse
        expertiseDetails.classList.remove("expanded");
        expandBtn.classList.remove("expanded");
        expandBtn.querySelector("span").textContent = "Xem chi tiết";
      } else {
        // Expand
        expertiseDetails.classList.add("expanded");
        expandBtn.classList.add("expanded");
        expandBtn.querySelector("span").textContent = "Thu gọn";
      }
    });
  }
});



// Tạo bộ quan sát các phần tử trên màn hình
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Nếu phần tử xuất hiện trên màn hình
    if (entry.isIntersecting) {
      entry.target.classList.add('show-element'); // Thêm class để bay lên
    }
  });
}, {
  threshold: 0.1 // Chỉ cần 10% phần tử xuất hiện là kích hoạt luôn
});

// Lấy tất cả các phần tử có class hidden-element và theo dõi chúng
const hiddenElements = document.querySelectorAll('.hidden-element');
hiddenElements.forEach((el) => observer.observe(el));

