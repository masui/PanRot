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
}
var resetTimeout = null // 初期状態にもどる
var slowTimeout = null // 速さチェック

var fastval = 0
var slowval = 0

function fast(){
    fastval += (direction == DIR.RIGHT ? 1 : -1)
    document.getElementById('fast').textContent = fastval;
}
function slow(){
    slowval += (direction == DIR.RIGHT ? 1 : -1)
    document.getElementById('slow').textContent = slowval;
}

function move(){
    clearTimeout(slowTimeout)
    clearTimeout(resetTimeout)
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
    clearTimeout(resetTimeout)
    resetTimeout = setTimeout(resetState,1000)
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
