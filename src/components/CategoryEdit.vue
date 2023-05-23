<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="sendForm">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$error }"
          />
          <label for="name">Название</label>
          <span v-if="v$.title.$error" class="helper-text invalid">
            Введите название
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$error }"
          />
          <label for="limit">Лимит</label>
          <span v-if="v$.limit.$error" class="helper-text invalid">
            Минимальное значение {{ v$.limit.minValue.$params.min }}
          </span>
        </div>

        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
            />
            <span>Расходная категория</span>
          </label>
        </p>
        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
            />
            <span>Доходная категория</span>
          </label>
        </p>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">create</i>
        </button>
        <button
          class="btn waves-effect waves-light btn-delete"
          @click.prevent="deleteCategory"
        >
          Удалить
          <i class="material-icons right">delete</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from "materialize-css/dist/js/materialize.min";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";

export default {
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    select: null,
    current: null,
    title: "",
    limit: 100,
    type: "outcome",
  }),
  validations: () => ({
    title: { required },
    limit: { required, minValue: minValue(100) },
  }),
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
  },
  watch: {
    categories: {
      handler() {
        this.select = M.FormSelect.init(this.$refs.select);
      },
      flush: "post",
    },
    current(categoryId) {
      const { title, limit, type } = this.categories.find(
        (c) => c.id === categoryId
      );
      this.title = title;
      this.limit = limit;
      this.type = type;
      M.updateTextFields();
    },
  },
  created() {
    if (this.categories.length) {
      const { id, title, limit, type } = this.categories[0];
      this.current = id;
      this.title = title;
      this.limit = limit;
      this.type = type;
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  unmounted() {
    if (this.select?.destroy) this.select.destroy();
  },
  methods: {
    sendForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return false;
      }

      const formData = {
        id: this.current,
        title: this.title,
        limit: this.limit,
        type: this.type,
      };
      this.$store.dispatch("updateCategory", formData).then((success) => {
        if (!success) return;
        this.$message("Категория обновлена");
      });
    },
    deleteCategory() {
      this.$store
        .dispatch("deleteCategory", { id: this.current })
        .then((success) => {
          if (!success) return;
          this.$message("Категория удалена");

          if (this.categories.length) {
            this.current = this.categories[0].id;
          } else {
            this.current = null;
          }
        });
    },
  },
};
</script>

<style scope>
.btn-delete,
.btn-delete:focus {
  margin-left: 10px;
  background-color: #b71c1c;
}
.btn-delete:hover {
  background-color: #e53935;
}
</style>
