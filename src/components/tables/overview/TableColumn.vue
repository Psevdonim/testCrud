<template>
	<div class='table__row table__column'>
		<p v-for='column of columns' :key='column.id'>
			{{column.name}}
		</p>
	</div>
</template>

<script>
export default {
props:{
	columns:{
		type:Object,
		required:true
	}
}
}
</script>

<style>

</style>