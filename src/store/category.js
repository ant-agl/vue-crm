import {
  getDatabase,
  ref,
  child,
  push,
  update,
  onValue,
  remove,
} from "firebase/database";

export default {
  state: {
    categories: [],
  },
  mutations: {
    addCategory(state, category) {
      const categories = [...state.categories];
      categories.push(category);
      state.categories = categories;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    updateCategory(state, category) {
      const categories = [...state.categories];
      const idx = categories.findIndex((c) => c.id === category.id);
      categories[idx] = category;
      state.categories = categories;
    },
    deleteCategory(state, id) {
      const categories = [...state.categories];
      const idx = categories.findIndex((c) => c.id === id);
      categories.splice(idx, 1);
      state.categories = categories;
    },
  },
  getters: {
    categories: (s) => s.categories,
  },
  actions: {
    async createCategory({ dispatch, commit }, { title, limit, type }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();

        const newCategoryKey = push(
          child(ref(db), `/users/${uid}/categories`)
        ).key;

        let data = {
          title,
          limit,
          type,
        };
        let updates = {};
        updates[`/users/${uid}/categories/${newCategoryKey}`] = data;
        update(ref(db), updates);

        let category = {
          title,
          limit,
          type,
          id: newCategoryKey,
        };
        commit("addCategory", category);

        return true;
      } catch (e) {
        commit("setError", e);
        return false;
      }
    },
    async updateCategory({ dispatch, commit }, { id, title, limit, type }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();

        let data = {
          title,
          limit,
          type,
        };
        let updates = {};
        updates[`/users/${uid}/categories/${id}`] = data;
        update(ref(db), updates);

        let category = {
          title,
          limit,
          type,
          id,
        };
        commit("updateCategory", category);

        return true;
      } catch (e) {
        commit("setError", e);
        return false;
      }
    },
    async deleteCategory({ dispatch, commit }, { id }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();

        remove(child(ref(db), `/users/${uid}/categories/${id}`));
        commit("deleteCategory", id);

        return true;
      } catch (e) {
        commit("setError", e);
        return false;
      }
    },
    async fetchCategories({ dispatch, commit }) {
      return new Promise((resolve) => {
        dispatch("getUid").then((uid) => {
          const db = getDatabase();
          onValue(
            ref(db, `/users/${uid}/categories`),
            (snapshot) => {
              let categories = snapshot.val();
              let formatCategories = [];
              for (let categoryId in categories) {
                formatCategories.push({
                  ...categories[categoryId],
                  id: categoryId,
                });
              }
              commit("setCategories", formatCategories);
              resolve(true);
            },
            {
              onlyOnce: true,
            }
          );
        });
      });
    },
  },
};
