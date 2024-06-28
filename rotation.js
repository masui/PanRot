//
// 回転ダイヤルとかの操作速度で動きを変える
//

const DIR = { RIGHT:0, LEFT:1 }
var direction = DIR.RIGHT

const STATE = { RESET:0, CHECK:1, SLOW:2, FAST:3 }
var state = STATE.RESET;

function slowState(){
    if(state == STATE.CHECK){
	// fast/slow 判断前だったとき
	slow()
    }
    state = STATE.SLOW
}
function resetState(){
    state = STATE.RESET
    
    //document.getElementById('state').textContent = state;
    document.getElementById('channel').style.backgroundColor = '#ff8';
    document.getElementById('volume').style.backgroundColor = 'white';
    
}
var resetTimeout = null // 初期状態にもどる
var slowTimeout = null // 速さチェック

var fastval = 0
var slowval = 0

var volume = 0.5

function fast(){
    fastval += (direction == DIR.RIGHT ? 1 : -1)
    document.getElementById('fast').textContent = fastval;

    //document.getElementById('state').textContent = state;
    document.getElementById('channel').style.backgroundColor = 'white';
    document.getElementById('volume').style.backgroundColor = '#ff8';
    
    var video = document.getElementById('video')
    video.volume = 0.5 + fastval * 0.1

}

const contents = [
    null,
    "https://s3-ap-northeast-1.amazonaws.com/masui.org/7/f/7f8206f5cc4bdd8c6ec60024b5ccfa67.mp4", // Estate
    "https://s3-ap-northeast-1.amazonaws.com/masui.org/d/1/d17dfded3b8bb10c00f69abdd35c50bd.mp4", // Ine
    "https://s3-ap-northeast-1.amazonaws.com/masui.org/0/3/03ed863e67f7d9ae31b67e8fe9d4be89.mp4", // Invitation
    "https://s3-ap-northeast-1.amazonaws.com/masui.org/6/b/6b89ef500f400071d27349d95c90797c.mp4", // 御泉水
    "https://s3-ap-northeast-1.amazonaws.com/masui.org/5/f/5f777c668bea67620d861d6aa16a1f2d.mp4", // Helpfeel CM
    "https://s3-ap-northeast-1.amazonaws.com/masui.org/c/3/c319867d43ff7005f0457cb2c0f47c25.mp4", // Jobin
    "https://s3-ap-northeast-1.amazonaws.com/masui.org/2/a/2a33284fd2cfbc386933bbaddea3b2c3.mp4", // 守屋山
    "https://s3-ap-northeast-1.amazonaws.com/masui.org/d/9/d93641cce1ca2d0fedfc8c4aa6fa8000.mp4", // 秋保
    null
]

function slow(){
    slowval += (direction == DIR.RIGHT ? 1 : -1)
    document.getElementById('slow').textContent = slowval;

    //document.getElementById('state').textContent = state;
    document.getElementById('channel').style.backgroundColor = '#ff8'
    document.getElementById('volume').style.backgroundColor = 'white'

    if(contents[slowval]){
	video = document.getElementById('video')
	video.src = contents[slowval]
	video.play()
    }
    else {
	video.volume = 0.5
	video.pause()
    }
}

function move(){
    clearTimeout(slowTimeout)
    clearTimeout(resetTimeout)
    resetTimeout = setTimeout(resetState,1000)

    if(state == STATE.RESET){
	state = STATE.CHECK
	slowTimeout = setTimeout(slowState,500)
    }
    else if(state == STATE.CHECK){
	state = STATE.FAST
	fast()
	fast()
    }
    else if(state == STATE.SLOW){ // 低速
	slow()
    }
    else if(state == STATE.FAST){ // 高速
	fast()
    }
}

document.addEventListener('keydown', event => {
    switch(event.key){
    case 'ArrowRight': case 'ArrowUp':
	direction = DIR.RIGHT
	move()
	break
    case 'ArrowLeft': case 'ArrowDown':
	direction = DIR.LEFT
	move()
    }
});

//$(function(){
//    resetState()
//})

window.onload = resetState
