import Vue from "vue";
import VueRouter from "vue-router";

import axios from 'axios'


Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    beforeEnter: (async(to, from, next) => {
      if (await checkAuth()) {
        next('/')
      } else {
        next({name: 'login'})
      }
    })
  },
  {
    path: "/login",
    name: "login",
     component: () => import('../components/auth/Login'),
    beforeEnter: async (to, from, next) => {
      if (await checkAuth()) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/booking",
    name: "booking",
    component: () => import('../components/booking/booking'),
    beforeEnter: async(to, from, next) => {
      if (await checkAuth()) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/",
    name: "Home",
    redirect: "booking",
    beforeEnter: async(to, from, next) => {
      if (await checkAuth()) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/add-house",
    name: "Houses",
    component: () => import('../components/house/addHouse'),
    beforeEnter: async(to, from, next) => {
      if (await checkAuth()) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/history",
    name: "History",
    component: () => import('../components/history/history'),
    beforeEnter: async(to, from, next) => {
      if (await checkAuth()) {
        next();
      } else {
        next("/login");
      }
    },
  },
  
 
  
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0)
  }
});





async function checkAuth() {
  let isAuth = await axios.get('/check-auth', {
    headers: {
      authorization: localStorage.getItem('token')
    }
  })
  return isAuth.data.success;
}

export default router;
