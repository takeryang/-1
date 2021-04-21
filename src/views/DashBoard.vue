<template>
  <div>
    <NavBar></NavBar>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <SideBar></SideBar>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import SideBar from "../components/SideBar";
  import $ from "jquery";
  import Alert from "../components/AlertMessage";

  export default {
    components: {
      NavBar,
      SideBar,
      Alert,
    },

    created() {
      const mycookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common['Authorization'] = mycookie;
    },
  }
</script>