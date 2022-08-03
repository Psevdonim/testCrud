<template>
	<div class="modal" v-if='isVisible'>
	<div class="modal__background" @click="closeModal"/>
		<div class="modal__wrapper">
		<p class="alert" v-if='error'> {{error}}</p>
			<h2 class='modal__title'>{{ recordData ? `Change record №${recordData.id}` : 'Create record' }} </h2>
			<Form>
				<div class='form__input-wrapper' v-if='currentGroup?.data_group_id'>
					<p>Record group</p>
					<select name="record_data" v-model='formData.record_group_id' >
							<option :value='null' >Select record group</option>
							<option v-for='record in recordsData' :value='record.id' :key='record.id'>{{record.title}}</option>
						</select>
				</div>

				<div class='form__input-wrapper'>
					<p>Data group</p>
						<select name="groups_data"  v-model='currentGroup' @change='changeDataGroup'>
							<option :value='null' >Select data group</option>
							<option v-for='group in groupsData' :value='group' :key='group.id'>{{group.name}}</option>
						</select>
				</div>

			<transition name="fade">
				<div v-if='currentGroup' class='form__inputs'>
			
					<div class='form__input-wrapper' v-for='inputData in currentGroup.schema' :key='inputData[0]'>
						<p>{{inputData[1].element_label}}</p>
						<input v-model='formData.data[inputData[0]]' :name='inputData[0]' type="text">
					</div>
					<div class="button" @click='sendRecord'>
					{{ recordData ? 'Change' : 'Create' }} 
					</div>
				</div>
			</transition>
			</Form>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	props:{
		isVisible:{
			type:Boolean,
			required:true
		},

		recordData:{
			type:Object,
			required:true
		}
	},
	
	data(){
		return{
			formData:{
				data_group_id:null,
				record_group_id:null,
				data:{}
			},
			currentGroup:null,
			error:null
		}
	},
	
	computed:{
		recordsData(){
			return this.$store.getters['groups/recordsData'].filter(element=> element.data_group_id === this.currentGroup.data_group_id)
		},
		groupsData(){
			return this.$store.getters['groups/groupsData']
		}
	},

	watch:{
		isVisible(isVisible){
			if(this.recordData && isVisible){
				const record = Object.assign({},this.recordData)
				const recordData = Object.assign({},this.recordData.data)

				this.formData.record_group_id = record.record_group_id
				this.formData.data_group_id = record.data_group_id
				this.formData.data = recordData
				this.currentGroup = this.groupsData.find(e=> e.id == record.data_group_id)
			}else if(isVisible){
				this.formData.data = {}
				this.formData.data_group_id = null
				this.formData.record_group_id = null
				this.currentGroup = null
			}
		}
	},

	methods:{
		...mapActions({
			createData: 'groups/createData',
			changeData: 'groups/changeData'
		}),

		closeModal(){
			this.$emit('closeModal', null)
		},

		changeDataGroup(){
			this.error = null
			this.formData.record_group_id = null
		},

		sendRecord(){
			this.error = null

			this.formData.data_group_id = this.currentGroup.id
			const { formData, recordData, currentGroup } = this;
		
		if(currentGroup?.data_group_id && !formData.record_group_id){
			this.error = 'Please select record group'
			return
		}

			if(recordData){
				this.changeData({ params: { index:recordData.index, id: recordData.id, collection: currentGroup.data_group_name }, formData })
			}else{
				this.createData({ params: { collection: currentGroup.data_group_name }, formData })
			}
			this.closeModal()
		}
	}

}
</script>

<style>

</style>