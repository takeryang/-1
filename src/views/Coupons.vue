<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="text-right mt-4">
      <button class="btn btn-primary" data-toggle="modal" @click="showModal(true)">建立優惠券</button>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">折扣券名稱</th>
          <th width="120">折扣比例</th>
          <th width="120">到期日</th>
          <th width="100">是否啟用</th>
          <th width="130">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" item of coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.percent}}%</td>
          <td>{{item.due_date}}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm mr-2" @click="showModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="delModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page of pagination.total_pages" :key="page"
          :class="{'active': pagination.current_page == page}"><a class="page-link" href="#"
            @click.prevent="getProducts(page)">{{page}}</a></li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Modal -->
    <div class="modal fade" id="couponsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{modalTitle}}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-row">
                  <div class="form-group w-100">
                    <label for="title">優惠券名稱</label>
                    <input type="text" class="form-control" id="title" placeholder="請輸入優惠券名稱" v-model="coupon.title">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group w-100">
                    <label for="code">優惠碼</label>
                    <input type="text" class="form-control" id="code" placeholder="請輸入優惠碼" v-model="coupon.code">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group w-100">
                    <label for="due_date">到期日</label>
                    <input type="date" class="form-control" id="due_date" v-model="coupon.due_date">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group w-100">
                    <label for="percent">折扣比例</label>
                    <input type="number" class="form-control" id="percent" placeholder="請輸入折扣比例"
                      v-model="coupon.percent">
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_enabled" v-model="coupon.is_enabled"
                      :true-value="enAbled.true" :false-value="enAbled.false">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="cerateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{coupon.title}}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import $ from "jquery";

  export default {
    data() {
      return {
        coupon: {},
        pagination: {},
        coupons: [],
        enAbled: {
          true: 1,
          false: 0,
        },
        isLoading: false,
        isNew: false,
        modalTitle: '建立優惠券'
      }
    },

    methods: {
      showModal(isNew, item) {
        if (isNew) {
          this.coupon = {};
          this.isNew = true;
        } else {
          this.coupon = Object.assign({}, item);
          this.isNew = false;
          this.modalTitle = '編輯優惠券';
        }
        $('#couponsModal').modal('show')
      },

      couponsList() {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=1`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          this.pagination = response.data.pagination;
          this.coupons = response.data.coupons;
          if (response.data.success) {
            this.isLoading = false;
          }
        });
      },
      cerateCoupon() {
        let api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
        let httpMethod = 'post';
        if (!this.isNew) {
          api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.coupon.id}`;
          httpMethod = 'put'
        }
        this.$http[httpMethod](api, { data: this.coupon }).then((response) => {
          console.log(response.data);
          this.isLoading = true;
          if (response.data.success) {
            this.isLoading = false;
            $('#couponsModal').modal('hide')
            this.couponsList()
          }
        });
      },

      delModal(item) {
        this.coupon = item;
        $('#delCouponModal').modal('show');
        console.log(this.coupon)
      },

      delCoupon() {
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.coupon.id}`;
        this.$http.delete(api).then((response) => {
          console.log(response.data);
          if (response.data.success) {
            this.couponsList();
            $('#delCouponModal').modal('hide');
          } else {
            alert('刪除商品失敗')
            this.couponsList();
            $('#delCouponModal').modal('hide');
          }
        });
      },
    },

    created() {
      this.couponsList()
    },
  }
</script>