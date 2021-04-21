import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path:'*',
  //   redirect:'/login'
  // },
  {
    path: '/',
    name: 'Home',
    component: ()=>import('../views/Home.vue')
  },
  {
    path: '/product_concert',
    name: 'ProductConcert',
    component: ()=>import('../views/ProductCategory/ProductConcert.vue'),
  },
  {
    path: '/product_drama',
    name: 'ProductDrama',
    component: ()=>import('../views/ProductCategory/ProductDrama.vue'),
  },
  {
    path: '/product_expo',
    name: 'ProductExpo',
    component: ()=>import('../views/ProductCategory/ProductExpo.vue'),
  },
  {
    path: '/product_family',
    name: 'ProductFamily',
    component: ()=>import('../views/ProductCategory/ProductFamily.vue'),
  },
  {
    path: '/product_movie',
    name: 'ProductMovie',
    component: ()=>import('../views/ProductCategory/ProductMovie'),
  },
  {
    path: '/product_music',
    name: 'ProductsMusic',
    component: ()=>import('../views/ProductCategory/ProductMusic.vue'),
  },
  {
    path: '/product_sport',
    name: 'ProductSport',
    component: ()=>import('../views/ProductCategory/ProductSport.vue'),
  },
  {
    path:'/product',
    name:'Product',
    component: ()=>import('../views/Product.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=>import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'DashBoard',
    component: ()=>import('../views/DashBoard.vue'),
    meta: { requiresAuth: true },
    children:[
      {
        path: 'productsmanagement',
        name: 'ProductsManagement',
        component: ()=>import('../views/ProductsManagement.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'orderlist',
        name: 'OrderList',
        component: ()=>import('../views/OrderList.vue'),
        meta: { requiresAuth: true },
      },      
      {
        path: 'coupons',
        name: 'Coupons',
        component: ()=>import('../views/Coupons.vue'),
        meta: { requiresAuth: true },
      },
    ]
  },
  {
    path: '/customer',
    name: 'Customer',
    component: ()=>import('../views/DashBoard.vue'),
  },
  {
    // path: '/customer_checkout',
    path: '/customer_checkout/:orderId',
    name: 'CustomerCheckout',
    component: ()=>import('../views/CustomerCheckout.vue'),
  },
  {
    path: '/customer_order',
    name: 'CustomerOrder',
    component: ()=>import('../views/CustomerOrder.vue'),
  },
  {
    path:'/customer_code',
    name:'CustomerCode',
    component:()=>import('../views/CustomerCode.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
