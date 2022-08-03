/* eslint-disable */
import { createStore } from "vuex";
import groups from "./modules/groups/actionCreator";

export default createStore({
  modules: {
    groups
  }
});
