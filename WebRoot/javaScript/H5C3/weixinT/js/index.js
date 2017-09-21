/*调用主要功能*/
$(function(){
    $('#feifei').fullpage({
    	/*设置锚点链接，可以通过a标签链接到对应的哪一屏*/
    	anchors:['page1','page2','page3','page4'],
    	/*滚动一屏花费时长*/
    	scrollingSpeed:800,
    	/*设置滚动动画为css3 会自动去检测，如果不予兼容 插件会自动改成JQ的动画形式*/
    	css3:true,
    	/*到达最后一屏后，是否允许回到首屏*/
    	continuousVertical:true,
    	/* 生成侧边导航*/
    	navigation:true,
    	menu: '#menu',
    	/*	滚动到某一屏后的回调函数，接收 anchorLink 和 index 两个参数，anchorLink 是锚链接的名称，index 是序号，从1开始计算*/
		afterLoad:function(anchorLink,index){

			$('.section').removeClass('comeout').eq(index - 1).addClass('comeout');

		},
		/*滚动前的回调函数，接收 index、nextIndex 和 direction 3个参数：
		index 是离开的“页面”的序号，从1开始计算；
		nextIndex 是滚动到的“页面”的序号，从1开始计算；
		direction 判断往上滚动还是往下滚动，值是 up 或 down。*/
		
    });
});
