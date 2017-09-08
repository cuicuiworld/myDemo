<template>
  <div class="home">
    <a v-link="{path:'/list'}">
      <div class="om-list">
        <div class="om-list-title om-ellipsis">进入列表1</div>
      </div>
    </a>
    <a v-link="{path:'/list'}">
      <div class="om-list">
        <div class="om-list-title om-ellipsis">进入列表2</div>
      </div>
    </a>
    <a v-link="{path:'/list'}">
      <div class="om-list">
        <div class="om-list-title om-ellipsis">进入列表3</div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
