// --- Configuration ---
const config = {
    songs: [
        { path: "song/song1.mp3", name: "Ghostemane - Mercury" },
        { path: "song/song2.mp3", name: "Akacia - Electric [NCS Release]" },
        { path: "song/song3.mp3", name: "Wiguez & Vizzen - Running Wild [NCS Release]" }
    ]
};

// --- State ---
let currentSongIndex = Math.floor(Math.random() * config.songs.length);
const audio = document.getElementById("loading-audio");
const songNameEl = document.getElementById("song-name");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const volumeSlider = document.getElementById("volumeSlider");
const progressBar = document.getElementById("progressBar");

// --- Functions ---

function updateSong() {
    if (!audio) return;
    const song = config.songs[currentSongIndex];
    audio.src = song.path;
    if (songNameEl) songNameEl.textContent = song.name;
    audio.play().catch(e => console.log("Autoplay blocked or error:", e));
    updatePlayPauseIcon();
}

function updatePlayPauseIcon() {
    if (!playPauseBtn) return;
    const icon = playPauseBtn.querySelector('i');
    if (audio.paused) {
        icon.classList.replace('fa-pause', 'fa-play');
    } else {
        icon.classList.replace('fa-play', 'fa-pause');
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % config.songs.length;
    updateSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + config.songs.length) % config.songs.length;
    updateSong();
}

// Simulated Progress Bar Logic
let currentProgress = 0;
function simulateLoading() {
    const interval = setInterval(() => {
        if (currentProgress < 95) {
            currentProgress += Math.random() * 0.5;
            if (progressBar) progressBar.style.width = currentProgress + "%";
        } else {
            clearInterval(interval);
        }
    }, 150);
}

// FiveM Event Listeners for Loading Progress (if available)
window.addEventListener('message', function(event) {
    if (event.data.eventName === 'loadProgress') {
        const progress = event.data.loadFraction * 100;
        if (progressBar) progressBar.style.width = progress + "%";
        currentProgress = progress;
    }
});

// --- Initialization ---

document.addEventListener("DOMContentLoaded", () => {
    updateSong();
    simulateLoading();
    
    // UI Events
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
            updatePlayPauseIcon();
        });
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSong);
    if (prevBtn) prevBtn.addEventListener('click', prevSong);

    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value / 100;
        });
    }

    // Key Controls
    window.addEventListener('keydown', (e) => {
        switch(e.code) {
            case "ArrowUp":
                audio.volume = Math.min(audio.volume + 0.05, 1);
                if (volumeSlider) volumeSlider.value = audio.volume * 100;
                break;
            case "ArrowDown":
                audio.volume = Math.max(audio.volume - 0.05, 0);
                if (volumeSlider) volumeSlider.value = audio.volume * 100;
                break;
            case "ArrowLeft":
                prevSong();
                break;
            case "ArrowRight":
                nextSong();
                break;
            case "Space":
                e.preventDefault();
                if (audio.paused) audio.play(); else audio.pause();
                updatePlayPauseIcon();
                break;
        }
    });
});