/* Document JS */
window.onload = function () {
	(function cache (value) {
		var circleCache = document.getElementById('circleCache');
		var timer = setInterval(move,1000);
		var dot = {
			x : 150,
			y : 150
		};
		var radius = 50;
		var value = Number(value);
		function draw (cur) {
			if(circleCache == null)
				return false;
			var context = circleCache.getContext('2d');

			context.clearRect(0,0,circleCache.width,circleCache.height);//清空画布
			// context.translate(dot.x,dot.y);//改变原点坐标

			// 绘制外圆
			context.beginPath();
			context.arc(dot.x,dot.y, radius, 0, 2*Math.PI , false);
			context.closePath();
			context.lineWith = 2;
			context.strokeStyle = "#ddd";
			context.stroke();

			//绘制内圆
			context.beginPath();
			context.moveTo(dot.x, dot.y);
			context.arc(dot.x,dot.y, radius-10, 0, 2*Math.PI , true);
			context.closePath();
			context.lineWith = 2;
			context.strokeStyle = "#ddd";
			context.stroke();
			
			// 绘制进度
			context.beginPath();
			context.save();
			context.moveTo(dot.x, dot.y );
			context.arc( dot.x, dot.y, radius, 0, 2*Math.PI*n, false );
			context.closePath();
			context.fillStyle = "#cccccc";
			context.fill();
			context.restore();

			// 绘制内部空白
			context.beginPath();
			context.save();
			context.moveTo(dot.x, dot.y);
			context.arc(dot.x,dot.y, radius-10, 0, 2*Math.PI , true);
			context.closePath();
			context.fillStyle = 'rgba(255,255,255,1)';  
			context.fill();
			context.restore();

			//绘制文字
			context.font = "bold 14px Arial";
			context.textAlign = "center";
			context.textBaseline = "middle";
			var value = n*100;
			context.fillText(value + "%", dot.x, dot.y);
		}
		
		var timer=null,n=0;
    	function move(nowT){
        	timer = setInterval(function(){
           	 	if(n>nowT){
                	clearInterval(timer);
            	}else{
                	draw(n);
                	n += 0.02;
            	}
        	},1000);
    	}
    	move(value/100);
    	timer = null;
	} )()
}