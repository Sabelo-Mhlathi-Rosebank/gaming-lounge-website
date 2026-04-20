
let tournamentDate = new Date('2026-05-10T14:00:00');

function updateCountdown() {
    let now = new Date();
    let difference = tournamentDate - now;

    if (difference <= 0) {
        document.getElementById('countdown').innerHTML = 
            '<p>The tournament has started. Good luck!</p>';
        return;
    }

    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = 
        days < 10 ? '0' + days : days;
    document.getElementById('hours').textContent = 
        hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').textContent = 
        minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').textContent = 
        seconds < 10 ? '0' + seconds : seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);
