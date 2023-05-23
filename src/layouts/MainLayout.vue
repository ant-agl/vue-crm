<template>
  <AppLoader v-if="loading" />
  <div v-else class="app-main-layout">
    <app-navbar @toggleSidebar="isOpenSidebar = !isOpenSidebar" />
    <app-sidebar :is-open="isOpenSidebar" />
    <main class="app-content" :class="{ full: !isOpenSidebar }">
      <div class="app-page">
        <router-view v-slot="{ Component }">
          <Transition>
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link to="/record" class="btn-floating btn-large blue">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import messages from "@/utils/messages";
import AppNavbar from "@/components/app/AppNavbar";
import AppSidebar from "@/components/app/AppSidebar";

export default {
  name: "MainLayout",
  data: () => ({
    isOpenSidebar: true,
    loading: true,
  }),
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    },
  },
  mounted() {
    if (!Object.keys(this.$store.getters?.info || {}).length) {
      let promises = [];
      promises.push(this.$store.dispatch("fetchInfo"));

      Promise.all(promises).then(() => {
        this.loading = false;
        if (messages[this.$route.query.message]) {
          this.$message(messages[this.$route.query.message]);
          const query = Object.assign({}, this.$route.query);
          delete query.message;
          this.$router.replace({ query });
        }
      });
    }
  },
  components: {
    AppNavbar,
    AppSidebar,
  },
};
</script>
