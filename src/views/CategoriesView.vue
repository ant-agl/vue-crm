<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <AppLoader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate />
        <CategoryEdit v-if="categoriesLength > 0" />
        <p v-else class="center">Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";

export default {
  components: { CategoryCreate, CategoryEdit },
  data: () => ({
    loading: true,
  }),
  computed: {
    categoriesLength() {
      return this.$store.getters.categories.length;
    },
  },
  mounted() {
    if (!this.categoriesLength) {
      this.$store.dispatch("fetchCategories").then(() => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  },
};
</script>
