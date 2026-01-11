let songs_details = [{
    id: 1,
    author: 'Elektronomia',
    name: 'Elektronomia - Sky High'
}, {
    id: 2,
    author: 'Warriyo',
    name: 'Warriyo Mortals'
}, {
    id: 3,
    author: 'Cartoon, Jéja',
    name: 'Cartoon, Jéja - On & On (feat. Daniel Levi)'
}]
let size = songs_details.length;
let index = 0;
let previous = document.querySelector('.prev');
let next = document.querySelector('.next');
let body = document.querySelector('body');
let song_name = document.querySelector('.song-name');
let song_author = document.querySelector('.artist-name');
let seekBar = document.getElementById('seekBar');
let playPause = document.querySelector('.playPause');
let endTime = document.querySelector('.endTime');
let player = document.querySelector('audio');
let song_photo = document.querySelector('.song-photo');
let curTime = document.querySelector('.curTime');

function loadSong(index) {

    song_name.innerHTML = songs_details[index].name;
    body.style.backgroundImage = `url(./photo/coverPhoto/${songs_details[index].id}.jpg)`;
    song_photo.style.backgroundImage = `url(./photo/coverPhoto/${songs_details[index].id}.jpg)`;
    song_author.innerHTML = songs_details[index].author;
    player.src = `./music/${songs_details[index].id}.m4a`;
    player.load();
    // playPause.innerHTML = playIcon;
}
let pauseIcon = `<img src="./photo/pause.svg">`;
let playIcon = `<img src="./photo/play.svg">`;

loadSong(index);
playPause.addEventListener('click', function () {
    if (player.paused) {
        player.play();
        playPause.innerHTML = pauseIcon;
    }
    else {
        player.pause();
        playPause.innerHTML = playIcon;
    }
})
previous.addEventListener('click', function () {
    index--;
    if (index < 0) {
        index = size - 1;
    }
    loadSong(index);
})
next.addEventListener('click', function () {
    index++;
    if (index == size) {
        index = 0;
    }
    loadSong(index);
})
seekBar.addEventListener('input', function () {
    let value = seekBar.value;
    player.currentTime = value;
})
const timeUpdate = setInterval(function () {
    let timeValue = Math.floor(player.currentTime);
    let ch = false;
    if (Math.floor(timeValue) == Math.floor(player.duration)) {
        seekBar.value = 0;
        playPause.innerHTML = playIcon;
        curTime.innerHTML = `00:00`;
        ch = true;
    }
    if (!ch) {
        seekBar.value = timeValue;
        let min = Math.floor(timeValue / 60);
        let second = timeValue % 60;
        if (min < 10 && second < 10)
            curTime.innerHTML = `0${min}:0${second}`;
        else if (min < 10)
            curTime.innerHTML = `0${min}:${second}`;
        else
            curTime.innerHTML = `${min}:${second}`;
    }
}, 1000);
const loadTime = player.addEventListener('loadedmetadata', function () {
    let musicEndDur = Math.floor(player.duration);
    seekBar.max = musicEndDur + 1;
    let endMin = Math.floor(musicEndDur / 60);
    let endSec = musicEndDur % 60;
    endTime.innerHTML = `0${endMin}:${endSec}`;
})

const autoPlay = player.addEventListener('ended', function() {
    index++;
    if(index == size) {
        index = 0;
    }
    loadSong(index);
    player.play();
    playPause.innerHTML = pauseIcon;
})