const endTime = document.querySelector(".display__end-time");
const leftTime = document.querySelector(".display__time-left");
const buttons = document.querySelectorAll("button");
let left = 0;//剩余时间
let end = 0;//结束时间
let timer;//interval计时器
leftTime.innerHTML = left;//未操作时，剩余时间显示0

//为button绑定点击事件
const arr = Array.from(buttons);
arr.map(function (item) {
    item.addEventListener('click', clickAction);
});

//监听自定义输入
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    updateTime(this.minutes.value * 60);
    updateTimer();
});

//定义点击后的回调
function clickAction() {
    let deltaTime;
    deltaTime = this.dataset.time;
    updateTime(deltaTime);

    //点击后更新计时器
    updateTimer();
}


//updateTime
function updateTime(delta) {
    left = parseInt(delta);
    end = new Date().getTime() + left * 1000;
    leftTime.innerHTML = left;
    endTime.innerHTML = 'Be back at ' +
        new Date(end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
}

//每秒刷新时间
function updateTimer() {
    //清除以前的timer
    if (timer) {
        clearInterval(timer);
    }

    // 设置新的Timer
    timer = setInterval(function () {
        if (left === 0) {
            endTime.innerHTML = 'End';
            clearInterval(timer);
        } else {
            left -= 1;
            leftTime.innerHTML = left;
        }
    }, 1000);
}

