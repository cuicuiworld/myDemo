

$.fn.banner = function( option ) {
	this.defaults = {
		boxWrap : null,
		prevBtn : false,
		nextBtn : false,
		timer : 2000,
		speed : 600,
		autoPlay : false,
		circle : false,
		circleAlign : 'center',
		circleClick : false
	}
	var me = this;
	this.flag = true;
	this.time = null;
	this.options = $.extend({}, this.defaults, option);
	this.init = function(){
		me.build();
	}
	this.build = function() {
		
		var wrap = me.defaults.boxWrap;
		var firstImg = $(wrap).find('li').first();
		var lastImg = $(wrap).find('li').last();
		me.num = 1;
		me.width = $(window).width();
		$(wrap).append(firstImg.clone());
		$(wrap).append(lastImg.clone());
		me.length = $(wrap).find('li').length();
		$(wrap).find('li').width(me.width());
		$(wrap).width(me.width() * me.length());
		$(wrap).parent().height(700);
		$(wrap).parent().width(me.width());
		$(wrap).css({'left' : me.width() * me.Num})
		
		if(me.defaults.prevBtn){
			me.prevBtn();
		}
		if(me.defaults.nextBtn){
			me.nextBtn();
		}
		if(me.defaults.autoPlay){
			me.plays();
		}
		if(me.defaults.circle){
			me.circle();
		}
		if(me.defaults.circleClick){
			me.clickCircle();
		}
	}
	this.bindEvent = function() {
		me.on({
			'mouseenter' : function() {
				me.stops();
			},
			'mouseleave' : function() {
				me.plays();
			}
		})
	}
	this.plays = function() {
		console.log('autoPlay');
	}
	this.stops = function() {
		console.log('stop');
	}
	this.prevBtn = function() {
		var el = $('<a href="javascript:void(0)" id="prevBtn"></a>');
		me.append(el);
		$('#prevBtn').on('click',function() {
			me.go(me.width);
		})
	}
	this.nextBtn = function() {
		var el = $('<a href="javascript:void(0)" id="nextBtn"></a>');
		me.append(el);
		$('#nextBtn').on('click',function() {
			me.go(-me.width);
		})
	}
	this.circle = function() {
		var el = $('<div id="circle-wrap"></div>');
		for(var i = 0; i<me.length-2; i++){
			$('<a class="dot" href="javascript:;"></a>').appendTo(el);
		}
		el.css({
			"position":"absolute",
			'bottom':'0',
			'right':'0',
			'left':'0',
			'height':'20px',
			"padding":"0 10px",
			'text-align':me.options.circleAlign
		})
	}
	this.activeCircle = function() {
		
	}
	this.circlePlay = function() {
		
	}
	this.clickCircle - function() {
		
	}
	this.go = function(offset){
		if(me.flag){
			me.flag = false;
			if(offset < 0){
				me.num ++;
				if(me.num > me.length - 2){
					me.num = 1;
				}
			}
			if(offset > 0){
				me.num --;
				if(me.num < 0){
					me.num = me.length - 2;
				}
			}
			if(Math.ceil($(me.options.boxWrap).position().left)<-(me.length-2)*me.width){
	            $(me.options.boxWrap).css({
	                'left':-me.width
	            });
	        }
	        if(Math.ceil($(me.options.boxWrap).position().left)>-me.length){
	            $(me.options.boxWrap).css({
	                'left':-me.width*(me.length-2)
	            })
	        }
	        $(me.options.boxWrap).stop().animate({
	        	'left':$(self.options.boxWrap).position().left+offset
	        }, me.options.speed, function() {
	        	me.flag = true;
	        });
		}
	}
	this.init();
	
	
	
}
