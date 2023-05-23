<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, i) in records" :key="record.id">
        <td>{{ i + 1 }}</td>
        <td>{{ $filters.currency(record.sum) }}</td>
        <td>{{ $filters.date(new Date(record.date)) }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeColor]">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <router-link :to="'/detail/' + record.id" class="btn-small btn">
            <i class="material-icons">open_in_new</i>
          </router-link>
          <button
            @click.prevent="deleteRecord(record.id)"
            class="btn btn-small waves-effect waves-light btn-delete"
          >
            <i class="material-icons">delete</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["info"]),
  },
  methods: {
    deleteRecord(id) {
      const record = this.records.find((r) => r.id === id);
      console.log(this.records, id, record, this.info);
      const bill =
        record.type == "income"
          ? this.info.bill - record.sum
          : this.info.bill + record.sum;
      this.$store.dispatch("deleteRecord", { id }).then((access) => {
        if (!access) return;
        this.$message("Запись удалена");

        this.info.bill = bill;
        this.$store.dispatch("updateInfo", { bill });
      });
    },
  },
};
</script>

<style scoped>
.btn-delete,
.btn-delete:focus {
  margin-left: 10px;
  background-color: #b71c1c;
}
.btn-delete:hover {
  background-color: #e53935;
}
</style>
