const listSong = [
    {
        song: "Doan Xuan Ca",
        src: "./mp3/DoanXuanCa.mp3",
        img: "./IMG/img1.jpeg",
    },
    {
        song: "Uoc Nguyen Dau Nam",
        src: "./mp3/Uocnguyendaunam.mp3",
        img: "./IMG/img2.jpeg",
    },
    {
        song: "Jingle Bell",
        src: "./mp3/JingleBell.mp3",
        img: "./IMG/img3.jpeg",
    },
    {
        song: "Chuyen Cu Minh Bo Qua",
        src: "./mp3/chuyencuminhboqua.mp3",
        img: "./IMG/chuyencuminhboqua.jpeg",
    },
    {
        song: "Em Chao Tet",
        src: "./mp3/emchaotet.mp3",
        img: "./IMG/emchaotet.jpeg",
    },
    {
        song: "Lam Gi Phai Hot",
        src: "./mp3/lamgiphaihot.mp3",
        img: "./IMG/lamgiphaihot.jpeg",
    },
    {
        song: "Last Christmas",
        src: "./mp3/lastchrismas.mp3",
        img: "./IMG/lastchristmas.jpeg",
    },
        {
        song: "Tet Nay Con Se Ve",
        src: "./mp3/tetnayconseve.mp3",
        img: "./IMG/tetnayconseve.jpeg",
    },
    {
        song: "Thien Duyen Tien Dinh",
        src: "./mp3/thienduyentiendinh.mp3",
        img: "./IMG/thienduyentiendinh.jpeg",
    },
    {
        song: "Trai Tai Gai Sat",
        src: "./mp3/traitaigaisat.mp3",
        img: "./IMG/traitaigaisat.jpeg",
    },
    {
        song: "Vang Trang Khoc",
        src: "./mp3/vangtrangkhoc.mp3",
        img: "./IMG/vangtrangkhoc.jpeg",
    },
];
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const btnPrev = $(".btn-prev");
const btnPlay = $(".btn-play");
const btnNext = $(".btn-next");
const audio = $(".audio");
const songPlaying = $(".song-playing");
const imgSong = $(".img");
const rangeStyle = $(".range-style");
const btnRepeat = $(".btn-repeat");
const btnClose = $(".btn-close");
const contentForm = $(".content-form");
const headerMenu = $(".header-menu");
const form = $(".form");
const btnRandom = $(".btn-random");
const btnlike = $(".btn-like");
let playing = true;
//! view play music
function viewPlayMusic() {
    $(".btn-play i ").classList.remove("fa-play");
    $(".btn-play i ").classList.add("fa-pause");
    animateImg.play();
    audio.play();
    playing = false;
}
// ! handel Event Time Now
audio.addEventListener("timeupdate", handelRealTime);
function handelRealTime() {
    const time = (audio.currentTime / audio.duration) * 100;
    rangeStyle.value = time;
    if (btnRepeat.matches(".active-footer")) {
        const time = (audio.currentTime / audio.duration) * 100;
        handelRepeatMusic(time);
    } else if (btnRandom.matches(".active-footer") && time === 100) {
        const randomIndex = parseInt(Math.random() * listSong.length);
        handelRandomMusic(randomIndex);
    } else {
        handelAutoNext(time);
    }

    return time;
}
// ! handel auto Next music
function handelAutoNext(time) {
    if (time === 100) {
        handelNextSong(getNowIndex());
        viewPlayMusic();
    }
    getNowIndex();
}

// ! Handel Event Change
rangeStyle.addEventListener("change", handeChange);
function handeChange(e) {
    audio.currentTime = (audio.duration / 100) * e.target.value;
}
// ! Handel Play Music
btnPlay.addEventListener("click", handelClickPlay);
function handelClickPlay(e) {
    if (playing) {
        getNowIndex();
        viewPlayMusic();
    } else {
        audio.pause();
        $(".btn-play i ").classList.remove("fa-pause");
        $(".btn-play i ").classList.add("fa-play");
        animateImg.pause();
        playing = true;
    }
}
//! handel Next Song
btnNext.addEventListener("click", handelClickNext);
function handelClickNext(e) {
    handelNextSong(getNowIndex());
    viewPlayMusic();
}
function handelNextSong(index) {
    index++;
    if (index >= listSong.length) {
        index = 0;
    }
    songPlaying.textContent = listSong[index].song;
    imgSong.setAttribute("src", listSong[index].img);
    audio.setAttribute("src", listSong[index].src);
}
//! handel Prev Song
btnPrev.addEventListener("click", handelClickPrev);
function handelClickPrev(e) {
    handelPrevSong(getNowIndex());
    viewPlayMusic();
}
async function handelPrevSong(index) {
    index--;
    if (index < 0) {
        index = listSong.length - 1;
    }
    songPlaying.textContent = listSong[index].song;
    imgSong.setAttribute("src", listSong[index].img);
    await audio.setAttribute("src", listSong[index].src);
}

// ! handel Get Now Index
function getNowIndex() {
    const srcNow = audio.getAttribute("src");
    const songNow = listSong.filter((value) => {
        return value.src === srcNow;
    });
    let indexNow = listSong.indexOf(songNow[0]);
    return indexNow;
}
// ! handel repeat music
btnRepeat.addEventListener("click", handelClickRepeat);
function handelClickRepeat(e) {
    if (!btnRandom.matches(".active")) handelAnimitionfooter(btnRepeat);
}
function handelRepeatMusic(time) {
    if (time === 100) {
        playing = true;
        handelClickPlay();
    }
}
// ! handel random music
btnRandom.addEventListener("click", handelClickRandom);
function handelClickRandom(e) {
    if (!btnRepeat.matches(".active")) handelAnimitionfooter(btnRandom);
}
async function handelRandomMusic(index) {
    songPlaying.textContent = listSong[index].song;
    imgSong.setAttribute("src", listSong[index].img);
    await audio.setAttribute("src", listSong[index].src);
    viewPlayMusic();
}
// ! handel Animation Img
const animateImg = imgSong.animate(
    [
        {
            transform: "rotate(360deg)",
        },
    ],
    {
        duration: 10000,
        iterations: Infinity,
    }
);
animateImg.pause();
listSong.forEach((item) => {
    const template = `<div class="content-item" data-url="${item.src}" data-img="${item.img}" data-name="${item.song}">
            <img src="${item.img}" alt="" class="item-img" />
            <div class="content-text">
                <p class="name-song">${item.song}</p>
                <p class="name-singer">Nguyen Dinh Son</p>
            </div>
        </div>`;
    contentForm.insertAdjacentHTML("beforeend", template);
});
// ! show menu
headerMenu.addEventListener("click", handelShowMenu);
function handelShowMenu(e) {
    form.classList.add("active-form");
    const listSongForm = $$(".content-item");
    listSongForm.forEach((item) => {
        item.addEventListener("click", () => {
            playSongForm(item);
        });
    });
}
// !  close menu
btnClose.addEventListener("click", handelCloseForm);
function handelCloseForm(e) {
    form.classList.remove("active-form");
}
document.addEventListener("click", (e) => {
    if (!e.target.matches(".form") && !e.target.matches(".header-menu i")) {
        form.classList.remove("active-form");
    }
});
// ! menu play song
function playSongForm(song) {
    const getUrl = song.getAttribute("data-url");
    const getName = song.getAttribute("data-name");
    const getSrc = song.getAttribute("data-img");
    audio.setAttribute("src", getUrl);
    songPlaying.textContent = getName;
    imgSong.setAttribute("src", getSrc);
    viewPlayMusic();
    handelCloseForm();
}
// ! handel like
btnlike.addEventListener("click", (e) => {
    handelAnimitionfooter(btnlike);
});
function handelAnimitionfooter(el) {
    if (!el.matches(".active-footer")) {
        el.classList.add("active-footer");
        el.classList.remove("unactive-footer");
    } else {
        el.classList.remove("active-footer");
        el.classList.add("unactive-footer");
    }
}
