

let triggers = document.querySelectorAll('.lightbox-trigger');
let lightbox = document.getElementById('lightbox');
let lightboxImg = document.getElementById('lightbox-img');
let lightboxCaption = document.getElementById('lightbox-caption');
let lightboxClose = document.getElementById('lightbox-close');

triggers.forEach(function(trigger) {
    trigger.addEventListener('click', function() {
        lightbox.style.display = 'flex';
        lightboxImg.src = this.getAttribute('data-src');
        lightboxCaption.textContent = this.getAttribute('data-caption');
    });
});

lightboxClose.addEventListener('click', function() {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', function(event) {
    if (event.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

let searchInput = document.getElementById('game-search');
let noResults = document.getElementById('no-results');

searchInput.addEventListener('keyup', function() {
    let searchTerm = this.value.toLowerCase().trim();
    let allLists = document.querySelectorAll('.games-category ul li');
    let visibleCount = 0;

    allLists.forEach(function(item) {
        let gameName = item.textContent.toLowerCase();
        if (gameName.includes(searchTerm)) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });

    if (visibleCount === 0 && searchTerm !== '') {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
});

let extraFpsGames = [
    'Counter-Strike 2',
    'Valorant',
    'Rainbow Six Siege',
    'Overwatch 2',
    'Battlefield 2042'
];

let extraEsportsGames = [
    'Madden NFL',
    'EA Sports UFC',
    'NBA 2K25',
    'WWE 2K24',
    'F1 24'
];

let fpsList = document.getElementById('fps-list');
let esportsList = document.getElementById('esports-list');
let loadMoreFps = document.getElementById('load-more-fps');
let loadMoreEsports = document.getElementById('load-more-esports');

loadMoreFps.addEventListener('click', function() {
    extraFpsGames.forEach(function(game) {
        let li = document.createElement('li');
        li.textContent = game;
        li.style.animation = 'fadeIn 0.5s ease';
        fpsList.appendChild(li);
    });
    loadMoreFps.style.display = 'none';
});

loadMoreEsports.addEventListener('click', function() {
    extraEsportsGames.forEach(function(game) {
        let li = document.createElement('li');
        li.textContent = game;
        li.style.animation = 'fadeIn 0.5s ease';
        esportsList.appendChild(li);
    });
    loadMoreEsports.style.display = 'none';
});

// Tournament Registration System
function loadRegistrations() {
    let registrations = JSON.parse(localStorage.getItem('tournamentRegistrations')) || [];
    let list = document.getElementById('registrations');
    list.innerHTML = '';

    if (registrations.length === 0) {
        list.innerHTML = '<li style="justify-content:center;">No registrations yet.</li>';
        return;
    }

    registrations.forEach(function(entry, index) {
        let li = document.createElement('li');
        li.innerHTML = `
            <span>
                <strong>${entry.name}</strong> - 
                ${entry.game} on ${entry.platform}
            </span>
            <button onclick="removeRegistration(${index})" 
            style="background:transparent; border:none; 
            color:rgb(255,80,80); cursor:pointer; 
            font-size:1rem;">✕</button>
        `;
        list.appendChild(li);
    });
}

function removeRegistration(index) {
    let registrations = JSON.parse(localStorage.getItem('tournamentRegistrations')) || [];
    registrations.splice(index, 1);
    localStorage.setItem('tournamentRegistrations', JSON.stringify(registrations));
    loadRegistrations();
}

document.getElementById('tournament-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('t-name').value.trim();
    let game = document.getElementById('t-game').value;
    let platform = document.getElementById('t-platform').value;
    let response = document.getElementById('tournament-response');

    if (!name || !game || !platform) {
        response.innerHTML = '<p class="error-message">Please fill in all fields.</p>';
        return;
    }

    let registrations = JSON.parse(localStorage.getItem('tournamentRegistrations')) || [];

    // Check if name already registered
    let alreadyRegistered = registrations.some(function(entry) {
        return entry.name.toLowerCase() === name.toLowerCase();
    });

    if (alreadyRegistered) {
        response.innerHTML = '<p class="error-message">This name is already registered.</p>';
        return;
    }

    registrations.push({ name: name, game: game, platform: platform });
    localStorage.setItem('tournamentRegistrations', JSON.stringify(registrations));

    response.innerHTML = `
        <p style="color: rgb(100, 255, 100); font-family: Rajdhani, sans-serif;">
            Successfully registered! See you at the tournament, ${name}.
        </p>
    `;

    document.getElementById('tournament-form').reset();
    loadRegistrations();
});

document.getElementById('clear-registrations').addEventListener('click', function() {
    localStorage.removeItem('tournamentRegistrations');
    loadRegistrations();
    document.getElementById('tournament-response').innerHTML = '';
});

// Load registrations on page load
loadRegistrations();