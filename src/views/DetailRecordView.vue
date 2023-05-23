<template>
  <div>
    <AppLoader v-if="loading" />
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb">{{ recordInfo.typeText }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[recordInfo.typeColor]">
            <div class="card-content white-text">
              <p>Описание: {{ recordInfo.desc }}</p>
              <p>Сумма: {{ $filters.currency(recordInfo.sum) }}</p>
              <p>Категория: {{ recordInfo.categoryName }}</p>

              <small>{{
                $filters.date(new Date(recordInfo.date), "datetime")
              }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    loading: true,
    recordId: null,
  }),
  computed: {
    ...mapGetters(["records", "categories"]),
    recordInfo() {
      let record = this.records.find((r) => r.id === this.recordId);

      record.typeText = record.type == "outcome" ? "Расход" : "Доход";
      record.typeColor = record.type == "outcome" ? "red" : "green";
      record.categoryName =
        this.categories.find((c) => c.id === record.categoryId)?.title ?? "—";

      return record;
    },
  },
  async mounted() {
    this.recordId = this.$route.params.id;

    if (!this.records.length) await this.$store.dispatch("fetchRecords");
    if (!this.categories.length) await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
};
</script>
