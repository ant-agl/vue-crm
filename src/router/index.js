import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { getAuth } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let title = to.matched[0].meta.title || "";
  if (title != "") title += " | ";
  title += "VueCRM";
  document.title = title;

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const reqireAuth = to.matched.some((r) => r.meta?.auth);
  const reqireNoAuth = to.matched.some((r) => r.meta?.noauth);

  if (reqireAuth && !currentUser) {
    next("/login?message=login");
  } else if (reqireNoAuth && currentUser) {
    next("/?message=logged");
  } else {
    next();
  }
});

export default router;
