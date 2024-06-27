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
	slow(direction)
    }
    state = STATE.SLOW
}
function resetState(){
    state = STATE.RESET
}
var resetTimeout = null // 初期状態にもどる
var slowModeTimeout = null // 速さチェック

var fastval = 0
var slowval = 0

function fast(dir){
    direction = dir
    fastval += (direction == DIR.RIGHT ? 1 : -1)
    document.getElementById('fast').textContent = fastval;
}
function slow(dir){
    direction = dir
    slowval += (direction == DIR.RIGHT ? 1 : -1)
    document.getElementById('slow').textContent = slowval;
}

function move(dir){
    direction = dir
    clearTimeout(slowModeTimeout)
    clearTimeout(resetTimeout)
    if(state == STATE.RESET){
	state = STATE.CHECK
	slowModeTimeout = setTimeout(slowState,500)
    }
    else if(state == STATE.CHECK){
	state = STATE.FAST
	fast(dir)
	fast(dir)
    }
    else if(state == STATE.SLOW){ // 低速
	slow(dir)
    }
    else if(state == STATE.FAST){ // 高速
	fast(dir)
    }
    clearTimeout(resetTimeout)
    resetTimeout = setTimeout(resetState,1000)
}

document.addEventListener('keydown', event => {
    var key = event.key
    if(key == 'ArrowRight' || key == 'ArrowUp'){
	move(DIR.RIGHT)
    }
    if(key == 'ArrowLeft' || key == 'ArrowDown'){
	move(DIR.LEFT)
    }
});

document.addEventListener('keyup', event => {
});
