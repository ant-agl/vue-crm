<template>
  <form class="card auth-card" @submit.prevent="submit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model="email"
          :class="[v$.email.$error ? 'invalid' : 'validate']"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="v$.email.$error && v$.email.required.$invalid"
        >
          Обязательное поле
        </small>
        <small
          class="helper-text invalid"
          v-else-if="v$.email.$error && v$.email.email.$invalid"
        >
          Введите корректный email
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="password"
          :class="[v$.password.$error ? 'invalid' : 'validate']"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$error && v$.password.required.$invalid"
        >
          Обязательное поле
        </small>
        <small
          class="helper-text invalid"
          v-else-if="v$.password.$error && v$.password.minLength.$invalid"
        >
          Минимальная длина пароля
          {{ v$.password.minLength.$params.min }} символов. Текущая длина
          {{ password.length }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="name"
          :class="[v$.name.$error ? 'invalid' : 'validate']"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="v$.name.$error && v$.name.required.$invalid"
        >
          Обязательное поле
        </small>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            v-model="agree"
            :class="{ invalid: v$.agree.$error }"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";

export default {
  name: "RegisterView",
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false,
  }),
  validations: () => ({
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: (v) => v },
  }),
  methods: {
    submit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      let formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      this.$store.dispatch("register", formData).then((success) => {
        if (success) this.$router.push("/?message=successregister");
      });
    },
  },
};
</script>

<style scoped>
[type="checkbox"].invalid + span:not(.lever):before {
  border-color: red;
}
</style>
