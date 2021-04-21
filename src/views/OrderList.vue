<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <th width="120">購買時間</th>
        <th width="120">Email</th>
        <th width="120">購買品項</th>
        <th width="100">應付金額</th>
        <th width="80">是否付款</th>
      </thead>
      <tbody>
        <tr v-for="item of orders" :key="item.id">
          <td>{{new Date(item.create_at *1000).toLocaleDateString()}} {{new Date(item.create_at
            *1000).toLocaleTimeString()}}</td>
          <td>{{item.user.email}}</td>
          <td>0</td>
          <td>{{item.total}}</td>
          <td>
            <span class="text-success" v-if="item.is_paid">已付款</span>
            <span v-else class="text-danger">未付款</span>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        isLoading: false,
        orders: [],

      }
    },

    methods: {
      getOrderList() {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=1`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          this.orders = response.data.orders;
          console.log(this.orders);
          this.isLoading = false;
        });
      },
    },

    created() {
      this.getOrderList()
    },
  }

</script>