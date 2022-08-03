import axios from "axios";
import mutations from "./mutations";
import apiLinks from "@/store/api.js";

const state = () => ({
  groupsData: [],
	recordsData: [],
  dataGroup: {},
  url: null,
  pagination: [],
  fileLoading: false,
  loading: true,
  error: null,
  message: null
});

const actions = {
  async getAllData({ commit }, params) {
    try {
      commit("axiosBegin");
      const query = await axios.get(`${apiLinks.data_groups(params)}`);
      await commit("allDataReadSuccess", query.data);
    } catch (err) {
      await commit("axiosErr", err);
    }
  },

  async getAllRecords({ commit }, params) {
    try {
      commit("axiosBegin");
      const query = await axios.get(`${apiLinks.record_groups(params)}`);
      await commit("allRecordsReadSuccess", query.data);
    } catch (err) {
      await commit("axiosErr", err);
    }
  },

	async getOneData({ commit }, params) {
    try {
      commit("axiosBegin");
      const query = await axios.get(`${apiLinks.data_groups(params)}`);
      await commit("oneDataReadSuccess", query.data);
    } catch (err) {
      await commit("axiosErr", err);
    }
  },

  async createData({ commit }, { formData}) {
    try {
      //const query = await axios.post(apiLinks.data_groups(), formData);
      await commit("createDataSuccess", formData);
    } catch (err) {
      await commit("axiosErr", err);
    }
  },

  async changeData({ commit }, {params , formData}) {
    try {
			//const { id, index, collection } = params
      //const query = await axios.patch(apiLinks.data_groups(collection, id), formData);
      await commit("changeDataSuccess", { index: params.index, data:formData});
    } catch (err) {
      await commit("axiosErr", err);
    }
  }
};

const getters = {
  groupsData: state =>{
		return state.groupsData.map(group => {
			group.schema = Object.entries(group.schema).sort((a,b) => a - b)
			
			return group
		})
	},
  recordsData: state => {
	const records = state.recordsData.map((record, index)=>{

		record.data_group_name = state.groupsData.find(data=> data.id == record.data_group_id)?.name
		record.parsed_data = Object.entries(record.data).map((value) => value.join(': ')).join(', ')
		record.title = Object.values(record.data).map((value) => value).join(', ')
		record.index = index
		
		return record
	}) 
	return records
},
	
}

export default {
  namespaced: true,
  state,
	getters,
  actions,
  mutations
};
