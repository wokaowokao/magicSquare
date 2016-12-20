var arr = [];
var foo = [];
var allStep = [];
//生成arr数组
for (var i = 1; i <= 6 * 9; i++) {
	foo.push(i);
	if (i % 3 == 0) {
		var a = Math.ceil(i / 9);
		arr[a] = arr[a] || [];
		arr[a].push(foo);
		foo = [];
	}
}

function _show() {
	for (var i = 1; i <= 6; i++) {
		for (var j = 0; j < 3; j++) {
			arr[i][j].forEach(function(v, k) {
				var color = getColor(v);
				var index = j * 3 + k + 1;
				display(i, index, v, color);
			})
		}
	}
}
//v 123456  index 123456789
function display(v, index, num, color) {
	index = index - 1;
	var node = $('.c_' + v).find('.a').eq(index);
	node.html(num);
	node.removeClass('white');
	node.removeClass('red');
	node.removeClass('blue');
	node.removeClass('orange');
	node.removeClass('green');
	node.removeClass('yellow');
	node.addClass(color);
}

function getColor(index) {
	if (index <= 9) return 'white';
	if (index > 9 && index <= 18) return 'red';
	if (index > 18 && index <= 27) return 'yellow';
	if (index > 27 && index <= 36) return 'orange';
	if (index > 36 && index <= 45) return 'green';
	if (index > 45 && index <= 54) return 'blue';
}
//水平转
function horizontalTurn(type, noAddStep) {
	var foo = [];
	var n = 0;
	if (type > 0 && type <= 3) {
		n = type - 1;
		foo.push(arr[4][n]);
		foo.push(arr[1][n]);
		foo.push(arr[2][n]);
		foo.push(arr[3][n]);
	}
	if (type > 3 && type <= 6) {
		n = type - 4;
		foo.push(arr[2][n]);
		foo.push(arr[3][n]);
		foo.push(arr[4][n]);
		foo.push(arr[1][n]);
	}
	arr[1][n] = foo[0];
	arr[2][n] = foo[1];
	arr[3][n] = foo[2];
	arr[4][n] = foo[3];

	//转顶或底面
	if (type == 1) {
		turnSurface(5, 0);
	}
	if (type == 3) {
		turnSurface(6, 1);
	}
	if (type == 4) {
		turnSurface(5, 1);
	}
	if (type == 6) {
		turnSurface(6, 0);
	}
	noAddStep || allStep.push('1' + type);
	_show();
}
//垂直转
function verticalTurn(type, noAddStep) {
	allTurn(1);
	if (type == 1) {
		var t = 4;
	}
	if (type == 2) {
		var t = 5;
	}
	if (type == 3) {
		var t = 6;
	}
	if (type == 4) {
		var t = 1;
	}
	if (type == 5) {
		var t = 2;
	}
	if (type == 6) {
		var t = 3;
	}
	horizontalTurn(t, 1);
	allTurn(1);
	allTurn(1);
	allTurn(1);
	noAddStep || allStep.push('2' + type);
	_show();
}
//面转
function planeTurn(type, noAddStep) {
	allTurn(3);
	horizontalTurn(type, 1);
	allTurn(3);
	allTurn(3);
	allTurn(3);
	noAddStep || allStep.push('3' + type);
	_show();
}
//整体转 1234 1水平右 2水平左 3垂直下 4垂直上
function allTurn(type) {
	var foo = [];
	if (type == 1) {
		foo = arr[2];
		arr[2] = arr[5];
		arr[5] = arr[4];
		arr[4] = arr[6];
		arr[6] = foo;
		turnSurface(1, 1);
		turnSurface(2, 1);
		turnSurface(3);
		turnSurface(4, 1);
		turnSurface(5, 1);
		turnSurface(6, 1);
	}
	/*	if(type == 2){
			foo = arr[1];
			arr[1] = arr[2];
			arr[2] = arr[3];
			arr[3] = arr[4];
			arr[4] = foo;
			turnSurface(5,1);
			turnSurface(6);
		}*/
	if (type == 3) {
		foo = arr[1];
		arr[1] = arr[5];
		arr[5] = arr[3];
		arr[3] = arr[6];
		arr[6] = foo;
		turnSurface(3, 1);
		turnSurface(3, 1);
		turnSurface(5, 1);
		turnSurface(5, 1);
		turnSurface(4, 1);
		turnSurface(2);
	}
	/*	if(type == 4){
			foo = arr[1];
			arr[1] = arr[6];
			arr[6] = arr[3];
			arr[3] = arr[5];
			arr[5] = foo;
			turnSurface(3,1);
			turnSurface(3,1);
			turnSurface(6,1);
			turnSurface(6,1);
			turnSurface(4);
			turnSurface(2,1);
		}	*/
	_show();
}
//砖面方法 n为面编号   rotationSense为1 顺时针 只转一个面
function turnSurface(n, rotationSense) {
	var array = [arr[n][0][0], arr[n][0][1], arr[n][0][2], arr[n][1][2], arr[n][2][2], arr[n][2][1], arr[n][2][0], arr[n][1][0]];
	var foo = _turnSurface(array, rotationSense);

	arr[n][0][0] = foo[0];
	arr[n][0][1] = foo[1];
	arr[n][0][2] = foo[2];
	arr[n][1][2] = foo[3];
	arr[n][2][2] = foo[4];
	arr[n][2][1] = foo[5];
	arr[n][2][0] = foo[6];
	arr[n][1][0] = foo[7];
	_show()
}
//type为1顺时针
function _turnSurface(arr, type) {
	arr.push(arr[0], arr[1]);
	arr.unshift(arr[6], arr[7]);
	if (type) return arr.slice(0, 8);
	else return arr.slice(4);
}
//output 123456
function getFaceIndex(val) {
	var num = '';
	arr.forEach(function(v, k) {
		v.forEach(function(v2) {
			v2.forEach(function(v3) {
				if (v3 == val) {
					num = k;
				}
			})
		})
	})
	return num;
}
//步骤执行
function run(step, v) {
	eval('step' + step).run(v);
}

function isWhite(val) {
	if (9 >= val) return 1;
	else return 0;
}
//执行
function excute(array) {
	for (var i = 0; i < 20; i++) {
		var val = array[i].substring(0, 1);
		var num = array[i].substring(1, 2);
		val == 1 && horizontalTurn(num);
		val == 2 && verticalTurn(num);
		val == 3 && planeTurn(num);
	}
}
//打乱
function upset() {
	allStep = [];
	for (var i = 0; i < 20; i++) {
		var val = Math.round(Math.random() * 2) + 1;
		var num = Math.round(Math.random() * 5 + 1);
		val == 1 && horizontalTurn(num);
		val == 2 && verticalTurn(num);
		val == 3 && planeTurn(num);
		if (!check.run()) {
			console.log('step error' + val + num);
			break;
		}
	}
	console.log(allStep);
}
//后退
function goback() {
	var foo = allStep[allStep.length - 1];
	if (foo.substring(0, 1) == '1') {
		horizontalTurn(_goback(foo.substring(1, 2)), 1);
	}
	if (foo.substring(0, 1) == '2') {
		verticalTurn(_goback(foo.substring(1, 2)), 1);
	}
	if (foo.substring(0, 1) == '3') {
		planeTurn(_goback(foo.substring(1, 2)), 1);
	}
	allStep.pop();
}

function _goback(val) {
	if (val == '1') return '4';
	if (val == '2') return '5';
	if (val == '3') return '6';
	if (val == '4') return '1';
	if (val == '5') return '2';
	if (val == '6') return '3';
}

function excuteStep() {
	run(1);
	run(2);
	run(3);
	run(4);
	run(5);
	run(6);
}