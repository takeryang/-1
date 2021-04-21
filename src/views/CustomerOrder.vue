<template>
  <div class="customer-order">
    <loading :active.sync="isLoading"></loading>

    <Header :carts-len="cartsLen" />

    <div class="container order">
      <div class="row">
        <div class="col-md-6">
          <div class="order-title">
            <p>確認訂單</p>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th class="text-center">品名</th>
                <th class="text-center">數量</th>
                <th class="text-right">小計</th>
                <th class="text-right" width="100">刪除品項</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of carts.carts" :key="item.id">
                <td class="text-center align-middle">{{item.product.title}}
                  <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                </td>
                <td class="text-center align-middle">{{item.qty}}</td>
                <td class="text-right align-middle">{{item.total}}</td>
                <td class="text-right"><button class="btn btn-outline-danger" @click="removeCart(item.id)"><i
                      class="far fa-trash-alt"></i></button></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right font-weight-bold align-middle">總計</td>
                <td class="text-right font-weight-bold align-middle">{{carts.total}}</td>
                <td></td>
              </tr>
              <tr v-if="carts.total !== carts.final_total">
                <td colspan="2" class="text-right text-success font-weight-bold align-middle">折扣後</td>
                <td class="text-right text-success font-weight-bold align-middle">{{carts.final_total}}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>

          <div class="input-group mb-3 p-0">
            <input type="text" class="form-control" v-model="coupon_code.code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-primary" type="button" @click="addCouponCode">套用優惠碼</button>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="order-title mb-3">
            <p>填寫訂購資訊</p>
          </div>
          <validation-observer v-slot="{ invalid }">
            <form @submit.prevent="createOrder">

              <validation-provider name="電子郵件" rules="required|email" v-slot="{ errors, classes }">
                <div class="form-group">
                  <label for="useremail" class="mb-1">Email</label>
                  <input type="email" class="form-control" :class="classes" name="email" id="useremail"
                    v-model="form.user.email" placeholder="請輸入 Email">
                  <span class="invalid-feedback m-0">{{ errors[0] }}</span>
                </div>
              </validation-provider>

              <validation-provider name="收件人姓名" rules="required" v-slot="{ errors, classes }">
                <div class="form-group">
                  <label for="username" class="mb-1">收件人姓名</label>
                  <input type="text" class="form-control" :class="classes" name="name" id="username"
                    v-model="form.user.name" placeholder="輸入姓名">
                  <span class="invalid-feedback m-0">{{ errors[0] }}</span>
                </div>
              </validation-provider>

              <validation-provider name="收件人電話" rules="required" v-slot="{ errors, classes }">
                <div class="form-group">
                  <label for="usertel" class="mb-1">收件人電話</label>
                  <input type="tel" class="form-control" :class="classes" name="usertel" id="usertel"
                    v-model="form.user.tel" placeholder="請輸入電話">
                  <span class="invalid-feedback m-0">{{ errors[0] }}</span>
                </div>
              </validation-provider>

              <validation-provider name="收件人地址" rules="required" v-slot="{ errors, classes }">
                <div class="form-group">
                  <label for="useraddress" class="mb-1">收件人地址</label>
                  <input type="text" class="form-control" :class="classes" name="address" id="useraddress"
                    v-model="form.user.address" placeholder="請輸入地址">
                  <span class="invalid-feedback m-0">{{ errors[0] }}</span>
                </div>
              </validation-provider>

              <div class="order-title mb-3">
                <p>填寫付款資訊</p>
              </div>

              <Card />

              <div class="text-right">
                <button class="btn btn-danger" :disabled="invalid" @submit.prevent="createOrder">送出訂單</button>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Header from "../components/Header"
  import Card from "../components/Card"

  export default {
    components: {
      Header,
      Card,
    },

    data() {
      return {
        products: [],
        product: {},
        carts: {},
        status: {
          loadingItem: '',
        },
        isLoading: false,
        coupon_code: {
          code: '',
        },
        form: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: '',
          },
          message: '',
        },

        forms: {
          creditCard: '',
          dateCard: '',
          password: '',
        },
        cartsLen:0,
      }
    },

    methods: {
      getProducts() {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=:page`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          this.products = response.data.products;
          this.isLoading = false;
        });
      },

      getProduct(id) {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
        this.status.loadingItem = id;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          this.product = response.data.product;
          $('#productModal').modal('show');
          this.status.loadingItem = '';
        });
      },

      addtoCart(id, qty = 1) {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        this.status.loadingItem = id;
        const cart = {
          product_id: id,
          qty,
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

      removeCart(id) {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
        this.isLoading = true;
        this.$http.delete(api).then((response) => {
          this.getCart();
          console.log(response.data);
        });
      },

      addCouponCode() {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
        this.isLoading = true;
        this.$http.post(api, { data: this.coupon_code }).then((response) => {
          this.getCart();
          console.log(response.data);
          this.isLoading = false;
          this.coupon_code.code = '';
        });
      },

      createOrder() {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/order`;
        this.isLoading = true;
        this.$http.post(api, { data: this.form }).then((response) => {
          console.log(response.data);
          if (response.data.success) {
            this.$router.push(`customer_checkout/${response.data.orderId}`)
          }
          this.isLoading = false;
          this.carts = {};
        });
      },
    },

    created() {
      this.getProducts();
      this.getCart();
    },
  }
</script>