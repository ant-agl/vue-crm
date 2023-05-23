<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <AppLoader v-if="loading" />
    <p v-else-if="categories.length == 0" class="center">
      Категорий пока нет.
      <router-link to="/categories">Создать новую категорию</router-link>
    </p>
    <form v-else class="form" @submit.prevent="sendForm">
      <p v-if="hasCatOutcome">
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>
      <p v-if="hasCatIncome">
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>
      <br />

      <div class="input-field">
        <select ref="select" v-model="current">
          <option v-for="cat in filterCategories" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="sum"
          :class="{ invalid: v$.sum.$error }"
        />
        <label for="amount">Сумма</label>
        <span class="helper-text invalid" v-if="v$.sum.$error">
          Минимальное значение {{ v$.sum.minValue.$params.min }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="desc"
          :class="{ invalid: v$.desc.$error }"
        />
        <label for="description">Описание</label>
        <span class="helper-text invalid" v-if="v$.desc.$error">
          Обязательное поле
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import M from "materialize-css/dist/js/materialize.min";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    loading: true,
    select: null,
    sum: "",
    desc: "",
    type: "outcome",
    current: null,
  }),
  computed: {
    ...mapGetters(["info", "categories"]),
    filterCategories() {
      return this.categories.filter((c) => c.type === this.type);
    },
    hasCatIncome() {
      return this.categories.some((c) => c.type === "income");
    },
    hasCatOutcome() {
      return this.categories.some((c) => c.type === "outcome");
    },
  },
  watch: {
    filterCategories() {
      this.current = this.filterCategories?.[0].id;
      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select);
      });
    },
  },
  async mounted() {
    if (!this.categories.length) {
      await this.$store.dispatch("fetchCategories");
    }
    this.loading = false;
    setTimeout(() => {
      this.type = this.hasCatOutcome ? "outcome" : "income";
      this.current = this.filterCategories?.[0]?.id ?? null;
      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select);
      });
    });
  },
  unmounted() {
    if (this.select?.destroy) this.select.destroy();
  },
  validations: () => ({
    current: { required },
    sum: { required, minValue: minValue(0) },
    desc: { required },
  }),
  methods: {
    sendForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      const formData = {
        categoryId: this.current,
        sum: this.sum,
        desc: this.desc,
        type: this.type,
        date: new Date().toJSON(),
      };

      this.$store.dispatch("createRecord", formData).then((success) => {
        if (!success) return;

        const bill =
          this.type == "income"
            ? this.info.bill + this.sum
            : this.info.bill - this.sum;
        this.info.bill = bill;
        this.$store.dispatch("updateInfo", { bill });

        this.v$.$reset();
        this.$message("Запись добавлена");
        this.sum = "";
        this.desc = "";
      });
    },
  },
};
</script>
