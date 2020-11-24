var count_div = document.getElementById("count");
var timer_div = document.getElementById("timer");

var running = 0;
var ticks = 0;
var count = 0;
var timer;

function timer_onload() {
    count_div.innerHTML = "Laps";
    timer_div.innerHTML = "Start";
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

    count = 0;
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
}
