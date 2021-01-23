import Vue from 'vue'
import swal from "sweetalert";
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import("../views/Login.vue"),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/Login.vue")
  },
  {
    path: '/logout',
    name: 'Logout',
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/changePassword',
    name: 'ChangePassword',
    component: () => import('@/views/ChangePassword.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/changeAddress',
    name: 'ChangeAddress',
    component: () => import('@/views/ChangeAddress.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/product/all',
    name: 'Products',
    component: () => import('../views/Products.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/product',
    redirect: '/product/all'
  },
  {
    path: '/products',
    redirect: '/product/all'
  },
  {
    path: '/cart',
    redirect: '/cart/save'
  },
  {
    path: '/cart/save',
    name: 'Cart',
    component: () => import("../views/Cart.vue"),
  },
  {
    path: '/purchaseHistory',
    name: 'PurchaseHistory',
    component: () => import("../views/PurchaseHistory.vue"),
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '*',
    redirect: '/404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("userId");
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
  
  if (isAuthenticated != null && (to.name === 'Login' || to.name === 'Register')) {
    swal({
      // position: 'top-end',
      icon: 'success',
      title: 'Already Loggedin',
      text: 'Redirecting to browse product catalog',
      button: false,
      timer: 3000
  })
    next({ path: '/product/all' })
  }
  else if(requiresAuth && !isAuthenticated){
      swal({
        // position: 'top-end',
        icon: 'error',
        title: 'Access Denied',
        text: 'Please login to browse product catalog',
        button: true,
        timer: 5000
    })
      next({ path: '/login' })
    }
    else next()

    if(to.name === 'Logout') {
      localStorage.removeItem("userId");
      localStorage.removeItem("keyword");
      localStorage.removeItem("firstname");
      swal({
        // position: 'top-end',
        icon: 'success',
        title: 'Logged out!',
        text: 'Redirecting to login page',
        button: true,
        timer: 5000
    });
    router.push('Login');
      // next({ path: '/login' })
    }
});

export default router