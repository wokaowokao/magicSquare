;
! function(a) {
	"use strict";
	a.step1 = {
		//黄中心点
		faceIndex : 0,
		find: function() {
			this.faceIndex = getFaceIndex(23);
		},
		excute: function() {
			switch (+this.faceIndex) {
				case 1:
					horizontalTurn(2);
					horizontalTurn(2);
					break;
				case 2:
					horizontalTurn(2);
					break;
				case 3:
					return false;
					break;
				case 4:
					horizontalTurn(5);
					break;
				case 5:
					verticalTurn(5);
					break;
				case 6:
					verticalTurn(2);
					break;
				default:
					console.log('step1_false_excute');
			}
		},
		run: function() {
			this.find();
			this.excute();
		}
	};
	a.step2 = {
		point : [],
		find: function(v) {
			//包含check功能
			//v代表第二步 的点
			for (var a in arr) {
				if (a == 3) continue;
				for (var b in arr[a]) {
					for (var c in arr[a][b]) {
						//屏蔽角点 和非白点
						if (arr[a][b][c] > 9) continue;
						if(v){
							if((a == 1 || a == 2 || a == 4 ) &&  b !=1) continue;
							if((a == 5 || a == 6) && b ==1) continue;
						}else{
							if((a == 1 || a == 2 || a == 4 ) &&  b ==1) continue;
							if((a == 5 || a == 6) && b !=1) continue;
						}
						if (b == 0 && c == 0) continue;
						if (b == 0 && c == 2) continue;
						if (b == 2 && c == 0) continue;
						if (b == 2 && c == 2) continue;
						if (b == 1 && c == 1) continue;
						this.point = [a, b, c]; return 1;
					}
				}
			}
			return 0;
		},
		excute: function() {
			//直接上
			//this.point 为可直接上的位置 return 0说明有问题
			if(this.point[1] == 0){
				if(this.point[0] == 1){
					horizontalTurn(1);
					horizontalTurn(1);
					return 1;
				}
				if(this.point[0] == 2){
					horizontalTurn(1);
					return 1;
				}
				if(this.point[0] == 4){
					horizontalTurn(4);
					return 1;
				}
			}
			if(this.point[1] == 1){
				if(this.point[0] == 5){
					if(this.point[2] == 0){
						verticalTurn(4);
						return 1;
					}
					if(this.point[2] == 2){
						verticalTurn(6);
						return 1;
					}
				}
				if(this.point[0] == 6){
					if(this.point[2] == 0){
						verticalTurn(1);
						return 1;
					}
					if(this.point[2] == 2){
						verticalTurn(3);
						return 1;
					}
				}
			}
			if(this.point[1] == 2){
				if(this.point[0] == 1){
					horizontalTurn(3);
					horizontalTurn(3);
					return 1;
				}
				if(this.point[0] == 2){
					horizontalTurn(3);
					return 1;
				}
				if(this.point[0] == 4){
					horizontalTurn(6);
					return 1;
				}
			}
			console.log('c_false'+this.point);
		},
		a : function(){
			if(this.c()) this.b();
			else this.excute();
		},
		b: function() {
			//转 白面 被占 就继续转
			planeTurn(1);
			if(this.c()){
				this.b();
			}else{
				this.excute();
				return;
			}
		},
		c: function() {
			//检查是否 位置被占
			var array = this.point.concat();
			if (array[0] == 5 || array[0] == 6) {
				if (array[1] == 1) {
					if (array[2] == 0) array[2] = 2;
					else array[2] = 0;
				}
			}
			if (arr[3][array[1]][array[2]] < 9) return 1;
			else return 0;
		},
		d : function(){
			//递归 正确位置的白点 归位
			if(this.find()) {
				this.a();
				this.d();
			}else{
				return;
			}
		},
		e : function(k){
			//转之前 判断是否 会影响以归位的白块
			if(this.g(this.point[0])){
				//如果影响 先转白面
				planeTurn(1);
				this.e('1');
			} 
			if(k) return;
			//this.point所在的面转 this.point修改
			if(this.point[0] == 1) {
				planeTurn(3);
				this.i();
				return;
			}
			if(this.point[0] == 2) {
				verticalTurn(6);
				this.i();
				return;
			}
			if(this.point[0] == 4) {
				verticalTurn(1);
				this.i();
				return;
			}
			if(this.point[0] == 5) {
				horizontalTurn(4);
				this.i();
				return;
			}
			if(this.point[0] == 6) {
				horizontalTurn(3);
				this.i();
				return;
			}
			console.log('h_false'+this.point[0]);
		},
		h : function(){
			if(this.find(1)){
				//转面
				this.e();
				//转上此点
				this.a();
				this.d();
				this.h();
			}else{
				return;
			}
		},
		i : function(){
			//得到顺时针 转面 之后的点
			if(this.point[1] == 0 && this.point[2] == 1){
				this.point = [this.point[0],1,2];
				return;
			}
			if(this.point[1] == 1 && this.point[2] == 0){
				this.point = [this.point[0],0,1];
				return;
			}
			if(this.point[1] == 1 && this.point[2] == 2){
				this.point = [this.point[0],2,1];
				return;
			}
			if(this.point[1] == 2 && this.point[2] == 1){
				this.point = [this.point[0],1,0];
				return;
			}
		},
		g : function(k){
			//转面 是否影响 已归位 白块 1影响
			if(k == 1) return 0;
			if(k == 2){
				if(arr[3][1][0] <= 9) return 1;
				else return 0;
			}
			if(k == 4){
				if(arr[3][1][2] <= 9) return 1;
				else return 0;
			}
			if(k == 5){
				if(arr[3][0][1] <= 9) return 1;
				else return 0;
			}
			if(k == 6){
				if(arr[3][2][1] <= 9) return 1;
				else return 0;
			}
			console.log('l_false'+k);
		},
		run : function(){
			this.d();
			this.h();
		}
	};

	a.step3 = {
		arrFour : [0,0,0,0],
		a : function(){
			//循环 没有转过的白色
			for(var key in this.arrFour){
				if(this.arrFour[key] == 1) continue;
				if(key == 0){
					if(this.b(arr[5][1][1],arr[5][2][1])) {
						this.excute(key);
						continue;
					}
					else continue;
				}
				if(key == 1){
					if(this.b(arr[2][1][0],arr[2][1][1])) {
						this.excute(key);
						continue;
					}
					else continue;
				}
				if(key == 2){
					if(this.b(arr[6][0][1],arr[6][1][1])) {
						this.excute(key);
						continue;
					}
					else continue;
				}
				if(key == 3){
					if(this.b(arr[4][1][1],arr[4][1][2])) {
						this.excute(key);
						continue;
					}
					else continue;
				}
				console.log('step3_a_false');
			}
		},//检查并转 并改数组
		b : function(a,b){
			return Math.floor(a/9) == Math.floor(b/9) ? 1 : 0;
		},
		c:function(){
			if(this.check()){
				return;
			}else{
				planeTurn(3);
				var foo = this.arrFour[3];
				this.arrFour[3] = this.arrFour[2];
				this.arrFour[2] = this.arrFour[1];
				this.arrFour[1] = this.arrFour[0];
				this.arrFour[0] = foo;
				this.a();
				this.c();
			}
		},
		excute : function(a){
			//转 并改b
			if(a == 0){
				horizontalTurn(1);
				horizontalTurn(1);
				this.arrFour[a] = 1;
				return;
			}
			if(a == 1){
				verticalTurn(3);
				verticalTurn(3);
				this.arrFour[a] = 1;
				return;
			}
			if(a == 2){
				horizontalTurn(3);
				horizontalTurn(3);
				this.arrFour[a] = 1;
				return;
			}
			if(a == 3){
				verticalTurn(1);
				verticalTurn(1);
				this.arrFour[a] = 1;
				return;
			}
			console.log('step3_d_false'+a);
		},
		check : function(){
			for (var i in this.arrFour) {
				if(!this.arrFour[i]) return 0;
			}
			return 1;
		},
		run:function(){
			allTurn(3);
			allTurn(3);
			this.a();
			this.c();
			allTurn(3);
		}
	};

	a.step4 = {
		isLeft : 0,
		point : [],
		find:function(v){
			if(this.point.length) return 1;
			var layerIndex = v ? 0 : 2;
			for (var i = 0; i < 4; i++) {
				if(arr[i+1][layerIndex][2] <= 9){
					var point = [i+1,layerIndex,2];
					//如果是第二步 查找第一层白 point为白块 第一步point为 白块相邻面的 块
					this.point = !v ? this.a(point[0],point[1],point[2]).split(',') : point;
					this.isLeft = !v ? 1 : 0;
					return 1;
				}
				if(arr[i+1][layerIndex][0] <= 9){
					var point = [i+1,layerIndex,0];
					this.point = !v ? this.a(point[0],point[1],point[2]).split(',') : point;
					this.isLeft = !v ? 0 : 1;
					return 1;
				}
			}
			return 0;
		},
		a : function(k1,k2,k3,v){
			//返回 白块相邻面的 块
			var foo = [];
			var layerIndex = v ? 0 : 2;
			foo['4,'+ layerIndex +',0'] = '3,'+ layerIndex +',2';
			foo['4,'+ layerIndex +',2'] = '1,'+ layerIndex +',0';
			foo['1,'+ layerIndex +',0'] = '4,'+ layerIndex +',2';
			foo['1,'+ layerIndex +',2'] = '2,'+ layerIndex +',0';
			foo['2,'+ layerIndex +',0'] = '1,'+ layerIndex +',2';
			foo['2,'+ layerIndex +',2'] = '3,'+ layerIndex +',0';
			foo['3,'+ layerIndex +',0'] = '2,'+ layerIndex +',2';
			foo['3,'+ layerIndex +',2'] = '4,'+ layerIndex +',0';
			return foo[k1+','+k2+','+k3];
		}, 
		find1:function(){
			if(getColor(arr[6][0][0]) == 'white' || getColor(arr[6][0][2]) == 'white' || getColor(arr[6][2][0]) == 'white' || getColor(arr[6][2][2]) == 'white'){
				this.e();
				return 1;
			}else{
				return 0;
			}
		},
		e:function(){
			if(getColor(arr[6][0][0]) == 'white'){
				return;
			}
			if(getColor(arr[6][0][2]) == 'white'){
				horizontalTurn(6);
				return;
			}
			if(getColor(arr[6][2][0]) == 'white'){
				horizontalTurn(3);
				return;
			}
			if(getColor(arr[6][2][2]) == 'white'){
				horizontalTurn(3);
				horizontalTurn(3);
				return;
			}
		},
		excute :function(){
			console.log('excute');
			this.b();
			this.c();
			if(this.isLeft){
				verticalTurn(1);
				horizontalTurn(3);
				verticalTurn(4);
			}else{
				verticalTurn(3);
				horizontalTurn(6);
				verticalTurn(6);
			}
			this.point = [];
		},
		b : function(){
			var a = arr[this.point[0]][this.point[1]][this.point[2]];
			var b = arr[this.point[0]][1][1];
			if(getColor(a) != getColor(b)) {
				horizontalTurn(3);
				this.point[0] = this.point[0] > 3 ? 1 : +this.point[0]+1;
				this.b();
			}
		},
		c : function(){
			switch (+this.point[0]) {
				case 1:
					break;
				case 2:
					this.d();
					this.d();
					this.d();
					break;
				case 3:
					this.d();
					this.d();
					break;
				case 4:
					this.d();
					break;
				default:
					console.log('step4_false_c'+this.point);
			}
		},
		d:function(){
			horizontalTurn(1);
			horizontalTurn(2);
			horizontalTurn(3);
		},
		excute1 :function(){
			this.c();
			if(this.isLeft){
				verticalTurn(1);
				horizontalTurn(6);
				verticalTurn(4);
				this.point = [4,2,2];
				this.isLeft = 0;
			}else{
				verticalTurn(3);
				horizontalTurn(3);
				verticalTurn(6);
				this.point = [2,2,0];
				this.isLeft = 1;
			}
		},
		excute2: function(){
			//arr[6][0][0] 为白点
			if (getColor(arr[5][2][0]) == 'white' && getColor(arr[1][0][0]) == getColor(arr[1][0][1])) {
				this.f();
				this.excute2();
			} else {
				verticalTurn(1);
				horizontalTurn(6);
				verticalTurn(4);
				var foo = [2, 2, 2];
				this.point = this.a(foo[0], foo[1], foo[2]).split(',');
				this.isLeft = 1;
				return;
			}
		},
		f : function(){
			horizontalTurn(1);
			horizontalTurn(2);
		},
		run1:function(){
			if(this.find()){
				this.excute();
				this.run1();
			}else{
				return;
			}
		},
		run2:function(){
			if (this.find(1)) {
				this.excute1();
				this.excute();
				this.run2();
			} else {
				return;
			}
		},
		run3:function(){
			if (this.find1()) {
				this.excute2();
				this.excute();
				this.run3();
			} else {
				allTurn(3);
				allTurn(3);
				return;
			}
		},
		run: function() {
			this.run1();
			this.run2();
			this.run3();
		}
	};

	a.step5 = {
		turnNum : 0,
		find:function(){
			if(getColor(arr[5][2][1]) != 'yellow' && getColor(arr[1][0][1]) != 'yellow')
			return 1;
			if(getColor(arr[5][1][2]) != 'yellow' && getColor(arr[2][0][1]) != 'yellow')
			return 2;
			if(getColor(arr[5][0][1]) != 'yellow' && getColor(arr[3][0][1]) != 'yellow')
			return 3;
			if(getColor(arr[5][1][0]) != 'yellow' && getColor(arr[4][0][1]) != 'yellow')
			return 4;
			return 0;
		},
		find1:function(){
			if(getColor(arr[1][1][2]) != 'yellow' && getColor(arr[2][1][0]) != 'yellow' && getColor(arr[1][1][2]) != getColor(arr[1][1][1]))
			return 1;
			if(getColor(arr[2][1][2]) != 'yellow' && getColor(arr[3][1][0]) != 'yellow' && getColor(arr[2][1][2]) != getColor(arr[2][1][1]))
			return 2;
			if(getColor(arr[3][1][2]) != 'yellow' && getColor(arr[4][1][0]) != 'yellow' && getColor(arr[2][1][2]) != getColor(arr[2][1][1]))
			return 3;
			if(getColor(arr[4][1][2]) != 'yellow' && getColor(arr[1][1][0]) != 'yellow' && getColor(arr[3][1][2]) != getColor(arr[3][1][1]))
			return 4;
			return 0;
		},
		run1 : function(v){
			var isFound = v ? v : this.find();
			console.log(isFound);
			switch (+isFound) {
				case 1:
					this.a(isFound);
					this.excute();
					v ? '' : this.run1();
					return;
				case 2:
					this.a(isFound);
					horizontalTurn(4);
					this.excute();
					v ? '' : this.run1();
					return;
				case 3:
					this.a(isFound);
					horizontalTurn(4);
					horizontalTurn(4);
					this.excute();
					v ? '' : this.run1();
					return;
				case 4:
					this.a(isFound);
					horizontalTurn(1);
					this.excute();
					v ? '' : this.run1();
					return;
				default:
					console.log('step5_run1_over');
			}
		}, 
		a:function(index){
			var color = getColor(arr[index][0][1]);
			if(getColor(arr[1][1][1]) == color){
				return;
			}
			if(getColor(arr[2][1][1]) == color){
				this.b(1);
			}
			if(getColor(arr[3][1][1]) == color){
				this.b(2);
			}
			if(getColor(arr[4][1][1]) == color){
				this.b(3);
			}
		},
		b:function(num){
			for (var i = 0; i < num; i++) {
				horizontalTurn(5);
				horizontalTurn(6);
			}
		},
		run2:function(){
			var isFound = this.find1();
			console.log(isFound);
			if(isFound){
				this.c(isFound-1);
				this.excute();
				this.run2();
			}else{
				console.log('step5_run2_over');
			}			
		},
		c:function(num){
			for (var i = 0; i < num; i++) {
				horizontalTurn(4);
				horizontalTurn(5);
				horizontalTurn(6);
			}
		},
		excute :function(v){
			this.turnNum = 0;
			var isLeft = getColor(arr[5][2][1]) == getColor(arr[4][1][1]) ? 1 : 0;
			if (isLeft || v) {
				var foo = 0;
				if(getColor(arr[1][1][0]) != 'yellow' && getColor(arr[4][1][2]) != 'yellow'){
					foo = 1;
				}
				horizontalTurn(1);
				verticalTurn(4);
				horizontalTurn(4);
				verticalTurn(1);
				horizontalTurn(4);
				planeTurn(3);
				horizontalTurn(1);
				planeTurn(6);

			} else {
				var foo = 0;
				if(getColor(arr[1][1][2]) != 'yellow' && getColor(arr[2][1][0]) != 'yellow'){
					foo = 1;
				}
				horizontalTurn(4);
				verticalTurn(6);
				horizontalTurn(1);
				verticalTurn(3);
				horizontalTurn(1);
				planeTurn(6);
				horizontalTurn(4);
				planeTurn(3);
			}
			if(foo){
				this.run1(3);
			}
		},
		check:function(){
			if(getColor(arr[1][1][0]) == getColor(arr[1][1][2]) && getColor(arr[3][1][0]) == getColor(arr[3][1][2])){
				return 1;
			}else{
				return 0;
			}
		},
		run: function() {
			this.run1();
			if(!this.check()) this.run2();
		}
	};

	a.step6 = {
		yellowShape : [],
		excute:function(){
			horizontalTurn(3);
			verticalTurn(6);
			planeTurn(3);
			verticalTurn(3);
			planeTurn(3);planeTurn(3);planeTurn(3);
			horizontalTurn(6);
		},
		init:function(){
			this.yellowShape = [];
			this.yellowShape.push(getColor(arr[1][0][1]) == 'yellow');
			this.yellowShape.push(getColor(arr[1][1][0]) == 'yellow');
			this.yellowShape.push(getColor(arr[1][1][2]) == 'yellow');
			this.yellowShape.push(getColor(arr[1][2][1]) == 'yellow');
		},
		check:function(){
			for (var i = 0; i < this.yellowShape.length; i++) {
				if(!this.yellowShape[i]) return 0; 
			}
			return 1;
		},
		run:function(v){
			v?'':allTurn(3);
			this.init();
			if(this.check()) return;
			if(this.yellowShape[0] && this.yellowShape[3]){
				planeTurn(3);
				this.excute();
				return;
			}
			if(this.yellowShape[1] && this.yellowShape[2]){
				this.excute();
				return;
			}
			if(this.yellowShape[0] && this.yellowShape[1]){
				this.excute();
				this.excute();
				return;
			}
			if(this.yellowShape[0] && this.yellowShape[2]){
				planeTurn(3);
				planeTurn(3);
				planeTurn(3);
				this.excute();
				this.excute();
				return;
			}
			if(this.yellowShape[3] && this.yellowShape[1]){
				planeTurn(3);
				this.excute();
				this.excute();
				return;
			}
			if(this.yellowShape[3] && this.yellowShape[2]){
				planeTurn(3);
				planeTurn(3);
				this.excute();
				this.excute();
				return;
			}
			this.excute();
			this.run(1);
		}
	}

	a.check = {
		a: function() {
			//检查中心点
			if (this.g(arr[1][1][1], arr[3][1][1]) && this.g(arr[2][1][1], arr[4][1][1]) && this.g(arr[5][1][1], arr[6][1][1])) return 1;
			else return 0;
		},
		b: function() {
			//检查边点
			//得到白边点
			var array = this.i(),arrColor = [];
			for(var key in array){
				var point = this.h(array[key][0],array[key][1],array[key][2]);
				var color = getColor(arr[point[0]][point[1]][point[2]]);
				if(color == 'white') return 0;
				arrColor.push(color);
			}
			return this.j(arrColor);

		},
		c: function(color) {
			//对面 颜色
			if (color == 'white') return 'yellow';
			if (color == 'yellow') return 'white';
			if (color == 'red') return 'orange';
			if (color == 'orange') return 'red';
			if (color == 'green') return 'blue';
			if (color == 'blue') return 'green';
			console.log('check_c_false' + color);
		},
		f: function(point) {
			//console.log(point);
			return this.c(getColor(point));
		},
		g: function(k1, k2) {
			if (getColor(k1) == this.c(getColor(k2))) return 1;
			else return 0;
		},
		h: function(v1, v2, v3) {
			var array = [];
			var key = v1 + ',' + v2 + ',' + v3;
			array['1,0,1'] = [5, 2, 1];
			array['1,1,0'] = [4, 1, 2];
			array['1,1,2'] = [2, 1, 0];
			array['1,2,1'] = [6, 0, 1];

			array['3,0,1'] = [5, 0, 1];
			array['3,1,0'] = [2, 1, 2];
			array['3,1,2'] = [4, 1, 0];
			array['3,2,1'] = [6, 2, 1];

			array['4,0,1'] = [5, 1, 0];
			array['4,2,1'] = [6, 1, 0];
			array['2,0,1'] = [5, 1, 2];
			array['2,2,1'] = [6, 1, 2];

			if (array[key]) {
				return array[key];
			} else {
				for (var key in array) {
					if (array[key][0] == v1 && array[key][1] == v2 && array[key][2] == v3) {
						return key.split(',');
					}
				}
				console.log('check_h_false');
			}
		},
		i: function() {
			var array = [];
			for (var a in arr) {
				for (var b in arr[a]) {
					for (var c in arr[a][b]) {
						//屏蔽角点 和非白点
						if (arr[a][b][c] > 9) continue;
						/*if (v) {
							if ((a == 1 || a == 2 || a == 4) && b != 1) continue;
							if ((a == 5 || a == 6) && b == 1) continue;
						} else {
							if ((a == 1 || a == 2 || a == 4) && b == 1) continue;
							if ((a == 5 || a == 6) && b != 1) continue;
						}*/
						if (b == 0 && c == 0) continue;
						if (b == 0 && c == 2) continue;
						if (b == 2 && c == 0) continue;
						if (b == 2 && c == 2) continue;
						if (b == 1 && c == 1) continue;
						array.push([a, b, c]);
					}
				}
			}
			return array;
		},
		j: function(array) {
			//检查数组 中有没有重复值
			var array = array.sort();
			for (var i = 0; i < array.length; i++) {
				if (array[i] == array[i + 1]) {
					return 0;
				}
				return 1;
			}
		},
		run: function() {
			if (this.a() && this.b()) return 1;
			else return 0;
		}
	}
}(window);

/*;!function(a){
	"use strict";
	var b = [0,0,0,0];
	a.step3 = {
		a : function(){
			 
		}, 
		b : function( ){
			 
		},
		c : function(){
			
		},
		check : function(){
			
		},
		run:function(){
		}
	};
}(window);*/
/*!function(a){
	var x = [1,2];
	a.a = {
		b : function(){
			var y = x;
			y[1] = '555';
		}
	}
}(window)
a.b();*/
$(function(){
	_show();
	excute(["21", "22", "13", "22", "35", "12", "26", "24", "13", "25", "24", "33", "24", "35", "24", "13", "31", "13", "14", "12"]);
})
//第5步  excute(["25", "35", "24", "36", "22", "24", "13", "22", "22", "31", "31", "14", "22", "21", "36", "35", "36", "15", "26", "25"]);