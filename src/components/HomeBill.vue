<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="cur in currencyList" :key="cur" class="currency-line">
          <span>{{ getCurrency(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currency: Object,
  },
  data: () => ({
    currencyList: ["RUB", "USD", "EUR"],
  }),
  methods: {
    getCurrency(cur) {
      let val = this.$store.getters.info.bill * this.currency[cur];
      return this.$filters.currency(val, cur);
    },
  },
};
</script>
