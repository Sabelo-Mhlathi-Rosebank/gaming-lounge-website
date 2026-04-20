
let platformSelect = document.getElementById('calc-platform');
let hoursInput = document.getElementById('calc-hours');
let calcTotal = document.getElementById('calc-total');

function calculateCost() {
    let ratePerHour = parseFloat(platformSelect.value);
    let hours = parseFloat(hoursInput.value);

    if (!ratePerHour || !hours || hours <= 0) {
        calcTotal.textContent = 'R0';
        return;
    }

    let total = ratePerHour * 2 * hours;
    calcTotal.textContent = 'R' + total.toFixed(2);
}

platformSelect.addEventListener('change', calculateCost);
hoursInput.addEventListener('input', calculateCost);

let accordionBtns = document.querySelectorAll('.accordion-btn');

accordionBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        let content = this.nextElementSibling;
        let isActive = this.classList.contains('active');

        // Close all open accordions first
        accordionBtns.forEach(function(otherBtn) {
            otherBtn.classList.remove('active');
            otherBtn.nextElementSibling.style.display = 'none';
        });

        // If it was not active open it
        if (!isActive) {
            this.classList.add('active');
            content.style.display = 'block';
        }
    });
});