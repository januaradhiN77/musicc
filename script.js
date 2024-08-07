// script.js

document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio('songs/wongayu.mp3');
    const playPauseBtn = document.getElementById('playpausebtn');
    const seekSlider = document.getElementById('seekslider');
    const currentTimeText = document.getElementById('currenttimetext');
    const durationTimeText = document.getElementById('durationtimetext');
    const lyricsContainer = document.getElementById('lyrics');

    let isPlaying = false;
    let lyrics = [
        { time: 0, text: "Wong ayu" },
        { time: 1, text: "Age nyedhak a" },
        { time: 4, text: "Ing sandhingku" },
        { time: 7, text: "Nyawang manising" },
        { time: 10, text: "Esemu" },
        { time: 14, text: "Gawe Lerem e rasaku" },
        { time: 17, text: "Tentrem ing atiku" },
        { time: 21, text: "Haywa pegat tresnamu" },
        { time: 25, text: "Sayangku" },
{ time: 31, text: "Wong ayu" },
{ time: 34, text: "Tresnamu" },
{ time: 36, text: "Kinarya tamba" },
{ time: 39, text: "Susah jroning batinku" },
{ time: 46, text: "Wong bagus" },
{ time: 49, text: "Antebna roso atimu" },
{ time: 54, text: "Tresnoku tulus" },
{ time: 57, text: "Jroning kalbu" },
{ time: 60, text: "__________________" },
        // Add more lyrics with time here
    ];

    function displayLyrics() {
        lyricsContainer.innerHTML = lyrics.map((line, index) => 
            `<div class="lyric-line" id="line-${index}">${line.text}</div>`
        ).join('');
    }

    function updateLyrics() {
        const currentTime = audio.currentTime;
        lyrics.forEach((line, index) => {
            const lyricElement = document.getElementById(`line-${index}`);
            
            if (currentTime >= line.time && currentTime < (lyrics[index + 1] ? lyrics[index + 1].time : audio.duration)) {
                lyricElement.classList.add('active');
                lyricElement.classList.remove('finished');
                lyricElement.style.display = ""; // Show element
            } else if (currentTime > line.time) {
                lyricElement.classList.remove('active');
                lyricElement.classList.add('finished');
                setTimeout(() => {
                    lyricElement.style.display = "none"; // Hide element after delay
                }, 240); // Delay for 2 seconds
            } else {
                lyricElement.classList.remove('active');
                lyricElement.classList.remove('finished');
                lyricElement.style.display = ""; // Ensure it's shown if it should be
            }
        });
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    audio.addEventListener('loadedmetadata', () => {
        seekSlider.max = audio.duration;
        durationTimeText.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        seekSlider.value = audio.currentTime;
        currentTimeText.textContent = formatTime(audio.currentTime);
        updateLyrics();
    });

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.classList.remove('active');
        } else {
            audio.play();
            playPauseBtn.classList.add('active');
        }
        isPlaying = !isPlaying;
    });

    seekSlider.addEventListener('input', () => {
        audio.currentTime = seekSlider.value;
    });

    displayLyrics();
});