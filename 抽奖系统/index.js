var arr = [0, 1, 2, 5, 8, 7, 6, 3];
var lis = document.querySelectorAll('li');
var num = 0;
var timer = null;
var isRolling = false; //是否正在摇奖
var lock = false; //停止按钮锁
// 点击开始抽奖
$("#begin_btn").click(function () {
    //判断当前是否在摇奖，如果是，不能再点击开始按钮
    if (isRolling) {
        return;
    }
    //点击开始按钮后，摇奖状态开始
    isRolling = true;
    lock = false;
    draw();
})

// 点击停止抽奖
$("#stop_btn").click(function () {
    if (lock) {
        return;
    }
    isRolling = false;
    lock = true;
    $.ajax({
        url: "http://101.37.14.158:20005/lottery/get",
        success: function (res) {
            //做些什么
            console.log(res)
            if (res.code === 200) {
                if (res.data.lottery === 1) {
                    setPrize(8)
                } else if (res.data.lottery === 2) {
                    setPrize(2)
                } else if (res.data.lottery === 3) {
                    setPrize(6)
                } else if (res.data.lottery === 4) {
                    setPrize(0)
                } else if (res.data.lottery === 5) {
                    setPrize(7)
                } else if (res.data.lottery === 6) {
                    setPrize(5)
                } else if (res.data.lottery === 7) {
                    setPrize(1)
                } else if (res.data.lottery === 8) {
                    setPrize(3)
                }
            } else {
                alert("请刷新页面！")
            }
        }
    })
})



// 九宫格循环高亮
function draw() {
    timer = setInterval(function () {
        lis[arr[num]].className = "";
        num++;
        if (num > 7) {
            num = 0;
        }
        lis[arr[num]].className = "light";
    }, 30)
}



//根据返回数据，设置奖项高亮
function setPrize(index) {
    clearInterval(timer);
    lis[arr[num]].className = "";
    lis[arr[index]].className = "light";
}