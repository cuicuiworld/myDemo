<template>
<div class="om-wrap">
    <div class="om-list-box">
        <!-- <loading v-show="showLoading"></loading> -->
        <template  v-for="item in arr">
            
        	<div class="om-list om-list-img" @click="confirmEvent($index)">
                <img v-bind:src="item.img" class="om-list-src">
                <div class="om-list-title om-ellipsis">{{item.title}}</div>
                <div class="om-list-text om-ellipsis">{{item.text}}</div>
            </div>
            
        </template>
    </div>
    <confirm v-show="confirmShow" :number="number" :show.sync="confirmShow"></confirm>
</div>  

</template>


<script>
import confirm from './confirm.vue';
export default {
    data:function(){
        return {
            confirmShow:false,
            arr : [],
            number:0
        }
    },
    components:{
        'confirm': confirm
    },
    ready:function(){
        this.loadData();
    },
    methods:{
        loadData : function(){
            var self = this,
                $wrap = $('.om-wrap'),
                $box = $('.om-list-box'),
                dropload = $wrap.dropload({
                    //上滑加载
                    loadDownFn : function(me){
                        self.$http.get('./src/data.json').then((d) => {
                            if(d.ok){
                                var res = eval('(' + d.body + ')');
                                self.arr = self.arr.concat(res.data);
                                self.$nextTick(function(){
                                    me.resetload();
                                })
                            }else{
                                console.log('请求失败');
                            }
                            
                        })
                        
                        
                    }
                });

        },
        confirmEvent:function(index){
            console.log(index)
            this.confirmShow = true;
            this.number = index;
        }
    },
    
}


</script>