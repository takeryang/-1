<template>
  <div>
    <Header :carts-len="cartsLen" />
    <div class="container code">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="confirm text-success text-center">
            <i class="far fa-check-circle"></i>
            <p>完成訂購</p>
          </div>
          <div class="code-content">
            <p>您的展覽憑證代碼為：</p>
            <div class="qrcode text-center">
              <img src="../assets/images/QRcode.png" alt="">
              <p>Y7Z4PZKMBI</p>
            </div>
            <p>您已完成購票手續，請於 2021/04/01 ~ 2021/04/31 於四大超商機台掃描QR Code或輸入代碼完成取票。</p>
          </div>
          <div class="text-right">
            <router-link class="btn btn-primary w-50" to="/">繼續瀏覽</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/Header.vue'

  export default {
    components: {
      Header,
    },

    data() {
      return {
        carts: {},
        cartsLen:0,
      }
    },

    methods: {
      getCart() {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          this.carts = response.data.data;
          this.cartsLen = response.data.data.carts.length;
          this.isLoading = false;
        });
      },
    },

    created() {
      this.getCart();
    },
  }
</script>