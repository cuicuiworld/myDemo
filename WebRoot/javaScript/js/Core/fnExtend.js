/**
 * 拓展jq插件，封装自己的共有插件库
 */
;
$.fn.extend({
	//让盒子居中
	center : function() {
		var options = $.extend({
			inside:window,			//容器
			transition:0,			//动画
			minX:0,					//最小x值
			minY:0,					//最小Y值
			withScrolling:true,		//是否允许有滚动条
			vertical:true,			//水平
            horizontal:true,		//垂直
		}, options);
		
		return this.each(function() {  
            var props = {position:'absolute'};  
            if (options.vertical) {  
                 var top = ($(options.inside).height() - $(this).outerHeight()) / 2;  
                 if (options.withScrolling) top += $(options.inside).scrollTop() || 0;  
                 top = (top > options.minY ? top : options.minY);  
                 $.extend(props, {top: top+'px'});  
            }  
            if (options.horizontal) {  
                  var left = ($(options.inside).width() - $(this).outerWidth()) / 2;  
                  if (options.withScrolling) left += $(options.inside).scrollLeft() || 0;  
                  left = (left > options.minX ? left : options.minX);  
                  $.extend(props, {left: left+'px'});  
            }  
            if (options.transition > 0) $(this).animate(props, options.transition);  
            else $(this).css(props);  
            return $(this);  
       });  
	},
	//拖拽图片
	drag : function() {
		var $this = this;
		var flag = false;
		var $document = $(document);
		
		var offsetX,
			offsetY,
			clientY,
			clientX,
			top,
			left;
		
		$this.on('mousedown',function(e){
			offsetX=e.offsetX;
			offsetY=e.offsetY;
			clientY=e.clientY;
			clientX=e.clientX;
			top=parseFloat($this.css('top').replace('px',''));
			left=parseFloat($this.css('left').replace('px',''));
			if($(e.target).parents('#'+$this[0].id).length>0){
				$this.find('img')[0].ondragstart=function(){
					return false;
				}
				flag=true;
			}
			console.log('mousedown=>left:'+left+',top:'+top+'\n'+
					'mousedown=>clientX:'+clientX+',clientY:'+clientY)
			flag=true;
		});
		
		$document.on('mousemove', function(e) {
			var _left=e.clientX-clientX;
			var _top=e.clientY-clientY;
			if(flag) {
//				内部坐标计算法
//				var xy={
//						top:e.clientY-offsetY +'px',
//						left:e.clientX-offsetX+'px'
//				};
//				console.log(xy)
				//外部坐标计算法
				var xy={
						top:top+ _top +'px',
						left:left+ _left +'px',
				};
				$this.css(xy);
			}
		})
		$document.on('mouseup',function(e){
			console.log('拖动结束')
			flag=false;
		})
		return this;
	},
	//滚轮缩放
	wheel : function() {
		var $this = this;
		$this.on('mousewheel', function(e, xy) {
			var sfbs = e.originalEvent.wheelDelta > 0 ? 1.1 : 0.9;
			var psbs = e.originalEvent.wheelDelta > 0 ? -0.1 : 0.1;
			
			var w = parseFloat($this[0].style.width.replace('px', ''));
			var h = parseFloat($this[0].style.height.replace('px', ''));
			
			var top = parseFloat($this[0].style.top.replace('px', ''));
			var left = parseFloat($this[0].style.left.replace('px', ''));
			
			var styleObj = {
					width : w * spbs,
					height : h * spbs,
					top : top + psbs * top / 2 + 'px',
					left : left + psbs * left / 2 + 'px'
			}
			
			$this.css(styleObj);
		})
		return this;
	},
	//加载文件
	include : function(file) {
		var files = typeof file === 'string' ? [files] : file;
		for (var i = 0; i < files.length; i++) {
            var name = files[i].replace(/^\s|\s$/g, "");
            var att = name.split('.');
            var ext = att[att.length - 1].toLowerCase();
            var isCSS = ext == "css";
            var tag = isCSS ? "link": "script";
            var attr = isCSS ? " type='text/css' rel='stylesheet' ": " language='javascript' type='text/javascript' ";
            var link = (isCSS ? "href" : "src") + "='" + $.includePath + name + "'";
            if ($(tag + "[" + link + "]").length == 0)
                console.log("<" + tag + attr + link + "></" + tag + ">");
        }
	},
	zoom : function(options) {
		var defaults = {
            ywidth:'200',//ywidth是图片当前要适应的宽度
            yheight:'300'//yheight是图片当前要适应的高度
	    };
        var settings = $.extend(defaults, options);
        
        return this.each(function() {
            $this = $(this);
            var imgSrc = $this.attr('src');
            var h;
            var img = new Image();
            img.src = imgSrc;
            $this.parent().css({
            	'height':settings.yheight+'px',
            	'line-height':settings.yheight+'px',
            	'*font-size':settings.yheight*0.873+'px'
            });
            if(img.complete){
                h = settings.ywidth*img.height/img.width;
                if(h>settings.yheight){
                    $this.css('height',settings.yheight+'px');
                }else{
                    $this.css('width',settings.ywidth+'px');
                } 
            }else{
                img.onload = function(){
                    h = settings.ywidth*img.height/img.width;
                    if(h>settings.yheight){
                        $this.css('height',settings.yheight+'px');
                    }else{
                        $this.css('width',settings.ywidth+'px');
                    } 
                }
            }
        })
	},
	deffered : function() {
		
	},
})







