<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <AppLoader v-if="loading" />
    <p v-else-if="!recordsInfo.length">Записей пока нет</p>

    <section v-else>
      <div class="charts">
        <div
          class="history-chart"
          v-if="
            dataChartOutcome.datasets[0].data.length > 1 ||
            dataChartOutcome.datasets[0].data[0] != 0
          "
        >
          <Pie :data="dataChartOutcome" :options="optionsChartOutcome" />
        </div>
        <div
          class="history-chart"
          v-if="
            dataChartIncome.datasets[0].data.length > 1 ||
            dataChartIncome.datasets[0].data[0] != 0
          "
        >
          <Pie :data="dataChartIncome" :options="optionsChartIncome" />
        </div>
      </div>

      <HistoryTable :records="recordsInfo" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable.vue";
import { mapGetters } from "vuex";
import { Pie } from "vue-chartjs";
import "chart.js/auto";

export default {
  components: { HistoryTable, Pie },
  data: () => ({
    loading: true,
    optionsChartOutcome: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Расходы",
        },
      },
    },
    optionsChartIncome: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Доходы",
        },
      },
    },
  }),
  computed: {
    ...mapGetters(["records", "categories"]),
    recordsInfo() {
      let recordsInfo = [];

      this.records.forEach((r) => {
        const typeText = r.type == "outcome" ? "Расход" : "Доход";
        const typeColor = r.type == "outcome" ? "red" : "green";
        const categoryName =
          this.categories.find((c) => c.id === r.categoryId)?.title ?? "—";

        recordsInfo.push({
          ...r,
          typeText,
          typeColor,
          categoryName,
        });
      });

      return recordsInfo.reverse();
    },
    dataChartOutcome() {
      return {
        labels: this.categories
          .filter((c) => c.type === "outcome")
          .map((c) => c.title),
        datasets: [
          {
            backgroundColor: [
              "#4dc9f6",
              "#f67019",
              "#f53794",
              "#537bc4",
              "#acc236",
              "#166a8f",
              "#00a950",
              "#58595b",
              "#8549ba",
            ],
            data: this.categories
              .filter((c) => c.type === "outcome")
              .map((c) => {
                return this.records.reduce((total, r) => {
                  if (c.id === r.categoryId) total += +r.sum;
                  return total;
                }, 0);
              }),
          },
        ],
      };
    },
    dataChartIncome() {
      return {
        labels: this.categories
          .filter((c) => c.type === "income")
          .map((c) => c.title),
        datasets: [
          {
            backgroundColor: [
              "#4dc9f6",
              "#f67019",
              "#f53794",
              "#537bc4",
              "#acc236",
              "#166a8f",
              "#00a950",
              "#58595b",
              "#8549ba",
            ],
            data: this.categories
              .filter((c) => c.type === "income")
              .map((c) => {
                return this.records.reduce((total, r) => {
                  if (c.id === r.categoryId) total += +r.sum;
                  return total;
                }, 0);
              }),
          },
        ],
      };
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
.charts {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 50px;
}
</style>
