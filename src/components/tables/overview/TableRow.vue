<template>
	<div class='table__row'>
		<p v-for='column in columns' :key='column.id'>
		<slot :name='column.field' :slotProps='rowData'>
			{{rowData[column.field]}}

		</slot>
		</p>
	</div>
</template>

<script>
export default {
props:{
	rowData:{
		type:Object,
		required:true
	},
	columns:{
		type:Object,
		required:true
	}
}
}
</script>

<style>

</style>