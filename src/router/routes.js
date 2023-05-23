export const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      layout: "empty",
      noauth: true,
      title: "Вход",
    },
    component: () => import("@/views/LoginView"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      layout: "empty",
      noauth: true,
      title: "Регистрация",
    },
    component: () => import("@/views/RegisterView"),
  },
  {
    path: "/",
    name: "home",
    meta: {
      layout: "main",
      auth: true,
      title: "Счет",
    },
    component: () => import("@/views/HomeView"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: {
      layout: "main",
      auth: true,
      title: "Категории",
    },
    component: () => import("@/views/CategoriesView"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: {
      layout: "main",
      auth: true,
      title: "Запись",
    },
    component: () => import("@/views/DetailRecordView"),
  },
  {
    path: "/history",
    name: "history",
    meta: {
      layout: "main",
      auth: true,
      title: "История",
    },
    component: () => import("@/views/HistoryView"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: {
      layout: "main",
      auth: true,
      title: "Планиорвание",
    },
    component: () => import("@/views/PlanningView"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      layout: "main",
      auth: true,
      title: "Профиль",
    },
    component: () => import("@/views/ProfileView"),
  },
  {
    path: "/record",
    name: "record",
    meta: {
      layout: "main",
      auth: true,
      title: "Список записей",
    },
    component: () => import("@/views/RecordView"),
  },
];
