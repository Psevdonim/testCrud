
	const columns = [
		{id:1, name:'Group Name',field:'data_group_name'},
		{id:2, name:'Data', field:'parsed_data'},
		{id:3, name:'Action',field:'action'}
	]

	const joinedColumns = [
		{id:1, name:'Parent of Parents',field:'id'},
		{id:2, name:'All childrens data', field:'data_with_childrens'},
		{id:3, name:'', field:''},
	]

	export default {
		columns,
		joinedColumns
}