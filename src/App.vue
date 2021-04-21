<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
  @import "./assets/style/all";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>


<script>
  export default {

    // created() {
    //   const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
    //   this.$http.get(api).then((response) => {
    //     console.log(response.data)
    //   });
    // },
  }
</script>