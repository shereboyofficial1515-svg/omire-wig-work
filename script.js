let emailWatch = document.getElementById('emailWatch');
let phoneWatch = document.getElementById('phoneWatch');
let messageWatch = document.getElementById('messageWatch');
let textWatch = document.getElementById('textWatch');

// FORM VALIDATION
let form = document.getElementById('contactForm');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let name = document.getElementById('text').value.trim();
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phoneNumber').value.trim();
    let message = document.getElementById('inputMessage').value.trim();
    // clear previous messages
    textWatch.innerHTML = '';
    emailWatch.innerHTML = '';
    phoneWatch.innerHTML = '';
    messageWatch.innerHTML = '';
    // NAME VALIDATION
    if (name === "") {
        textWatch.innerHTML = `Name can't be empty!`;
        textWatch.style.color = 'red';
    } else if (name.length >= 30) {
        textWatch.innerHTML = `Name can't be more than 30 characters!`;
        textWatch.style.color = 'red';
    }
    // EMAIL VALIDATION
    if (!email.includes('@')) {
        emailWatch.innerHTML = `Email must include @ and .!`;
        emailWatch.style.color = 'red';
    } else if (!email.includes('.')) {
        emailWatch.innerHTML = `Email must include @ and .!`;
        emailWatch.style.color = 'red';

    }
    // PHONE NUMBER VALIDATION
    if (phone.length < 11 || phone.length > 15) {
        phoneWatch.innerHTML = `Phone number must be between 11 and 15 digits!`;
        phoneWatch.style.color = 'red';

        isValid = false;

    } else if (isNaN(phone)) {
        phoneWatch.innerHTML = `Phone number must contain only digits!`;
        phoneWatch.style.color = 'red';
        isValid = false;
    }
    // MESSAGE VALIDATION
    if (message === "") {
        messageWatch.innerHTML = `Message can't be empty!`;
        messageWatch.style.color = 'red';
    } else if (message.length >= 500) {
        messageWatch.innerHTML = `Message can't be more than 500 characters!`;
        messageWatch.style.color = 'red';
    }
});