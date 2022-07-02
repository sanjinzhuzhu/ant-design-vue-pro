<template>
  <div id="app">
     <a-button>按钮</a-button>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view></router-view>
   <!-- <div>
    <div class="desc">Ant Design Vue Pro</div>
    <router-view></router-view>
  </div> -->

    
  </div>
</template>

<style lang="less">

</style>
