<template>
  <div>
    <p>
      <strong>{{ category.title }}:</strong>
      {{ $filters.currency(category.spend) }} из
      {{ $filters.currency(category.limit) }}
    </p>
    <div class="progress" v-tooltipe="category.tooltipeText">
      <div
        class="determinate"
        :class="[category.progressColor]"
        :style="{ width: category.progressPercent + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: Object,
  },
};
</script>
