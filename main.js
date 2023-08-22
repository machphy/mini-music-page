const playBtn = document.querySelector(".play"),
    skipForward = document.querySelector(".skip-forward"),
    skipBack = document.querySelector(".skip-back"),

    progressBarContainer = document.querySelector('.progress'),
    progressBar = document.querySelector('.progress-bar'),
    progressHead = document.querySelector('.progress-head'),

    currentTimeHtml = document.querySelector(".current-time"),
    durationHtml = document.querySelector(".duration"),

    playIcon = document.querySelector('.fa-play'),
    img = document.querySelector('.img'),
    title = document.querySelector(".audio-title"),
    singer = document.querySelector(".audio-singer");

this.tracks = [
    {
        name: "Raanjhanaa  vibes",
        artist: "Artist 1",
        cover: "https://wallpapercave.com/dwp1x/wp7645393.jpg",
        source: "https://pagalsong.in/uploads/systemuploads/mp3/Raanjhanaa/Raanjhanaa%20-%20Raanjhanaa%20128%20Kbps.mp3",
    },
    {
        name: "Tum Tak ",
        artist: "Artist 2",
        cover: "https://wallpapercave.com/dwp1x/wp7645402.jpg",
        source: "https://pagalsong.in/uploads/systemuploads/mp3/Raanjhanaa/Tum%20Tak%20-%20Raanjhanaa%20128%20Kbps.mp3",
    },
    {
        name: "Ishq Bulaava ",
        artist: "Artist 3",
        cover: "https://a10.gaanacdn.com/gn_img/albums/2lV3dl13Rg/lV3dlBaL3R/size_l.webp",
        source: "https://pagalsong.in/uploads/systemuploads/mp3/Hasee%20Toh%20Phasee%20(2014)/Ishq%20Bulaava.mp3",
    },
    {
        name: "Agar Tum Saath Ho ",
        artist: "Artist 4",
        cover: "https://images.news18.com/ibnlive/uploads/2021/11/agar-tum-sath-ho-16378268423x2.jpg?impolicy=website&width=510&height=356",
        source: "https://pagalsong.in/uploads/systemuploads/mp3/Tamasha/Agar%20Tum%20Saath%20Ho%20-%20Tamasha%20128%20Kbps.mp3",
    },
    {
        name: "Dard karaara",
        artist: "Artist 5",
        cover: "https://downloads4djs.co.in/wp-content/uploads/2019/08/Dard-Karara-Mashup.jpg",
        source: "https://pagalsong.in/uploads/systemuploads/mp3/Dum%20Laga%20Ke%20Haisha/Dard%20Karaara.mp3",
    },
    {
        name: "Thari shararat sab janu mein",
        artist: "Artist 6",
        cover: "https://i.scdn.co/image/ab67616d0000b2735599b86257511c599050f052",
        source: "https://dns4.pendusaab.com/download/128k-updq/Chaudhary.mp3",
    },
];



// Initial state values




let audio = null,
    barWidth = null,
    duration = null,
    currentTime = null,
    isTimerPlaying = false,
    currentTrackIndex = 0,
    currentTrack = tracks[0];

// Set initial state values



audio = new Audio();
audio.src = currentTrack.source;
img.src = currentTrack.cover;
title.innerText = currentTrack.name;
singer.innerText = currentTrack.artist;

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        isTimerPlaying = true;
    } else {
        audio.pause();
        isTimerPlaying = false;
    }
});

progressBarContainer.addEventListener('click', (x) => {
    let maxduration = audio.duration;
    let position = x.pageX - progressBarContainer.offsetLeft;
    let percentage = (100 * position) / progressBarContainer.offsetWidth;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;
    barWidth = percentage + "%";

    audio.currentTime = (maxduration * percentage) / 100;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    img.src = currentTrack.cover;
});


skipForward.addEventListener('click', () => {

    if (currentTrackIndex < tracks.length - 1) {
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }

    currentTrack = tracks[currentTrackIndex];

    audio.src = currentTrack.source;
    img.src = currentTrack.cover;
    title.innerText = currentTrack.name;
    singer.innerText = currentTrack.artist;

    barWidth = 0;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    currentTimeHtml.innerText = `0:00`;
    durationHtml.innerText = `0:00`;

    audio.currentTime = 0;
    audio.src = currentTrack.source;

    setTimeout(() => {
        if (isTimerPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, 300);
});

skipBack.addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
    } else {
        this.currentTrackIndex = this.tracks.length - 1;
    }
    currentTrack = tracks[currentTrackIndex];

    audio.src = currentTrack.source;
    img.src = currentTrack.cover;
    title.innerText = currentTrack.name;
    singer.innerText = currentTrack.artist;

    barWidth = 0;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    currentTimeHtml.innerText = `0:00`;
    durationHtml.innerText = `0:00`;

    audio.currentTime = 0;
    audio.src = currentTrack.source;

    setTimeout(() => {
        if (isTimerPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, 300);
});

audio.ontimeupdate = function () {
    if (audio.duration) {
        barWidth = (100 / audio.duration) * audio.currentTime;

        let durmin = Math.floor(audio.duration / 60);
        let dursec = Math.floor(audio.duration - durmin * 60);
        let curmin = Math.floor(audio.currentTime / 60);
        let cursec = Math.floor(audio.currentTime - curmin * 60);

        if (durmin < 10) durmin = "0" + durmin;

        if (dursec < 10) dursec = "0" + dursec;

        if (curmin < 10) curmin = "0" + curmin;

        if (cursec < 10) cursec = "0" + cursec;

        duration = durmin + ":" + dursec;
        currentTime = curmin + ":" + cursec;

        progressBar.style.width = `${barWidth}%`;
        progressHead.style.setProperty("left", `${barWidth}%`)
        currentTimeHtml.innerText = `${currentTime}`;
        durationHtml.innerText = `${duration}`;

        if (isTimerPlaying) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');


        } else {
            playIcon.classList.add('fa-play');
            playIcon.classList.remove('fa-pause');
        }
    }
};

audio.onended = function () { };

// Animationsn uses.....



TweenMax.from('.img', 4, { rotation: "+=360", transformOrigin: "50% 50%", ease: Linear.easeNone, repeat: -1 });
gsap.from("body, h1, .audio-img, .audio-title, .audio-singer, .audio-btns", {
    opacity: 0,
    duration: 2,
    delay: 1.5,
    y: 25,
    ease: "expo.out",
    stagger: 0.2,
});