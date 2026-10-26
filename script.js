const $ = (id) => document.getElementById(id);

const menuBtn = $("menuBtn");
const navLinks = $("navLinks");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "×" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  });
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function updateBrief() {
  const entries = [
    ["Business type", $("businessType").value],
    ["Product", $("planProduct").value],
    ["Monthly volume", $("volume").value],
    ["Packaging", $("packaging").value],
    ["Destination", $("destination").value.trim() || "Not provided"]
  ];

  $("summaryList").innerHTML = entries
    .map(([label, value]) =>
      `<div class="summary-item">${label}<strong>${escapeHtml(value)}</strong></div>`
    )
    .join("");
}

["businessType", "planProduct", "volume", "packaging", "destination"]
  .forEach((id) => {
    $(id).addEventListener("input", updateBrief);
  });

updateBrief();

$("useBrief").addEventListener("click", () => {
  $("quoteProduct").value =
    $("planProduct").value === "Not sure yet"
      ? "Discuss product options"
      : $("planProduct").value;

  $("quoteVolume").value = $("volume").value;
  $("quotePackaging").value = $("packaging").value;
  $("quoteDestination").value = $("destination").value;

  const message =
    `Business type: ${$("businessType").value}\n` +
    `Estimated monthly requirement: ${$("volume").value}\n` +
    `Packaging preference: ${$("packaging").value}\n` +
    "Please confirm specifications, availability, MOQ, pricing and lead time.";

  $("message").value = $("message").value
    ? $("message").value + "\n\n" + message
    : message;

  $("quote").scrollIntoView({ behavior: "smooth" });
  $("name").focus({ preventScroll: true });
});

document.querySelectorAll("[data-product]").forEach((link) => {
  link.addEventListener("click", () => {
    $("quoteProduct").value = link.dataset.product;
  });
});

$("quoteForm").addEventListener("submit", (event) => {
  event.preventDefault();

  $("successMsg").style.display = "block";
  $("successMsg").textContent =
    `Thanks, ${$("name").value.trim()}. Your demo enquiry is ready on this page. ` +
    "No information has been sent or stored. Connect a real form service " +
    "and verified company contact before launch.";

  $("successMsg").scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});
