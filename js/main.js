/* =====================================================================
   Scott Decorative Concrete — homepage interactions
   Minimal, dependency-free, accessible.
   ===================================================================== */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header: compact on scroll ---------- */
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) header.setAttribute("data-scrolled", "");
      else header.removeAttribute("data-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");

  function closeMenu() {
    if (!menu || !toggle) return;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
    var onEnd = function () { menu.hidden = true; menu.removeEventListener("transitionend", onEnd); };
    if (prefersReduced) { menu.hidden = true; } else { menu.addEventListener("transitionend", onEnd); }
  }

  function openMenu() {
    if (!menu || !toggle) return;
    menu.hidden = false;
    // force reflow so the transition runs
    void menu.offsetWidth;
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      open ? closeMenu() : openMenu();
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        toggle.focus();
      }
    });
    // reset if resized up to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && toggle.getAttribute("aria-expanded") === "true") closeMenu();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealables = document.querySelectorAll("[data-reveal]");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    // stagger siblings a touch for polish
    revealables.forEach(function (el) {
      var parent = el.parentElement;
      var idx = parent ? Array.prototype.indexOf.call(parent.children, el) : 0;
      el.style.transitionDelay = Math.min(idx, 5) * 60 + "ms";
      io.observe(el);
    });
  }

  /* ---------- Estimate form (shell — not wired to a backend) ---------- */
  var form = document.querySelector("[data-estimate-form]");
  if (form) {
    var status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#f-name");
      var phone = form.querySelector("#f-phone");
      if (!name.value.trim() || !phone.value.trim()) {
        if (status) { status.textContent = "Please add your name and a phone number so we can reach you."; status.removeAttribute("data-state"); }
        (!name.value.trim() ? name : phone).focus();
        return;
      }
      if (status) {
        status.setAttribute("data-state", "ok");
        status.textContent = "Thanks — this is a demo form. Connect it to email or a CRM to start receiving requests. Or call 703-996-9053.";
      }
      form.reset();
    });
  }

  /* ---------- Before / After slider ---------- */
  document.querySelectorAll("[data-ba]").forEach(function (ba) {
    var range = ba.querySelector("[data-ba-range]");
    if (!range) return;
    var apply = function () { ba.style.setProperty("--pos", range.value + "%"); };
    range.addEventListener("input", apply);
    apply();
  });

  /* ---------- Reduced-motion: pause the hero background video ---------- */
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".hero__video").forEach(function (v) {
      v.removeAttribute("autoplay");
      v.pause();
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
