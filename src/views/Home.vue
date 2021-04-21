<template>
  <div class="home">
    <loading :active.sync="isLoading"></loading>
    <Header :carts-len="cartsLen" />

    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item" :class="{'active': index === 0}" v-for="(product,index) of sortArr.slice(4,7)"
          :key="product.id">
          <img :src="product.imageUrl" class="d-block w-100" alt="...">
          <div class="carousel-caption text-left px-2">
            <h2 class="font-weight-bold mb-2">{{product.title}}</h2>
            <p class="font-weight-bold mb-4 d-none d-md-block">01 JUN - 31 OCT</p>
            <div class="d-flex justify-content-around justify-content-md-start">
              <button class="btn btn-primary mr-2 banner-btn" data-toggle="modal" data-target="#productModal"
                @click="getProduct(product.id)">立即購票</button>
              <button class="btn btn-outline-secondary banner-btn" @click="getProductDetail(product.id)">
                詳細資訊</button>
            </div>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <div class="container popular-show">
      <h2 class="font-weight-bold popular-show">
        熱門節目
      </h2>
      <div class="row">
        <div class="col-12 d-flex mb-5 lg-config" v-for="product of sortArr.slice(0,4)" :key="product.id">
          <div class="product-img"><img :src="product.imageUrl" alt="" class="img-fluid">
          </div>
          <div class="d-flex product">
            <div class="d-flex flex-column justify-content-between product-content w-100">
              <div>
                <div class="d-flex align-items-center mb-3">
                  <h3 class="font-weight-bold">{{product.title}}
                    <span class="category" style="background-color: #F9539D;"
                      v-show="product.category === '音樂'">{{product.category}}</span>
                    <span class="category" style="background-color: #00D2FF;"
                      v-show="product.category === '戲劇'">{{product.category}}</span>
                    <span class="category" style="background-color: #E55A23;"
                      v-show="product.category === '運動'">{{product.category}}</span>
                    <span class="category" style="background-color: #C500FF;"
                      v-show="product.category === '展覽'">{{product.category}}</span>
                    <span class="category" style="background-color: #3FA72A;"
                      v-show="product.category === '演唱會'">{{product.category}}</span>
                    <span class="category" style="background-color: #CC0000;"
                      v-show="product.category === '電影'">{{product.category}}</span>
                    <span class="category" style="background-color: #2721E4;"
                      v-show="product.category === '親子'">{{product.category}}</span>
                  </h3>
                </div>
                <p class="mb-2 font-weight-bold price">${{product.price}}</p>
                <p class="font-weight-bold line-clamp">
                  {{product.description}}
                </p>
              </div>
              <div class="d-flex">
                <button class="btn btn-primary mr-2" @click="getProduct(product.id)">立即購票</button>
                <button class="btn btn-outline-secondary" @click="getProductDetail(product.id)">詳細資訊</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container most-show">
      <h2 class="font-weight-bold">更多節目</h2>
      <div class="row">
        <div class="col-lg-6 mb-3" v-for="product of getRandomArrayElements(products,6)">
          <div class="card">
            <div class="product-img">
              <a href="" @click.prevent="getProductDetail(product.id)">
                <img :src="product.imageUrl" class="card-img-top" alt="...">
              </a>
            </div>
            <div class="card-body">
              <h5 class="card-title product"><a href="">{{product.title}}</a></h5>
              <p class="card-text line-clamp">{{product.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />

    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" data-backdrop="static">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary ">
            <h5 class="modal-title text-light" id="exampleModalCenterTitle">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="ticketCount = '0' + 1">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="modalUrl" alt="" class="img-fluid mb-3">
            <div>
              <p>{{product.description}}</p>
            </div>
            <div class="d-flex">
              <div class="ticket-l d-flex flex-column w-50">
                <div class="count text-center d-flex flex-column justify-content-center align-items-center">
                  <div class="ticket-count d-flex mb-6">
                    <button @click.prevent="minusTicket"><i class="fas fa-minus-circle"></i></button>
                    <p class="mx-5">{{ticketCount}}</p>
                    <button @click.prevent="addTicket"><i class="fas fa-plus-circle"></i></button>
                  </div>
                  <div>
                    <p class="small-text">張</p>
                  </div>
                </div>
              </div>
              <div class="ticket-r d-flex flex-column w-50">
                <div class="modal-price text-center d-flex flex-column justify-content-center">
                  <div class="mb-6">
                    <p>NT${{product.price}}</p>
                  </div>
                  <div>
                    <p class="small-text">票價</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowarp">
              小計 <strong> {{ticketCount * product.price}}</strong> 元
            </div>
            <button type="button" class="ml-auto btn btn-outline-secondary" data-dismiss="modal"
              @click="ticketCount = '0' + 1">取消選購</button>
            <button type="button" class="btn btn-primary" @click="addtoCart(product.id,product.num)"><i
                class="fas fa-spinner fa-spin" v-if="status.loadingItem === product.id"></i>加入購物車</button>
          </div>
        </div>
      </div>
    </div>

    <div class="alsrtInfo" :style="{display: displayStsates}" ref="alertMsg">
      <div class="profPrompt_test">{{aletMsg}}</div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  import $ from 'jquery';

  export default {
    components: {
      Header,
      Footer,
    },

    data() {
      return {
        ticketCount: 1,
        products: [],
        product: {},
        carts: {},
        status: {
          loadingItem: '',
        },
        isLoading: false,
        cartsLen: 0,
        modalUrl: '',
        // coupon_code: {
        //   code: '',
        // },
        // form: {
        //   user: {
        //     name: '',
        //     email: '',
        //     tel: '',
        //     address: '',
        //   },
        //   message: '',
        // },

        aletMsg: '輸入優惠碼7414及享全站商品9折優惠',
        displayStsates: 'none',

      }
    },

    methods: {
      signout() {
        const api = `${process.env.VUE_APP_APIPATH}logout`;
        this.$http.post(api).then((response) => {
          console.log(response.data);
          if (response.data.success) {
            this.$router.push("/login");
          }
        });
      },

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
          this.modalUrl = response.data.product.imageUrl;
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

      getRandomArrayElements(arr, count) {

        let shuffled = arr.slice(0),
          i = arr.length,
          min = i - count,
          temp, index;
        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }
        return shuffled.slice(min);
      },

      addtoCart(id, qty) {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        this.status.loadingItem = id;
        const cart = {
          product_id: id,
          qty: this.ticketCount,
        }
        this.$http.post(api, { data: cart }).then((response) => {
          console.log(response.data);
          this.status.loadingItem = '';
          this.getCart();
          $('#productModal').modal('hide');
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

      alertDia(msg) {
        this.displayStsates = 'block'
        this.aletMsg = msg
        // 延迟2秒后消失 自己可以更改时间
        window.setTimeout(() => {
          this.displayStsates = 'none'
        }, 1000)
      },
    },

    computed: {
      sortArr() {
        return this.products.sort(function (a, b) {
          let idA = a.id.charAt(a.id.length - 1);
          let idB = b.id.charAt(b.id.length - 1);
          if (idA < idB) {
            return -1;
          }
          if (idA > idB) {
            return 1;
          }
          return 0;
        });
      }
    },

    created() {
      this.getCart()
      this.alertDia(this.aletMsg)
      this.getProducts()
    }
  }
</script>