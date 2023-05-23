import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
        return true;
      } catch (e) {
        commit("setError", e);
        return false;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = await dispatch("getUid");
        const db = getDatabase();
        set(ref(db, `/users/${uid}/info`), {
          bill: 1000,
          name,
        });

        return true;
      } catch (e) {
        commit("setError", e);
        return false;
      }
    },
    getUid() {
      const auth = getAuth();
      let user = auth.currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      commit("clearInfo");
      const auth = getAuth();
      await signOut(auth);
    },
  },
};
