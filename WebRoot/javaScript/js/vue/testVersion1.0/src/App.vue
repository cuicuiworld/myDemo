<template>
  <div>
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评价</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</template>

<script>
import Header from 'components/header/header'

export default {
  components: {
    'v-header':Header
  }
}
</script>

<style>
  .tab{
    display:flex;
    height:40px;
    line-height: 40px;
    text-align: center;
  }
  .tab-item{
    flex:1;
  }
  .tab a {
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }
</style>
