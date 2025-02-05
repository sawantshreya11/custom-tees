function validateForm() {
    const tagline = document.getElementById('tagline').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // Validate tagline length
    if (tagline.length > 100) {
        alert("Tagline should not exceed 100 characters.");
        return false;
    }

    // Validate phone number
    if (phone.length !== 10 || isNaN(phone)) {
        alert("Phone number must be exactly 10 digits.");
        return false;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}

function generateReceipt(formData) {
    const date = new Date();
    const receiptDate = `${date.toDateString()} ${date.toLocaleTimeString()}`;

    const receiptContent = `
        <h2>Order Receipt</h2>
        <p><strong>Date:</strong> ${receiptDate}</p>
        <p><strong>Tagline:</strong> ${formData.tagline}</p>
        <p><strong>Color:</strong> ${formData.color}</p>
        <p><strong>Size:</strong> ${formData.size}</p>
        <p><strong>Quantity:</strong> ${formData.quantity}</p>
        <p><strong>Delivery Date:</strong> ${formData.delivery_date}</p>
        <p><strong>Gift Wrap:</strong> ${formData.gift_wrap ? "Yes" : "No"}</p>
        <br>
        <h2>Delivery Details:</h2>
        <p><strong>Recipient's Name:</strong> ${formData.name}</p>
        <p><strong>Address:</strong> ${formData.address}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone Number:</strong> ${formData.phone}</p>
        <p><strong>Additional Comments:</strong> ${formData.comments}</p>
    `;

    document.getElementById('receipt').innerHTML = receiptContent;
}

function submitForm(event) {
    event.preventDefault();  

    if (validateForm()) {
        const form = document.forms[0];
        const formData = {
            tagline: form.tagline.value,
            color: form.color.value,
            size: form.size.value,
            quantity: form.quantity.value,
            delivery_date: form.delivery_date.value,
            gift_wrap: form.gift_wrap.checked,  
            name: form.name.value,
            address: form.address.value,
            email: form.email.value,
            phone: form.phone.value,
            comments: form.comments.value
        };
        generateReceipt(formData);
    }
}

window.onload = () => {
    document.forms[0].addEventListener('submit', submitForm);
};
