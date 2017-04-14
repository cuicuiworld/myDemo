window.onload = function() {
	document.onmousemove = function(ev) {
		var oEvent = ev || event;
		var oDiv = document.getElementById('div1');
		var aImg = document.getElementsByTagName('img');
		var aInput = document.getElementsByTagName('input');
		var i = 0;
		
		for (i = 0; i < aImg.length; i++) {
			
			var x = aImg[i].offsetLeft + aImg[i].offsetWidth / 2;
			var y = aImg[i].offsetTop + oDiv.offsetTop + aImg[i].offsetHeight / 2;
			
			var a = x - oEvent.clientX;
			var b = y - oEvent.clientY;
			
			var scale = 1 - Math.sqrt(Math.pow(a,2),Math.pow(b,2))/300;
			
			if(scale<0.5){
				scale=0.5;
			}
			
			aImg[i].width = scale*128;
			aInput[i].value = scale.toFixed(2);
		}
	}
}

/**
 * offsetLeft,offsetTop,都是相对于父级位置而言的,左上角的点的位置
 * 
 * Math.sqrt() 根号 
 * 
 * Math.pow(val,num)	val数值, num值的几次幂方
 */