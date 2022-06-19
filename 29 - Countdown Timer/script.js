const button = document.querySelectorAll('[data-time]');
const leftTime = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
let left = 0;
let end = 0;
let timer;
leftTime.innerHTML = left;

const buttonArr = Array.from(button);
buttonArr.forEach(item => {
    item.addEventListener('click', clickAction);
})

function clickAction() {
    let countTime = this.dataset.time;
    updateTime(countTime);
    updateTimer();
}

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    updateTime(this.minutes.value * 60);
    updateTimer();
    this.reset();
});

function displayLeftTime(left) {
    let minute = Math.floor((left) / 60);
    let second = left % 60;
    return `${minute}:${second < 10 ? 0 : ''}${second}`;
}

function updateTime(cnt) {
    left = parseInt(cnt);
    end = new Date().getTime() + 1000 * left;
    leftTime.innerHTML = displayLeftTime(left);
    endTime.innerHTML = 'Be back at ' + new Date(end).toLocaleTimeString();
}

function updateTimer() {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(() => {
        if (left === 0) {
            leftTime.innerHTML = 'End';
            clearInterval(timer);
        } else {
            left -= 1;
            leftTime.innerHTML = displayLeftTime(left);
        }
    }, 1000);
}