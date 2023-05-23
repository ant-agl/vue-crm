<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencyList" :key="cur">
              <td>{{ cur }}</td>
              <td>{{ $filters.currency(1 / currency[cur]) }}</td>
            </tr>
          </tbody>
        </table>
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
};
</script>
