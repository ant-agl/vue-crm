import M from "materialize-css/dist/js/materialize.min";
export default {
  install(app) {
    app.config.globalProperties.$message = (html) => {
      M.toast({ html });
    };

    app.config.globalProperties.$error = (html) => {
      M.toast({ html: `[Ошибка]: ${html}` });
    };
  },
};
