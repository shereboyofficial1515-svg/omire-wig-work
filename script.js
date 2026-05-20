let emailWatch = document.getElementById('emailWatch');
let phoneWatch = document.getElementById('phoneWatch');
let messageWatch = document.getElementById('messageWatch');
let textWatch = document.getElementById('textWatch');

let form = document.getElementById('contactForm');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.getElementById('text').value.trim();
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phoneNumber').value.trim();
    let message = document.getElementById('inputMessage').value.trim();

    clearMessages();

    let isValid = true;

    // NAME VALIDATION
    if (name === "") {
        showError(textWatch, `Name can't be empty!`);
        isValid = false;
    } else if (name.length > 30) {
        showError(textWatch, `Name can't be more than 30 characters!`);
        isValid = false;
    }

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError(emailWatch, `Please enter a valid email address!`);
        isValid = false;
    }

    // PHONE VALIDATION
    if (isNaN(phone) || phone === "") {
        showError(phoneWatch, `Phone number must contain only digits!`);
        isValid = false;
    } else if (phone.length < 11 || phone.length > 15) {
        showError(phoneWatch, `Phone number must be between 11 and 15 digits!`);
        isValid = false;
    }

    // MESSAGE VALIDATION
    if (message === "") {
        showError(messageWatch, `Message can't be empty!`);
        isValid = false;
    } else if (message.length > 500) {
        showError(messageWatch, `Message can't be more than 500 characters!`);
        isValid = false;
    }

    if (isValid) {
        sendToWhatsApp(name, email, phone, message);
    }
});

function clearMessages() {
    textWatch.innerHTML = "";
    emailWatch.innerHTML = "";
    phoneWatch.innerHTML = "";
    messageWatch.innerHTML = "";
}

function showError(element, message) {
    element.innerHTML = message;
    element.style.color = 'red';
    element.style.display = 'flex';
}

function showSuccess(element, message) {
    element.innerHTML = message;
    element.style.color = 'green';
    element.style.display = 'flex';
}

async function sendToWhatsApp(name, email, phone, message) {
    messageWatch.innerHTML = `📤 Sending message...`;
    messageWatch.style.color = 'blue';
    messageWatch.style.display = 'flex';

    try {
        const response = await fetch('http://localhost:3000/api/send-whatsapp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone, message })
        });

        const data = await response.json();

        if (response.ok) {
            showSuccess(messageWatch, `✅ Message sent to your WhatsApp!`);
            form.reset();
        } else {
            showError(messageWatch, data.error || `Failed to send message`);
        }
    } catch (error) {
        showError(messageWatch, `❌ Network error. Make sure backend is running.`);
        console.error('Error:', error);
    }
}
