<template>
	<div class="table">
		<TableColumn :columns='columns' /> 
		<TableRow v-for='rowData of tableData' :key='rowData.id' :rowData='rowData' :columns='columns' >
		<template #action='slotProps' >
			<span @click='changeRecord(slotProps)' class='button'>
				Change
			</span>
		</template>
		<template #data_with_childrens='slotProps' >
			<span v-for='(data,index) of slotProps.slotProps.data_with_childrens' :key='index'>
				{{data[0]}}: {{data[1]}}  , 
			</span>
		</template>
		</TableRow> 
		<!--<pre>
			{{data}}
		</pre>-->
	</div>
</template>

<script>
import TableColumn from './overview/TableColumn.vue';
import TableRow from './overview/TableRow.vue';

export default {
    components: { TableColumn, TableRow },

    props: {
        tableData: {
            type: Object,
            required: true
        },
        columns: {
            type: Object,
            required: true
        }
    },

		methods:{
			changeRecord(record){
				this.$emit('changeRecord', record)
			}
		}
}
</script>

<style>

</style>