<template>
  <div class="header">
    <div class="secheader bg-primary">
      <div class="container">
        <div class="row align-items-center py-1">
          <div class="col-md-6 social-media">
            <a href="" class="text-light p-3"><i class="fab fa-instagram"></i></a>
            <a href="" class="text-light p-3"><i class="fab fa-facebook-square"></i></a>
            <a href="" class="text-light p-3"><i class="fab fa-line"></i></a>
            <a href="" class="text-light p-3"><i class="fab fa-github"></i></a>
          </div>
          <div class="col-md-6 text-right userlink">
            <a href="" class="text-light p-2 mr-5"><i class="fas fa-user mr-1"></i>會員登入</a>
            <router-link class="text-light p-2" to="/login"><i class="fas fa-user-cog mr-1"></i>管理員登入</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="mainheader container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <h1 class="m-0">
          <router-link class="navbar-brand title mr-4" to="/home"><i class="fab fa-bootstrap text-primary mr-2"></i>boo售票網
          </router-link>
        </h1>
        <div class="d-lg-none ml-auto mr-3 cart-lg"><a href="" class="align-middle"><i
              class="fas fa-shopping-cart"></i></a></div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" focus-class="focus" to='/product_music'><i
                  class="fas fa-music"></i>音樂</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" focus-class="focus" to='/product_drama'><i
                  class="fas fa-theater-masks"></i>戲劇</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" focus-class="focus" to='/product_sport'><i
                  class="fas fa-basketball-ball"></i>運動</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" focus-class="focus" to='/product_expo'><i
                  class="fas fa-palette"></i>展覽</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" focus-class="focus" to='/product_concert'><i
                  class="fas fa-microphone-alt"></i>演唱會</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" focus-class="focus" to='/product_movie'><i
                  class="fas fa-video"></i></i>電影</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" focus-class="focus" to='/product_family'><i
                  class="fas fa-child"></i>親子</router-link>
            </li>
          </ul>
        </div>
        <div class="cart">
          <router-link to="/customer_order"><i class="fas fa-shopping-cart mr-1"></i>購物車({{len = cartsLen}})
          </router-link>
        </div>
      </nav>
    </div>

    <!-- collapse -->
  </div>
</template>

<script>
  export default {
    props: ['cartsLen'],

    data() {
      return {
        len: "",
      }
    }
  }
</script>