<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ $filters.currency(info.bill) }}</h4>
    </div>

    <AppLoader v-if="loading" />

    <p v-else-if="categories.length == 0" class="center">
      Категорий пока нет.
      <router-link to="/categories">Создать новую категорию</router-link>
    </p>

    <section v-else>
      <div v-if="categoriesOutcome.length">
        <h5>Расходы</h5>
        <PlanningRow
          v-for="cat in categoriesOutcome"
          :key="cat.id"
          :category="cat"
        />
      </div>
      <hr v-if="categoriesOutcome.length && categoriesIncome.length" />
      <div v-if="categoriesIncome.length">
        <h5>Доходы</h5>
        <PlanningRow
          v-for="cat in categoriesIncome"
          :key="cat.id"
          :category="cat"
        />
      </div>
    </section>
  </div>
</template>

<script>
import PlanningRow from "@/components/PlanningRow";
import { mapGetters } from "vuex";
export default {
  components: { PlanningRow },
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapGetters(["info", "categories", "records"]),
    categoriesOutcome() {
      let categoriesOutcome = [];
      this.categories
        .filter((c) => c.type === "outcome")
        .forEach((cat) => {
          const spend = this.records
            .filter((r) => r.categoryId === cat.id)
            .reduce((total, r) => {
              return (total += r.sum);
            }, 0);

          const progressPercent = (spend / cat.limit) * 100;
          const progressColor =
            progressPercent < 60
              ? "green"
              : progressPercent < 95
              ? "orange"
              : "red";

          const tooltipeVal = cat.limit - spend;
          const tooltipeText = `${
            tooltipeVal > 0 ? "Осталось" : "Превышение на"
          } ${this.$filters.currency(Math.abs(tooltipeVal))}`;
          categoriesOutcome.push({
            ...cat,
            spend,
            progressColor,
            progressPercent,
            tooltipeText,
          });
        });

      return categoriesOutcome;
    },
    categoriesIncome() {
      let categoriesIncome = [];
      this.categories
        .filter((c) => c.type === "income")
        .forEach((cat) => {
          const spend = this.records
            .filter((r) => r.categoryId === cat.id)
            .reduce((total, r) => {
              return (total += r.sum);
            }, 0);

          const progressPercent = (spend / cat.limit) * 100;
          const progressColor = "green";

          const tooltipeVal = cat.limit - spend;
          const tooltipeText = `${
            tooltipeVal > 0
              ? "Еще планируется получить"
              : "Вы получили больше на"
          } ${this.$filters.currency(Math.abs(tooltipeVal))}`;
          categoriesIncome.push({
            ...cat,
            spend,
            progressColor,
            progressPercent,
            tooltipeText,
          });
        });

      return categoriesIncome;
    },
  },
  async mounted() {
    if (!this.records.length) await this.$store.dispatch("fetchRecords");
    if (!this.categories.length) await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
};
</script>

<style scoped>
hr {
  border: none;
  height: 1px;
  width: 100%;
  background-color: rgba(51, 51, 51, 0.12);
  margin: 50px 0 35px;
}
</style>
