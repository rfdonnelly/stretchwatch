var count_div = document.getElementById("count");
var timer_div = document.getElementById("timer");

var running = 0;
var ticks = 0;
var count = 0;
var timer;

init();

function init() {
    count_div.innerHTML = "Lap";
    timer_div.innerHTML = "Start";

    timer_div.addEventListener("click", timer_onclick);
}

function timer_onclick() {
    if (!running) {
        start();
    } else {
        next();
    }
}

function start() {
    running = 1;
    timer = setInterval(tick, 10);

    count = 1;
    count_div.innerHTML = count;
}

function next() {
    clearInterval(timer);
    ticks = 0;
    timer = setInterval(tick, 10);

    count += 1;
    count_div.innerHTML = count;
}

function tick() {
    ticks += 1;

    var s = Math.floor(ticks / 100);
    var ms = ticks % 100;

    timer_div.innerHTML = s + ":" + ('0' + ms).slice(-2);
    if (s == 30 && ms == 0) {
        beep(50, 500, 0.2);
    }
}


var audio_context = new (window.AudioContext || window.webkitAudioContext || window.audioContext);

// From: https://stackoverflow.com/a/29641185
// All arguments are optional:
// * duration of the tone in milliseconds. Default is 500
// * frequency of the tone in hertz. default is 440
// * volume of the tone. Default is 1, off is 0.
// * type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
// * callback to use on end of tone
function beep(duration, frequency, volume, type, callback) {
    var oscillator = audio_context.createOscillator();
    var gainNode = audio_context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audio_context.destination);

    if (volume){gainNode.gain.value = volume;}
    if (frequency){oscillator.frequency.value = frequency;}
    if (type){oscillator.type = type;}
    if (callback){oscillator.onended = callback;}

    oscillator.start(audio_context.currentTime);
    oscillator.stop(audio_context.currentTime + ((duration || 500) / 1000));
};

document.getElementsByTagName("button")[0].addEventListener("click", function () {
    var button = this;
    button.disabled = true;

});
