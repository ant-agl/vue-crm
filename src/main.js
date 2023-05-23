import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import messagePlugin from "@/plugins/messagePlugin";
import AppLoader from "@/components/app/AppLoader";

import filters from "./filters";
import tooltipeDirective from "@/directives/tooltipeDirective";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebase = initializeApp({
  apiKey: "AIzaSyAENnmcpqxLqWHJuvpt7eqOgCf9yCy4lGQ",
  authDomain: "vue-crm-b3620.firebaseapp.com",
  projectId: "vue-crm-b3620",
  storageBucket: "vue-crm-b3620.appspot.com",
  messagingSenderId: "370273320532",
  appId: "1:370273320532:web:1bd48badeb7b76767f77c1",
  databaseURL: "https://vue-crm-b3620-default-rtdb.firebaseio.com",
});
const auth = getAuth(firebase);
getDatabase(firebase);

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(messagePlugin)
      .component("AppLoader", AppLoader)
      .directive("tooltipe", tooltipeDirective);

    app.config.globalProperties.$filters = filters;

    app.mount("#app");
  }
});
