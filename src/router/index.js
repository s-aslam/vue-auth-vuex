import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Home from "../views/home";

Vue.use(VueRouter);

const isNotAuthenticated = (to, from, next) => {
  // console.log("store.getters", store);
  if (store.getters.isAuthenticated) {
    next("/");
  } else {
    next();
  }
};

const isAuthenticated = (to, from, next) => {
  // console.log("store.getters", store.state);
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next("login");
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    meta: { title: "Home" },
    component: Home
  },
  {
    path: "/signup",
    name: "signup",
    meta: { title: "signup" },
    component: () => import("../views/signup.vue"),
    beforeEnter: isNotAuthenticated
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "Login" },
    component: () => import("../views/login.vue"),
    beforeEnter: isNotAuthenticated
  },
  {
    path: "/profile",
    name: "profile",
    meta: { title: "Profile" },
    component: () => import("../views/profile.vue"),
    beforeEnter: isAuthenticated
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Vue Auth";
  next();
});

export default router;
