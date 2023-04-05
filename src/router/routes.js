export const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      layout: "empty",
    },
    component: () => import("@/views/LoginView"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      layout: "empty",
    },
    component: () => import("@/views/RegisterView"),
  },
  {
    path: "/",
    name: "home",
    meta: {
      layout: "main",
    },
    component: () => import("@/views/HomeView"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: {
      layout: "main",
    },
    component: () => import("@/views/CategoriesView"),
  },
  {
    path: "/detail-record",
    name: "detail-record",
    meta: {
      layout: "main",
    },
    component: () => import("@/views/DetailRecordView"),
  },
  {
    path: "/history",
    name: "history",
    meta: {
      layout: "main",
    },
    component: () => import("@/views/HistoryView"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: {
      layout: "main",
    },
    component: () => import("@/views/PlanningView"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      layout: "main",
    },
    component: () => import("@/views/ProfileView"),
  },
  {
    path: "/record",
    name: "record",
    meta: {
      layout: "main",
    },
    component: () => import("@/views/RecordView"),
  },
];
