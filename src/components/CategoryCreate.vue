<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="sendForm">
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
          Создать
          <i class="material-icons right">send</i>
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
    title: "",
    limit: 100,
    type: "outcome",
  }),
  validations: () => ({
    title: { required },
    limit: { required, minValue: minValue(100) },
  }),
  mounted() {
    M.updateTextFields();
  },
  methods: {
    sendForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return false;
      }

      const formData = {
        title: this.title,
        limit: this.limit,
        type: this.type,
      };

      this.$store.dispatch("createCategory", formData).then((success) => {
        if (!success) return;

        this.v$.$reset();
        this.title = "";
        this.limit = 100;
        this.type = "outcome";
        this.$message("Категория была создана");
      });
    },
  },
};
</script>
