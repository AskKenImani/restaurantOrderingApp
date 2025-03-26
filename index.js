document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menu-container");
    const orderSection = document.getElementById("order-section");
    const orderList = document.getElementById("order-list");
    const totalPriceElem = document.getElementById("total-price");
    const completeOrderBtn = document.getElementById("complete-order");
    const paymentModal = document.getElementById("payment-modal");
    const paymentOverlay = document.getElementById("payment-overlay");
    const closePayment = document.getElementById("close-payment");
    const payBtn = document.getElementById("pay");
    const confirmation = document.getElementById("confirmation");
    const confirmationMsg = document.getElementById("confirmation-message");
    const ratingSection = document.getElementById("rating-section");
    const ratingStars = document.getElementById("rating-stars");
    const printReceiptBtn = document.getElementById("print-receipt");

    let order = [];
    let totalAmount = 0;

    orderSection.style.display = "block";
    paymentModal.style.display = "none";
    confirmation.style.display = "none";
    ratingSection.style.display = "none";
    printReceiptBtn.style.display = "none";

    function renderMenu() {
        menuArray.forEach(item => {
            const menuItem = document.createElement("div");
            menuItem.classList.add("menu-item");
            menuItem.innerHTML = `
                <span>${item.emoji} ${item.name} - $${item.price}</span>
                <button class="add-btn" data-id="${item.id}">+</button>
            `;
            menuContainer.appendChild(menuItem);
        });

        document.querySelectorAll(".add-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                addToOrder(event.target.dataset.id);
            });
        });
    }

    function addToOrder(id) {
        const item = menuArray.find(menuItem => menuItem.id == id);
        order.push(item);
        renderOrder();
    }

    function removeFromOrder(index) {
        order.splice(index, 1);
        renderOrder();
    }

    function renderOrder() {
        orderList.innerHTML = "";
        totalAmount = 0;

        order.forEach((item, index) => {
            totalAmount += item.price;
            const orderItem = document.createElement("div");
            orderItem.classList.add("order-item");
            orderItem.innerHTML = `
                <span>${item.name} - $${item.price}</span>
                <button class="remove-btn" data-index="${index}">x</button>
            `;
            orderList.appendChild(orderItem);
        });

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                removeFromOrder(event.target.dataset.index);
            });
        });

        totalPriceElem.textContent = `Total price: $${totalAmount}`;
    }

    function showRatingSection() {
        ratingSection.style.display = "block";
        const stars = ratingStars.querySelectorAll(".star");

        stars.forEach((star, index) => {
            star.addEventListener("click", () => {
                stars.forEach(s => s.classList.remove("selected"));
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.add("selected");
                }
                alert(`You rated this order ${index + 1} stars!`);
            });
        });
    }

    completeOrderBtn.addEventListener("click", () => {
        if (order.length > 0) {
            paymentModal.style.display = "block";
            paymentOverlay.style.display = "block";
        } else {
            alert("Your cart is empty! Add items before completing the order.");
        }
    });

    closePayment.addEventListener("click", () => {
        paymentModal.style.display = "none";
        paymentOverlay.style.display = "none";
    });

    payBtn.addEventListener("click", () => {
        const name = document.getElementById("name").value.trim();
        const card = document.getElementById("card").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        if (name && card && cvv) {
            paymentModal.style.display = "none";
            paymentOverlay.style.display = "none";

            confirmation.style.display = "block";
            confirmationMsg.textContent = `Thank you, ${name}! Your order is on its way.`;

            printReceiptBtn.style.display = "block";

            showRatingSection();
        } else {
            alert("Please fill in all fields!");
        }
    });

    printReceiptBtn.addEventListener("click", () => {
        printReceipt();
    });

    function printReceipt() {
        const name = document.getElementById("name").value.trim();
        let receiptContent = `
            <html>
            <head>
                <title>Receipt</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; }
                    h2 { color: green; }
                    .receipt-container { border: 1px solid black; padding: 20px; margin: auto; width: 50%; }
                </style>
            </head>
            <body>
                <div class="receipt-container">
                    <h2>Imani's Diner Receipt</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Order Details:</strong></p>
                    <ul>
        `;

        order.forEach(item => {
            receiptContent += `<li>${item.name} - $${item.price}</li>`;
        });

        receiptContent += `
                    </ul>
                    <p><strong>Total:</strong> $${totalAmount}</p>
                    <p>Thank you for ordering with us!</p>
                </div>
            </body>
            </html>
        `;

        const receiptWindow = window.open('', '_blank');
        receiptWindow.document.write(receiptContent);
        receiptWindow.document.close();
        receiptWindow.print();
    }

    renderMenu();
});
