<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="sendForm">
      <div class="input-field">
        <label for="description">Имя</label>
        <input
          v-model="name"
          id="description"
          type="text"
          :class="{ invalid: v$.name.$error }"
        />
        <span v-if="v$.name.$error" class="helper-text invalid">
          Введите имя
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import M from "materialize-css/dist/js/materialize.min";
import { mapGetters } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    name: "",
  }),
  computed: {
    ...mapGetters(["info"]),
  },
  mounted() {
    this.name = this.info.name;
    setTimeout(() => {
      M.updateTextFields();
    });
  },
  validations: () => ({
    name: { required },
  }),
  methods: {
    sendForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return false;
      }

      this.$store
        .dispatch("updateInfo", {
          name: this.name,
        })
        .then((success) => {
          if (!success) return;

          this.info.name = this.name;

          this.v$.$reset();
          this.$message("Данные обновлены");
        });
    },
  },
};
</script>
