// form.js

const SERVICE_ID = 'service_za3ihzf';
const TEMPLATE_ID = 'template_c92i6mf';
const PUBLIC_KEY = 'UG4VQ2I7Zml4KYsOm';

document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous errors
    let errors = document.querySelectorAll('.error-message');
    errors.forEach(function(error) {
        error.remove();
    });

    let isValid = true;

    // Validate Name
    let name = document.getElementById('name').value.trim();
    if (name === '') {
        showError('name', 'Please enter your name');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }

    // Validate Email
    let email = document.getElementById('email').value.trim();
    let emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showError('email', 'Please enter your email');
        isValid = false;
    } else if (!emailFormat.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Phone
    let phone = document.getElementById('phone').value.trim();
    let phoneFormat = /^[0-9]{10}$/;
    if (phone === '') {
        showError('phone', 'Please enter your phone number');
        isValid = false;
    } else if (!phoneFormat.test(phone)) {
        showError('phone', 'Please enter a valid 10 digit phone number');
        isValid = false;
    }

    // Validate Date
    let date = document.getElementById('date').value;
    if (date === '') {
        showError('date', 'Please select a preferred date');
        isValid = false;
    }

    // Validate Time
    let time = document.getElementById('time').value;
    if (time === '') {
        showError('time', 'Please select a preferred time');
        isValid = false;
    }

    // Validate Players
    let players = document.getElementById('players').value;
    if (players === '') {
        showError('players', 'Please enter number of players');
        isValid = false;
    } else if (players < 1 || players > 20) {
        showError('players', 'Number of players must be between 1 and 20');
        isValid = false;
    }

    // Validate Platform
    let platform = document.querySelector('input[name="platform"]:checked');
    if (!platform) {
        showError('platform-group', 'Please select a platform');
        isValid = false;
    }

    // Validate Gender
    let gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        showError('gender-group', 'Please select your gender');
        isValid = false;
    }

    if (isValid) {
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this, PUBLIC_KEY)
            .then(function() {
                document.getElementById('booking-response').innerHTML = `
                    <div class="success-message">
                        <h2>Booking Request Received!</h2>
                        <p>Thank you for booking with Diepkloof Gaming Lounge.</p>
                        <p>We will contact you shortly to confirm your session.</p>
                        <a href="index.html" class="btn">Back to Home</a>
                    </div>
                `;
                document.getElementById('booking-form').reset();
            })
            .catch(function(error) {
                document.getElementById('booking-response').innerHTML = `
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
    if (field) {
        let error = document.createElement('p');
        error.className = 'error-message';
        error.textContent = message;
        field.parentElement.appendChild(error);
    }
}