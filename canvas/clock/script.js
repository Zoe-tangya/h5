

	function draw(clock){
		var clock=document.getElementById('clock');
		var width = 400;//画布宽度
		var height = 400;//画布高度
		clock.width = width;
		clock.height = height;
		var radius = 90;//圆盘半径 
		var borderWidth = 4;//圆盘边框宽度
		var dot = {
			x : 150,
			y : 150,
			radius : 2
		};//圆点坐标，半径

		//创建指针画布（把指针和圆盘分离开，便于擦除）
		var clockPointers = document.createElement('canvas');
		console.log(clockPointers);
		clockPointers.width = width;
		clockPointers.height = height;
		clock.appendChild(clockPointers);
		if(clock==null)
			return false;
		var context=clock.getContext('2d');
		context.translate(dot.x,dot.y);//改变原点坐标
		
		//绘制时钟圆盘
		context.beginPath();
		context.save();//将当前状态保存到栈中
		context.arc(0,0,radius,0,Math.PI*2,false);
		context.closePath();
		context.fillStyle="#EEEEFF";
		context.strokeStyle="#000";
		context.lineWidth= borderWidth;
		context.fill();
		context.stroke();
		context.restore();

		// 时钟中心圆点
		context.beginPath();
		// context.save();
		context.arc(0,0,dot.radius,0,Math.PI*2,false);
		context.closePath();
		context.fillStyle="#000";
		context.strokeStyle="#000";
		context.fill();
		context.stroke();
		context.restore();

		// 刻度
		for(var i = 0,angle = 0,len,tem;i < 60;i++){
			context.beginPath();
			if(i % 5 == 0){
				context.lineWidth = 2;
				len = 8;
				context.fillStyle = "#999";
			}
			else{
				context.lineWidth = 0;
				len = 0;
			}
			// tem = radius - borderWidth;	
			context.moveTo(radius* Math.cos(angle),radius* Math.sin(angle));
			tem =radius - len;
			context.lineTo(tem * Math.cos(angle),tem * Math.sin(angle));
			context.stroke();
			context.closePath();
			angle +=Math.PI / 30;//每次递增1/30π
		}

		// 设置文字
		context.font="14px Arial";
		context.textAlign="center";
		context.textBaseline="middle";
		context.fillText("12",0,-72);
		context.fillText("6",0, 72);
		context.fillText("3",72,0);
		context.fillText("9",-72,0);
			
		// 指针的运动
		function move(){
			//获取当前时间
			var date=new Date();
			var h=date.getHours();
			var m=date.getMinutes();
			var s=date.getSeconds();
			var str=h + ":" + m + ":" + s;
			

			if(clockPointers == null)
				return false;
			var ptContext = clockPointers.getContext('2d');
			console.log(ptContext);
			ptContext.translate(dot.x,dot.y);//改变原点坐标
			
			ptContext.clearRect(0,0,width,height);//擦除原来的指针
			ptContext.beginPath();
			ptContext.fillText(str,0,50);
		 	//秒针
			ptContext.save();
			ptContext.fillStyle = "#ff0000";
			ptContext.lineWidth = 1;
			ptContext.rotate(s * Math.PI / 30);//现在所处时刻对应的角度
			ptContext.moveTo(0,0);
			ptContext.lineTo(0,72);
			// ptContext.closePath();
			ptContext.fill();
			ptContext.stroke();
			ptContext.restore();

			//分针
			// ptContext.beginPath();
			ptContext.save();
			ptContext.lineWidth = 2;
			ptContext.rotate(m * Math.PI / 30);
			ptContext.moveTo(0,0);
			ptContext.lineTo(0,60);
				// ptContext.closePath();
			ptContext.stroke();
			ptContext.restore();

			// 时针
			ptContext.save();
			ptContext.lineWidth = 4;
			// ptContext.beginPath();
			ptContext.rotate(h * Math.PI / 6);
			ptContext.moveTo(0,0);
			ptContext.lineTo(0,50);
			// ptContext.closePath();
			// ptContext.fill();
			ptContext.stroke();
			ptContext.restore();

		}	
		var timer = setInterval(move,1000);
	}
	