<template>
	<div class="wrapper">
		<div class="page__title">
			<h1>
				Data groups
			</h1>
			<div class='page__buttons'>
				<p class='button button_switch' @click='changeTables'>
					{{isVisibleParents ? 'Chain' : 'Data'}}
				</p>
				<p class='button' @click='changeModal(null)'>
					Create
				</p>
			</div>
		</div>
		<DataTable :tableData='isVisibleParents ? recordMergedData : recordsData' :columns='isVisibleParents ? joinedColumns : columns' @changeRecord='changeModal'/>
		
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
				joinedColumns:helper.joinedColumns,
				isModalVisible:false,
				recordData:null,
				isVisibleParents:false
			}
		},

	computed:{
		...mapGetters({
			groupsData:'groups/groupsData',
			recordsData:'groups/recordsData'
		}),

		recordMergedData(){
			const getChildrensData = (record) => {
				let data = [...Object.entries(record.data)] 
				if(record.childrens.length){
					record.childrens.forEach(e=> {
						data = [...data, ...getChildrensData(e)]
						})
				}
					return data
			}

			let records = this.$store.getters['groups/recordsData'].map(record => {
				record.data_with_childrens = getChildrensData(record)
				return record
				})
			
			records = records.filter(e=> e.record_group_id == null)
			return records
		
		}

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

		changeTables(){
			this.isVisibleParents = !this.isVisibleParents
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
