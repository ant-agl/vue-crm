import M from "materialize-css/dist/js/materialize.min";
export default {
  mounted(el, { value }) {
    M.Tooltip.init(el, { html: value });
  },
  unmounted(el) {
    const tooltip = M.Tooltip.getInstance(el);
    if (tooltip?.destroy) tooltip.destroy();
  },
};
