import { createRouter, createWebHistory } from "vue-router";

// import Home from "@/views/Movies/ListAllMovies.vue";
import Categories from "@/views/Categories/ListAllCategories.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
export const routes = [
  {
    path: "/",
    name: "Movies",
    component: () => import("@/views/Movies/ListAllMovies.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/moviesByCategory/:category",
    name: "MoviesByCategory",
    component: () => import("@/views/Movies/ListAllMoviesByCategory.vue"),
  },
  {
    path: "/create",
    name: "CreateMovie",
    component: () => import("@/views/Movies/CreateMovie.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/edit/:movieId",
    name: "EditMovie",
    component: () => import("@/views/Movies/EditMovie.vue"),
    meta: { requireAuth: true },
  },

  {
    path: "/categories",
    name: "Categories",
    component: Categories,
    meta: { requireAuth: true },
  },
  {
    path: "/categories/create",
    name: "CreateCategory",
    component: () => import("@/views/Categories/CreateCategory.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/categories/edit/:categoryId",
    name: "EditCategory",
    component: () => import("@/views/Categories/EditCategory.vue"),
    meta: { requireAuth: true },
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Auth/Login.vue"),
    meta: { requireAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Auth/Register.vue"),
    meta: { requireAuth: false },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
    meta: { requireAuth: false },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const { token } = storeToRefs(useAuthStore());
  if (to.meta.requireAuth) {
    if (token.value !== null) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
