<template>
<div class="wrapper">
	<div class="mark"></div>
	<div class="alert-box">
	    <div class="alert-title">温馨提示</div>
	    <div class="alert-cont">确定要进入第{{number+1}}条内容吗？</div>
	    <div class="alert-btn-div">
	        <a class="alert-btn-cancel" @click="cancelEvent">取 消</a>
	        <a @click="cancelEvent" v-link="{path:'/hello'}" class="alert-btn-delall">确定</a>
	    </div>
	</div>
</div>
</template>
<script>
export default {
	props:['number','show'],
	methods:{
		cancelEvent:function(){
			this.show = false;
		}	
	}
}
</script>