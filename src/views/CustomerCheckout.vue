<template>
  <div>
    <Header :carts-len="cartsLen" />
    <div class="container">
      <div class="my-5 row justify-content-center">
        <form class="col-md-8" @submit.prevent="payOrder">
          <div class="check-order">
            <p>確認訂購資訊</p>
          </div>
          <table class="table">
            <thead>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{ order.total }}</td>
              </tr>
            </tfoot>
          </table>

          <table class="table">
            <tbody>
              <tr>
                <th width="120">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right">
            <button class="btn btn-danger" v-if="order.is_paid === false">確認付款去</button>
            <router-link class="btn btn-success" v-if="order.is_paid === true" to="/customer_code">領取取票代碼</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "../components/Header"

  export default {
    components: {
      Header,
    },

    data() {
      return {
        order: {
          user: {}
        },
        orderId: '',
        carts: {},
        cartsLen:0,
      }
    },

    methods: {
      getOrder() {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/order/${this.orderId}`;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          this.order = response.data.order;
        });
      },

      payOrder() {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/pay/${this.orderId}`;
        this.$http.post(api).then((response) => {
          console.log(response.data);
          if (response.data.success) {
            this.getOrder()
          }
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

    created() {
      this.orderId = this.$route.params.orderId;
      this.getOrder()
      this.getCart()
    }
  }
</script>