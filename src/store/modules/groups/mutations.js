export default {
  axiosBegin(state) {
    state.loading = true;
  },

  allDataReadSuccess(state, data) {
    state.groupsData = data.data.map( e => {
			e.schema = JSON.parse(e.schema)
			return e
		});

    state.loading = false;
  },

	allRecordsReadSuccess(state, data){
		
    state.recordsData = data.data.map( e => {
			e.data = JSON.parse(e.data)
			return e
		});
		
    state.loading = false;

	},

  oneDataReadSuccess(state, data) {
    state.dataGroup = data;
    state.loading = false;
  },

  createDataSuccess(state, data) {
		//сделал такой небольшой хардкод по айдишнику, т.к. поидее хотя бы айди должен бэк возвращать, а у меня  403 сыпет(
		data.id = state.recordsData[state.recordsData.length - 1].id + 1
    state.recordsData = [...state.recordsData, data];
    state.loading = false;
		console.log(state.recordsData[state.recordsData.length - 1])
  },

  changeDataSuccess(state, { index, data }) {
    state.recordsData[index] = Object.assign({}, data);
    state.loading = false;
  },

  axiosReadErr(state, err) {
    state.error = err;
    state.loading = false;
  }
};
