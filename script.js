document.addEventListener("DOMContentLoaded", () => {

    // ── Active-page nav highlight ──────────────────────────────────────────
    const currentPage = (
        window.location.pathname.split("/").pop() || "home.html"
    ).toLowerCase();

    document.querySelectorAll("#horizontal a").forEach((link) => {
        const href = (link.getAttribute("href") || "").toLowerCase();
        if (href === currentPage) {
            link.classList.add("active-page");
            link.setAttribute("aria-current", "page");
        }
    });


    // ── Contact / feedback form — email validation ─────────────────────────
    const feedbackForm = document.querySelector(".contact-form");

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", function (event) {

            const email   = document.getElementById("email");
            const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (email && !pattern.test(email.value)) {
                event.preventDefault();
                alert("Please enter a valid email address.");
            }

        });
    }


    // ── Product price calculator ───────────────────────────────────────────
    const productSelect   = document.getElementById("product");
    const quantityInput   = document.getElementById("quantity");
    const selectedPrice   = document.getElementById("selected-price");
    const stockAvailable  = document.getElementById("stock-available");
    const totalPrice      = document.getElementById("total-price");

    if (productSelect && quantityInput) {

        productSelect.addEventListener("change", updateProduct);
        quantityInput.addEventListener("input",  calculateTotal);

        function updateProduct() {

            const opt   = productSelect.options[productSelect.selectedIndex];
            const price = parseFloat(opt.dataset.price);
            const stock = parseInt(opt.dataset.stock);

            if (isNaN(price) || isNaN(stock)) {
                selectedPrice.textContent  = "₱0.00";
                stockAvailable.textContent = "0";
                quantityInput.value        = 1;
                quantityInput.disabled     = true;
                totalPrice.textContent     = "Total: ₱0.00";
                return;
            }

            selectedPrice.textContent  = "₱" + price.toFixed(2);
            stockAvailable.textContent = stock;

            quantityInput.disabled = false;
            quantityInput.min      = 1;
            quantityInput.max      = stock;
            quantityInput.value    = 1;

            calculateTotal();
        }

        function calculateTotal() {

            const opt      = productSelect.options[productSelect.selectedIndex];
            const price    = parseFloat(opt.dataset.price);
            const stock    = parseInt(opt.dataset.stock);
            let   quantity = parseInt(quantityInput.value);

            if (isNaN(price) || isNaN(quantity)) {
                totalPrice.textContent = "Total: ₱0.00";
                return;
            }

            if (quantity > stock) {
                quantity = stock;
                quantityInput.value = stock;
                alert("Only " + stock + " item(s) are available.");
            }

            if (quantity < 1) {
                quantity = 1;
                quantityInput.value = 1;
            }

            totalPrice.textContent = "Total: ₱" + (price * quantity).toFixed(2);
        }
    }


    // ── Keyboard shortcut: Y → Account page ───────────────────────────────
    document.addEventListener("keydown", function (event) {
        if (event.key.toLowerCase() === "y") {
            alert("Redirected to Account Page");
            window.location.href = "account.html";
        }
    });

});


// ── Product guide toggle (called from onclick in HTML) ─────────────────────
function toggleGuide() {
    const guide = document.getElementById("product-guide");
    if (!guide) return;
    guide.style.display = guide.style.display === "none" ? "block" : "none";
}
