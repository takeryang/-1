<template>
  <div class="product-music">
    <loading :active.sync="isLoading"></loading>
    <Header :carts-len="cartsLen" />

    <div class="container-fluid product" :class="{'bg-secondary':index%2 === 0,'item-right':index%2 !== 0}"
      v-for="(product,index) of filterMusic">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 d-flex flex-column flex-md-row" :class="{'ml-auto': index%2 !== 0}">
            <div class="product-information order-1 order-md-0">
              <a href="" @click.prevent="getProductDetail(product.id)">
                <h2>{{product.title}}</h2>
              </a>
              <p class="line-clamp">{{product.description}}</p>
            </div>
            <div class="product-img order-0 order-md-1">
              <a href="" @click.prevent="getProductDetail(product.id)">
                <img :src="product.imageUrl" alt="" class="img-fluid">
              </a>
            </div>
            <div class="show-date d-none d-md-flex align-items-end order-2">
              <p class="m-0">01<br>JUN<br>|<br>31<br>OCT</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />

    <router-view></router-view>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Header from "@/components/Header";
  import Footer from "@/components/Footer"

  export default {
    components: {
      Header,
      Footer,
    },

    data() {
      return {
        products: [],
        product: [],
        isLoading: false,
        carts: {},
        cartsLen:0,
      }
    },

    methods: {
      getProducts() {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          this.products = response.data.products;
          this.isLoading = false;
        });
      },

      getProduct(id) {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          this.product = response.data.product;
          this.isLoading = false;
          $('#productModal').modal('show');
        });
      },

      getProductDetail(id) {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          if (response.data.success) {
            this.$router.push({ path: '/product', query: { id: `${response.data.product.id}` } })
          }
          this.isLoading = false;
        });
      },

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

    computed: {
      filterMusic() {
        return this.products.filter(function (item) {
          return item.category === '音樂'
        })
      }
    },

    created() {
      this.getProducts()
      this.getCart()
    },
  }
</script>