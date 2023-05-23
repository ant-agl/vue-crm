import {
  getDatabase,
  ref,
  push,
  child,
  update,
  onValue,
  remove,
} from "firebase/database";

export default {
  state: {
    records: [],
  },
  mutations: {
    setRecords(state, records) {
      state.records = records;
    },
    addRecord(state, record) {
      const arr = [...state.records];
      console.log(arr, record);
      arr.push(record);
      console.log(arr);
      state.records = arr;
    },
    deleteRecord(state, id) {
      const records = [...state.records];
      const idx = records.findIndex((c) => c.id === id);
      records.splice(idx, 1);
      state.records = records;
    },
  },
  getters: {
    records: (s) => s.records,
  },
  actions: {
    async fetchRecords({ dispatch, commit }) {
      return new Promise((resolve) => {
        dispatch("getUid").then((uid) => {
          const db = getDatabase();
          onValue(
            ref(db, `/users/${uid}/records`),
            (snapshot) => {
              let records = snapshot.val();
              let formatRecords = [];
              for (let recordId in records) {
                formatRecords.push({
                  ...records[recordId],
                  id: recordId,
                });
              }
              commit("setRecords", formatRecords);
              resolve(formatRecords);
            },
            {
              onlyOnce: true,
            }
          );
        });
      });
    },
    async createRecord(
      { dispatch, commit, getters },
      { categoryId, type, sum, desc, date }
    ) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();

        const newRecordKey = push(child(ref(db), `/users/${uid}/records`)).key;

        let data = {
          categoryId,
          type,
          sum,
          desc,
          date,
        };
        let updates = {};
        updates[`/users/${uid}/records/${newRecordKey}`] = data;
        update(ref(db), updates);

        const record = {
          ...data,
          id: newRecordKey,
        };
        if (getters.records.length) commit("addRecord", record);

        return true;
      } catch (e) {
        commit("setError", e);
        return false;
      }
    },
    async deleteRecord({ dispatch, commit }, { id }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();

        console.log(id);
        remove(child(ref(db), `/users/${uid}/records/${id}`));
        commit("deleteRecord", id);

        return true;
      } catch (e) {
        commit("setError", e);
        return false;
      }
    },
  },
};
