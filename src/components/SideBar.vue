<template>
  <div class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <nav id="sidebarMenu">
      <div class="position-sticky pt-3">
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>管理商品</span>
          <a class="link-secondary" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/admin/productsManagement">
              <i class="fas fa-box-open"></i>
              商品管理
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to='/admin/orderlist'>
              <i class="fas fa-clipboard-list"></i>
              訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to='/admin/coupons'>
              <i class="fas fa-birthday-cake"></i>
              優惠券
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        a: 1,
      }
    },

    methods: {
      addActive() {
        console.log(e)
      }
    }
  }
</script>