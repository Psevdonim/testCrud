<template>
	<div class="wrapper">
		<div class="page__title">
			<h1>
				Data groups
			</h1>
			<p class='button' @click='changeModal(null)'>
				Create
			</p>
		</div>

		<DataTable :tableData='recordsData' :columns='columns' @changeRecord='changeModal'/>
		
		<transition name="fade">
			<ChangeRecordModal :isVisible='isModalVisible' :recordData='recordData'  @closeModal='changeModal'/>
		</transition>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import helper from './config/helper';

import DataTable from '@/components/tables/DataTable.vue'
import ChangeRecordModal from './components/modals/ChangeRecordModal.vue';

export default {
  name: "App",

  components: {
    DataTable,
    ChangeRecordModal
},
		data(){
			return {
				columns:helper.columns,
				isModalVisible:false,
				recordData:null
			}
		},

	

	computed:{
		...mapGetters({
			groupsData:'groups/groupsData',
			recordsData:'groups/recordsData'
		}),
	},


	methods:{
		...mapActions({
			getAllData: 'groups/getAllData',
			getAllRecords: 'groups/getAllRecords',
		}),

		getData(){
			this.getAllData()
		},

		getRecords(){
		this.getAllRecords()
		},

		changeModal(data){
			this.isModalVisible = !this.isModalVisible
			if(data){
				this.recordData = data.slotProps
			}else{
				this.recordData = null
			}
		}
	},

	created(){
		this.getData();
		this.getRecords()
	},

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
