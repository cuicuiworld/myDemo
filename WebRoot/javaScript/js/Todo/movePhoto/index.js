window.onload = function() {
	var oUl = document.getElementById('ul1');
	var aLi = oUl.getElementsByTagName('li');
	var positionArr = [];
	var minZindex = 2;
	var i = 0;

	/**
	 * 布局转换，从静态到动态
	 */
	for (i = 0; i < aLi.length; i++) {
		positionArr[i] = {
			left : aLi[i].offsetLeft,
			top : aLi[i].offsetTop
		}
	}

	for (i = 0; i < aLi.length; i++) {
		aLi[i].style.left = positionArr[i].left + 'px';
		aLi[i].style.top = positionArr[i].top + 'px';

		aLi[i].style.position = 'absolute';
		aLi[i].style.margin = '0';
	}

	/**
	 * 拖拽
	 */
	function setDrag(obj) {
		obj.onmousedown = function(ev) {

			var oEvent = ev || event;
			var disX = oEvent.clientX - obj.offsetLeft;
			var disY = oEvent.clientY - obj.offsetTop;

			obj.style.zIndex = minZindex++;

			obj.onmousemove = function(ev) {
				var oEvent = ev || event;
				obj.style.left = oEvent.clientX - disX + 'px';
				obj.style.top = oEvent.clientY - disY + 'px';

				for (i = 0; i < aLi.length; i++) {
					aLi[i].className = '';

					if (aLi[i] == obj) {
						continue;
					}
					
					var near = getNearest(obj);
					if(near){
						near.className = 'active';
					}
					/*if (cdNear(obj, aLi[i])) {
						aLi[i].className = 'active';
					}*/
				}
			}

			obj.onmouseup = function() {
				obj.onmousemove = null;
				obj.onmouseup = null;
			}

			return false;
		}
	}

	/**
	 * 监测碰撞
	 */
	function cdNear(obj1, obj2) {
		var objRight1 = obj1.offsetLeft + obj1.offsetWidth;
		var objLeft1 = obj1.offsetLeft;
		var objTop1 = obj1.offsetTop;
		var objBottom1 = obj1.offsetTop + obj1.offsetHeight;

		var objRight2 = obj2.offsetLeft + obj2.offsetWidth;
		var objLeft2 = obj2.offsetLeft;
		var objTop2 = obj2.offsetTop;
		var objBottom2 = obj2.offsetTop + obj2.offsetHeight;

		if (objRight1 < objLeft2 || objLeft1 > objRight2
				|| objBottom1 < objTop2 || objTop1 > objBottom2) {
			return false;
		} else {
			return true;
		}
	}

	for (i = 0; i < aLi.length; i++) {
		setDrag(aLi[i]);
	}

	/**
	 * 求直线距离
	 */
	function getDistance(obj1, obj2) {
		var a = obj1.offsetLeft - obj1.offsetLeft;
		var b = obj1.offsetTop - obj2.offsetTop;

		return Math.sqrt(Math.pow(a, 2), Math.pow(b, 2));
	}
	
	/**
	 * 求最短距离
	 */
	function getNearest(obj) {
		//求最小数
		var minNum = 9999;
		var minIndex = -1;
		
		for(i =0; i<aLi.length; i++){
			if(aLi[i] == obj){
				continue;
			}
			if(cdNear(obj,aLi[i])){
				var dis = getDistance(obj,aLi[i]);
				if(minNum>dis){
					minNum = dis;
					minIndex = i;
				}
			}
		}
		if(minIndex == -1){
			return null;
		}else{
			return aLi[minIndex];
		}
	}

}