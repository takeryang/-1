<template>
  <div class="product-item">
    <loading :active.sync="isLoading"></loading>
    <Header :carts-len="carts.carts.length" />

    <div class="container product">
      <div class="row">
        <div class="col-md-6">
          <div class="product-img mb-2">
            <img :src="product.imageUrl" alt="" class="img-fluid">
          </div>
          <h2>{{product.title}}</h2>
          <p>{{product.description}}</p>
        </div>
        <div class="col-md-6 d-flex">
          <div class="ticket-l d-flex flex-column w-50">
            <div class="count text-center d-flex flex-column justify-content-center align-items-center">
              <div class="ticket-count d-flex mb-6">
                <button @click="minusTicket"><i class="fas fa-minus-circle"></i></button>
                <p class="mx-5">{{ticketCount}}</p>
                <button @click="addTicket"><i class="fas fa-plus-circle"></i></button>
              </div>
              <div>
                <p class="small-text">張</p>
              </div>
            </div>
            <div class="buy-button text-center">
              <button class="btn btn-outline-primary" @click="scroll">節目資訊</button>
            </div>
          </div>
          <!-- <div class="border"></div> -->
          <div class="ticket-r d-flex flex-column w-50">
            <div class="price text-center d-flex flex-column justify-content-center">
              <div class="mb-6">
                <p>NT${{product.price}}</p>
              </div>
              <div>
                <p class="small-text">票價</p>
              </div>
            </div>
            <div class="buy-button text-center">
              <button class="btn btn-primary" @click="addtoCart(product.id,product.num)"><i
                class="fas fa-spinner fa-spin mr-2" v-if="status.loadingItem === product.id"></i>購賣票券</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container show-detail" id="detail">
      <div class="banner py-2 pl-4 rounded mb-4">
        <p class="m-0">節目資訊</p>
      </div>
      <div class="product-img mb-4">
        <img :src="product.imageUrl" alt="" class="img-fluid">
      </div>
      <div class="border mb-4"></div>
      <p class="show-text pre-line">
        {{product.content}}
      </p>
      <div class="border mb-10"></div>
    </div>

    <Footer />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Header from "../components/Header";
  import Footer from "../components/Footer"

  export default {
    components: {
      Header,
      Footer,
    },

    data() {
      return {
        ticketCount: 1,
        product: [],
        isLoading: false,
        carts: {},
        status: {
          loadingItem: '',
        },
        productID:'',
      }
    },

    methods: {
      addTicket() {
        this.ticketCount++
        this.ticketLength()
      },

      minusTicket() {
        if (this.ticketCount > 1) {
          this.ticketCount--
          this.ticketLength()
        }
      },

      ticketLength() {
        if (this.ticketCount < 10) {
          this.ticketCount = "0" + this.ticketCount
        } else {
          this.ticketCount = this.ticketCount
        }
      },

      scroll() {
        this.$el.querySelector("#detail").scrollIntoView({ behavior: "smooth" })
      },

      getProductDetail(id) {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          this.product = response.data.product;
          this.isLoading = false;
        });
      },

      addtoCart(id,qty= "0"+ 1) {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        this.status.loadingItem = id;
        const cart = {
          product_id: id,
          qty: this.ticketCount,
        }
        this.$http.post(api, { data: cart }).then((response) => {
          console.log(response.data);
          this.status.loadingItem = '';
          this.ticketCount = "0"+1;
          this.getCart();
        });
      },

      getCart() {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          this.carts = response.data.data;
          this.isLoading = false;
        });
      },
    },

    created() {
      this.ticketLength()
      this.productID = this.$route.query.id
      this.getProductDetail(this.productID)
      this.getCart()
    },
  }
</script>