// Variables for starting the music (start/stop button, tone arm, music, etc.)
let stateButton = false;
let btn = document.querySelector(".btn");
let record = document.querySelector(".record");
let toneArm = document.querySelector(".tone-arm");
let song = document.querySelector(".playing-song");

// Function to control start/stop button
btn.addEventListener("click", function () {
    // Flip the start/stop button
    stateButton = !stateButton;
    // When button is on, start record player
    if (stateButton) {
        record.classList.add("on");
        toneArm.classList.add("play");
        setTimeout(function () {
            song.play();
        }, 1000);
    } else {
        // When button is on, stop record player 
        record.classList.remove("on");
        toneArm.classList.remove("play");
        song.pause();
    }     
});

// Variables for all the music
let h2Element = document.querySelector("h2");
let label = document.querySelector(".label");
// Grooves so they can be hidden when nothing is on the record player
let grooves = document.querySelector(".record");
let nowLaying = null;

// Function to play the record that's asked for
function playRecord(id, audio, color, title) {
    song.src = "./media/audio/" + audio;
    label.style.borderColor = color;
    h2Element.textContent = "Currently playing: " + title;
    grooves.classList.add("playing");
    nowLaying = id;
}

// Function to put back record
function returnRecord() {
    // Stop when there is no record
    if (nowLaying == null) {
        return;
    }
    let cover = document.getElementById(nowLaying);
    cover.src = "./media/images/" + cover.dataset.img;
    label.style.borderColor = "#181312";
    h2Element.textContent = "Currently playing: -";
    grooves.classList.remove("playing");
    record.classList.remove("on");
    toneArm.classList.remove("play");
    song.pause();
    song.src = "./media/audio/scratches.mp3";
    nowLaying = null;
}

// Function add click handler to every album on the shelf
Array.from(document.getElementsByClassName("cover")).forEach(function (album) {
    album.addEventListener("click", function () {
        let putnewrecord = (this.id != nowLaying);

        // Record player gets cleared out
        returnRecord();
        
        // Put on the new record
        if (putnewrecord) {
            this.src = "./media/images/" + this.dataset.emptyImg;
            playRecord(this.id, this.dataset.audio, this.dataset.color, this.getAttribute("alt"));
        } 
    });
})

// Volume slider
let slider = document.querySelector(".slider");
slider.addEventListener("input", function (event) {
    song.volume = Number(event.target.value);
});

/* BRONNEN:
- Array.forEach: https://stackoverflow.com/questions/3871547/iterating-over-result-of-getelementsbyclassname-using-array-foreach
- Data attributes: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
- Vormgeving (en sommige features) record player: https://www.youtube.com/watch?v=vvdRu7ljg54
- Vormgeving kast: https://youtu.be/eEToKF8jhnY */