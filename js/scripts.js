"use strict";

const songs = [
    { id: 1, artist: "Eddie Santiago", title: "Antidoto y veneno", src: "audio/salsa/Eddie Santiago - Antidoto y veneno.m4a", duration: "5:18" },
    { id: 2, artist: "La inmensidad", title: "Ay que amor", src: "audio/salsa/La inmensidad - Ay que amor.mp3", duration: "3:54" },
    { id: 3, artist: "La Misma Gente", title: "Llego el final", src: "audio/salsa/La Misma Gente - Llego el final.m4a", duration: "5:44" },
    { id: 4, artist: "Los Hermanos Moreno", title: "Por alguien como tu", src: "audio/salsa/Los Hermanos Moreno - Por alguien como tu.m4a", duration: "3:38" },
    { id: 5, artist: "Nino Segarra", title: "Como amigos si, como amantes no", src: "audio/salsa/Nino Segarra - Como amigos si, como amantes no.mp3", duration: "4:46" },
    { id: 6, artist: "Nino Segarra", title: "Entre la espada y la pared", src: "audio/salsa/Nino Segarra - Entre la espada y la pared.mp3", duration: "5:44" },
    { id: 7, artist: "Nino Segarra", title: "Porque te amo", src: "audio/salsa/Nino Segarra - Porque te amo.m4a", duration: "5:07" },
    { id: 8, artist: "Paquito Guzman", title: "Que voy a hacer sin ti", src: "audio/salsa/Paquito Guzman - Que voy a hacer sin ti.m4a", duration: "5:33" },
    { id: 9, artist: "Pedro Arroyo", title: "Todo me huele a ti", src: "audio/salsa/Pedro Arroyo - Todo me huele a ti.mp3", duration: "5:22" },
    { id: 10, artist: "The New York Band", title: "Nadie como tu", src: "audio/salsa/The New York Band - Nadie como tu.m4a", duration: "4:47" },
    { id: 11, artist: "Willie Gonzalez", title: "Hazme olvidarla", src: "audio/salsa/Willie Gonzalez - Hazme olvidarla.mp3", duration: "5:36" },
    { id: 12, artist: "Johnny Rojas", title: "Adicto a ti", src: "audio/salsa/Johnny Rojas - Adicto a ti.m4a", duration: "5:33" },
    { id: 13, artist: "Lalo Rodriguez", title: "Ven devorame otra vez", src: "audio/salsa/Lalo Rodriguez - Ven devorame otra vez.m4a", duration: "5:08" },
    { id: 14, artist: "Frankie Ruiz", title: "Tu con el", src: "audio/salsa/Frankie Ruiz - Tu con el.m4a", duration: "5:04" },
    { id: 15, artist: "David Pabon", title: "Aquel viejo motel", src: "audio/salsa/David Pabon - Aquel viejo motel.m4a", duration: "5:09" },
];

// Ordenamos el listado de canciones por artista
songs.sort((a, b) => a.artist > b.artist ? 1 : a.artist < b.artist ? -1 : 0);

const totalSongs = songs.length;

const d = document;

const audio = d.querySelector("#audio");

// Song list
const dataTable = d.querySelector("#data-table");

// Volume control
const volumeControl = d.querySelector("#volume-control");
const volumeDisplay = d.querySelector("#volume-display");
const volumeBtn = d.querySelector("#volume-btn");
let audioVolume = false;
let currentVolume = 1; //
// End volume control

// Current time display
const durationDisplay = d.querySelector("#duration");
const currentTimeDisplay = d.querySelector("#current-time");
// End curren time display

// Progress bar
const progressBar = d.querySelector("#progress-bar");
// Variable para guardar el estado de reproducción del audio
let wasPlaying = false;
// End progress bar

// Song title
const songTitle = d.querySelector("#song-title");

// Play pause btn
const playPauseBtn = d.querySelector("#play-pause-btn");

// Loop btn
const loopBtn = d.querySelector("#loop-btn");
let isLoop = false;

// Previous btn
const previousBtn = d.querySelector("#previous-btn");

// Next btn
const nextBtn = d.querySelector("#next-btn");

// Shuffle btn
const shuffleBtn = d.querySelector("#shuffle-btn");
let isShuffle = false;

shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;

    // if (isShuffle) {
    //     alert("Shuffle mode on!");
    // } else {
    //     alert("Shuffle mode off!");
    // }

    // Opción 1
    // if (isShuffle) {
    //     shuffleBtn.setAttribute('data-content', "🟩");
    // } else {
    //     shuffleBtn.setAttribute('data-content', "⬛");
    // }

    // Opción 2
    shuffleBtn.setAttribute('data-content', isShuffle ? "🟩 " : "⬛ ");
});

loopBtn.addEventListener("click", () => {
    isLoop = !isLoop;
    audio.loop = isLoop;
    loopBtn.textContent = isLoop ? "🔂" : "🔁";
});

// Volumen control
volumeControl.addEventListener("input", (event) => {
    volumeDisplay.textContent = volumeControl.value;
    audio.volume = volumeControl.value / 100;
    if (volumeControl.value === "0") {
        volumeBtn.textContent = "🔈";
        audio.muted = true;
        currentVolume = .5; // 50 %
    } else {
        volumeBtn.textContent = "🔊";
        audio.muted = false;
        currentVolume = volumeControl.value / 100; //  Values between 0 y 100
    }

});

volumeBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    if (audio.muted) {
        audio.volume = 0;
        volumeControl.value = 0;
        volumeBtn.textContent = "🔈";
    } else {
        audio.volume = currentVolume; // Values 0.1 and 1, where 1 = 100 %
        volumeControl.value = currentVolume * 100; // Values are between 0 and 100
        volumeBtn.textContent = "🔊";
    }
    volumeDisplay.textContent = volumeControl.value;
});
// End volumen control

// Mostrar la duración del audio cuando se haya cargado
audio.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(audio.duration); // Formatear la duración y mostrar
    progressBar.max = audio.duration; // Ajustar el máximo de la barra de progreso
});

// Función para actualizar la barra de progreso
audio.addEventListener("timeupdate", () => {
    currentTimeDisplay.textContent = formatTime(audio.currentTime); // Formatear el tiempo actual y mostrar
    progressBar.value = audio.currentTime;// Actualizar la barra de progreso
});

// Progress bar
// Ajustar el tiempo de reproducción al mover la barra de progreso
progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;  // Actualizar el tiempo del audio
});

// End progress bar

let currentSongIndex = 0;

d.addEventListener("DOMContentLoaded", () => {
    displaySongList();
    const song = songs[currentSongIndex];
    embedAudio(song.src);
    setSongInfo(`🎵 ${song.artist} - ${song.title} 🎵`);

    // When DOM content loaded reset the progress bar, volume control and container scroll.
    progressBar.value = 0;
    volumeControl.value = 100;
    dataTable.parentElement.scrollTop = 0;
});

// Song list
const displaySongList = () => {
    const $fragment = d.createDocumentFragment();
    for (let i = 0; i < totalSongs; i++) {
        const song = songs[i];
        const tr = d.createElement("tr");

        const td1 = d.createElement('td'); // Crear celda
        td1.textContent = `${i + 1}.`;
        tr.appendChild(td1);

        const td2 = d.createElement('td'); // Crear celda
        td2.textContent = `${song.artist} - ${song.title}`;
        tr.appendChild(td2);

        const td3 = d.createElement('td'); // Crear celda
        td3.textContent = `${song.duration}`;
        tr.appendChild(td3);

        if (i === currentSongIndex) tr.classList.add("playing");

        tr.addEventListener('click', (event) => {
            const p = dataTable.querySelector(`tr.selected`);
            if (p) p.classList.remove("selected");
            tr.classList.add("selected");
        });

        tr.addEventListener('dblclick', (event) => {
            const previous = dataTable.querySelector(`tr.playing`);
            if (previous) previous.classList.remove("playing");
            addCssClass(tr, "playing");
            currentSongIndex = i;
            embedAudio(song.src);
            playAudio();
            setSongInfo(`🎸 ${song.artist} - ${song.title} 🎸`);
        });
        $fragment.appendChild(tr);
    }
    dataTable.appendChild($fragment);
}

previousBtn.addEventListener("click", () => {
    // console.log(currentSongIndex);
    currentSongIndex--;
    if (currentSongIndex >= 0) {
        const song = songs[currentSongIndex];
        if (!audio.paused) { // Si el audio no esta en pausa, load and play
            embedAudio(song.src);
            playAudio();
        } else {
            embedAudio(song.src);
        }
        setSongInfo(`🎵 ${song.artist} - ${song.title} 🎵`);
    } else {
        currentSongIndex = 0;
    }

    const current = dataTable.querySelector(`tr.playing`);
    if (current) current.classList.remove("playing");

    // currentSongIndex se decremento previamente
    const previous = dataTable.children[currentSongIndex];
    if (previous) addCssClass(previous, "playing");

});

nextBtn.addEventListener("click", () => {
    // console.log(currentSongIndex);
    currentSongIndex++;
    if (currentSongIndex < totalSongs) {
        const song = songs[currentSongIndex];
        if (!audio.paused) {// Si el audio no esta en pausa, load and play
            embedAudio(song.src);
            playAudio();
        } else {
            embedAudio(song.src);
        }
        setSongInfo(`🎵 ${song.artist} - ${song.title} 🎵`);
    } else {
        currentSongIndex = totalSongs - 1;
    }

    const previous = dataTable.querySelector(`tr.playing`);
    if (previous) previous.classList.remove("playing");

    // currentSongIndex se incremento previamente
    const current = dataTable.children[currentSongIndex];
    // console.log(current);
    if (current) addCssClass(current, "playing");

});

const setSongInfo = (info) => {
    songTitle.textContent = info;
    // checkOverflow();
}

const embedAudio = url => {
    audio.src = url;
    progressBar.disabled = false;
}

const playAudio = () => {
    if (audio.src) {
        audio.play();
        playPauseBtn.textContent = "⏸️";
    }
}

const pauseAudio = () => {
    if (audio.src) {
        audio.pause();
        playPauseBtn.textContent = "▶️";
    }
}
// End song list

// Play pause btn
playPauseBtn.addEventListener("click", () => {
    if (!audio.src) return;
    if (audio.paused) {
        playAudio();
    } else {
        pauseAudio();
    }
});

audio.addEventListener('ended', function () {
    playPauseBtn.textContent = "▶️";
    currentSongIndex++;
    if (currentSongIndex < totalSongs) {
        const song = songs[currentSongIndex];
        embedAudio(song.src);
        playAudio();
        setSongInfo(`🎵 ${song.artist} - ${song.title} 🎵`);
    } else {
        currentSongIndex = totalSongs - 1;
    }

    const previous = dataTable.querySelector(`tr.playing`);
    if (previous) previous.classList.remove("playing");

    // currentSongIndex se incremento previamente
    const current = dataTable.children[currentSongIndex];
    // console.log(current);
    if (current) addCssClass(current, "playing");
});

// Functions
// Format time in hh:mm:ss or mm:ss
const formatTime = (seconds) => {
    /**
     * 1 h. = 60 m.
     * 1 m. = 60 s.
     * 1 s. = 1000 ms.
     * hours to minutes: 3 * 60 = 180 minutes
     * minutes to seconds: 120 * 60 = 7.200 seconds
     * seconds to milliseconds: 218.122448 * 1000 = 218.122.448.000
     **/
    const hours = (seconds / 3600) | 0;  // Hours calculation
    const minutes = ((seconds % 3600) / 60) | 0;  // Minutes calculation
    const remainingSeconds = Math.round(seconds % 60);  // Whole seconds

    // Conditional formatting: Only show hours if greater than 0
    return hours > 0
        // Show hours:minutes:seconds format
        ? `${hours}:${/*minutes < 10 ? '0' + minutes : */minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`
        // Show minutes:seconds format
        : `${/*minutes < 10 ? '0' + minutes :*/ minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}

const shuffle = arr => {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const r = i + Math.floor(Math.random() * (len - i));
        [arr[i], arr[r]] = [arr[r], arr[i]];
    }
}

const addCssClass = (element, cssClass) => {
    element.classList.add(cssClass);
    // element.scrollIntoView({ behavior: "smooth", block: "center" });
    const container = element.parentElement.parentElement;
    // container.scrollTop = element.offsetTop;
    container.scrollTop = element.offsetTop - (container.clientHeight / 2) + (element.offsetHeight / 2);
}
