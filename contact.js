// contact.js

const SERVICE_ID = 'service_za3ihzf';
const TEMPLATE_ID = 'template_fmsytca';
const PUBLIC_KEY = 'UG4VQ2I7Zml4KYsOm';

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous errors
    let errors = document.querySelectorAll('.error-message');
    errors.forEach(function(error) {
        error.remove();
    });

    let isValid = true;

    // Validate Name
    let name = document.getElementById('contact-name').value.trim();
    if (name === '') {
        showError('contact-name', 'Please enter your name');
        isValid = false;
    }

    // Validate Email
    let email = document.getElementById('contact-email').value.trim();
    let emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showError('contact-email', 'Please enter your email');
        isValid = false;
    } else if (!emailFormat.test(email)) {
        showError('contact-email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Message Type
    let messageType = document.getElementById('message-type').value;
    if (messageType === '') {
        showError('message-type', 'Please select a message type');
        isValid = false;
    }

    // Validate Message
    let message = document.getElementById('contact-message').value.trim();
    if (message === '') {
        showError('contact-message', 'Please enter your message');
        isValid = false;
    } else if (message.length < 10) {
        showError('contact-message', 'Message must be at least 10 characters');
        isValid = false;
    }

    if (isValid) {
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this, PUBLIC_KEY)
            .then(function() {
                document.getElementById('form-response').innerHTML = `
                    <div class="success-message">
                        <h2>Message Sent!</h2>
                        <p>Thank you for reaching out to us.</p>
                        <p>We will get back to you as soon as possible.</p>
                    </div>
                `;
                document.getElementById('contact-form').reset();
            })
            .catch(function(error) {
                document.getElementById('form-response').innerHTML = `
                    <div class="error-message">
                        <p>Something went wrong. Please try again.</p>
                    </div>
                `;
                console.error('EmailJS error:', error);
            });
    }
});

function showError(fieldId, message) {
    let field = document.getElementById(fieldId);
    let error = document.createElement('p');
    error.className = 'error-message';
    error.textContent = message;
    field.parentElement.appendChild(error);
}

let map = L.map('leaflet-map').setView([-26.2524, 27.9364], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker = L.marker([-26.2524, 27.9364]).addTo(map);
marker.bindPopup(`
    <b>Diepkloof Gaming Lounge</b><br>
    301 Salukwanda Street<br>
    Diepkloof, Soweto<br>
    <a href="https://maps.google.com/?q=Diepkloof,Soweto" target="_blank">
    Get Directions</a>
`).openPopup();

let messageField = document.getElementById('contact-message');
let charCounter = document.getElementById('char-counter');

messageField.addEventListener('input', function() {
    let count = this.value.length;
    let max = 500;
    charCounter.textContent = count + ' / ' + max + ' characters';

    charCounter.classList.remove('warning', 'danger');

    if (count >= 400 && count < 480) {
        charCounter.classList.add('warning');
    } else if (count >= 480) {
        charCounter.classList.add('danger');
    }
});