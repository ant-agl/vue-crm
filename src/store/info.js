import { getDatabase, ref, onValue, update } from "firebase/database";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  getters: {
    info: (s) => s.info,
  },
  actions: {
    async updateInfo({ dispatch, commit, getters }, newData) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();

        let updateData = { ...getters.info, ...newData };
        let updates = {};
        updates[`/users/${uid}/info`] = updateData;
        update(ref(db), updates);

        return true;
      } catch (e) {
        commit("setError", e);
        return false;
      }
    },
    fetchInfo({ dispatch, commit }) {
      try {
        return new Promise((resolve) => {
          dispatch("getUid").then((uid) => {
            const db = getDatabase();
            onValue(
              ref(db, `/users/${uid}/info`),
              (snapshot) => {
                commit("setInfo", snapshot.val());
                resolve(true);
              },
              {
                onlyOnce: true,
              }
            );
          });
        });
      } catch (e) {
        commit("setError", e);
        return false;
      }
    },
  },
};
